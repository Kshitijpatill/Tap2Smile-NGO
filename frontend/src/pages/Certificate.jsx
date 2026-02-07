import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, Download, Mail, User, Phone, CheckCircle2 } from "lucide-react";
import Section from "../components/Section";
import PageHeader from "../components/PageHeader";
import { api } from "../services/api";

export default function Certificate() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        amount: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Submit donation request
        const res = await api.submitDonation(formData);
        
        if (res.success) {
            setIsSuccess(true);
            setFormData({ name: "", email: "", phone: "", amount: "" });
        }
        
        setIsSubmitting(false);
    };

    return (
        <div className="dark:bg-[#0A0A0A] transition-colors duration-500 min-h-screen">
            <PageHeader
                title={<>Certificate of <span className="text-brand-gold">Appreciation</span></>}
                subtitle="Recognizing your valuable contribution towards Tap To Smile initiatives"
                image="/assets/certificate_impact.jpg"
            />

            <Section className="bg-white dark:bg-[#0A0A0A]">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Certificate Preview */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="order-2 lg:order-1"
                        >
                            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-brand-gold/20">
                                <img
                                    src="/assets/certificate_impact.jpg"
                                    alt="Certificate of Appreciation"
                                    className="w-full h-auto"
                                />
                            </div>
                            <div className="mt-6 text-center">
                                <p className="text-sm text-brand-text-muted dark:text-gray-400 italic">
                                    Sample certificate - Your name and contribution details will be personalized
                                </p>
                            </div>
                        </motion.div>

                        {/* Request Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="order-1 lg:order-2"
                        >
                            {isSuccess ? (
                                <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 text-center border border-brand-border dark:border-white/5">
                                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h3 className="text-3xl font-black mb-4 dark:text-white">Request Received!</h3>
                                    <p className="text-brand-text-muted dark:text-gray-400 text-lg mb-8 leading-relaxed">
                                        Thank you for your contribution! Our team will contact you shortly to process your certificate.
                                    </p>
                                    <button
                                        onClick={() => setIsSuccess(false)}
                                        className="btn-primary px-8 py-3"
                                    >
                                        Request Another
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 border border-brand-border dark:border-white/5">
                                    <div className="mb-8">
                                        <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mb-6">
                                            <Award className="w-8 h-8 text-brand-gold" />
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-black mb-4 dark:text-white">
                                            Request Your Certificate
                                        </h2>
                                        <p className="text-brand-text-muted dark:text-gray-400 leading-relaxed">
                                            Fill out the form below to receive your personalized Certificate of Appreciation for your contribution to Tap To Smile.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-xs font-black uppercase tracking-[0.2em] text-brand-black dark:text-gray-400 ml-1">
                                                Full Name
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full pl-12 pr-6 py-4 rounded-[1.5rem] bg-brand-background dark:bg-black/40 border border-brand-border dark:border-white/5 focus:outline-none focus:border-brand-gold font-bold dark:text-white"
                                                    placeholder="Your full name"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-xs font-black uppercase tracking-[0.2em] text-brand-black dark:text-gray-400 ml-1">
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                                <input
                                                    required
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full pl-12 pr-6 py-4 rounded-[1.5rem] bg-brand-background dark:bg-black/40 border border-brand-border dark:border-white/5 focus:outline-none focus:border-brand-gold font-bold dark:text-white"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-xs font-black uppercase tracking-[0.2em] text-brand-black dark:text-gray-400 ml-1">
                                                Phone Number
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                                <input
                                                    required
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full pl-12 pr-6 py-4 rounded-[1.5rem] bg-brand-background dark:bg-black/40 border border-brand-border dark:border-white/5 focus:outline-none focus:border-brand-gold font-bold dark:text-white"
                                                    placeholder="+91 XXXXX XXXXX"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-xs font-black uppercase tracking-[0.2em] text-brand-black dark:text-gray-400 ml-1">
                                                Contribution Amount (₹)
                                            </label>
                                            <input
                                                required
                                                type="number"
                                                value={formData.amount}
                                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                                className="w-full px-6 py-4 rounded-[1.5rem] bg-brand-background dark:bg-black/40 border border-brand-border dark:border-white/5 focus:outline-none focus:border-brand-gold font-bold dark:text-white"
                                                placeholder="Enter amount"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-3 mt-8"
                                        >
                                            {isSubmitting ? "Submitting..." : "Request Certificate"}
                                            {!isSubmitting && <Award className="w-5 h-5" />}
                                        </button>
                                    </form>

                                    <div className="mt-8 pt-6 border-t border-brand-border dark:border-white/5">
                                        <p className="text-xs text-center text-brand-text-muted dark:text-gray-500 uppercase tracking-widest font-black">
                                            Certificate will be sent to your email within 3-5 business days
                                        </p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </Section>

            {/* Benefits Section */}
            <Section className="bg-brand-background dark:bg-zinc-900/30">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-black mb-12 dark:text-white">
                        Why Get a <span className="text-brand-gold">Certificate</span>?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Recognition",
                                desc: "Official acknowledgment of your contribution",
                                icon: Award
                            },
                            {
                                title: "Transparency",
                                desc: "Documented proof of your social impact",
                                icon: CheckCircle2
                            },
                            {
                                title: "Inspiration",
                                desc: "Motivate others to contribute",
                                icon: Download
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-brand-border dark:border-white/5"
                            >
                                <div className="w-14 h-14 bg-brand-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <item.icon className="w-7 h-7 text-brand-gold" />
                                </div>
                                <h3 className="text-xl font-black mb-3 dark:text-white">{item.title}</h3>
                                <p className="text-brand-text-muted dark:text-gray-400">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>
        </div>
    );
}
