"use client";

import { useEffect, useRef } from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const scripts = Array.from(root.querySelectorAll("script"));
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      for (const attr of Array.from(oldScript.attributes)) {
        newScript.setAttribute(attr.name, attr.value);
      }
      newScript.text = oldScript.innerHTML;
      oldScript.replaceWith(newScript);
    });
  }, [children]);

  return (
    <div
      ref={ref}
      className="min-h-screen bg-gradient-to-b from-yellow-300 via-pink-300 to-purple-300 text-gray-900 flex flex-col items-center justify-center px-4"
    >
      {children}
    </div>
  );
}
