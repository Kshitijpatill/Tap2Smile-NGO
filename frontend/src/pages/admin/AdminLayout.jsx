import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  Menu, X, LogOut,
  BookOpen, Calendar, Briefcase, Users, Mail,
  TrendingUp
} from "lucide-react";
import * as api from "./api";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // Section configurations
  const sections = [
    { key: "programs", label: "Programs", icon: <BookOpen size={20} />, emoji: "📚" },
    { key: "events", label: "Events", icon: <Calendar size={20} />, emoji: "📅" },
    { key: "projects", label: "Projects", icon: <Briefcase size={20} />, emoji: "🏗️" },
    { key: "volunteers", label: "Volunteers", icon: <Users size={20} />, emoji: "👥" },
    { key: "contacts", label: "Contact Messages", icon: <Mail size={20} />, emoji: "✉️" },
    { key: "impact", label: "Impact Stats", icon: <TrendingUp size={20} />, emoji: "📊" },
  ];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      api.clearAuthToken();
      navigate("/admin/login");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-20"
        } bg-gradient-to-b from-gray-900 to-black text-white transition-all duration-300 ease-in-out flex flex-col shadow-2xl`}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-gray-800">
          {sidebarOpen && (
            <div>
              <h2 className="text-2xl font-bold text-yellow-500">TapToSmile</h2>
              <p className="text-xs text-gray-400 mt-1">Admin Portal</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title={sidebarOpen ? "Collapse" : "Expand"}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {sections.map(section => (
              <li key={section.key}>
                <button
                  onClick={() => navigate(`/admin/dashboard/${section.key}`)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-600 hover:text-white text-gray-300 transition-all group"
                  title={section.label}
                >
                  <span className="text-2xl">{section.emoji}</span>
                  {sidebarOpen && (
                    <span className="font-medium text-sm">{section.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        {sidebarOpen && (
          <div className="p-4 border-t border-gray-800 space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
              <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Admin User</p>
                <p className="text-xs text-gray-400">Super Admin</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
