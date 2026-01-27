import React from "react";
import { cn } from "../lib/utils";

export default function Section({ children, className, containerClassName, id }) {
    return (
        <section id={id} className={cn("py-20 md:py-28", className)}>
            <div className={cn("container-custom", containerClassName)}>
                {children}
            </div>
        </section>
    );
}
