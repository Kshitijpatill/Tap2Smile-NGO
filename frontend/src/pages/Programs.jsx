import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
    Palette, Activity, Heart, GraduationCap, Megaphone, ArrowRight, Utensils, 
    BookOpen, Home, Loader2, AlertCircle, HandHelping 
} from "lucide-react";
import Section from "../components/Section";
import PageHeader from "../components/PageHeader";
import { cn } from "../lib/utils";
import { api } from "../services/api";

// Mapping string icon names from API to Lucide components
const iconMap = {
    Palette, Activity, Heart, GraduationCap, Megaphone, Utensils, BookOpen, Home
};

export default function Programs() {
    const [programs, setPrograms] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch both Programs and Projects in parallel
                const [programsRes, projectsRes] = await Promise.all([
                    api.getPrograms(),
                    api.getProjects()
                ]);

                if (programsRes.success) {
                    setPrograms(programsRes.data);
                } else {
                    setError("Failed to load programs.");
                }

                if (projectsRes.success) {
                    setProjects(projectsRes.data);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("An unexpected error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Helper to get 2 recent projects for a specific program
    const getRecentProjects = (programId) => {
        if (!projects || projects.length === 0) return [];
        
        return projects
            // Loose comparison (==) handles if one is string and other is number
            // Also checks if program_id exists to prevent crashes
            .filter(p => p.program_id && String(p.program_id) === String(programId)) 
            .sort((a, b) => new Date(b.created_at || Date.now()) - new Date(a.created_at || Date.now())) // Sort by newest
            .slice(0, 2); // Take top 2
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-background dark:bg-[#0A0A0A]">
                <Loader2 className="w-12 h-12 text-brand-gold animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-brand-background dark:bg-[#0A0A0A] text-center p-4">
                <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                <h2 className="text-2xl font-bold dark:text-white mb-2">Oops! Something went wrong.</h2>
                <p className="text-gray-500 mb-6">{error}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="btn-primary"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="dark:bg-[#0A0A0A] transition-colors duration-500 min-h-screen">
            <PageHeader
                title={<>Our <span className="text-brand-gold">Programs</span></>}
                subtitle="Comprehensive initiatives targeting Art, Health, Service, Education, and Awareness to foster holistic community growth."
            />

            <Section className="bg-white dark:bg-[#0A0A0A]">
                <div className="space-y-20 md:space-y-32">
                    {programs.map((program, idx) => {
                        const isEven = idx % 2 === 1;
                        const IconComponent = iconMap[program.icon] || Heart; // Default to Heart if icon not found
                        const recentProjects = getRecentProjects(program.id);

                        return (
                            <div
                                key={program.id}
                                className={cn(
                                    "flex flex-col lg:flex-row items-center gap-16 lg:gap-24",
                                    isEven ? "lg:flex-row-reverse" : ""
                                )}
                            >
                                {/* Image Side */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full lg:w-1/2"
                                >
                                    <div className="relative aspect-[4/3] rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl group border-8 border-brand-background dark:border-zinc-800 transition-colors w-full">
                                        <img
                                            src={program.cover_image || "/placeholder.jpg"}
                                            alt={program.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => e.target.src = "/placeholder.jpg"}
                                        />
                                        <div className="absolute inset-0 bg-brand-gold/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </motion.div>

                                {/* Content Side */}
                                <div className="w-full lg:w-1/2 space-y-8">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 bg-brand-gold/10 dark:bg-brand-gold/5 rounded-[2rem] flex items-center justify-center shrink-0">
                                            <IconComponent className="w-10 h-10 text-brand-gold" />
                                        </div>
                                        <div>
                                            <span className="text-brand-gold font-black uppercase tracking-widest text-xs">Signature Program</span>
                                            <h2 className="text-3xl md:text-4xl font-black dark:text-white mt-2">{program.title}</h2>
                                        </div>
                                    </div>

                                    <p className="text-brand-text-muted dark:text-gray-400 text-xl leading-relaxed">
                                        {program.description}
                                    </p>

                                    {/* Recent Projects Section (Conditional Render) */}
                                    {recentProjects.length > 0 && (
                                        <div className="bg-brand-background dark:bg-zinc-900/50 p-6 rounded-3xl border border-brand-border dark:border-white/5">
                                            <h4 className="font-bold text-sm uppercase tracking-wider text-brand-text-muted dark:text-gray-500 mb-4 flex items-center gap-2">
                                                <Activity className="w-4 h-4" /> Recent Projects 
                                            </h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {recentProjects.map(project => (
                                                    <div key={project.id} className="bg-white dark:bg-white/5 p-4 rounded-2xl flex items-center gap-3 shadow-sm">
                                                        <div className="w-2 h-2 rounded-full bg-brand-gold shrink-0" />
                                                        <div className="min-w-0">
                                                            <span className="text-sm font-bold text-gray-900 dark:text-white block truncate">
                                                                {project.title}
                                                            </span>
                                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                {project.location || "On-site"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Button (Volunteer Only) */}
                                    <div className="pt-2">
                                        <Link to="/contact" className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 group">
                                            <HandHelping className="w-5 h-5" />
                                            <span>Volunteer for {program.title}</span>
                                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Section>
        </div>
    );
}