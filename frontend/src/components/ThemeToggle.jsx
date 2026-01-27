import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "../lib/utils";

export default function ThemeToggle() {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    );

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "p-2 rounded-full transition-all duration-300 active:scale-95",
                "bg-brand-background dark:bg-brand-black/20 border border-brand-border dark:border-white/10",
                "text-brand-gold hover:bg-brand-gold/10 hover:shadow-lg"
            )}
            aria-label="Toggle Theme"
        >
            {theme === "light" ? (
                <Moon className="w-5 h-5 transition-transform hover:rotate-12" />
            ) : (
                <Sun className="w-5 h-5 transition-transform hover:rotate-90" />
            )}
        </button>
    );
}
