import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { NavLink } from "react-router-dom";

export const Sidebar = ({ children, open, setOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.aside
      initial={{ width: "4rem" }}
      animate={{
        width: open || isHovered ? "16rem" : "4rem",
      }}
      transition={{
        duration: 0.3,
        ease: [0.87, 0, 0.13, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative min-h-full bg-white shadow-lg",
        "flex flex-col py-4 px-3"
      )}
    >
      <motion.button
        onClick={() => setOpen(!open)}
        className="absolute -right-3 top-7 z-40 h-6 w-6 rounded-full bg-amber-500 shadow-lg p-1 flex items-center justify-center hover:bg-amber-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.span
          animate={{ rotate: open || isHovered ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="h-1.5 w-1.5 border-t-2 border-r-2 border-white rotate-45 translate-x-[1px]"
        />
      </motion.button>
      {children}
    </motion.aside>
  );
};

export const SidebarBody = ({ children, className }) => {
  return (
    <div className={cn("flex h-full flex-col", className)}>
      {children}
    </div>
  );
};

export const SidebarLink = ({ link }) => {
  return (
    <NavLink
      to={link.href}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all relative group",
          isActive
            ? "bg-amber-50 text-amber-600"
            : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
        )
      }
    >
      <motion.div
        className={cn(
          "flex-shrink-0 w-5 h-5",
          "text-neutral-400 group-hover:text-amber-500 transition-colors",
          "group-[.active]:text-amber-600"
        )}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        {link.icon}
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.span
          key={link.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="whitespace-pre overflow-hidden"
        >
          {link.label}
        </motion.span>
      </AnimatePresence>
    </NavLink>
  );
}; 