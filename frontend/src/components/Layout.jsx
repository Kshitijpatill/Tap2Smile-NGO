import React from "react";
import { Outlet } from "react-router-dom"; 
import Navbar from "./Navbar";
import Footer from "./Footer";
import Topbar from "./Topbar";
import { motion } from "framer-motion";



export default function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen bg-brand-background dark:bg-[#0A0A0A] transition-colors duration-500">
            <Topbar />
            <Navbar />
            <motion.main
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex-grow pt-24 md:pt-32"
                
            >
                
                <Outlet />
            {children}
            </motion.main>

            <Footer />
        </div>
    );
}