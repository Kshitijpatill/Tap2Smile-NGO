import React from "react";
import { cn } from "../lib/utils";

export default function Section({ children, className, containerClassName, id }) {
    return (
        <section id={id} className={cn("py-12 md:py-20 lg:py-28", className)}>
            <div className={cn("container-custom", containerClassName)}>
                {children}
            </div>
        </section>
    );
}
