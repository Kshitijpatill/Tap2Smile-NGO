import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Handshake, Building2, Users, Heart, Lightbulb, Gift } from "lucide-react";
import Section from "../components/Section";
import PageHeader from "../components/PageHeader";

const csrOptions = [
    {
        title: "Fund our initiatives",
        desc: "Sponsor ongoing projects, special events, or annual programs.",
        icon: Building2
    },
    {
        title: "Employee engagement",
        desc: "Plan creative volunteering sessions with children (online or offline). Celebrate festivals or run skill-sharing workshops.",
        icon: Users
    },
    {
        title: "Direct child interaction",
        desc: "Host children at your corporate campus for exposure visits. Visit our centers to mentor or conduct fun learning sessions.",
        icon: Heart
    },
    {
        title: "Support basic essentials",
        desc: "Contribute food, clothes, stationery, hygiene kits, or other daily necessities.",
        icon: Gift
    },
    {
        title: "Custom partnerships",
        desc: "Co-create campaigns or awareness drives that align with your CSR goals.",
        icon: Lightbulb
    }
];

export default function CSR() {
    return (
        <div className="dark:bg-[#0A0A0A] transition-colors duration-500 min-h-screen">
            {/* Header */}
            <PageHeader
                title={<>CSR / <span className="text-brand-gold">Partnerships</span></>}
                subtitle="Join hands with Tap To Smile to create a lasting impact. Together, we can build a better future for those in need."
            />

            <Section className="bg-white dark:bg-[#0A0A0A]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
                    <div className="order-2 lg:order-1">
                        <div className="space-y-12">
                            {csrOptions.map((opt, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex gap-6 group"
                                >
                                    <div className="flex-shrink-0 w-14 h-14 bg-brand-gold/10 dark:bg-brand-gold/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <opt.icon className="w-7 h-7 text-brand-gold" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-2 dark:text-white">{opt.title}</h3>
                                        <p className="text-brand-text-muted dark:text-gray-400 text-lg leading-relaxed">
                                            {opt.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="order-1 lg:order-2">
                        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl group border-8 border-brand-background dark:border-zinc-800 aspect-[4/5]">
                            <img
                                src="/assets/csr.jpg"
                                alt="CSR Partnership"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-brand-gold/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                </div>

                <div className="bg-brand-black dark:bg-zinc-900 rounded-3xl md:rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-brand-gold/5 opacity-50" />
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-2xl md:text-5xl font-black text-white mb-8">Ready to Partner with Us?</h2>
                        <p className="text-base md:text-xl text-gray-400 mb-12">
                            Let's discuss how we can align our goals to create meaningful change.
                        </p>
                        <Link to="/contact" className="btn-primary px-10 md:px-12 py-4 text-lg inline-flex items-center gap-3">
                            Contact Us <Handshake className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </Section>
        </div>
    );
}
