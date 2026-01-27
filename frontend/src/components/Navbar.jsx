import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import logo from "../assets/logo.png";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Events", href: "/events" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "glass shadow-sm py-2" : "bg-transparent py-4"
            )}
        >
            <div className="container-custom flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <img src={logo} alt="TapToSmile" className="h-12 w-auto transition-transform group-hover:scale-105" />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    <div className="flex items-center gap-8 mr-4 border-r border-brand-border dark:border-white/10 pr-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-brand-gold",
                                    location.pathname === link.href ? "text-brand-gold" : "text-brand-text dark:text-gray-300"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Link to="/donate" className="btn-primary flex items-center gap-2 px-5 py-2">
                            <Heart className="w-4 h-4" />
                            Donate
                        </Link>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-brand-text dark:text-white transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-zinc-900 border-b border-brand-border dark:border-white/5 overflow-hidden"
                    >
                        <div className="container-custom py-8 flex flex-col gap-4">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-text-muted dark:text-gray-500">Navigation Menu</span>
                                <ThemeToggle />
                            </div>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className={cn(
                                        "text-lg font-bold py-3.5 px-6 rounded-2xl transition-all",
                                        location.pathname === link.href
                                            ? "bg-brand-gold/10 text-brand-gold"
                                            : "text-brand-text dark:text-gray-300 hover:bg-brand-background dark:hover:bg-white/5"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link to="/donate" className="btn-primary w-full text-center py-4 mt-2">
                                Donate Now
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
