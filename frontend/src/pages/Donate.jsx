import React, { useState } from "react";
import { Heart, CheckCircle2, DollarSign, User, Mail, Phone } from "lucide-react";
import Section from "../components/Section";
import { api } from "../services/api";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const donationTiers = [
    { amount: 10, label: "Provide a warm meal", icon: "🍛" },
    { amount: 50, label: "Supply a student's books", icon: "📚" },
    { amount: 100, label: "Sponsor health checkup", icon: "🩺" },
    { amount: 500, label: "Month of shelter support", icon: "🏠" },
];

export default function Donate() {
    // Form State (Removed paymentMode)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });
    
    const [amount, setAmount] = useState("");
    const [selectedTier, setSelectedTier] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleDonate = async (e) => {
        e.preventDefault();
        
        const finalAmount = selectedTier || amount;
        if (!finalAmount || parseFloat(finalAmount) <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        setIsProcessing(true);
        const res = await api.submitDonation({
            ...formData,
            amount: finalAmount
        });

        if (res.success) {
            setTimeout(() => {
                setIsProcessing(false);
                setIsSuccess(true);
            }, 1000);
        } else {
            setIsProcessing(false);
            alert("Submission failed: " + res.message);
        }
    };

    return (
        <div className="dark:bg-[#0A0A0A] transition-colors duration-500 min-h-screen">
            <section className="bg-brand-black dark:bg-zinc-900 border-b border-white/5 text-white py-24 md:py-32 relative overflow-hidden text-center">
                <div className="container-custom relative z-10">
                    <span className="text-brand-gold font-black uppercase tracking-[0.3em] text-xs mb-4 block">Support Our Cause</span>
                    <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight text-white">Make a <span className="text-brand-gold">Pledge</span></h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Join our mission. Fill out the form below to pledge your support, and our team will contact you for the transaction.
                    </p>
                </div>
            </section>

            <Section className="bg-brand-background dark:bg-[#0A0A0A]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    
                    {/* LEFT SIDE: Tiers */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black dark:text-white mb-8">Choose Impact <span className="text-brand-gold">Level</span></h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {donationTiers.map((tier) => (
                                    <button
                                        key={tier.amount}
                                        onClick={() => { setSelectedTier(tier.amount); setAmount(""); }}
                                        className={cn(
                                            "p-8 rounded-[2.5rem] border-2 text-left transition-all relative overflow-hidden group",
                                            selectedTier === tier.amount
                                                ? "bg-brand-gold border-brand-gold shadow-2xl scale-105"
                                                : "bg-white dark:bg-zinc-900 border-brand-border dark:border-white/5 hover:border-brand-gold/50"
                                        )}
                                    >
                                        <span className="text-4xl mb-6 block group-hover:scale-125 transition-transform">{tier.icon}</span>
                                        <p className={cn(
                                            "text-2xl font-black mb-2",
                                            selectedTier === tier.amount ? "text-white" : "dark:text-white"
                                        )}>${tier.amount}</p>
                                        <p className={cn(
                                            "text-xs font-bold uppercase tracking-widest",
                                            selectedTier === tier.amount ? "text-white/80" : "text-brand-text-muted dark:text-gray-500"
                                        )}>{tier.label}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: The Form */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            {isSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white dark:bg-zinc-900 rounded-[3.5rem] shadow-2xl border border-brand-border dark:border-white/5 p-12 text-center"
                                >
                                    <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-8">
                                        <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h3 className="text-3xl font-black mb-6 dark:text-white">Pledge Recorded!</h3>
                                    <p className="text-brand-text-muted dark:text-gray-400 text-lg mb-8 leading-relaxed">
                                        Thank you, <span className="text-brand-gold font-bold">{formData.name}</span>. <br/>
                                        We have received your pledge of ${selectedTier || amount}. Our team will contact you at {formData.phone} shortly.
                                    </p>
                                    <button
                                        onClick={() => { setIsSuccess(false); setFormData({name:"", email:"", phone:""}); }}
                                        className="btn-primary px-12"
                                    >
                                        Make Another Pledge
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    onSubmit={handleDonate}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white dark:bg-zinc-900 rounded-[3.5rem] shadow-2xl border border-brand-border dark:border-white/5 overflow-hidden"
                                >
                                    <div className="p-10 md:p-12 space-y-8">
                                        
                                        {/* Amount Input */}
                                        <div className="space-y-4">
                                            <label className="text-xs font-black uppercase tracking-widest text-brand-text-muted ml-2">Pledge Amount</label>
                                            <div className="relative">
                                                <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-gold h-6 w-6" />
                                                <input
                                                    type="number"
                                                    placeholder="Enter Custom Amount"
                                                    value={amount}
                                                    onChange={(e) => { setAmount(e.target.value); setSelectedTier(null); }}
                                                    className="w-full pl-16 pr-8 py-5 rounded-[1.5rem] bg-brand-background dark:bg-black/40 border border-brand-border dark:border-white/5 focus:outline-none focus:border-brand-gold dark:text-white transition-all text-xl font-black shadow-inner"
                                                />
                                            </div>
                                        </div>

                                        {/* Personal Details */}
                                        <div className="space-y-4">
                                            <label className="text-xs font-black uppercase tracking-widest text-brand-text-muted ml-2">Your Details</label>
                                            <div className="space-y-4">
                                                <div className="relative">
                                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="Full Name"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                        className="w-full pl-16 pr-6 py-4 rounded-[1.5rem] bg-brand-background dark:bg-black/40 border border-brand-border dark:border-white/5 focus:outline-none focus:border-brand-gold font-bold dark:text-white"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                                    <input
                                                        required
                                                        type="email"
                                                        placeholder="Email Address"
                                                        value={formData.email}
                                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                        className="w-full pl-16 pr-6 py-4 rounded-[1.5rem] bg-brand-background dark:bg-black/40 border border-brand-border dark:border-white/5 focus:outline-none focus:border-brand-gold font-bold dark:text-white"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                                    <input
                                                        required
                                                        type="tel"
                                                        placeholder="Phone Number"
                                                        minLength={10}
                                                        maxLength={15}
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                        className="w-full pl-16 pr-6 py-4 rounded-[1.5rem] bg-brand-background dark:bg-black/40 border border-brand-border dark:border-white/5 focus:outline-none focus:border-brand-gold font-bold dark:text-white"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            disabled={isProcessing || (!amount && !selectedTier)}
                                            className="btn-primary w-full py-5 text-lg flex items-center justify-center gap-3 shadow-brand-gold/20 mt-4"
                                        >
                                            {isProcessing ? "Submitting Pledge..." : `Submit Pledge`}
                                            {!isProcessing && <Heart className="w-5 h-5 fill-white" />}
                                        </button>

                                        <p className="text-center text-[10px] uppercase font-black tracking-widest text-brand-text-muted">
                                            This is a non-binding pledge form.
                                        </p>

                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </Section>
        </div>
    );
}