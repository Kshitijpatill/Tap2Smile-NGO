import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Circle, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

const slides = [
    {
        id: 1,
        title: "Small Acts. Big Impact.",
        heading: "Giving every <span class='text-brand-gold'>smile</span> a reason to shine.",
        description: "TapToSmile is dedicated to creating lasting change by addressing hunger, education, and shelter for those who need it most.",
        image: "/assets/28827765_1957611921223329_6928397958251774922_o.jpeg",
        cta: "Donate Now",
        link: "/donate"
    },
    {
        id: 2,
        title: "Our Story",
        heading: "Founded on <span class='text-brand-gold'>Selfless</span> Contribution.",
        description: "Founded by a 21-year-old inspired by orphans in Pune, we give every child an equal opportunity to showcase their zeal.",
        image: "/assets/4334f5ac-5172-4e60-879e-2998041a7ed0.jpg",
        cta: "Read Our Story",
        link: "/about"
    },
    {
        id: 3,
        title: "Tap To Smile Academy",
        heading: "Nurturing <span class='text-brand-gold'>Young Minds</span> holistically.",
        description: "Combining academic knowledge, artistic expression, and personal development to empower children from underserved communities.",
        image: "/assets/50ea6add-857a-41e9-bfe4-e386c89c1174.jpg",
        cta: "Explore Programs",
        link: "/programs"
    }
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className="relative min-h-[600px] h-[85vh] md:h-[90vh] flex items-center overflow-hidden bg-brand-background dark:bg-[#0A0A0A]">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-gold rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-gold rounded-full blur-[120px]" />
            </div>

            <div className="container-custom relative z-10 w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Text Content */}
                        <div className="order-1 lg:order-1 flex flex-col items-start gap-8">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold font-bold text-xs uppercase tracking-widest mb-6">
                                    <Circle className="w-2 h-2 fill-brand-gold animate-pulse" />
                                    {slides[current].title}
                                </span>
                                <h1
                                    className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 dark:text-white transition-colors"
                                    dangerouslySetInnerHTML={{ __html: slides[current].heading }}
                                />
                                <p className="text-base md:text-xl text-brand-text-muted dark:text-gray-400 mb-10 max-w-xl leading-relaxed">
                                    {slides[current].description}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-5">
                                    <Link to={slides[current].link} className="btn-primary px-10 py-4 text-lg">
                                        {slides[current].cta}
                                    </Link>
                                    <Link to="/contact" className="btn-outline px-10 py-4 text-lg group">
                                        Get Involved
                                        <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        {/* Image Cutout Design */}
                        <div className="order-2 lg:order-2 relative flex justify-center py-10">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ duration: 0.8, type: "spring", damping: 20 }}
                                className="relative z-10 w-full max-w-[500px]"
                            >
                                {/* Main Image with Cutout Mask or Shield Shape */}
                                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border-[8px] md:border-[12px] border-white dark:border-zinc-800 transition-colors">
                                    <img
                                        src={slides[current].image}
                                        alt={slides[current].title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>

                                {/* Floating Decorative Card */}
                                <motion.div
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 0.6 }}
                                    className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-12 glass p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-xl max-w-[150px] md:max-w-[220px] z-30"
                                >
                                    <div className="flex flex-col gap-1 md:gap-2">
                                        <span className="text-brand-gold font-black text-2xl md:text-4xl">80G</span>
                                        <p className="text-[10px] md:text-sm font-bold text-brand-black dark:text-white uppercase tracking-wider">
                                            Tax Benefits for all donations
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Background Shape Accent */}
                                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-brand-gold/20 rounded-full border-dashed animate-[spin_20s_linear_infinite]" />
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
                <button
                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                    className="p-4 rounded-full border border-brand-border dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md hover:bg-brand-gold hover:text-white transition-all text-brand-text dark:text-gray-400 active:scale-95 z-50 pointer-events-auto"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex gap-3">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={cn(
                                "h-2 transition-all duration-300 rounded-full",
                                current === idx ? "w-10 bg-brand-gold" : "w-2 bg-brand-border dark:bg-white/20"
                            )}
                        />
                    ))}
                </div>

                <button
                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                    className="p-4 rounded-full border border-brand-border dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md hover:bg-brand-gold hover:text-white transition-all text-brand-text dark:text-gray-400 active:scale-95 z-50 pointer-events-auto"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-6 right-12 z-20 hidden lg:flex flex-col items-center gap-4"
            >
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-text-muted dark:text-gray-500 [writing-mode:vertical-lr]">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gold to-transparent" />
            </motion.div>
        </section>
    );
}
