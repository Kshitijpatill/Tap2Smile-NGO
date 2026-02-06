import React from "react";
import { motion } from "framer-motion";

export default function PageHeader({ title, subtitle, image = "/assets/28827765_1957611921223329_6928397958251774922_o.jpeg" }) {
    return (
        <section className="bg-brand-black relative py-12 md:py-16 overflow-hidden text-center">
            {/* Background Image with 0.2 opacity */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${image})` }}
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-black/40 via-transparent to-brand-black/60" />

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-6xl font-black mb-6 text-white leading-tight">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
