"use client";

import { Download, Printer } from "lucide-react";

export function ExportButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="flex items-center gap-2 rounded-[12px] bg-moss px-4 py-2.5 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(90,122,77,0.2)] transition-all duration-300 hover:bg-moss-deep hover:shadow-[0_4px_12px_rgba(90,122,77,0.25)] print-hide"
    >
      <Printer className="h-4 w-4" aria-hidden />
      Export / Print Advisory
      <Download className="h-3.5 w-3.5 opacity-70" aria-hidden />
    </button>
  );
}
