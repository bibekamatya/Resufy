"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  isCompleted?: boolean;
}

export const Accordion = ({ title, children, isOpen, onToggle, isCompleted = false }: AccordionProps) => {
  return (
    <div className="border border-slate-700 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-slate-800 hover:bg-slate-750 transition text-left"
      >
        <div className="flex items-center gap-3">
          {isCompleted && (
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          )}
          <h2 className="text-lg font-semibold text-white">{title}</h2>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-slate-400 text-xl"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-slate-900">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};;
