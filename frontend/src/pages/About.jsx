import React from "react";
import { Heart, Target, Eye, Quote, Star, Palette, Brain, Smile, Droplets, Briefcase, Leaf, MessageCircle, FlaskConical, Activity, Globe, Users, Clock, Layers } from "lucide-react";
import Section from "../components/Section";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";

const academyModules = [
    { title: "Creative Arts", topic: "Painting, dance, music", approach: "Practical sessions, exhibitions", icon: Palette },
    { title: "Personality Dev", topic: "Logical reasoning, puzzles", approach: "Games, storytelling", icon: Brain },
    { title: "Expression", topic: "Mindfulness, conflict resolution", approach: "Group discussions, role-playing", icon: Smile },
    { title: "Hygiene & Habits", topic: "Personal hygiene, sanitation", approach: "Hands-on activities, demos", icon: Droplets },
    { title: "Career Planning", topic: "Exposure to options, guest talks", approach: "Industry visits, workshops", icon: Briefcase },
    { title: "Environment", topic: "Climate change, recycling", approach: "Eco-projects, planting drives", icon: Leaf },
    { title: "Communication", topic: "Phonics, public speaking", approach: "Debates, speech contests", icon: MessageCircle },
    { title: "STEM", topic: "Basic engineering & experiments", approach: "DIY projects, interactive workshops", icon: FlaskConical },
    { title: "Physical Ed", topic: "Yoga, nutrition, teamwork", approach: "Fitness activities, sports", icon: Activity },
    { title: "Global Learning", topic: "Cultures, geography", approach: "Virtual tours, storytelling", icon: Globe },
];

const mentorshipTracks = [
    "Life Skills & Values",
    "Career & Academic Guidance",
    "Creative Expression & Confidence",
    "Social Impact & Leadership"
];

export default function About() {
    return (
        <div className="dark:bg-[#0A0A0A] transition-colors duration-500">
            {/* Header */}
            <PageHeader
                title={<>Empowering Lives, <br /><span className="text-brand-gold">One Smile</span> at a Time</>}
                subtitle="Tap To Smile is more than just an NGO; it's a movement of collective kindness and selfless action."
            />

            {/* Mission & Vision */}
            <Section className="bg-white dark:bg-[#0A0A0A]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-brand-gold/10 rounded-2xl flex items-center justify-center">
                                    <Target className="text-brand-gold" />
                                </div>
                                <h2 className="text-3xl font-black dark:text-white">Our Mission</h2>
                            </div>
                            <p className="text-brand-text-muted dark:text-gray-400 text-lg leading-relaxed border-l-4 border-brand-gold pl-6 py-2">
                                To empower vulnerable communities through sustainable access to nutrition, education, and safe housing, fostering an environment where every individual can thrive.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-brand-gold/10 rounded-2xl flex items-center justify-center">
                                    <Eye className="text-brand-gold" />
                                </div>
                                <h2 className="text-3xl font-black dark:text-white">Our Vision</h2>
                            </div>
                            <p className="text-brand-text-muted dark:text-gray-400 text-lg leading-relaxed border-l-4 border-brand-gold pl-6 py-2">
                                A world where poverty and inequality no longer limit human potential, and where every act of kindness transforms lives for the better.
                            </p>
                        </motion.div>
                    </div>

                    <div className="relative">
                        <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative group">
                            <img
                                src="/assets/0f250353-8dff-4433-8402-a5507098fe96.JPG"
                                alt="Impact"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-brand-gold/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        {/* Cutout style statistic */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 glass dark:bg-zinc-900 shadow-2xl p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border-brand-gold/30 text-center min-w-[140px] md:min-w-[200px]"
                        >
                            <p className="text-brand-gold font-black text-4xl md:text-6xl mb-2">200K+</p>
                            <p className="text-brand-text-muted dark:text-gray-400 text-[10px] md:text-xs font-black uppercase tracking-widest">Lives Impacted</p>
                        </motion.div>
                    </div>
                </div>
            </Section>

            {/* Our Story */}
            <Section className="bg-brand-background dark:bg-zinc-900/50">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <Quote className="w-16 h-16 text-brand-gold/20 mx-auto mb-8 animate-bounce" />
                    <h2 className="text-4xl md:text-6xl font-black mb-10 dark:text-white">The Spark of <span className="text-brand-gold">Change</span></h2>
                    <div className="text-left space-y-8 text-brand-text-muted dark:text-gray-400 text-lg leading-relaxed">
                        <p className="first-letter:text-5xl first-letter:font-black first-letter:text-brand-gold first-letter:mr-3 first-letter:float-left">
                            <span className="text-brand-gold font-bold italic">TAP TO SMILE</span> is a beacon of hope for underprivileged youth, touching numerous lives through art, education, and wellness initiatives. By integrating creative discipline with mental and physical well-being, we have become a catalyst for transformative change, equipping individuals with the resilience to navigate life's challenges.
                        </p>
                        <p>
                            With unwavering dedication, we foster not just personal growth but a deep sense of community, empowering every individual to realize their full potential and radiate joy.
                        </p>
                        <blockquote className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border-l-8 border-brand-gold font-medium italic text-brand-black dark:text-white shadow-lg">
                            "Spread a little joy, love, fun and hope by helping others learn how to tap and smile"
                        </blockquote>
                    </div>
                </div>
            </Section>

            {/* Meet Our Founder */}
            <Section className="bg-white dark:bg-[#0A0A0A]">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative order-2 lg:order-1">
                            <div className="aspect-[4/5] rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl relative group w-full">
                                <img
                                    src="/assets/founder.jpg"
                                    alt="Abhimanyu Upadhyay"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                                    <h3 className="text-2xl font-bold">Abhimanyu Upadhyay</h3>
                                    <p className="text-brand-gold font-medium">Founder & President</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-8 order-1 lg:order-2">
                            <motion.span
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="text-brand-gold font-black uppercase tracking-[0.3em] text-xs mb-4 block"
                            >
                                Visionary Leadership
                            </motion.span>
                            <h2 className="text-3xl md:text-5xl font-black mb-6 dark:text-white">Our <span className="text-brand-gold">Founder</span></h2>

                            <div className="space-y-6 text-lg text-brand-text-muted dark:text-gray-400 leading-relaxed">
                                <p>
                                    <span className="text-brand-gold font-bold italic">"I was 21 when I first visited an orphanage in Pune."</span> What caught my attention and melted my heart was their enthusiasm to perform with zeal in front of me. This sparked a desire to give such children a platform and equal opportunity to showcase their talent. This is when <strong className="text-brand-black dark:text-white">TAP TO SMILE</strong> was formed.
                                </p>
                                <p>
                                    It is rightly said that today's generation is often overindulged in their own lives, missing the true happiness one can feel by contributing selflessly to others. Abhimanyu aims to improve the lives of less fortunate people by using the power of art, knowledge, and humanity.
                                </p>
                                <p>
                                    As a Product Owner in an IT firm, he uses his leadership skills to motivate youth to volunteer for social causes. He has influenced more than <strong>200K+ lives</strong> and oversees teams working across various locations.
                                </p>
                            </div>

                            <blockquote className="border-l-4 border-brand-gold pl-6 py-2 italic text-xl text-brand-black dark:text-gray-300">
                                "I want to use the power of Art, Knowledge and humanity to bring a change in the lives of less fortunate people"
                            </blockquote>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Tap To Smile Academy */}
            <Section className="bg-white dark:bg-[#0A0A0A]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-brand-gold font-black uppercase tracking-[0.3em] text-xs mb-4 block"
                        >
                            Education & Holiness
                        </motion.span>
                        <h2 className="text-3xl md:text-6xl font-black mb-6 dark:text-white">Tap To Smile <span className="text-brand-gold">Academy</span></h2>
                        <h3 className="text-lg md:text-2xl font-serif italic text-gray-500 mb-8">"Bridging the gap with every tap"</h3>
                        <p className="text-brand-text-muted dark:text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
                            A transformative learning program offering less fortunate children the access to high-quality education, creative potential, and personal skills. We believe every child—regardless of background—has the right to education, expression, and the confidence to build their future.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-8 mb-16">
                        {academyModules.map((mod, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="w-16 h-16 bg-brand-gold/5 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-brand-gold group-hover:text-white transition-all group-hover:rotate-6 shadow-sm">
                                    <mod.icon size={28} />
                                </div>
                                <h4 className="font-black text-sm mb-2 dark:text-white uppercase tracking-wider">{mod.title}</h4>
                                <p className="text-[10px] text-gray-500 dark:text-gray-500 font-bold uppercase tracking-[0.2em] mb-3">{mod.topic}</p>
                                <span className="text-[9px] font-black text-brand-gold bg-brand-gold/5 px-2 py-1 rounded-md uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                    {mod.approach}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Mentorship Program */}
            <Section className="bg-brand-background dark:bg-zinc-900/50">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-brand-gold font-black uppercase tracking-[0.3em] text-xs mb-4 block"
                        >
                            Guidance & Growth
                        </motion.span>
                        <h2 className="text-3xl md:text-5xl font-black mb-8 dark:text-white leading-tight">
                            Tap To Smile <br /><span className="text-brand-gold">Mentorship Program</span>
                        </h2>
                        <p className="text-brand-text-muted dark:text-gray-400 text-lg mb-8 leading-relaxed">
                            Empowering youth from underserved communities to dream bigger. We pair young learners with caring adult mentors who provide guidance, exposure, and encouragement—helping every child move from potential to possibility.
                        </p>

                        <div className="space-y-6 mb-8">
                            <h4 className="font-bold text-xl dark:text-white flex items-center gap-2">
                                <Star className="text-brand-gold fill-current" size={20} />
                                Why It Matters
                            </h4>
                            <ul className="space-y-4">
                                {[
                                    "Personal guidance in academics, career, and life decisions",
                                    "Inspiration through real-world exposure to professions",
                                    "Confidence building via consistent encouragement and safe dialogue"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 text-gray-600 dark:text-gray-400">
                                        <div className="w-1.5 h-1.5 bg-brand-gold rounded-full mt-2.5 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 px-4 py-2 rounded-full border border-brand-gold/20">
                                <Clock size={16} className="text-brand-gold" />
                                <span className="text-sm font-medium dark:text-gray-300">3-12 Months</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 px-4 py-2 rounded-full border border-brand-gold/20">
                                <Users size={16} className="text-brand-gold" />
                                <span className="text-sm font-medium dark:text-gray-300">1:1 or Small Groups</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 px-4 py-2 rounded-full border border-brand-gold/20">
                                <Layers size={16} className="text-brand-gold" />
                                <span className="text-sm font-medium dark:text-gray-300">4 Key Tracks</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] shadow-2xl border border-brand-gold/10">
                            <h3 className="text-2xl font-black mb-6 dark:text-white">Program Structure</h3>
                            <div className="space-y-3">
                                {mentorshipTracks.map((track, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center p-4 bg-brand-background dark:bg-zinc-800 rounded-2xl hover:bg-brand-gold/5 transition-colors"
                                    >
                                        <span className="w-8 h-8 flex items-center justify-center bg-brand-gold text-white font-bold rounded-full mr-4 text-sm">
                                            {i + 1}
                                        </span>
                                        <span className="font-semibold text-gray-800 dark:text-gray-200">{track}</span>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="mt-8 pt-6 border-t border-brand-gold/10 text-center">
                                <p className="text-sm text-gray-500 italic mb-2">Each cycle culminates in a celebration of achievements:</p>
                                <span className="inline-block px-6 py-2 bg-brand-gold/10 text-brand-gold font-black uppercase tracking-widest rounded-full text-sm">
                                    Smile Showcase
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>


            {/* Meet Our Team */}
            <Section className="bg-brand-background dark:bg-zinc-900/50">
                <div className="text-center mb-20">
                    <span className="text-brand-gold font-black uppercase tracking-[0.3em] text-xs mb-4 block">Leadership</span>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 dark:text-white">Meet the <span className="text-brand-gold">Hearts</span> Behind</h2>
                    <p className="text-brand-text-muted dark:text-gray-400 max-w-2xl mx-auto text-lg">
                        A dedicated team of professionals and volunteers committed to creating sustainable social impact.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {[
                        { name: "Nashik Team", role: "Growing Impact", img: "/assets/team_nashik.jpg" },
                        { name: "Mumbai Team", role: "Expanding Horizons", img: "/assets/team_mumbai.jpg" },
                        { name: "Pune Team", role: "The Beginning", img: "/assets/team_pune.jpg" },
                        { name: "Chandigarh Team", role: "Pan India", img: "/assets/team_chandigarh.jpg" }
                    ].map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="relative aspect-[4/3] rounded-3xl md:rounded-[2.5rem] overflow-hidden mb-6 shadow-xl group-hover:shadow-brand-gold/10 transition-all duration-500 w-full">
                                <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h4 className="text-xl font-black text-white mb-1">{member.name}</h4>
                                    <p className="text-brand-gold text-xs font-black uppercase tracking-widest">{member.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>
        </div>
    );
}
