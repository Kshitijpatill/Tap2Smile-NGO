import React, { useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard, 
  BookOpen,
  Calendar,
  Briefcase,
  Users,
  Mail,
  TrendingUp,
  Heart,
  Shield, // Added Shield Icon for Admins
} from "lucide-react";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const sections = [
    {
      key: "dashboard",
      path: "/admin/dashboard",
      label: "Overview",
      icon: <LayoutDashboard size={20} />,
      emoji: "🏠",
    },
    {
      key: "donations",
      path: "/admin/donations",
      label: "Donation Pledges",
      icon: <Heart size={20} />,
      emoji: "💖",
    },
    {
      key: "programs",
      path: "/admin/programs",
      label: "Programs",
      icon: <BookOpen size={20} />,
      emoji: "📚",
    },
    {
      key: "projects",
      path: "/admin/projects",
      label: "Projects",
      icon: <Briefcase size={20} />,
      emoji: "🏗️",
    },
    {
      key: "events",
      path: "/admin/events",
      label: "Events",
      icon: <Calendar size={20} />,
      emoji: "📅",
    },
    {
      key: "volunteers",
      path: "/admin/volunteers",
      label: "Volunteers",
      icon: <Users size={20} />,
      emoji: "👥",
    },
    {
      key: "messages",
      path: "/admin/messages",
      label: "Messages",
      icon: <Mail size={20} />,
      emoji: "✉️",
    },
    {
      key: "impact",
      path: "/admin/impact",
      label: "Impact Stats",
      icon: <TrendingUp size={20} />,
      emoji: "📊",
    },
    {
      key: "admins",
      path: "/admin/admins",
      label: "Admins",
      icon: <Shield size={20} />,
      emoji: "🛡️",
    },
  ];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("admin_token");
      navigate("/admin/login");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
    
      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-20"
        } bg-zinc-900 border-r border-zinc-800 transition-all duration-300 ease-in-out flex flex-col fixed h-full z-20`}
      >
   
        <div className="p-6 flex items-center justify-between border-b border-zinc-800 h-20">
          {sidebarOpen && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-black text-white">
                TapToSmile<span className="text-brand-gold">.</span>
              </h2>
              <p className="text-[10px] uppercase tracking-widest text-gray-500">
                Admin Portal
              </p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto space-y-2 custom-scrollbar">
          {sections.map((section) => {
            const isActive = location.pathname === section.path;
            return (
              <button
                key={section.key}
                onClick={() => navigate(section.path)}
                className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-brand-gold text-black font-bold shadow-lg shadow-brand-gold/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
                title={section.label}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                    isActive
                      ? "bg-black/10"
                      : "bg-zinc-800 group-hover:bg-zinc-700"
                  }`}
                >
                  {section.icon}
                </div>

                {sidebarOpen && (
                  <span className="text-sm tracking-wide">{section.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800 bg-zinc-900">
          <div
            className={`flex items-center gap-3 ${!sidebarOpen && "justify-center"}`}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-gold to-yellow-200 flex items-center justify-center text-black font-black shadow-lg">
              A
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">
                  Super Admin
                </p>
                <button
                  onClick={handleLogout}
                  className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 mt-1 transition-colors"
                >
                  <LogOut size={12} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${sidebarOpen ? "ml-72" : "ml-20"}`}
      >
        <main className="flex-1 p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
