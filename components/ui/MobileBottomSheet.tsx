"use client";

import { useState } from "react";
import { X, FileText, Target } from "lucide-react";

interface MobileBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export const MobileBottomSheet = ({ isOpen, onClose, children, title }: MobileBottomSheetProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl max-h-[80vh] flex flex-col animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-4">{children}</div>
      </div>
    </>
  );
};
