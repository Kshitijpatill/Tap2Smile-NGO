import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Utensils, BookOpen, Home, Heart, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Section from "../components/Section";
import { api } from "../services/api";
import { cn } from "../lib/utils";

const iconMap = {
    Utensils: Utensils,
    BookOpen: BookOpen,
    Home: Home,
    Heart: Heart,
};

export default function Programs() {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getPrograms().then((res) => {
            if (res.success) setPrograms(res.data);
            setLoading(false);
        });
    }, []);

    return (
        <div className="dark:bg-[#0A0A0A] transition-colors duration-500">
            <section className="bg-brand-black dark:bg-zinc-900 border-b border-white/5 text-white py-24 md:py-32 relative overflow-hidden text-center">
                <div className="container-custom relative z-10">
                    <span className="text-brand-gold font-black uppercase tracking-[0.3em] text-xs mb-4 block">Our Impact Portfolios</span>
                    <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight text-white">Empowering <span className="text-brand-gold">Communities</span></h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Targeted initiatives designed to solve critical issues and empower communities through sustainable support.
                    </p>
                </div>
            </section>

            <Section className="bg-brand-background dark:bg-[#0A0A0A]">
                <div className="space-y-32">
                    {loading ? (
                        Array(3).fill(0).map((_, i) => (
                            <div key={i} className="h-96 bg-white dark:bg-zinc-900 animate-pulse rounded-[3rem]" />
                        ))
                    ) : (
                        programs.map((program, idx) => {
                            const Icon = iconMap[program.icon] || Heart;
                            const isEven = idx % 2 === 1;

                            return (
                                <div
                                    key={program.id}
                                    className={cn(
                                        "flex flex-col lg:flex-row items-center gap-16 lg:gap-24",
                                        isEven ? "lg:flex-row-reverse" : ""
                                    )}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={idx === 0 ? { opacity: 1, scale: 1 } : undefined}
                                        whileInView={idx !== 0 ? { opacity: 1, scale: 1 } : undefined}
                                        viewport={{ once: true, amount: 0.2 }}
                                        className="w-full lg:w-1/2"
                                    >
                                        <div className="relative aspect-[4/3] rounded-[3.5rem] overflow-hidden shadow-2xl group border-8 border-white dark:border-zinc-800 transition-colors">
                                            <img
                                                src={program.cover_image}
                                                alt={program.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                                        </div>
                                    </motion.div>

                                    <div className="w-full lg:w-1/2 space-y-10">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-brand-gold/10 dark:bg-brand-gold/5 rounded-[1.5rem] flex items-center justify-center">
                                                <Icon className="w-8 h-8 text-brand-gold" />
                                            </div>
                                            <div>
                                                <span className="text-brand-gold font-black uppercase tracking-widest text-xs">Active Program</span>
                                                <h2 className="text-3xl md:text-4xl font-black dark:text-white mt-1">{program.title}</h2>
                                            </div>
                                        </div>

                                        <p className="text-brand-text-muted dark:text-gray-400 text-lg leading-relaxed">
                                            {program.short_description} Our {program.title.toLowerCase()} program is a cornerstone of our efforts in Mumbai, providing essential support to thousands. We believe in direct impact and sustainable community involvement.
                                        </p>

                                        <div className="bg-white dark:bg-zinc-900/50 p-10 rounded-[2.5rem] border border-brand-border dark:border-white/5 shadow-xl space-y-8 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />

                                            <div className="space-y-4 relative z-10">
                                                <div className="flex justify-between items-center text-xs font-black uppercase tracking-[0.2em]">
                                                    <span className="text-brand-text-muted dark:text-gray-500">Fundraising Progress</span>
                                                    <span className="text-brand-gold">{Math.round((program.raised / program.goal) * 100)}%</span>
                                                </div>
                                                <div className="w-full bg-gray-100 dark:bg-white/5 rounded-full h-3 overflow-hidden">
                                                    <motion.div
                                                        className="bg-brand-gold h-full rounded-full"
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${(program.raised / program.goal) * 100}%` }}
                                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                                    />
                                                </div>
                                                <div className="flex justify-between font-black text-xl">
                                                    <div className="flex flex-col">
                                                        <span className="text-brand-text-muted dark:text-gray-500 text-[10px] uppercase tracking-widest mb-1">Raised ❤️</span>
                                                        <span className="dark:text-white">${program.raised.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex flex-col items-end">
                                                        <span className="text-brand-text-muted dark:text-gray-500 text-[10px] uppercase tracking-widest mb-1">Goal</span>
                                                        <span className="dark:text-white">${program.goal.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-4 flex flex-col sm:flex-row gap-5 relative z-10">
                                                <Link to="/donate" className="btn-primary flex-1 shadow-brand-gold/20">Donate to this Cause</Link>
                                                <Link to="/contact" className="btn-outline flex-1">Volunteer</Link>
                                            </div>

                                            <div className="pt-6 border-t border-brand-border dark:border-white/5 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-muted dark:text-gray-600">
                                                <ShieldCheck className="w-4 h-4 text-brand-gold/50" />
                                                80G Tax Benefit Eligible
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </Section>
        </div>
    );
}

