import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";

export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen bg-brand-background dark:bg-[#0A0A0A] transition-colors duration-500">
            <Navbar />
            <motion.main
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex-grow pt-20"
            >
                {children}
            </motion.main>
            <Footer />
        </div>
    );
}
