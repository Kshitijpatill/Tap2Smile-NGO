import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, UserPlus, CheckCircle2, Shield } from "lucide-react";
import Section from "../components/Section";
import { api } from "../services/api";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
    const [activeTab, setActiveTab] = useState("contact");
    const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: null });

    const [contactData, setContactData] = useState({ name: "", email: "", subject: "", message: "" });
    const [volunteerData, setVolunteerData] = useState({ full_name: "", email: "", phone: "", city: "", interest_area: "Education" });

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setFormStatus({ loading: true, success: false, error: null });
        const res = await api.submitContact(contactData);
        if (res.success) {
            setFormStatus({ loading: false, success: true, error: null });
            setContactData({ name: "", email: "", subject: "", message: "" });
        } else {
            setFormStatus({ loading: false, success: false, error: res.message });
        }
    };

    const handleVolunteerSubmit = async (e) => {
        e.preventDefault();
        setFormStatus({ loading: true, success: false, error: null });
        const res = await api.submitVolunteer(volunteerData);
        if (res.success) {
            setFormStatus({ loading: false, success: true, error: null });
            setVolunteerData({ full_name: "", email: "", phone: "", city: "", interest_area: "Education" });
        } else {
            setFormStatus({ loading: false, success: false, error: res.message });
        }
    };

    return (
        <div className="dark:bg-[#0A0A0A] transition-colors duration-500 min-h-screen">
            <section className="bg-brand-black dark:bg-zinc-900 border-b border-white/5 text-white py-24 md:py-32 relative overflow-hidden text-center">
                <div className="container-custom relative z-10">
                    <span className="text-brand-gold font-black uppercase tracking-[0.3em] text-xs mb-4 block">Get In Touch</span>
                    <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight text-white">We Love to <span className="text-brand-gold">Connect</span></h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Whether you want to support us, volunteer your time, or just say hello, our team is always ready to hear from you.
                    </p>
                </div>
            </section>

            <Section className="bg-brand-background dark:bg-[#0A0A0A]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
                    {/* Info Side */}
                    <div className="lg:col-span-1 space-y-10">
                        <div className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] border border-brand-border dark:border-white/5 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                            <h3 className="text-3xl font-black mb-12 dark:text-white relative z-10">Reach Us</h3>

                            <div className="space-y-12 relative z-10">
                                {[
                                    { label: "Our Location", value: "Mumbai, Maharashtra, India", icon: MapPin },
                                    { label: "Phone Number", value: "+91 123 456 7890", icon: Phone },
                                    { label: "Email Address", value: "contact@taptosmile.org", icon: Mail }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-6 group/item">
                                        <div className="w-14 h-14 bg-brand-gold/10 dark:bg-brand-gold/5 rounded-[1.25rem] flex items-center justify-center shrink-0 group-hover/item:rotate-6 transition-transform">
                                            <item.icon className="text-brand-gold h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="font-black text-[10px] uppercase tracking-[0.2em] text-brand-text-muted dark:text-gray-500 mb-2">{item.label}</p>
                                            <p className="text-brand-black dark:text-gray-300 font-bold text-lg leading-tight">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-16 pt-16 border-t border-brand-border dark:border-white/5 relative z-10">
                                <h4 className="font-black text-xs uppercase tracking-widest mb-8 dark:text-white">Our Impact Hubs</h4>
                                <div className="flex gap-4">
                                    <span className="px-4 py-2 rounded-xl bg-brand-background dark:bg-black/40 text-[10px] font-black uppercase dark:text-gray-400">Mumbai</span>
                                    <span className="px-4 py-2 rounded-xl bg-brand-background dark:bg-black/40 text-[10px] font-black uppercase dark:text-gray-400">Pune</span>
                                    <span className="px-4 py-2 rounded-xl bg-brand-background dark:bg-black/40 text-[10px] font-black uppercase dark:text-gray-400">Chandigarh</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-zinc-900 rounded-[3.5rem] shadow-2xl border border-brand-border dark:border-white/5 overflow-hidden">
                            <div className="flex border-b border-brand-border dark:border-white/5">
                                <button
                                    onClick={() => { setActiveTab("contact"); setFormStatus({ ...formStatus, success: false }); }}
                                    className={cn(
                                        "flex-1 py-10 font-black text-xs uppercase tracking-[0.3em] flex flex-col items-center justify-center gap-3 transition-all",
                                        activeTab === "contact" ? "bg-white dark:bg-zinc-900 text-brand-gold" : "bg-gray-50 dark:bg-black/20 text-brand-text-muted dark:text-gray-600 hover:text-brand-gold"
                                    )}
                                >
                                    <Send className="w-5 h-5 mb-1" /> Send Message
                                    {activeTab === "contact" && <motion.div layoutId="tab-underline" className="h-1 w-12 bg-brand-gold rounded-full mt-2" />}
                                </button>
                                <button
                                    onClick={() => { setActiveTab("volunteer"); setFormStatus({ ...formStatus, success: false }); }}
                                    className={cn(
                                        "flex-1 py-10 font-black text-xs uppercase tracking-[0.3em] flex flex-col items-center justify-center gap-3 transition-all",
                                        activeTab === "volunteer" ? "bg-white dark:bg-zinc-900 text-brand-gold" : "bg-gray-50 dark:bg-black/20 text-brand-text-muted dark:text-gray-600 hover:text-brand-gold"
                                    )}
                                >
                                    <UserPlus className="w-5 h-5 mb-1" /> Join Team
                                    {activeTab === "volunteer" && <motion.div layoutId="tab-underline" className="h-1 w-12 bg-brand-gold rounded-full mt-2" />}
                                </button>
                            </div>

                            <div className="p-10 md:p-16">
                                <AnimatePresence mode="wait">
                                    {formStatus.success ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-16"
                                        >
                                            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-8">
                                                <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
                                            </div>
                                            <h3 className="text-4xl font-black mb-6 dark:text-white">Submission Successful!</h3>
                                            <p className="text-brand-text-muted dark:text-gray-400 text-xl mb-12 max-w-md mx-auto leading-relaxed">
                                                Thank you for reaching out to TapToSmile. Our response team will connect with you within 24 hours.
                                            </p>
                                            <button
                                                onClick={() => setFormStatus({ ...formStatus, success: false })}
                                                className="btn-primary px-12"
                                            >
                                                Send Another
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key={activeTab}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {activeTab === "contact" ? (
                                                <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-3">
                                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-brand-black dark:text-gray-400 ml-1">Full Name</label>
                                                        <input
                                                            required
                                                            type="text"
                                                            value={contactData.name}
                                                            onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                                                            className="w-full px-8 py-5 rounded-[1.5rem] bg-brand-background dark:bg-black/40 border border-brand-border dark:border-white/5 focus:outline-none focus:border-brand-gold dark:text-white transition-all shadow-inner"
                                                            placeholder="John Smith"
                                                        />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-brand-black dark:text-gray-400 ml-1">Email Address</label>
                                                        <input
                                                            required
                                                            type="email"
                                                            value={contactData.email}
                                                            onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                                                            className="w-full px-8 py-5 rounded-[1.5rem] bg-brand-background dark:bg-black/40 border border-brand-border dark:border-white/5 focus:outline-none focus:border-brand-gold dark:text-white transition-all shadow-inner"
                                                            placeholder="john@example.com"
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2 space-y-3">
                                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-brand-black dark:text-gray-400 ml-1">Subject</label>
                                                        <input
                                                            required
                                                            type="text"
                                                            value={contactData.subject}
                                                            onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                                                            className="w-full px-8 py-5 rounded-[1.5rem] bg-brand-background dark:bg-black/40 border border-brand-border dark:border-white/5 focus:outline-none focus:border-brand-gold dark:text-white transition-all shadow-inner"
                                                            placeholder="How can we collaborate?"
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2 space-y-3">
                                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-brand-black dark:text-gray-400 ml-1">Message</label>
                                                        <textarea
                                                            required
                                                            rows={6}
                                                            value={contactData.message}
                                                            onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                                                            className="w-full px-8 py-5 rounded-[1.5rem] bg-brand-background dark:bg-black/40 border border-brand-border dark:border-white/5 focus:outline-none focus:border-brand-gold dark:text-white transition-all shadow-inner resize-none"
                                                            placeholder="Tell us more..."
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2 pt-4">
                                                        <button
                                                            disabled={formStatus.loading}
                                                            className="btn-primary w-full py-5 text-lg flex items-center justify-center gap-3 shadow-brand-gold/10"
                                                        >
                                                            {formStatus.loading ? "Processing..." : "Submit Inquiry"}
                                                            {!formStatus.loading && <Send className="w-5 h-5" />}
                                                        </button>
                                                    </div>
                                                </form>
                                            ) : (
                                                <form onSubmit={handleVolunteerSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-3">
                                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-brand-black dark:text-gray-400 ml-1">Full Name</label>
                                                        <input
                                                            required
                                                            type="text"
                                                            value={volunteerData.full_name}
                                                            onChange={(e) => setVolunteerData({ ...volunteerData, full_name: e.target.value })}
                                                            className="w-full px-8 py-5 rounded-[1.5rem] bg-brand-background dark:bg-black/40 border border-brand-border dark:border-white/5 focus:outline-none focus:border-brand-gold dark:text-white transition-all shadow-inner"
                                                            placeholder="Emma Wilson"
                                                        />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-brand-black dark:text-gray-400 ml-1">Email Address</label>
                                                        <input
                                                            required
                                                            type="email"
                                                            value={volunteerData.email}
                                                            onChange={(e) => setVolunteerData({ ...volunteerData, email: e.target.value })}
                                                            className="w-full px-8 py-5 rounded-[1.5rem] bg-brand-background dark:bg-black/40 border border-brand-border dark:border-white/5 focus:outline-none focus:border-brand-gold dark:text-white transition-all shadow-inner"
                                                            placeholder="emma@example.com"
                                                        />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-brand-black dark:text-gray-400 ml-1">Phone Number</label>
                                                        <input
                                                            required
                                                            type="tel"
                                                            value={volunteerData.phone}
                                                            onChange={(e) => setVolunteerData({ ...volunteerData, phone: e.target.value })}
                                                            className="w-full px-8 py-5 rounded-[1.5rem] bg-brand-background dark:bg-black/40 border border-brand-border dark:border-white/5 focus:outline-none focus:border-brand-gold dark:text-white transition-all shadow-inner"
                                                            placeholder="+91 XXXXX XXXXX"
                                                        />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-brand-black dark:text-gray-400 ml-1">Your City</label>
                                                        <input
                                                            required
                                                            type="text"
                                                            value={volunteerData.city}
                                                            onChange={(e) => setVolunteerData({ ...volunteerData, city: e.target.value })}
                                                            className="w-full px-8 py-5 rounded-[1.5rem] bg-brand-background dark:bg-black/40 border border-brand-border dark:border-white/5 focus:outline-none focus:border-brand-gold dark:text-white transition-all shadow-inner"
                                                            placeholder="e.g. Mumbai"
                                                        />
                                                    </div>
                                                    <div className="md:col-span-2 space-y-3">
                                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-brand-black dark:text-gray-400 ml-1">Interest Area</label>
                                                        <select
                                                            value={volunteerData.interest_area}
                                                            onChange={(e) => setVolunteerData({ ...volunteerData, interest_area: e.target.value })}
                                                            className="w-full px-8 py-5 rounded-[1.5rem] bg-brand-background dark:bg-black/40 border border-brand-border dark:border-white/5 focus:outline-none focus:border-brand-gold dark:text-white transition-all shadow-inner appearance-none"
                                                        >
                                                            <option>Education & Mentorship</option>
                                                            <option>Food Logistics</option>
                                                            <option>Healthcare Events</option>
                                                            <option>Creative Design / PR</option>
                                                        </select>
                                                    </div>
                                                    <div className="md:col-span-2 pt-4">
                                                        <button
                                                            disabled={formStatus.loading}
                                                            className="btn-primary w-full py-5 text-lg flex items-center justify-center gap-3 shadow-brand-gold/10"
                                                        >
                                                            {formStatus.loading ? "Registering..." : "Join as Volunteer"}
                                                            {!formStatus.loading && <UserPlus className="w-5 h-5" />}
                                                        </button>
                                                        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-muted dark:text-gray-600">
                                                            <Shield className="w-4 h-4 text-brand-gold/50" />
                                                            Secure data processing
                                                        </div>
                                                    </div>
                                                </form>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
