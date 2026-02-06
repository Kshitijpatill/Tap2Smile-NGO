import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  Users,
  Mail,
  Heart,
  ArrowRight,
  Calendar,
  BookOpen,
  AlertCircle,
  DollarSign,
  Loader2,
  Zap,
  ShieldCheck,
  Server,
  PlusCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api";

export default function AdminOverview() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalDonations: 0,
    donationCount: 0,
    pendingVolunteers: 0,
    unreadMessages: 0,
    activePrograms: 0,
    upcomingEvents: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        // Fetch all data in parallel
        const results = await Promise.allSettled([
          api.getAdminDonations(),
          api.getAdminVolunteers(),
          api.getAdminMessages(),
          api.getPrograms(),
          api.getEvents(),
        ]);

        // Helper to extract data safely
        const getData = (result) =>
          result.status === "fulfilled" && result.value.success
            ? result.value.data || []
            : [];

        const donationData = getData(results[0]);
        const volunteerData = getData(results[1]);
        const messageData = getData(results[2]);
        const programData = getData(results[3]);
        const eventData = getData(results[4]);

        // 1. Calculate Stats
        const totalRaised = donationData.reduce(
          (sum, d) => sum + (parseFloat(d.amount) || 0),
          0,
        );

        setStats({
          totalDonations: totalRaised,
          donationCount: donationData.length,
          pendingVolunteers: volunteerData.filter(
            (v) => v.status === "new" || v.status === "pending",
          ).length,
          unreadMessages: messageData.length,
          activePrograms: programData.filter((p) => p.is_active).length,
          upcomingEvents: eventData.filter((e) => e.is_upcoming).length,
        });

        // 2. Build Recent Activity Feed (Mix of all types)
        const activity = [
          ...donationData.map((d) => ({
            type: "donation",
            date: d.created_at || new Date().toISOString(),
            title: `New Pledge: ₹${d.amount}`,
            subtitle: d.donor_name,
            id: d.id,
            status: d.status,
          })),
          ...volunteerData.map((v) => ({
            type: "volunteer",
            date: v.created_at || new Date().toISOString(),
            title: `Volunteer App: ${v.name}`,
            subtitle: v.interest_area,
            id: v.id,
            status: v.status,
          })),
          ...messageData.map((m) => ({
            type: "message",
            date: m.created_at || new Date().toISOString(),
            title: `Message: ${m.subject || "Inquiry"}`,
            subtitle: m.name,
            id: m.id,
            status: "unread",
          })),
        ]
          .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by newest first
          .slice(0, 5); // Take top 5

        setRecentActivity(activity);
      } catch (error) {
        console.error("Dashboard Load Error:", error);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-gray-500">
        <Loader2 className="w-10 h-10 animate-spin text-brand-gold mb-4" />
        <p>Updating Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3">
        <AlertCircle size={24} />
        {error}
      </div>
    );
  }

  // --- SUB-COMPONENTS ---

  const StatCard = ({ label, value, icon, colorClass, bgClass, onClick }) => (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden"
    >
      <div
        className={`absolute -right-6 -top-6 p-4 opacity-[0.08] transition-opacity ${colorClass}`}
      >
        {React.cloneElement(icon, { size: 100 })}
      </div>

      <div className="relative z-10">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${bgClass} ${colorClass.replace("text-", "text-opacity-100 ")}`}
        >
          {icon}
        </div>
        <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
          {label}
        </p>
        <h3 className="text-3xl font-black text-gray-900 mt-1">{value}</h3>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 mt-1">
            Here's what's happening with your NGO today.
          </p>
        </div>
        <div className="text-sm text-gray-400 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          System Operational
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Pledged"
          value={`₹${stats.totalDonations.toLocaleString()}`}
          icon={<DollarSign size={24} />}
          colorClass="text-green-600"
          bgClass="bg-green-100"
          onClick={() => navigate("/admin/donations")}
        />
        <StatCard
          label="Pending Volunteers"
          value={stats.pendingVolunteers}
          icon={<Users size={24} />}
          colorClass="text-blue-600"
          bgClass="bg-blue-100"
          onClick={() => navigate("/admin/volunteers")}
        />
        <StatCard
          label="Messages"
          value={stats.unreadMessages}
          icon={<Mail size={24} />}
          colorClass="text-yellow-600"
          bgClass="bg-yellow-100"
          onClick={() => navigate("/admin/messages")}
        />
        <StatCard
          label="Active Programs"
          value={stats.activePrograms}
          icon={<BookOpen size={24} />}
          colorClass="text-purple-600"
          bgClass="bg-purple-100"
          onClick={() => navigate("/admin/programs")}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* RECENT ACTIVITY FEED */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp size={20} className="text-gray-400" /> Recent Activity
            </h2>
           
          </div>

          <div className="space-y-4">
            {recentActivity.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
                <p className="text-gray-400">No recent activity found.</p>
              </div>
            ) : (
              recentActivity.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer border border-transparent hover:border-gray-100"
                  onClick={() =>
                    navigate(
                      item.type === "donation"
                        ? "/admin/donations"
                        : item.type === "volunteer"
                          ? "/admin/volunteers"
                          : "/admin/messages",
                    )
                  }
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm
                    ${
                      item.type === "donation"
                        ? "bg-green-100 text-green-600"
                        : item.type === "volunteer"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {item.type === "donation" && <Heart size={20} />}
                    {item.type === "volunteer" && <Users size={20} />}
                    {item.type === "message" && <Mail size={20} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 group-hover:text-brand-gold transition-colors">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-gray-400 font-medium bg-gray-100 px-2 py-1 rounded-md">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-gray-300 group-hover:text-brand-gold group-hover:translate-x-1 transition-all"
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: EVENTS & QUICK ACTIONS */}
        <div className="space-y-6">
          {/* EVENTS CARD */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <Calendar size={18} className="text-brand-gold" /> Upcoming
                Events
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                You have{" "}
                <span className="text-white font-bold">
                  {stats.upcomingEvents}
                </span>{" "}
                events scheduled.
              </p>
              <button
                onClick={() => navigate("/admin/events")}
                className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl text-sm font-bold transition-all border border-white/10"
              >
                Manage Events
              </button>
            </div>
            {/* Abstract Background Decoration */}
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-brand-gold rounded-full opacity-20 blur-3xl"></div>
          </div>

          {/* QUICK ACTIONS CARD */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap size={18} className="text-yellow-600" /> Quick Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/admin/projects")}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700 group"
              >
                <span className="flex items-center gap-2">
                  <PlusCircle
                    size={16}
                    className="text-gray-400 group-hover:text-brand-gold"
                  />{" "}
                  Add New Project
                </span>
                <ArrowRight size={14} className="text-gray-300" />
              </button>
              <button
                onClick={() => navigate("/admin/programs")}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700 group"
              >
                <span className="flex items-center gap-2">
                  <PlusCircle
                    size={16}
                    className="text-gray-400 group-hover:text-brand-gold"
                  />{" "}
                  Create Program
                </span>
                <ArrowRight size={14} className="text-gray-300" />
              </button>
              <button
                onClick={() => navigate("/admin/donations")}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700 group"
              >
                <span className="flex items-center gap-2">
                  <DollarSign
                    size={16}
                    className="text-gray-400 group-hover:text-brand-gold"
                  />{" "}
                  Manage Pledges
                </span>
                <ArrowRight size={14} className="text-gray-300" />
              </button>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}
