import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-brand-black text-white pt-24 pb-12">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    <div className="space-y-8">
                        <h3 className="text-3xl font-black text-brand-gold">TapToSmile</h3>
                        <p className="text-gray-400 dark:text-gray-400 leading-relaxed font-medium text-sm">
                            Empowering communities through selfless contribution and collective action. Join us in making the world a better place, one smile at a time.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: Facebook, href: "https://facebook.com/tap2smile" },
                                { icon: Instagram, href: "https://instagram.com/tap2smile" },
                                { icon: Linkedin, href: "https://www.linkedin.com/in/tap-to-smile-ngo-1b23111b2" }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-brand-gold hover:text-brand-black transition-all group"
                                >
                                    <social.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-brand-gold">Organization</h4>
                        <ul className="space-y-5 text-sm">
                            {["About Us", "Programs", "Events", "Contact"].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={`/${item.toLowerCase().replace(" ", "")}`}
                                        className="text-gray-400 hover:text-brand-gold font-bold transition-all hover:translate-x-1 inline-block"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-brand-gold">Support</h4>
                        <ul className="space-y-5 text-sm">
                            {
                                [
                                    { name: "Donate Now", path: "/donate" },
                                    { name: "Volunteer", path: "/contact?tab=volunteer" },
                                    { name: "Founders Vision", path: "/about" },
                                    { name: "Privacy Policy", path: "/privacy-policy" }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            to={item.path}
                                            className="text-gray-400 hover:text-brand-gold font-bold transition-all hover:translate-x-1 inline-block"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-10 text-brand-gold">Connect</h4>
                        <ul className="space-y-8">
                            <li className="flex items-start gap-4 text-gray-400">
                                <MapPin className="w-5 h-5 shrink-0 text-brand-gold" />
                                <span className="font-medium text-sm leading-snug">Mumbai, Maharashtra, India</span>
                            </li>
                            <li className="flex items-center gap-4 text-gray-400">
                                <Phone className="w-5 h-5 shrink-0 text-brand-gold" />
                                <span className="font-medium text-sm">+91 78766 02339</span>
                            </li>
                            <li className="flex items-center gap-4 text-gray-400">
                                <Mail className="w-5 h-5 shrink-0 text-brand-gold" />
                                <span className="font-medium text-sm">tap2smile@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.25em] text-gray-500">
                    <p>© {new Date().getFullYear()} TapToSmile NGO. All Rights Reserved.</p>
                    <div className="flex items-center gap-3">
                        <span>Made with</span>
                        <Heart className="w-3 h-3 text-brand-gold fill-brand-gold animate-pulse" />
                        <span>for a better world</span>
                    </div>
                    <div className="flex gap-10">
                        <a href="#" className="hover:text-brand-gold transition-colors">Terms</a>
                        <Link to="/privacy-policy" className="hover:text-brand-gold transition-colors">Privacy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
