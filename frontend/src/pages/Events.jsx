import React, { useState, useEffect } from "react";
import { Calendar, MapPin, ArrowRight, ExternalLink, Clock } from "lucide-react";
import Section from "../components/Section";
import { api } from "../services/api";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
            <section className="bg-brand-black dark:bg-zinc-900 border-b border-white/5 text-white py-24 md:py-32 relative overflow-hidden text-center">
                <div className="container-custom relative z-10">
                    <span className="text-brand-gold font-black uppercase tracking-[0.3em] text-xs mb-4 block">On the Ground</span>
                    <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight text-white">Impact <span className="text-brand-gold">Events</span></h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        From nutrition camps to awareness workshops, see how we're making a difference through direct community engagement.
                    </p>
                </div>
            </section>

            <Section className="bg-brand-background dark:bg-[#0A0A0A]">
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
                    <div className="flex bg-white dark:bg-zinc-900 p-2 rounded-[1.5rem] border border-brand-border dark:border-white/5 shadow-xl glass transition-colors">
                        {["all", "upcoming", "past"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
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
                                    className="card group bg-white dark:bg-zinc-900 border-none shadow-xl hover:shadow-brand-gold/5 transition-all rounded-[2.5rem] overflow-hidden"
                                >
                                    <div className="p-10 flex flex-col md:flex-row gap-10">
                                        <div className="flex-shrink-0">
                                            <div className="w-24 h-28 bg-brand-background dark:bg-black/40 rounded-[2rem] border-2 border-brand-gold/20 flex flex-col items-center justify-center text-center shadow-inner group-hover:border-brand-gold transition-colors">
                                                <span className="text-brand-gold font-black text-4xl">
                                                    {new Date(event.date).getDate()}
                                                </span>
                                                <span className="text-brand-text-muted dark:text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
                                                    {new Date(event.date).toLocaleString('default', { month: 'short' })}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex-grow space-y-5">
                                            <div className="flex items-center gap-3">
                                                <span className={cn(
                                                    "text-[9px] uppercase font-black tracking-[0.2em] px-3 py-1 rounded-full",
                                                    event.is_upcoming ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400" : "bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-600"
                                                )}>
                                                    {event.is_upcoming ? "Upcoming Event" : "Past Event"}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-black dark:text-white group-hover:text-brand-gold transition-colors">{event.title}</h3>
                                            <p className="text-brand-text-muted dark:text-gray-400 leading-relaxed text-sm md:text-base">{event.description}</p>

                                            <div className="flex flex-wrap gap-6 pt-2">
                                                <div className="flex items-center gap-3 text-xs text-brand-text-muted dark:text-gray-500 font-bold uppercase tracking-wider">
                                                    <MapPin className="w-4 h-4 text-brand-gold" />
                                                    {event.location}
                                                </div>
                                                <div className="flex items-center gap-3 text-xs text-brand-text-muted dark:text-gray-500 font-bold uppercase tracking-wider">
                                                    <Calendar className="w-4 h-4 text-brand-gold" />
                                                    {new Date(event.date).toLocaleDateString()}
                                                </div>
                                            </div>

                                            <div className="pt-6">
                                                {event.is_upcoming ? (
                                                    <button className="btn-primary py-3 px-8 text-xs uppercase tracking-widest font-black shadow-brand-gold/10">Register Now</button>
                                                ) : (
                                                    <button className="btn-outline py-3 px-8 text-xs uppercase tracking-widest font-black flex items-center gap-3">
                                                        View Impact Gallery <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
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
        </div>
    );
}
