import { Palette, Activity, Heart, GraduationCap, Megaphone, ArrowRight, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Section from "../components/Section";
import PageHeader from "../components/PageHeader";
import { cn } from "../lib/utils";

const programsData = [
    {
        id: "kala",
        title: "Program Kāla (Art)",
        description: "Conducting Art classes for the underprivileged crowd especially children who have talent but no resources. Helping them with the opportunities, resources and exposure which helps them to grow as an Artist.",
        icon: Palette,
        image: "/assets/artisticexpression.jpg",
        color: "brand-gold"
    },
    {
        id: "atman",
        title: "Program Ātman (Health)",
        description: "Attempt to improve the physical health via Yoga, Meditation and other physical activities. A platform for mental health discussions that includes various mental health sessions.",
        icon: Heart,
        image: "/assets/atman.jpg",
        color: "red-500"
    },
    {
        id: "seva",
        title: "Program Seva (Service)",
        description: "Conducting Food/Clothes/Blood donation drives throughout the year. Providing food kits, Grocery Kits and other basic essentials to the needy.",
        icon: Utensils,
        image: "/assets/seva.jpg",
        color: "green-500"
    },
    {
        id: "vidya",
        title: "Program Vidya (Education)",
        description: "Supporting Children with School Admission Fees, School Kits, personal development, career guidance and other educational classes.",
        icon: GraduationCap,
        image: "/assets/certificate_impact.jpg", // Placeholder
        color: "blue-500"
    },
    {
        id: "awareness",
        title: "Program Awareness",
        description: "As the first step towards change is Awareness, we organize various awareness programs (Flash mobs, Road Shows, Marathons, Art Show, Campaigns) and also create an impact by helping, uplifting, motivating or even just supporting someone.",
        icon: Megaphone,
        image: "/assets/puneteam.jpg",
        color: "purple-500"
    }
];

export default function Programs() {
    return (
        <div className="dark:bg-[#0A0A0A] transition-colors duration-500 min-h-screen">
            <PageHeader
                title={<>Our <span className="text-brand-gold">Programs</span></>}
                subtitle="Comprehensive initiatives targeting Art, Health, Service, Education, and Awareness to foster holistic community growth."
            />

            <Section className="bg-white dark:bg-[#0A0A0A]">
                <div className="space-y-20 md:space-y-32">
                    {programsData.map((program, idx) => {
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
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full lg:w-1/2"
                                >
                                    <div className="relative aspect-[4/3] rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl group border-8 border-brand-background dark:border-zinc-800 transition-colors w-full">
                                        <img
                                            src={program.image}
                                            alt={program.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-brand-gold/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </motion.div>

                                <div className="w-full lg:w-1/2 space-y-10">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-20 bg-brand-gold/10 dark:bg-brand-gold/5 rounded-[2rem] flex items-center justify-center shrink-0">
                                            <program.icon className="w-10 h-10 text-brand-gold" />
                                        </div>
                                        <div>
                                            <span className="text-brand-gold font-black uppercase tracking-widest text-xs">Signature Program</span>
                                            <h2 className="text-3xl md:text-4xl font-black dark:text-white mt-2">{program.title}</h2>
                                        </div>
                                    </div>

                                    <p className="text-brand-text-muted dark:text-gray-400 text-xl leading-relaxed">
                                        {program.description}
                                    </p>

                                    <div className="bg-brand-background dark:bg-zinc-900/50 p-8 rounded-[2rem] border border-brand-border dark:border-white/5 shadow-lg relative overflow-hidden">
                                        <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                                            <Link to="/donate" className="btn-primary flex-1 shadow-brand-gold/20 text-center">Support {program.title.split(" ")[1]}</Link>
                                            <Link to="/contact" className="btn-outline flex-1 text-center bg-white dark:bg-transparent">Volunteer</Link>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <h4 className="font-bold dark:text-white flex items-center gap-2">
                                            <ArrowRight className="text-brand-gold w-5 h-5" /> Recent Projects under {program.title.split(" ")[1]}
                                        </h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Placeholders for project mini-cards - intended for future expansion */}
                                            <div className="bg-gray-100 dark:bg-white/5 p-4 rounded-2xl text-center">
                                                <span className="text-xs font-bold text-gray-500 block mb-1">Project 1</span>
                                                <div className="h-2 w-12 bg-gray-300 dark:bg-white/10 rounded-full mx-auto" />
                                            </div>
                                            <div className="bg-gray-100 dark:bg-white/5 p-4 rounded-2xl text-center">
                                                <span className="text-xs font-bold text-gray-500 block mb-1">Project 2</span>
                                                <div className="h-2 w-12 bg-gray-300 dark:bg-white/10 rounded-full mx-auto" />
                                            </div>
                                        </div>
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
