import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Palette, Activity, Heart, GraduationCap, Megaphone, ArrowRight, Utensils,
    BookOpen, Home, Loader2, AlertCircle, HandHelping, Star, Layers, CheckCircle2,
    Users, Target, ChevronDown, ChevronUp
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

// Detailed program data with projects - images matched to context
const programData = [
    {
        id: "kala",
        title: "Program Kāala",
        description: "Conducting Art classes for the underprivileged crowd especially children who have talent but no resources. Helping them with the opportunities, resources and exposure which helps them to grow as an Artist.",
        icon: Palette,
        image: "/assets/artisticexpression.jpg",
        projects: [
            {
                name: "Art Workshops",
                description: "Regular painting and drawing sessions for children",
                image: "/assets/50ea6add-857a-41e9-bfe4-e386c89c1174.jpg"
            },
            {
                name: "Dance Classes",
                description: "Traditional and contemporary dance training",
                image: "/assets/8fc4454b-3b1d-4a71-a1eb-e2226848e042.jpg"
            },
            {
                name: "Music Training",
                description: "Vocal and instrumental music lessons",
                image: "/assets/639592f1-9166-44c2-918c-f507c4925456.jpg"
            },
            {
                name: "Talent Showcases",
                description: "Annual events to display children's artistic talents",
                image: "/assets/305768958_3254057918245383_9122992633165420375_n.jpeg"
            }
        ]
    },
    {
        id: "atman",
        title: "Program Ātman",
        description: "Attempt to improve the physical health via Yoga, Meditation and other physical activities. A platform for mental health discussions that includes various mental health sessions.",
        icon: Activity,
        image: "/assets/atman.jpg",
        projects: [
            {
                name: "Yoga Sessions",
                description: "Daily yoga and meditation classes for all ages",
                image: "/assets/7dae08d9-696a-4a7b-badd-88611cea6d80.jpg"
            },
            {
                name: "Mental Health Talks",
                description: "Counseling and awareness sessions on mental wellness",
                image: "/assets/76687e11-0b10-4884-86fa-de9b18f3fe73.jpg"
            },
            {
                name: "Sports Day",
                description: "Quarterly sports events promoting physical fitness",
                image: "/assets/86b0333e-99d5-4d90-8b01-e07595cc170d.jpg"
            },
            {
                name: "Fitness Camps",
                description: "Weekend fitness and wellness camps",
                image: "/assets/4c9b73c1-6d96-44aa-9abc-9a52cb4a6aaa.jpg"
            }
        ]
    },
    {
        id: "seva",
        title: "Program Seva",
        description: "Conducting Food/Clothes/Blood donation drives throughout the year. Providing food kits, Grocery Kits and other basic essentials to the needy.",
        icon: Heart,
        image: "/assets/seva.jpg",
        projects: [
            {
                name: "Food Drives",
                description: "Monthly food distribution to underprivileged communities",
                image: "/assets/1fdd4365-acc4-42ce-921e-dc2f57cf3250.jpg"
            },
            {
                name: "Clothes Distribution",
                description: "Seasonal clothing donation campaigns",
                image: "/assets/3b5b0c35-febb-4d99-98e3-c9a8fda8543f.jpg"
            },
            {
                name: "Blood Donation",
                description: "Quarterly blood donation camps",
                image: "/assets/d1d88dba-3854-474a-8957-1becf8065703.jpg"
            },
            {
                name: "Grocery Kits",
                description: "Essential grocery kits for families in need",
                image: "/assets/26d26095-d44e-4318-9e98-deee6125a278.jpg"
            }
        ]
    },
    {
        id: "vidya",
        title: "Program Vidya",
        description: "Supporting Children with School Admission Fees, School Kits, personal development, career guidance and other educational classes.",
        icon: GraduationCap,
        image: "/assets/academicknowledge.jpg",
        projects: [
            {
                name: "Scholarship Programs",
                description: "Financial support for school admissions and fees",
                image: "/assets/15377658-780a-4ad8-aeb7-1984cb3f0552.jpg"
            },
            {
                name: "School Kits Distribution",
                description: "Providing books, stationery, and uniforms",
                image: "/assets/5c8cbd1b-52b0-47ac-abaa-abec8cc4f1fd.jpg"
            },
            {
                name: "Career Counseling",
                description: "Guidance sessions for career planning",
                image: "/assets/0f250353-8dff-4433-8402-a5507098fe96.JPG"
            },
            {
                name: "Tech Labs",
                description: "Computer literacy and digital skills training",
                image: "/assets/4334f5ac-5172-4e60-879e-2998041a7ed0.jpg"
            }
        ]
    },
    {
        id: "awareness",
        title: "Awareness Programs",
        description: "As the first step towards change is Awareness, we organize various awareness programs (Flash mobs, Road Shows, Marathons, Art Shows, Campaigns) and also create an impact by helping, uplifting, motivating or even just supporting someone.",
        icon: Megaphone,
        image: "/assets/a95f1953-d291-4044-bc85-0be1d414581e.jpg",
        projects: [
            {
                name: "Flash Mobs",
                description: "Public awareness through dance and performance",
                image: "/assets/305768958_3254057918245383_9122992633165420375_n.jpeg"
            },
            {
                name: "Road Shows",
                description: "Community outreach and awareness campaigns",
                image: "/assets/70c136a8-1989-4c00-a0bb-095be19602cb.jpg"
            },
            {
                name: "Marathons",
                description: "Charity runs for social causes",
                image: "/assets/8b309b61-ced4-4377-b9af-c3a8383b7914.jpg"
            },
            {
                name: "Art Campaigns",
                description: "Street art and exhibitions for social messages",
                image: "/assets/7285275e-e452-47fd-a3cd-9f1011953c33.jpg"
            }
        ]
    }
];

const iconMap = {
    Palette, Activity, Heart, GraduationCap, Megaphone, Star, Target, Users
};

export default function Programs() {
    const [programs, setPrograms] = useState(programData);
    const [loading, setLoading] = useState(false);
    const [expandedProgram, setExpandedProgram] = useState(null);

    useEffect(() => {
        // Try to fetch from API, fallback to static data
        api.getPrograms().then((res) => {
            if (res && Array.isArray(res) && res.length > 0) {
                const mappedPrograms = res.map(p => ({
                    id: p.id || p._id,
                    title: p.title,
                    description: p.description,
                    icon: iconMap[p.icon] || Heart,
                    image: p.cover_image || "/assets/artisticexpression.jpg",
                    projects: p.projects || []
                }));
                setPrograms(mappedPrograms);
            }
            setLoading(false);
        }).catch(() => {
            // Use static data if API fails
            setLoading(false);
        });
    }, []);

    const toggleProgram = (programId) => {
        setExpandedProgram(expandedProgram === programId ? null : programId);
    };

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
                    <div className="space-y-16 md:space-y-24">
                        {programs.map((program, idx) => {
                            const isExpanded = expandedProgram === program.id;
                            const isEven = idx % 2 === 1;
                            
                            return (
                                <div key={program.id} className="space-y-8 md:space-y-12">
                                    {/* Program Header */}
                                    <div
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
                                                <div className="w-14 h-14 md:w-16 md:h-16 bg-brand-gold/10 dark:bg-brand-gold/5 rounded-2xl flex items-center justify-center shrink-0">
                                                    <program.icon className="w-7 h-7 md:w-8 md:h-8 text-brand-gold" />
                                                </div>
                                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black dark:text-white">{program.title}</h2>
                                            </div>
                                            <p className="text-brand-text-muted dark:text-gray-400 text-base md:text-lg lg:text-xl leading-relaxed">
                                                {program.description}
                                            </p>

                                            <button
                                                onClick={() => toggleProgram(program.id)}
                                                className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4"
                                            >
                                                {isExpanded ? (
                                                    <>
                                                        <ChevronUp className="w-5 h-5" />
                                                        <span>Hide Projects</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <ChevronDown className="w-5 h-5" />
                                                        <span>View Projects ({program.projects.length})</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Projects Grid - Expandable */}
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pt-8 border-t border-brand-border dark:border-white/5"
                                        >
                                            {program.projects.map((project, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="group bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-brand-border dark:border-white/5 hover:border-brand-gold transition-all hover:shadow-xl"
                                                >
                                                    <div className="relative aspect-square overflow-hidden">
                                                        <img
                                                            src={project.image}
                                                            alt={project.name}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                    </div>
                                                    <div className="p-6">
                                                        <h4 className="text-lg font-black mb-2 dark:text-white group-hover:text-brand-gold transition-colors">
                                                            {project.name}
                                                        </h4>
                                                        <p className="text-sm text-brand-text-muted dark:text-gray-400 leading-relaxed">
                                                            {project.description}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </Section>

            {/* Tap To Smile Academy Table */}
            <Section className="bg-brand-background dark:bg-zinc-900/30">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <span className="text-brand-gold font-black uppercase tracking-[0.3em] text-xs mb-4 block">Our Educational Wing</span>
                        <h2 className="text-3xl md:text-4xl lg:text-6xl font-black mb-6 dark:text-white">Tap To Smile <span className="text-brand-gold">Academy</span></h2>
                        <p className="text-brand-text-muted dark:text-gray-400 max-w-2xl mx-auto text-base md:text-lg uppercase font-bold tracking-widest italic">Core Areas & Modules (Basic | Intermediate | Advanced)</p>
                    </div>

                    <div className="overflow-x-auto rounded-[2rem] border border-brand-border dark:border-white/5 shadow-2xl">
                        <table className="w-full text-left border-collapse bg-white dark:bg-zinc-900">
                            <thead>
                                <tr className="bg-brand-gold text-white uppercase text-[10px] md:text-xs font-black tracking-[0.2em]">
                                    <th className="px-4 md:px-8 py-4 md:py-6">Subject</th>
                                    <th className="px-4 md:px-8 py-4 md:py-6">Topics Covered</th>
                                    <th className="px-4 md:px-8 py-4 md:py-6">Approach</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-border dark:divide-white/5">
                                {academyModules.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-brand-gold/5 transition-colors group">
                                        <td className="px-4 md:px-8 py-4 md:py-6 font-black dark:text-white text-xs md:text-sm whitespace-nowrap">{item.area}</td>
                                        <td className="px-4 md:px-8 py-4 md:py-6 text-brand-text-muted dark:text-gray-400 text-xs md:text-sm italic">{item.topics}</td>
                                        <td className="px-4 md:px-8 py-4 md:py-6 text-brand-text-muted dark:text-gray-400 text-xs md:text-sm font-medium">{item.approach}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Section>

            {/* Newsletter or CTA */}
            <Section className="bg-white dark:bg-[#0A0A0A]">
                <div className="bg-brand-black dark:bg-zinc-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full -mr-32 -mt-32 blur-[80px]" />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h3 className="text-2xl md:text-3xl lg:text-5xl font-black mb-6">Want to <span className="text-brand-gold">Participate</span>?</h3>
                        <p className="text-gray-400 text-base md:text-lg mb-8 md:mb-10 leading-relaxed">
                            Every program is a chance to make an impact. Whether you want to volunteer, donate, or partner, we welcome you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/contact?tab=volunteer" className="btn-primary px-8 md:px-10 py-3 md:py-4 text-base md:text-lg">Join as Volunteer</Link>
                            <Link to="/donate" className="btn-outline border-white/20 text-white hover:bg-white hover:text-brand-black px-8 md:px-10 py-3 md:py-4 text-base md:text-lg">Make a Donation</Link>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
