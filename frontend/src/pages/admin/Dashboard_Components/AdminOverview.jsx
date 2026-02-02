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

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch all data in parallel
        const [donations, volunteers, messages, programs, events] =
          await Promise.all([
            api.getAdminDonations(),
            api.getAdminVolunteers(),
            api.getAdminMessages(),
            api.getPrograms(),
            api.getEvents(),
          ]);

        // 1. Calculate Stats
        const donationData = donations.data || [];
        const volunteerData = volunteers.data || [];
        const messageData = messages.data || [];
        const programData = programs.data || [];
        const eventData = events.data || [];

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
          unreadMessages: messageData.length, // Assuming all messages in list are to be read
          activePrograms: programData.filter((p) => p.is_active).length,
          upcomingEvents: eventData.filter((e) => e.is_upcoming).length,
        });

        // 2. Build Recent Activity Feed (Mix of all types)
        const activity = [
          ...donationData.map((d) => ({
            type: "donation",
            date: d.created_at,
            title: `New Pledge: ₹${d.amount}`,
            subtitle: d.donor_name,
            id: d.id,
          })),
          ...volunteerData.map((v) => ({
            type: "volunteer",
            date: v.created_at,
            title: `Volunteer App: ${v.name}`,
            subtitle: v.interest_area,
            id: v.id,
          })),
          ...messageData.map((m) => ({
            type: "message",
            date: m.created_at,
            title: `Message: ${m.subject}`,
            subtitle: m.name,
            id: m.id,
          })),
        ]
          .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by newest first
          .slice(0, 5); // Take top 5

        setRecentActivity(activity);
      } catch (error) {
        console.error("Dashboard Load Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <div className="p-12 text-center text-gray-500">Loading Dashboard...</div>
    );

  const StatCard = ({ label, value, icon, color, onClick }) => (
    <div
      onClick={onClick}
      className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden`}
    >
      <div
        className={`absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}
      >
        {React.cloneElement(icon, { size: 64 })}
      </div>
      <div className="relative z-10">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color} bg-opacity-10 text-current`}
        >
          {React.cloneElement(icon, {
            size: 24,
            className: color.replace("bg-", "text-"),
          })}
        </div>
        <p className="text-gray-500 text-sm font-medium">{label}</p>
        <h3 className="text-3xl font-bold text-gray-900 mt-1">{value}</h3>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">
          Welcome back, here's what's happening with your NGO today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Pledged"
          value={`₹${stats.totalDonations.toLocaleString()}`}
          icon={<DollarSign />}
          color="bg-green-500"
          onClick={() => navigate("/admin/donations")}
        />
        <StatCard
          label="Pending Volunteers"
          value={stats.pendingVolunteers}
          icon={<Users />}
          color="bg-blue-500"
          onClick={() => navigate("/admin/volunteers")}
        />
        <StatCard
          label="Messages"
          value={stats.unreadMessages}
          icon={<Mail />}
          color="bg-yellow-500"
          onClick={() => navigate("/admin/messages")}
        />
        <StatCard
          label="Active Programs"
          value={stats.activePrograms}
          icon={<BookOpen />}
          color="bg-purple-500"
          onClick={() => navigate("/admin/programs")}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-yellow-600 font-medium hover:text-yellow-700">
              View All
            </button>
          </div>

          <div className="space-y-6">
            {recentActivity.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                No recent activity found.
              </p>
            ) : (
              recentActivity.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 
                    ${
                      item.type === "donation"
                        ? "bg-green-100 text-green-600"
                        : item.type === "volunteer"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {item.type === "donation" && <Heart size={18} />}
                    {item.type === "volunteer" && <Users size={18} />}
                    {item.type === "message" && <Mail size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {item.subtitle}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(item.date).toLocaleDateString()} •{" "}
                      {new Date(item.date).toLocaleTimeString()}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      navigate(
                        item.type === "donation"
                          ? "/admin/donations"
                          : item.type === "volunteer"
                            ? "/admin/volunteers"
                            : "/admin/messages",
                      )
                    }
                    className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions / Mini Stats */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2">Events Summary</h3>
              <p className="text-gray-400 text-sm mb-6">
                You have {stats.upcomingEvents} upcoming events scheduled.
              </p>
              <button
                onClick={() => navigate("/admin/events")}
                className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl text-sm font-bold transition-colors"
              >
                Manage Events
              </button>
            </div>
            <Calendar
              className="absolute -right-4 -bottom-4 text-white/5"
              size={120}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Donation Goal (Monthly)</span>
                  <span className="font-bold text-gray-900">45%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[45%] rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Volunteer Capacity</span>
                  <span className="font-bold text-gray-900">80%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[80%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
