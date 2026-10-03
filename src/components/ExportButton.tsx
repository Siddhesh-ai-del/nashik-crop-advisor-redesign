"use client";

import { InteractiveHoverButton } from "@/components/block/interactive-hover-button";

export function ExportButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <InteractiveHoverButton
      type="button"
      onClick={handlePrint}
      className="px-5 py-2.5 font-semibold print-hide"
    >
      Export / Print Advisory
    </InteractiveHoverButton>
  );
}
