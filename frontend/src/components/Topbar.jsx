import React from "react";
import { Mail, Phone, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Topbar() {
    return (
        <div className="bg-brand-black text-white/80 py-3 border-b border-white/5">
            <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8">
                    <a href="mailto:tap2smile@gmail.com" className="flex items-center gap-2 hover:text-brand-gold transition-colors text-[10px] md:text-xs font-black uppercase tracking-widest">
                        <Mail className="w-3.5 h-3.5 text-brand-gold" />
                        tap2smile@gmail.com
                    </a>
                    <a href="tel:+917876602339" className="flex items-center gap-2 hover:text-brand-gold transition-colors text-[10px] md:text-xs font-black uppercase tracking-widest">
                        <Phone className="w-3.5 h-3.5 text-brand-gold" />
                        +91 78766 02339
                    </a>
                </div>
                <div className="flex items-center gap-6">
                    <a href="https://facebook.com/tap2smile" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">
                        <Facebook className="w-4 h-4" />
                    </a>
                    <a href="https://instagram.com/tap2smile" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">
                        <Instagram className="w-4 h-4" />
                    </a>
                    <a href="https://www.linkedin.com/in/tap-to-smile-ngo-1b23111b2" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">
                        <Linkedin className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
}
