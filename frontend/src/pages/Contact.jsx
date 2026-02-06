import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, UserPlus, CheckCircle2, Shield } from "lucide-react";
import Section from "../components/Section";
import { api } from "../services/api";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";

export default function Contact() {
    const [searchParams] = useSearchParams();
    const defaultTab = searchParams.get("tab") === "volunteer" ? "volunteer" : "contact";
    const [activeTab, setActiveTab] = useState(defaultTab);

    useEffect(() => {
        const tab = searchParams.get("tab");
        if (tab === "volunteer") setActiveTab("volunteer");
        else if (tab === "contact") setActiveTab("contact");
    }, [searchParams]);

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
            <PageHeader
                title={<>We Love to <span className="text-brand-gold">Connect</span></>}
                subtitle="Whether you want to support us, volunteer your time, or just say hello, our team is always ready to hear from you."
            />

            {/* Volunteering Section */}
            <Section className="bg-white dark:bg-[#0A0A0A]">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    <div className="w-full lg:w-1/2 ">
                        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl group aspect-[4/3] border-8 border-brand-background dark:border-zinc-800">
                            <img
                                src="/assets/team_pune.jpg"
                                alt="Tap To Smile Volunteers"
                                className="w-full h-full object-cover md:grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-brand-gold/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 space-y-8">
                        <div>
                            <span className="text-brand-gold font-black uppercase tracking-[0.3em] text-xs mb-4 block">Join Our Mission</span>
                            <h2 className="text-3xl md:text-5xl font-black mb-6 dark:text-white">Volunteering with <br /><span className="text-brand-gold">Tap To Smile</span></h2>
                        </div>
                        <div className="space-y-6 text-lg text-brand-text-muted dark:text-gray-400 leading-relaxed max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                            <p>
                                As we know Volunteers are an essential part of an NGO and they bring a wide range of skills and experiences. In Tap To Smile, we find people who are passionate about volunteering or any social cause and we make it easy for them to get involved and communicate the value of their contribution.
                            </p>
                            <p>
                                We have a team of around <strong>200+ volunteers</strong> and 150+ trainers / students / professionals supporting us throughout the year as part of various initiatives. Our Volunteers help us in many ways, including fundraising, organizing events, providing administrative support, conducting research and helping us achieve our goals more effectively and efficiently.
                            </p>
                            <p>
                                We feel keeping volunteers motivated is crucial. We establish clear goals and objectives and communicate them effectively. Regular communication and updates help our volunteers feel connected to the organization and its mission.
                            </p>
                            <p>
                                We also provide adequate training and support, including workshops and mentorship programs. We recognize and appreciate contributions through awards, certificates, and social media shoutouts.
                            </p>
                            <p>
                                As an NGO, we create a positive and inclusive work environment that values diversity and promotes teamwork. We encourage our volunteers to collaborate to get a sense of belonging and foster a positive work culture.
                            </p>
                        </div>
                    </div>
                </div>
            </Section>

            <Section className="bg-brand-background dark:bg-[#0A0A0A]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
                    {/* Info Side */}
                    <div className="lg:col-span-1 space-y-10">
                        <div className="bg-white dark:bg-zinc-900 p-8 md:p-10 lg:p-12 rounded-[2.5rem] md:rounded-[3rem] border border-brand-border dark:border-white/5 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                            <h3 className="text-2xl md:text-3xl font-black mb-8 md:mb-12 dark:text-white relative z-10">Reach Us</h3>

                            <div className="space-y-8 md:space-y-12 relative z-10">
                                {[
                                    { label: "Our Location", value: "Mumbai, Maharashtra, India", icon: MapPin },
                                    { label: "Phone Number", value: "+91 78766 02339", icon: Phone },
                                    { label: "Email Address", value: "tap2smile@gmail.com", icon: Mail }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4 md:gap-6 group/item">
                                        <div className="w-12 h-12 md:w-14 md:h-14 bg-brand-gold/10 dark:bg-brand-gold/5 rounded-[1.25rem] flex items-center justify-center shrink-0 group-hover/item:rotate-6 transition-transform">
                                            <item.icon className="text-brand-gold h-5 w-5 md:h-6 md:w-6" />
                                        </div>
                                        <div>
                                            <p className="font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-brand-text-muted dark:text-gray-500 mb-1 md:mb-2">{item.label}</p>
                                            <p className="text-brand-black dark:text-gray-300 font-bold text-base md:text-lg leading-tight">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 md:mt-16 pt-10 md:pt-16 border-t border-brand-border dark:border-white/5 relative z-10">
                                <h4 className="font-black text-xs uppercase tracking-widest mb-6 md:mb-8 dark:text-white">Our Impact Hubs</h4>
                                <div className="flex flex-wrap gap-3 md:gap-4">
                                    <span className="px-3 md:px-4 py-2 rounded-xl bg-brand-background dark:bg-black/40 text-[9px] md:text-[10px] font-black uppercase dark:text-gray-400">Mumbai</span>
                                    <span className="px-3 md:px-4 py-2 rounded-xl bg-brand-background dark:bg-black/40 text-[9px] md:text-[10px] font-black uppercase dark:text-gray-400">Pune</span>
                                    <span className="px-3 md:px-4 py-2 rounded-xl bg-brand-background dark:bg-black/40 text-[9px] md:text-[10px] font-black uppercase dark:text-gray-400">Chandigarh</span>
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
                                        "flex-1 py-8 md:py-10 font-black text-[10px] md:text-xs uppercase tracking-[0.3em] flex flex-col items-center justify-center gap-3 transition-all",
                                        activeTab === "contact" ? "bg-white dark:bg-zinc-900 text-brand-gold" : "bg-gray-50 dark:bg-black/20 text-brand-text-muted dark:text-gray-600 hover:text-brand-gold"
                                    )}
                                >
                                    <Send className="w-4 h-4 md:w-5 md:h-5 mb-1" /> Send Message
                                    {activeTab === "contact" && <motion.div layoutId="tab-underline" className="h-1 w-10 md:w-12 bg-brand-gold rounded-full mt-2" />}
                                </button>
                                <button
                                    onClick={() => { setActiveTab("volunteer"); setFormStatus({ ...formStatus, success: false }); }}
                                    className={cn(
                                        "flex-1 py-8 md:py-10 font-black text-[10px] md:text-xs uppercase tracking-[0.3em] flex flex-col items-center justify-center gap-3 transition-all",
                                        activeTab === "volunteer" ? "bg-white dark:bg-zinc-900 text-brand-gold" : "bg-gray-50 dark:bg-black/20 text-brand-text-muted dark:text-gray-600 hover:text-brand-gold"
                                    )}
                                >
                                    <UserPlus className="w-4 h-4 md:w-5 md:h-5 mb-1" /> Join Team
                                    {activeTab === "volunteer" && <motion.div layoutId="tab-underline" className="h-1 w-10 md:w-12 bg-brand-gold rounded-full mt-2" />}
                                </button>
                            </div>

                            <div className="p-8 md:p-16">
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
