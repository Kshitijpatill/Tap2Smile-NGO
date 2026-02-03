import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import {
    LayoutDashboard,
    Package,
    Calendar,
    Users,
    LogOut,
    Plus,
    Edit2,
    Trash2,
    ShieldCheck,
    ArrowRight
} from "lucide-react";
import Section from "../components/Section";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeTab, setActiveTab] = useState("dashboard");
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [stats, setStats] = useState({ programs: 0, events: 0, volunteers: 0 });
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        const token = api.getToken();
        if (token) {
            setIsAuthenticated(true);
            fetchStats();
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [activeTab, isAuthenticated]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const res = await api.login(loginData);
        if (res.success) {
            setIsAuthenticated(true);
            fetchStats();
        } else {
            setError(res.message);
        }
        setLoading(false);
    };

    const handleLogout = () => {
        api.logout();
        setIsAuthenticated(false);
    };

    const fetchStats = async () => {
        // Mocking stats for now, in real scenario these would come from an endpoint
        const progs = await api.getPrograms();
        const evts = await api.getEvents();
        setStats({
            programs: progs.data?.length || 0,
            events: evts.data?.length || 0,
            volunteers: 124, // Mock
        });
    };

    const fetchData = async () => {
        setLoading(true);
        let res;
        if (activeTab === "programs") res = await api.getPrograms();
        else if (activeTab === "events") res = await api.getEvents();
        else if (activeTab === "projects") res = await api.getProjects();

        if (res?.success) {
            setDataList(res.data);
        }
        setLoading(false);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-background dark:bg-[#0A0A0A] p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-brand-border dark:border-white/5 p-12"
                >
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="text-brand-gold h-8 w-8" />
                        </div>
                        <h1 className="text-3xl font-black dark:text-white">Admin Login</h1>
                        <p className="text-brand-text-muted dark:text-gray-500 mt-2">Secure access to Tap To Smile Dashboard</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-brand-text-muted dark:text-gray-500 mb-2">Email Address</label>
                            <input
                                type="email"
                                required
                                value={loginData.email}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                className="w-full px-6 py-4 rounded-2xl bg-brand-background dark:bg-black/40 border border-brand-border dark:border-white/5 focus:outline-none focus:border-brand-gold dark:text-white transition-all"
                                placeholder="admin@taptosmile.org"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-brand-text-muted dark:text-gray-500 mb-2">Password</label>
                            <input
                                type="password"
                                required
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                className="w-full px-6 py-4 rounded-2xl bg-brand-background dark:bg-black/40 border border-brand-border dark:border-white/5 focus:outline-none focus:border-brand-gold dark:text-white transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm font-bold text-center">{error}</p>
                        )}

                        <button
                            disabled={loading}
                            className="btn-primary w-full py-5 text-lg flex items-center justify-center gap-3"
                        >
                            {loading ? "Authenticating..." : "Sign In"}
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-background dark:bg-[#0A0A0A] flex flex-col pt-20">
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-72 bg-white dark:bg-zinc-900 border-r border-brand-border dark:border-white/5 hidden lg:flex flex-col p-8 gap-2">
                    <div className="mb-10 px-4">
                        <span className="text-brand-gold font-black tracking-tighter text-2xl">Admin Panel</span>
                    </div>

                    {[
                        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                        { id: "programs", label: "Manage Programs", icon: Package },
                        { id: "events", label: "Impact Events", icon: Calendar },
                        { id: "projects", label: "Project Gallery", icon: Package },
                        { id: "volunteers", label: "Volunteers List", icon: Users },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                                "flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm transition-all",
                                activeTab === item.id
                                    ? "bg-brand-gold text-white shadow-lg shadow-brand-gold/20"
                                    : "text-brand-text-muted dark:text-gray-500 hover:bg-brand-gold/5"
                            )}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </button>
                    ))}

                    <div className="mt-auto pt-8">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm text-red-500 hover:bg-red-50 transition-all w-full"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6 md:p-12">
                    <AnimatePresence mode="wait">
                        {activeTab === "dashboard" ? (
                            <motion.div
                                key="dashboard"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-12"
                            >
                                <header>
                                    <h2 className="text-4xl font-black dark:text-white">Admin Dashboard</h2>
                                    <p className="text-brand-text-muted dark:text-gray-500 mt-2 font-medium">Welcome back, Admin. Here's what's happening today.</p>
                                </header>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {[
                                        { label: "Active Programs", value: stats.programs, icon: Package, color: "gold" },
                                        { label: "Scheduled Events", value: stats.events, icon: Calendar, color: "blue" },
                                        { label: "Total Volunteers", value: stats.volunteers, icon: Users, color: "green" },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-brand-border dark:border-white/5 shadow-xl">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="p-4 bg-brand-gold/10 rounded-2xl">
                                                    <stat.icon className="text-brand-gold" size={24} />
                                                </div>
                                            </div>
                                            <p className="text-brand-text-muted dark:text-gray-500 text-xs font-black uppercase tracking-widest">{stat.label}</p>
                                            <h3 className="text-4xl font-black dark:text-white mt-1">{stat.value}</h3>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="list"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="flex justify-between items-center">
                                    <h2 className="text-3xl font-black dark:text-white capitalize">{activeTab.replace('_', ' ')}</h2>
                                    <button className="btn-primary py-3 px-6 flex items-center gap-2 text-xs">
                                        <Plus size={16} /> Add New
                                    </button>
                                </div>

                                <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-brand-border dark:border-white/5 overflow-hidden shadow-2xl">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-brand-border dark:border-white/5">
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-brand-text-muted dark:text-gray-500">Details</th>
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-brand-text-muted dark:text-gray-500">Status</th>
                                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-brand-text-muted dark:text-gray-500">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-brand-border dark:divide-white/5">
                                            {loading ? (
                                                <tr>
                                                    <td colSpan="3" className="px-8 py-20 text-center text-brand-text-muted dark:text-gray-500">Loading records...</td>
                                                </tr>
                                            ) : dataList.length > 0 ? (
                                                dataList.map((item) => (
                                                    <tr key={item.id} className="group hover:bg-brand-gold/5 transition-colors">
                                                        <td className="px-8 py-6">
                                                            <p className="font-black dark:text-white">{item.title}</p>
                                                            <p className="text-xs text-brand-text-muted dark:text-gray-500">{item.id}</p>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[10px] font-black uppercase tracking-widest rounded-full">Active</span>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <div className="flex gap-4">
                                                                <button className="p-2 text-brand-text-muted dark:text-gray-500 hover:text-brand-gold transition-colors"><Edit2 size={16} /></button>
                                                                <button className="p-2 text-brand-text-muted dark:text-gray-500 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="3" className="px-8 py-20 text-center text-brand-text-muted dark:text-gray-500">No records found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
