import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Users, GraduationCap, HandHelping, ArrowRight, Star, Quote, Target, Palette, Activity } from "lucide-react";
import Section from "../components/Section";
import HeroSlider from "../components/HeroSlider";
import { api } from "../services/api";
import { cn } from "../lib/utils";

const defaultStats = [
    { label: "Lives Impacted", value: "200,000+", icon: Users },
    { label: "Meals Served", value: "500,000+", icon: Heart },
    { label: "Children Educated", value: "10,000+", icon: GraduationCap },
    { label: "Volunteers", value: "1,200+", icon: HandHelping },
];

const iconMap = {
    Users, Heart, GraduationCap, HandHelping, Star, Target, Palette, Activity
};

const homePrograms = [
    {
        title: "Program Kāala",
        desc: "Art classes and exposure for underprivileged talent.",
        icon: Palette,
        img: "/assets/50ea6add-857a-41e9-bfe4-e386c89c1174.jpg"
    },
    {
        title: "Program Ātman",
        desc: "Physical and mental health through Yoga and Meditation.",
        icon: Activity,
        img: "/assets/7dae08d9-696a-4a7b-badd-88611cea6d80.jpg"
    },
    {
        title: "Program Vidya",
        desc: "Educational support, kits and career guidance.",
        icon: GraduationCap,
        img: "/assets/2d43109a-6240-424a-9e6b-715ce40f513d.jpg"
    }
];

export default function Home() {
    const [stats, setStats] = useState(defaultStats);

    useEffect(() => {
        api.getImpactStats().then((res) => {
            if (res && Array.isArray(res) && res.length > 0) {
                const mappedStats = res.map(s => ({
                    label: s.title,
                    value: s.value,
                    icon: iconMap[s.icon] || Heart
                }));
                setStats(mappedStats);
            }
        }).catch(error => {
            console.error("Failed to fetch impact stats:", error);
            // If API call fails, defaultStats will be used as initial state.
        });
    }, []);

    return (
        <div className="overflow-hidden bg-brand-background dark:bg-[#0A0A0A] transition-colors duration-500">
            {/* Modern Hero Slider */}
            <HeroSlider />

            {/* Stats Section - Clean & Transparent */}
            <Section className="py-0 -mt-10 md:-mt-16 lg:-mt-20 relative z-20">
                <div className="container-custom">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 + (idx * 0.1) }}
                                className="glass py-10 rounded-3xl md:rounded-[2rem] flex flex-col items-center group hover:bg-brand-gold/5 transition-colors border-white/10"
                            >
                                <div className="p-3 bg-brand-gold/5 rounded-2xl mb-4">
                                    {stat.icon && <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-brand-gold" />}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-brand-black dark:text-white mb-1">{stat.value}</h3>
                                <p className="text-brand-text-muted dark:text-gray-500 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Founder's Vision Section - Updated from PPTX */}
            <Section className="bg-white dark:bg-[#0A0A0A]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div className="relative">
                        <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl group">
                            <img
                                src="/assets/4334f5ac-5172-4e60-879e-2998041a7ed0.jpg"
                                alt="Founder Vision"
                                className="w-full h-full object-cover md:grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/40 to-transparent mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        {/* Cutout style floating elements */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 -left-10 glass border-brand-gold/30 p-8 rounded-[2rem] hidden md:block max-w-[200px] shadow-2xl"
                        >
                            <Quote className="w-10 h-10 text-brand-gold mb-4" />
                            <p className="text-sm font-bold italic dark:text-gray-300">"I was 21 when I first visited an orphanage in Pune."</p>
                        </motion.div>
                    </div>

                    <div className="space-y-10">
                        <div>
                            <span className="inline-block text-brand-gold font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4">The Beginning</span>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-8 leading-[1.1] dark:text-white">
                                Sparked by a <span className="text-brand-gold">Desire</span> to Give Back.
                            </h2>
                            <p className="text-brand-text-muted dark:text-gray-400 text-base md:text-xl leading-relaxed">
                                Our founder witnessed the zeal and enthusiasm of children in Pune, sparking a mission to provide a platform and equal opportunity for every underserved child to showcase their talent.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {[
                                { title: "Selfless Contribution", icon: Heart },
                                { title: "Equal Opportunity", icon: Star },
                                { title: "Empowering Youth", icon: Target },
                                { title: "Holistic Growth", icon: Users }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-brand-gold/10 dark:bg-brand-gold/5 flex items-center justify-center">
                                        <item.icon className="w-6 h-6 text-brand-gold" />
                                    </div>
                                    <span className="font-bold text-lg text-brand-black dark:text-white">{item.title}</span>
                                </div>
                            ))}
                        </div>

                        <Link to="/about" className="btn-secondary mt-4 group">
                            Read Our Full Story
                            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </Section>

            {/* Academy Section - New from PPTX */}
            <Section className="bg-brand-background dark:bg-zinc-900/50">
                <div className="text-center max-w-4xl mx-auto mb-12 md:mb-20">
                    <span className="text-brand-gold font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block">Our Academy</span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-8 dark:text-white">Tap To Smile <span className="text-brand-gold">Academy</span></h2>
                    <p className="text-brand-text-muted dark:text-gray-400 text-lg md:text-xl leading-relaxed">
                        Nurturing young minds through a holistic approach that combines academic knowledge with artistic expression and personal development.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {[
                        {
                            title: "Academic Knowledge",
                            desc: "Providing the foundation and resources needed for formal education success.",
                            img: "/assets/academicknowledge.jpg"
                        },
                        {
                            title: "Artistic Expression",
                            desc: "Creating platforms for children to express their creativity and unique talents.",
                            img: "/assets/artisticexpression.jpg"
                        },
                        {
                            title: "Personal Development",
                            desc: "Building confidence, resilience, and life skills for a better future.",
                            img: "/assets/7dae08d9-696a-4a7b-badd-88611cea6d80.jpg"
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="flex flex-col gap-8 group">
                            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-xl">
                                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 to-transparent" />
                            </div>
                            <div className="px-2">
                                <h3 className="text-2xl font-black mb-4 dark:text-white group-hover:text-brand-gold transition-colors">{item.title}</h3>
                                <p className="text-brand-text-muted dark:text-gray-400 leading-relaxed font-medium">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            <Section className="bg-white dark:bg-[#0A0A0A]">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <div className="w-full lg:w-1/2">
                        <span className="text-brand-gold font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block">Ground Impact</span>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-8 dark:text-white leading-[1.1]">Organized <span className="text-brand-gold">Awareness</span> Programs</h2>
                        <p className="text-brand-text-muted dark:text-gray-400 text-base md:text-lg leading-relaxed mb-10">
                            We create impact through flash mobs, road shows, marathons, and art campaigns. Every event is a step towards helping, uplifting, and motivating our community.
                        </p>
                        <div className="flex flex-wrap gap-3 md:gap-4">
                            {["Flash Mobs", "Road Shows", "Marathons", "Art Shows", "Campaigns"].map((tag) => (
                                <span key={tag} className="px-4 md:px-6 py-2 rounded-full border border-brand-border dark:border-white/10 text-[10px] md:text-sm font-bold dark:text-gray-300">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 grid grid-cols-2 gap-6">
                        <div className="space-y-6 pt-12">
                            <div className="aspect-video rounded-3xl overflow-hidden shadow-xl">
                                <img src="/assets/86b0333e-99d5-4d90-8b01-e07595cc170d.jpg" className="w-full h-full object-cover" alt="Awareness" />
                            </div>
                            <div className="aspect-square rounded-3xl overflow-hidden shadow-xl">
                                <img src="/assets/d1d88dba-3854-474a-8957-1becf8065703.jpg" className="w-full h-full object-cover" alt="Impact" />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="aspect-square rounded-3xl overflow-hidden shadow-xl">
                                <img src="/assets/0f250353-8dff-4433-8402-a5507098fe96.JPG" className="w-full h-full object-cover" alt="Social" />
                            </div>
                            <div className="aspect-video rounded-3xl overflow-hidden shadow-xl">
                                <img src="/assets/a95f1953-d291-4044-bc85-0be1d414581e.jpg" className="w-full h-full object-cover" alt="Change" />
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            <Section className="bg-brand-background dark:bg-zinc-900/50">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-brand-gold font-black uppercase tracking-[0.3em] text-xs mb-4 block">Core Initiatives</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 dark:text-white">Our <span className="text-brand-gold">Programs</span></h2>
                    <p className="text-brand-text-muted dark:text-gray-400 font-medium">Sustainable impact through targeted community development.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {homePrograms.map((program, idx) => (
                        <div key={idx} className="group relative bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-brand-border/50 dark:border-white/5">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={program.img}
                                    alt={program.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-brand-gold rounded-xl flex items-center justify-center shadow-lg">
                                        <program.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <h3 className="text-xl font-black text-white">{program.title}</h3>
                                </div>
                            </div>
                            <div className="p-8">
                                <p className="text-brand-text-muted dark:text-gray-400 mb-8 leading-relaxed line-clamp-2">
                                    {program.desc}
                                </p>
                                <Link to="/programs" className="flex items-center gap-2 text-brand-gold font-black uppercase tracking-widest text-xs hover:gap-4 transition-all">
                                    Explore Program <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>

            <Section className="py-0">
                <div className="bg-brand-black dark:bg-zinc-900 rounded-[3rem] px-8 py-20 text-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />

                    <div className="max-w-4xl mx-auto relative z-10">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight text-white">
                            Ready to make a <span className="text-brand-gold animate-pulse">difference</span>?
                        </h2>
                        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Your support can provide a meal, a book, or a home to someone in need. Join us in our mission to spread smiles.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link to="/donate" className="btn-primary px-12 py-5 text-xl w-full sm:w-auto">
                                Donate Now
                            </Link>
                            <Link to="/contact?tab=volunteer" className="btn-outline border-white/20 text-white hover:bg-white hover:text-brand-black px-12 py-5 text-xl w-full sm:w-auto">
                                Join our Volunteer Team
                            </Link>
                        </div>

                        <div className="mt-12 pt-12 border-t border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-500 text-sm font-bold uppercase tracking-widest">
                            <span>Verified Impact</span>
                            <span>80G Tax Benefits</span>
                            <span>100% Transparency</span>
                        </div>
                    </div>
                </div>
            </Section>

            <div className="h-20 bg-brand-background dark:bg-[#0A0A0A]" />
        </div>
    );
}
