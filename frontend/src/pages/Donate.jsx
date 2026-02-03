import React, { useState } from "react";
import { Heart, CreditCard, ShieldCheck, ArrowRight, CheckCircle2, IndianRupee } from "lucide-react";
import Section from "../components/Section";
import { api } from "../services/api";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/PageHeader";

const donationTiers = [
    { amount: 10, label: "Provide a warm meal", icon: "🍛" },
    { amount: 50, label: "Supply a student's books", icon: "📚" },
    { amount: 100, label: "Sponsor health checkup", icon: "🏥" },
    { amount: 500, label: "Month of shelter support", icon: "🏠" },
];

export default function Donate() {
    const [amount, setAmount] = useState("");
    const [selectedTier, setSelectedTier] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleDonate = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        const res = await api.submitDonation({ amount: selectedTier || amount, paymentMethod });
        if (res.success) {
            setTimeout(() => {
                setIsProcessing(false);
                setIsSuccess(true);
            }, 1500);
        }
    };

    return (
        <div className="dark:bg-[#0A0A0A] transition-colors duration-500 min-h-screen">
            <PageHeader
                title={<>Every Cent <span className="text-brand-gold">Counts</span></>}
                subtitle="Your generous contribution directly fuels our mission to feed, educate, and house those in need. 100% of public donations go to projects."
            />

            <Section className="bg-brand-background dark:bg-[#0A0A0A]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* Motivation Side */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black dark:text-white mb-8">How your support <span className="text-brand-gold">helps</span></h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {donationTiers.map((tier) => (
                                    <button
                                        key={tier.amount}
                                        onClick={() => { setSelectedTier(tier.amount); setAmount(""); }}
                                        className={cn(
                                            "p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-2 text-left transition-all relative overflow-hidden group",
                                            selectedTier === tier.amount
                                                ? "bg-brand-gold border-brand-gold shadow-2xl scale-105"
                                                : "bg-white dark:bg-zinc-900 border-brand-border dark:border-white/5 hover:border-brand-gold/50 hover:shadow-lg"
                                        )}
                                    >
                                        <span className="text-3xl md:text-4xl mb-6 block group-hover:scale-125 transition-transform">{tier.icon}</span>
                                        <p className={cn(
                                            "text-xl md:text-2xl font-black mb-2",
                                            selectedTier === tier.amount ? "text-white" : "dark:text-white"
                                        )}>₹{tier.amount}</p>
                                        <p className={cn(
                                            "text-xs font-bold uppercase tracking-widest",
                                            selectedTier === tier.amount ? "text-white/80" : "text-brand-text-muted dark:text-gray-500"
                                        )}>{tier.label}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] border border-brand-border dark:border-white/5 shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                            <div className="flex items-center gap-6 relative z-10">
                                <div className="w-16 h-16 bg-brand-gold/10 rounded-[1.5rem] flex items-center justify-center shrink-0">
                                    <ShieldCheck className="text-brand-gold h-8 w-8" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-black dark:text-white mb-2">Verified Impact Hub</h4>
                                    <p className="text-brand-text-muted dark:text-gray-400 leading-relaxed font-medium">All donations towards Tap To Smile Initiatives are eligible for <span className="text-brand-gold font-bold">80G tax benefits</span>. We ensure 100% transparency in our fund allocation.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            {isSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white dark:bg-zinc-900 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl border border-brand-border dark:border-white/5 p-8 md:p-12 text-center"
                                >
                                    <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-8">
                                        <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h3 className="text-4xl font-black mb-6 dark:text-white">Thank You!</h3>
                                    <p className="text-brand-text-muted dark:text-gray-400 text-xl mb-12 max-w-md mx-auto leading-relaxed">
                                        Your contribution of <span className="text-brand-gold font-black">₹{selectedTier || amount}</span> has been received. You're making a real difference.
                                    </p>
                                    <button
                                        onClick={() => setIsSuccess(false)}
                                        className="btn-primary px-12"
                                    >
                                        Donate Again
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    onSubmit={handleDonate}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white dark:bg-zinc-900 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl border border-brand-border dark:border-white/5 overflow-hidden"
                                >
                                    <div className="p-8 md:p-16 space-y-10 md:space-y-12">
                                        <div className="space-y-6">
                                            <h3 className="text-2xl font-black dark:text-white">Choose Donation Amount</h3>
                                            <div className="relative">
                                                <IndianRupee className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-gold h-6 w-6" />
                                                <input
                                                    type="number"
                                                    placeholder="Other Amount"
                                                    value={amount}
                                                    onChange={(e) => { setAmount(e.target.value); setSelectedTier(null); }}
                                                    className="w-full pl-16 pr-8 py-6 rounded-[1.5rem] bg-brand-background dark:bg-black/40 border border-brand-border dark:border-white/5 focus:outline-none focus:border-brand-gold dark:text-white transition-all text-xl font-black shadow-inner"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <h3 className="text-2xl font-black dark:text-white">Payment Method</h3>
                                            <div className="grid grid-cols-2 gap-6">
                                                {["card", "paypal", "crypto", "upi"].map((method) => (
                                                    <button
                                                        key={method}
                                                        type="button"
                                                        onClick={() => setPaymentMethod(method)}
                                                        className={cn(
                                                            "py-5 rounded-2xl border-2 font-black text-[10px] uppercase tracking-[0.2em] transition-all",
                                                            paymentMethod === method ? "bg-brand-black text-white dark:bg-brand-gold" : "bg-gray-50 dark:bg-white/5 border-transparent text-gray-500 hover:border-brand-gold/30"
                                                        )}
                                                    >
                                                        {method}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            disabled={isProcessing || (!amount && !selectedTier)}
                                            className="btn-primary w-full py-6 text-xl flex items-center justify-center gap-4 shadow-brand-gold/20"
                                        >
                                            {isProcessing ? "Processing Security..." : `Safely Donate ₹${selectedTier || amount || "0"}`}
                                            {!isProcessing && <Heart className="w-6 h-6 fill-white" />}
                                        </button>

                                        <div className="pt-6 flex flex-col items-center gap-4">
                                            <div className="flex gap-4">
                                                <CreditCard className="w-6 h-6 text-gray-400" />
                                                <ShieldCheck className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-text-muted dark:text-gray-600">
                                                Secure 256-bit encrypted transactions
                                            </p>
                                        </div>
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
