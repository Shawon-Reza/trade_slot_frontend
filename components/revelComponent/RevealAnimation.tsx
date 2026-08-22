"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
    children: ReactNode;
}

export default function RevealAnimation({ children }: RevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
                once: false,
                amount: 0.2,
            }}
            transition={{
                duration: 1.9,
                ease: "easeOut",
            }}
        >
            {children}
        </motion.div>
    );
}