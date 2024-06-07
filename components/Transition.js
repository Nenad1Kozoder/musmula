"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Transition({ children }) {
  return (
    <motion.div
      initial={{
        y: 100,
        opacity: 0,
      }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75, delay: 0.2 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
