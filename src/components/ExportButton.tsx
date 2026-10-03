"use client";

import { Download, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ExportButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button
      type="button"
      onClick={handlePrint}
      className="gap-2 rounded-md px-4 py-2.5 font-semibold shadow-2 hover:shadow-2 print-hide"
    >
      <Printer className="h-4 w-4" aria-hidden />
      Export / Print Advisory
      <Download className="h-3.5 w-3.5 opacity-70" aria-hidden />
    </Button>
  );
}
