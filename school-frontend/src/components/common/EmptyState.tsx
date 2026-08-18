"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  FiSearch, 
  FiInbox, 
  FiFileText, 
  FiUsers, 
  FiImage, 
  FiAward, 
  FiMessageSquare,
  FiRefreshCw
} from "react-icons/fi";

export interface EmptyStateProps {
  icon?: "search" | "inbox" | "file" | "users" | "image" | "award" | "message" | "custom";
  customIcon?: React.ReactNode;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  badgeText?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function EmptyState({
  icon = "inbox",
  customIcon,
  title = "No Data Found",
  description = "There are no records to display at this time. Please check back later or adjust your filters.",
  actionLabel,
  onAction,
  badgeText,
  size = "md",
  className = "",
}: EmptyStateProps) {
  const getIcon = () => {
    if (customIcon) return customIcon;
    switch (icon) {
      case "search":
        return <FiSearch className="w-full h-full text-[#3876a3]" />;
      case "file":
        return <FiFileText className="w-full h-full text-[#3876a3]" />;
      case "users":
        return <FiUsers className="w-full h-full text-[#3876a3]" />;
      case "image":
        return <FiImage className="w-full h-full text-[#3876a3]" />;
      case "award":
        return <FiAward className="w-full h-full text-[#3876a3]" />;
      case "message":
        return <FiMessageSquare className="w-full h-full text-[#3876a3]" />;
      case "inbox":
      default:
        return <FiInbox className="w-full h-full text-[#3876a3]" />;
    }
  };

  const sizeClasses = {
    sm: "py-8 px-4 max-w-sm",
    md: "py-12 px-6 max-w-lg",
    lg: "py-16 px-8 max-w-xl",
  };

  const iconContainerSizes = {
    sm: "w-12 h-12 p-3",
    md: "w-16 h-16 p-4",
    lg: "w-20 h-20 p-5",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`mx-auto w-full text-center flex flex-col items-center justify-center rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-sm relative overflow-hidden my-4 ${sizeClasses[size]} ${className}`}
    >
      {/* Subtle background glow */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#B4E1EB]/30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-[#78A4CB]/20 rounded-full blur-2xl pointer-events-none" />

      {badgeText && (
        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 mb-3 border border-slate-200/60">
          {badgeText}
        </span>
      )}

      {/* Floating Animated Icon Badge */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-tr from-[#B4E1EB]/40 via-sky-50 to-white border border-[#95BDD7]/40 shadow-inner mb-4 ${iconContainerSizes[size]}`}
      >
        {getIcon()}
      </motion.div>

      {/* Title */}
      <h3 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm md:text-base text-slate-500 max-w-md mx-auto leading-relaxed mb-5 font-normal">
        {description}
      </p>

      {/* Action Button */}
      {actionLabel && onAction && (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onAction}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#78A4CB] to-[#5a90bf] text-white font-medium text-sm shadow-sm hover:shadow-md transition-all duration-200"
        >
          <FiRefreshCw className="w-4 h-4" />
          <span>{actionLabel}</span>
        </motion.button>
      )}
    </motion.div>
  );
}
