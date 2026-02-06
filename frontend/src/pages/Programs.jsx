import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Palette, Activity, Heart, GraduationCap, Megaphone, ArrowRight, Utensils,
    BookOpen, Home, Loader2, AlertCircle, HandHelping, Star, Layers, CheckCircle2,
    Users, Target
} from "lucide-react";
import Section from "../components/Section";
import PageHeader from "../components/PageHeader";
import { cn } from "../lib/utils";
import { api } from "../services/api";

const academyModules = [
    { area: "Creative Arts", topics: "Painting, dance, music", approach: "Practical sessions, art exhibitions, performances" },
    { area: "Personality Development", topics: "Logical reasoning, puzzles", approach: "Games, storytelling, competitions" },
    { area: "Expression", topics: "Mindfulness, conflict resolution, confidence building", approach: "Group discussions, role-playing" },
    { area: "Hygiene & Good Habits", topics: "Personal hygiene, sanitation, daily routine", approach: "Hands-on activities, demonstrations" },
    { area: "Career Planning", topics: "Exposure to career options, guest talks", approach: "Industry visits, skill-building workshops" },
    { area: "Environment", topics: "Climate change, recycling, gardening", approach: "Eco-projects, tree planting drives" },
    { area: "Communication", topics: "Phonics, storytelling, public speaking", approach: "Debates, speech contests" },
    { area: "STEM", topics: "Basic engineering & experiments", approach: "DIY science projects, interactive workshops" },
    { area: "Physical Education", topics: "Yoga, nutrition, teamwork", approach: "Fitness activities, sports tournaments" },
    { area: "Global Learning", topics: "Cultures, geography, global etiquette", approach: "Virtual tours, international storytelling" },
];

const programData = [
    {
        id: "kala",
        title: "Program Kāala",
        description: "Conducting Art classes for the underprivileged crowd especially children who have talent but no resources. Helping them with the opportunities, resources and exposure which helps them to grow as an Artist.",
        icon: Palette,
        image: "/assets/artisticexpression.jpg",
        projects: ["Art Workshops", "Dance Classes", "Talent Showcases"]
    },
    {
        id: "atman",
        title: "Program Ātman",
        description: "Attempt to improve the physical health via Yoga, Meditation and other physical activities. A platform for mental health discussions that includes various mental health sessions.",
        icon: Activity,
        image: "/assets/7dae08d9-696a-4a7b-badd-88611cea6d80.jpg",
        projects: ["Yoga Sessions", "Mental Health Talks", "Sports Day"]
    },
    {
        id: "seva",
        title: "Program Seva",
        description: "Conducting Food/Clothes/Blood donation drives throughout the year. Providing food kits, Grocery Kits and other basic essentials to the needy.",
        icon: Heart,
        image: "/assets/seva.jpg",
        projects: ["Food Drives", "Clothes Distribution", "Blood Donation"]
    },
    {
        id: "vidya",
        title: "Program Vidya",
        description: "Supporting Children with School Admission Fees, School Kits, personal development, career guidance and other educational classes.",
        icon: GraduationCap,
        image: "/assets/academicknowledge.jpg",
        projects: ["Scholarship Programs", "Career Counseling", "Tech Labs"]
    },
    {
        id: "awareness",
        title: "Awareness",
        description: "As the first step towards change is Awareness, we organize various awareness programs (Flash mobs, Road Shows, Marathons, Art Shows, Campaigns) and also create an impact by helping, uplifting, motivating or even just supporting someone.",
        icon: Megaphone,
        image: "/assets/86b0333e-99d5-4d90-8b01-e07595cc170d.jpg",
        projects: ["Flash Mobs", "Road Shows", "Marathons"]
    }
];

const iconMap = {
    Palette, Activity, Heart, GraduationCap, Megaphone, Star, Target, Users
};

export default function Programs() {
    const [programs, setPrograms] = useState(programData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getPrograms().then((res) => {
            if (res && Array.isArray(res) && res.length > 0) {
                const mappedPrograms = res.map(p => ({
                    id: p.id || p._id,
                    title: p.title,
                    description: p.description,
                    icon: iconMap[p.icon] || Heart,
                    image: p.image || "/assets/artisticexpression.jpg",
                    projects: p.projects || []
                }));
                setPrograms(mappedPrograms);
            }
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }, []);

    return (
        <div className="dark:bg-[#0A0A0A] transition-colors duration-500 min-h-screen">
            <PageHeader
                title={<>Our <span className="text-brand-gold">Programs</span></>}
                subtitle="Empowering through Art, Health, Service, Education, and Awareness."
                image="/assets/artisticexpression.jpg"
            />

            {/* Program Sections */}
            <Section className="bg-white dark:bg-[#0A0A0A]">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-12 h-12 text-brand-gold animate-spin" />
                    </div>
                ) : (
                    <div className="space-y-24 md:space-y-32">
                        {programs.map((program, idx) => {
                            const isEven = idx % 2 === 1;
                            return (
                                <div
                                    key={program.id}
                                    className={cn(
                                        "flex flex-col lg:flex-row items-center gap-12 lg:gap-24",
                                        isEven ? "lg:flex-row-reverse" : ""
                                    )}
                                >
                                    {/* Image Side */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        className="w-full lg:w-1/2"
                                    >
                                        <div className="relative aspect-video lg:aspect-[4/3] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 md:border-8 border-brand-background dark:border-zinc-800">
                                            <img
                                                src={program.image}
                                                alt={program.title}
                                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                            />
                                        </div>
                                    </motion.div>

                                    {/* Content Side */}
                                    <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
                                        <div className="flex items-center gap-5">
                                            <div className="w-16 h-16 bg-brand-gold/10 dark:bg-brand-gold/5 rounded-2xl flex items-center justify-center shrink-0">
                                                <program.icon className="w-8 h-8 text-brand-gold" />
                                            </div>
                                            <h2 className="text-3xl md:text-5xl font-black dark:text-white">{program.title}</h2>
                                        </div>
                                        <p className="text-brand-text-muted dark:text-gray-400 text-lg md:text-xl leading-relaxed">
                                            {program.description}
                                        </p>

                                        {/* Projects under each program */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {program.projects.map((project, i) => (
                                                <div key={i} className="flex items-center gap-3 bg-brand-background dark:bg-zinc-900/50 p-4 rounded-2xl border border-brand-border dark:border-white/5">
                                                    <div className="w-2 h-2 rounded-full bg-brand-gold shrink-0" />
                                                    <span className="font-bold text-sm dark:text-gray-200">{project}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-2">
                                            <Link to="/donate" className="btn-primary w-full md:w-auto flex items-center justify-center gap-2">
                                                <Heart className="w-4 h-4 fill-white" />
                                                <span>Support this Program</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Section>

            {/* Tap To Smile Academy Table */}
            <Section className="bg-brand-background dark:bg-zinc-900/30">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-brand-gold font-black uppercase tracking-[0.3em] text-xs mb-4 block">Our Educational Wing</span>
                        <h2 className="text-4xl md:text-6xl font-black mb-6 dark:text-white">Tap To Smile <span className="text-brand-gold">Academy</span></h2>
                        <p className="text-brand-text-muted dark:text-gray-400 max-w-2xl mx-auto text-lg uppercase font-bold tracking-widest italic">Core Areas & Modules (Basic | Intermediate | Advanced)</p>
                    </div>

                    <div className="overflow-x-auto rounded-[2rem] border border-brand-border dark:border-white/5 shadow-2xl">
                        <table className="w-full text-left border-collapse bg-white dark:bg-zinc-900">
                            <thead>
                                <tr className="bg-brand-gold text-white uppercase text-xs font-black tracking-[0.2em]">
                                    <th className="px-8 py-6">Subject</th>
                                    <th className="px-8 py-6">Topics Covered</th>
                                    <th className="px-8 py-6">Approach</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-border dark:divide-white/5">
                                {academyModules.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-brand-gold/5 transition-colors group">
                                        <td className="px-8 py-6 font-black dark:text-white text-sm whitespace-nowrap">{item.area}</td>
                                        <td className="px-8 py-6 text-brand-text-muted dark:text-gray-400 text-sm italic">{item.topics}</td>
                                        <td className="px-8 py-6 text-brand-text-muted dark:text-gray-400 text-sm font-medium">{item.approach}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Section>

            {/* Newsletter or CTA */}
            <Section className="bg-white dark:bg-[#0A0A0A]">
                <div className="bg-brand-black dark:bg-zinc-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full -mr-32 -mt-32 blur-[80px]" />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h3 className="text-3xl md:text-5xl font-black mb-6">Want to <span className="text-brand-gold">Participate</span>?</h3>
                        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                            Every program is a chance to make an impact. Whether you want to volunteer, donate, or partner, we welcome you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact?tab=volunteer" className="btn-primary px-10 py-4 text-lg">Join as Volunteer</Link>
                            <Link to="/donate" className="btn-outline border-white/20 text-white hover:bg-white hover:text-brand-black px-10 py-4 text-lg">Make a Donation</Link>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}