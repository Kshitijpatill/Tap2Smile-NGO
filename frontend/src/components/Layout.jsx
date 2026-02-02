import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen bg-brand-background dark:bg-[#0A0A0A] transition-colors duration-500">
            {/* 1. Navigation Bar */}
            <Navbar />

            {/* 2. Main Content Area */}
            <motion.main
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex-grow pt-20"
            >
                {/* IMPORTANT: We use <Outlet /> here. 
                   This tells React Router: "Render the Home/About/Contact page RIGHT HERE".
                */}
                <Outlet />
            </motion.main>

            {/* 3. Footer */}
            <Footer />
        </div>
    );
}