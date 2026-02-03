import React, { useState, useEffect } from "react";
import { Calendar, MapPin, ArrowRight, ExternalLink, Clock, Users, Target, Star } from "lucide-react";
import Section from "../components/Section";
import { api } from "../services/api";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/PageHeader";

export default function Events() {
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getEvents().then((res) => {
            if (res.success) setEvents(res.data);
            setLoading(false);
        });
    }, []);

    const filteredEvents = events.filter((e) => {
        if (filter === "all") return true;
        if (filter === "upcoming") return e.is_upcoming;
        if (filter === "past") return !e.is_upcoming;
        return true;
    });

    return (
        <div className="dark:bg-[#0A0A0A] transition-colors duration-500 min-h-screen">
            <PageHeader
                title={<>Impact <span className="text-brand-gold">Events</span></>}
                subtitle="From nutrition camps to awareness workshops, see how we're making a difference through direct community engagement."
            />

            <Section className="bg-brand-background dark:bg-[#0A0A0A]">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 md:mb-16 gap-8">
                    <div className="flex bg-white dark:bg-zinc-900 p-1.5 md:p-2 rounded-2xl md:rounded-[1.5rem] border border-brand-border dark:border-white/5 shadow-xl glass transition-colors overflow-x-auto max-w-full">
                        {["all", "upcoming", "past"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-4 md:px-8 py-2 md:py-3 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
                                    filter === f ? "bg-brand-gold text-white shadow-lg" : "text-brand-text-muted dark:text-gray-500 hover:text-brand-gold"
                                )}
                            >
                                {f} Events
                            </button>
                        ))}
                    </div>
                    <p className="text-brand-text-muted dark:text-gray-500 font-bold uppercase tracking-widest text-xs">
                        Showing <span className="text-brand-black dark:text-white">{filteredEvents.length}</span> Results
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <AnimatePresence mode="popLayout">
                        {loading ? (
                            Array(4).fill(0).map((_, i) => (
                                <div key={i} className="h-64 bg-white dark:bg-zinc-900 animate-pulse rounded-[2.5rem]" />
                            ))
                        ) : (
                            filteredEvents.map((event, idx) => (
                                <motion.div
                                    key={event.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, delay: 0.2 + (idx * 0.1) }}
                                    className="group relative flex flex-col md:flex-row gap-8 p-8 md:p-10 rounded-[2.5rem] hover:bg-brand-gold/5 transition-all border border-brand-border/50 dark:border-white/5"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-20 h-24 bg-brand-gold/10 dark:bg-brand-gold/5 rounded-2xl flex flex-col items-center justify-center text-center group-hover:bg-brand-gold transition-colors duration-500">
                                            <span className="text-brand-gold group-hover:text-white font-black text-3xl">
                                                {new Date(event.date).getDate()}
                                            </span>
                                            <span className="text-brand-text-muted dark:text-gray-500 group-hover:text-white/80 text-[10px] font-black uppercase tracking-[0.2em]">
                                                {new Date(event.date).toLocaleString('default', { month: 'short' })}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex-grow space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className={cn(
                                                "text-[9px] uppercase font-black tracking-[0.2em] px-3 py-1 rounded-full",
                                                event.is_upcoming ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400" : "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-600"
                                            )}>
                                                {event.is_upcoming ? "Upcoming Event" : "Past Event"}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-black dark:text-white group-hover:text-brand-gold transition-colors">{event.title}</h3>
                                        <p className="text-brand-text-muted dark:text-gray-400 leading-relaxed text-sm line-clamp-2">{event.description}</p>

                                        <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-widest text-brand-text-muted dark:text-gray-500">
                                            <div className="flex items-center gap-2"><MapPin size={14} className="text-brand-gold" /> {event.location}</div>
                                            <div className="flex items-center gap-2"><Clock size={14} className="text-brand-gold" /> {new Date(event.date).toLocaleDateString()}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end md:justify-center">
                                        {event.is_upcoming ? (
                                            <button className="btn-primary py-3 px-8 text-[10px] uppercase font-black tracking-widest">Join Event</button>
                                        ) : (
                                            <button className="p-4 rounded-full bg-brand-background dark:bg-white/5 text-brand-gold hover:bg-brand-gold hover:text-white transition-all">
                                                <ArrowRight size={20} />
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>

                {!loading && filteredEvents.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-32 bg-white dark:bg-zinc-900 rounded-[3rem] border-2 border-dashed border-brand-border dark:border-white/5"
                    >
                        <Calendar className="w-16 h-16 text-brand-border dark:text-gray-800 mx-auto mb-6" />
                        <h3 className="text-2xl font-black mb-3 dark:text-white">No {filter} found</h3>
                        <p className="text-brand-text-muted dark:text-gray-500">Stay tuned for more updates on our upcoming initiatives.</p>
                    </motion.div>
                )}
            </Section>

            {/* Planning of Events Section */}
            <Section className="bg-white dark:bg-[#0A0A0A]">
                <div className="bg-brand-black dark:bg-zinc-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none" />
                    <div className="max-w-4xl mx-auto relative z-10 text-center md:text-left">
                        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                            <div className="w-full md:w-1/2">
                                <span className="text-brand-gold font-black uppercase tracking-[0.3em] text-xs mb-4 block">Coming Soon</span>
                                <h2 className="text-3xl md:text-5xl font-black mb-6 text-white leading-tight">Planning our next <span className="text-brand-gold">impact</span></h2>
                                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                    Our team is constantly working behind the scenes to organize more nutrition camps, education workshops, and awareness drives. We plan our events quarterly to ensure maximum reach and impact.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        "Monthly Nutrition Assessment Camps",
                                        "Weekend Educational Workshops",
                                        "Quarterly Awareness Flash Mobs",
                                        "Annual Fundraising Marathon"
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4 text-white font-bold">
                                            <div className="w-2 h-2 rounded-full bg-brand-gold" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <div className="aspect-square bg-white/5 rounded-3xl flex items-center justify-center p-8 border border-white/10 group hover:border-brand-gold transition-colors">
                                            <div className="text-center">
                                                <Clock className="w-8 h-8 text-brand-gold mx-auto mb-3" />
                                                <p className="text-white text-[10px] font-black uppercase tracking-widest">Timely Actions</p>
                                            </div>
                                        </div>
                                        <div className="aspect-square bg-white/5 rounded-3xl flex items-center justify-center p-8 border border-white/10 group hover:border-brand-gold transition-colors">
                                            <div className="text-center">
                                                <Users className="w-8 h-8 text-brand-gold mx-auto mb-3" />
                                                <p className="text-white text-[10px] font-black uppercase tracking-widest">Community Focused</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4 pt-8">
                                        <div className="aspect-square bg-white/5 rounded-3xl flex items-center justify-center p-8 border border-white/10 group hover:border-brand-gold transition-colors">
                                            <div className="text-center">
                                                <Target className="w-8 h-8 text-brand-gold mx-auto mb-3" />
                                                <p className="text-white text-[10px] font-black uppercase tracking-widest">Clear Objectives</p>
                                            </div>
                                        </div>
                                        <div className="aspect-square bg-white/5 rounded-3xl flex items-center justify-center p-8 border border-white/10 group hover:border-brand-gold transition-colors">
                                            <div className="text-center">
                                                <Star className="w-8 h-8 text-brand-gold mx-auto mb-3" />
                                                <p className="text-white text-[10px] font-black uppercase tracking-widest">High Impact</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
