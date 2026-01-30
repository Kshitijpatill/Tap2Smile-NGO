import React from "react";
import { Heart, Target, Eye, Quote, Star, Award } from "lucide-react";
import Section from "../components/Section";
import { motion } from "framer-motion";

const values = [
    {
        title: "Compassion",
        desc: "We lead with empathy, understanding the struggles of those we serve and acting with a kind heart.",
        icon: Heart
    },
    {
        title: "Impact",
        desc: "Every action we take is measured by the real-world difference it makes in someone's life.",
        icon: Target
    },
    {
        title: "Transparency",
        desc: "We believe in complete honesty with our donors, volunteers, and the communities we serve.",
        icon: Eye
    }
];

export default function About() {
    return (
        <div className="dark:bg-[#0A0A0A] transition-colors duration-500">
            {/* Header */}
            <section className="relative h-[35vh] md:h-[40vh] border-b border-white/5 text-white overflow-hidden flex items-center"> 
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
                <div className="container-custom text-center relative z-10">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-brand-gold font-black uppercase tracking-[0.3em] text-xs mb-4 block"
                    >
                        Since 2018
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-black mb-8 leading-tight text-white"
                    >
                        Our Story & <span className="text-brand-gold">Mission</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Founded on the belief that everyone deserves a chance to smile, TapToSmile has been working to uplift underserved communities.
                    </motion.p>
                </div>
            </section>

            {/* Mission & Vision */}
            <Section className="bg-white dark:bg-[#0A0A0A]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
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
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
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
                            className="absolute -bottom-10 -right-10 glass dark:bg-zinc-900 shadow-2xl p-10 rounded-[2.5rem] border-brand-gold/30 text-center min-w-[200px]"
                        >
                            <p className="text-brand-gold font-black text-6xl mb-2">200K+</p>
                            <p className="text-brand-text-muted dark:text-gray-400 text-xs font-black uppercase tracking-widest">Lives Impacted</p>
                        </motion.div>
                    </div>
                </div>
            </Section>

            {/* Our Story - Refined with PPTX Content */}
            <Section className="bg-brand-background dark:bg-zinc-900/50">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <Quote className="w-16 h-16 text-brand-gold/20 mx-auto mb-8 animate-bounce" />
                    <h2 className="text-4xl md:text-6xl font-black mb-10 dark:text-white">The Spark of <span className="text-brand-gold">Change</span></h2>
                    <div className="text-left space-y-8 text-brand-text-muted dark:text-gray-400 text-lg leading-relaxed">
                        <p className="first-letter:text-5xl first-letter:font-black first-letter:text-brand-gold first-letter:mr-3 first-letter:float-left">
                            It is rightly said that today’s generation is often so overindulged in their own lives that we just don’t recognize the true happiness one can feel by contributing selflessly to others. At just 21 years old, our mission began following a life-changing visit to an orphanage in Pune.
                        </p>
                        <p>
                            What caught our founder's attention and melted their heart was the sheer enthusiasm and zeal with which those children performed. This sparked a deep desire to give such children a platform and equal opportunity to showcase and enhance their talent. This is when <span className="text-brand-gold font-bold italic">TAP TO SMILE</span> was formed.
                        </p>
                        <blockquote className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border-l-8 border-brand-gold font-medium italic text-brand-black dark:text-white shadow-lg">
                            "We realized that food solves hunger today, but education and talent development solve poverty forever."
                        </blockquote>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="rounded-[3rem] overflow-hidden shadow-2xl relative group aspect-[3/4] md:aspect-auto md:h-full">
                        <img src="/assets/15377658-780a-4ad8-aeb7-1984cb3f0552.jpg" alt="Story" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </div>
                    <div className="grid grid-cols-1 gap-8">
                        <div className="rounded-[3rem] overflow-hidden shadow-2xl aspect-video relative group">
                            <img src="/assets/edb03289-9105-41be-86e6-83b0419a206b.jpg" alt="Impact" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        </div>
                        <div className="bg-brand-gold rounded-[3rem] p-10 flex flex-col justify-center text-white relative overflow-hidden min-h-[300px] group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                            <Award className="w-20 h-20 absolute top-[-10px] right-[-10px] opacity-20 rotate-12" />
                            <h3 className="text-3xl font-black mb-4 relative z-10">Certified Impact</h3>
                            <p className="font-medium opacity-90 leading-relaxed relative z-10">We provide certificates, awards, and social media shoutouts to people who are passionate about making a difference.</p>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Values */}
            <Section className="bg-white dark:bg-[#0A0A0A]">
                <div className="text-center mb-20">
                    <span className="text-brand-gold font-black uppercase tracking-[0.3em] text-xs mb-4 block">Our DNA</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 dark:text-white">Core Values</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                    {values.map((v, i) => (
                        <div key={i} className="text-center group">
                            <div className="w-24 h-24 bg-brand-gold/10 dark:bg-brand-gold/5 rounded-[2rem] flex items-center justify-center mb-8 mx-auto group-hover:rotate-6 transition-all shadow-sm">
                                <v.icon className="w-10 h-10 text-brand-gold" />
                            </div>
                            <h3 className="text-2xl font-black mb-4 dark:text-white">{v.title}</h3>
                            <p className="text-brand-text-muted dark:text-gray-400 leading-relaxed">{v.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Meet Our Team - New Section */}
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
                        { name: "Sagar Shinde", role: "Founder & President", img: "/assets/4334f5ac-5172-4e60-879e-2998041a7ed0.jpg" },
                        { name: "Priya Sharma", role: "Project Director", img: "/assets/0f250353-8dff-4433-8402-a5507098fe96.JPG" },
                        { name: "Rahul Varma", role: "Operations Lead", img: "/assets/3af1fa51-2586-4b2f-80de-f8d549a15094.jpg" },
                        { name: "Anita Desai", role: "Education Head", img: "/assets/50ea6add-857a-41e9-bfe4-e386c89c1174.jpg" }
                    ].map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-6 shadow-xl group-hover:shadow-brand-gold/10 transition-all duration-500">
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
