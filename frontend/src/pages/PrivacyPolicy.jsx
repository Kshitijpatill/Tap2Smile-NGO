import React from "react";
import Section from "../components/Section";
import { motion } from "framer-motion";
import { Shield, Lock, Mail } from "lucide-react";
import PageHeader from "../components/PageHeader";

export default function PrivacyPolicy() {
    return (
        <div className="dark:bg-[#0A0A0A] transition-colors duration-500 min-h-screen">
            <PageHeader
                title={<>Privacy <span className="text-brand-gold">Policy</span></>}
                subtitle="We value your trust and are committed to protecting your personal information."
            />

            {/* Content */}
            <Section className="bg-white dark:bg-[#0A0A0A]">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-12"
                    >
                        <div className="p-8 bg-brand-background dark:bg-zinc-900 rounded-[2rem] border border-brand-gold/10 shadow-lg">
                            <p className="text-lg leading-relaxed text-brand-text-muted dark:text-gray-300">
                                At <strong>Tap To Smile</strong>, we value your privacy and are committed to protecting your personal information.
                            </p>
                        </div>

                        <div className="grid gap-8">
                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center">
                                    <span className="text-brand-gold font-bold text-xl">1</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-4 dark:text-white">Information Collection</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        We may collect basic details such as your name, contact information, and details you share while donating, volunteering, or contacting us. This information is used only to communicate with you, manage donations and volunteer activities, and improve our services.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center">
                                    <span className="text-brand-gold font-bold text-xl">2</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-4 dark:text-white">Secure Transactions</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        All online donations are processed through secure third-party payment gateways. We do not store your payment details.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center">
                                    <span className="text-brand-gold font-bold text-xl">3</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-4 dark:text-white">Data Protection</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        We do not sell or share your personal information with third parties, except when required by law or for essential services.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="flex-shrink-0 w-12 h-12 bg-brand-gold/10 rounded-full flex items-center justify-center">
                                    <span className="text-brand-gold font-bold text-xl">4</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-4 dark:text-white">Cookies & Consent</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        Our website may use cookies to improve user experience. By using our website, you consent to this Privacy Policy. We may update this policy from time to time.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 text-center border-t border-gray-200 dark:border-white/10 pt-12">
                            <h3 className="text-xl font-bold mb-4 dark:text-white">Have questions?</h3>
                            <a
                                href="mailto:tap2smile@gmail.com"
                                className="inline-flex items-center gap-2 text-brand-gold font-bold hover:underline text-lg"
                            >
                                <Mail className="w-5 h-5" />
                                tap2smile@gmail.com
                            </a>
                        </div>
                    </motion.div>
                </div>
            </Section>
        </div>
    );
}
