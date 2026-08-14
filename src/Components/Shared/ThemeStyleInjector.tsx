"use client";

/**
 * ThemeStyleInjector
 * ------------------
 * Handles dark→light theme switching for the entire app.
 *
 * Strategy:
 *  1. Inject a <style> tag with CSS selectors (handles most cases).
 *  2. Use JavaScript classList.contains() to scan the DOM and apply
 *     inline overrides (handles edge cases where CSS selectors may miss).
 *  3. Use MutationObserver to handle dynamically added elements.
 *  4. Listen for html.classList changes to re-apply on toggle.
 */

import { useEffect, useState } from "react";

/* ─── Colour maps ─── */

/** Dark Tailwind bg class → light colour replacement */
const BG_CLASS_MAP: Record<string, string> = {
  // Very dark page backgrounds
  "bg-[#0D0F1E]": "#F0F2F8",
  "bg-[#0D0F1A]": "#F0F2F8",
  "bg-[#0B0D1B]": "#F0F2F8",
  "bg-[#0B0D1F]": "#F0F2F8",
  "bg-[#0A0C1A]": "#F0F2F8",
  "bg-[#0a0f1c]": "#F0F2F8",
  "bg-[#0C1120]": "#F0F2F8",
  "bg-[#0C1320]": "#F0F2F8",
  "bg-[#0E1121]": "#F0F2F8",
  "bg-[#0f0f1a]": "#F0F2F8",
  "bg-[#0F1123]": "#F0F2F8",
  "bg-[#09101F]": "#F0F2F8",
  "bg-[#0D1325]": "#F0F2F8",
  // Mid-dark navbar/section backgrounds
  "bg-[#111324]": "#E8EAF2",
  "bg-[#111425]": "#E8EAF2",
  "bg-[#11172A]": "#E8EAF2",
  "bg-[#111827]": "#E8EAF2",
  "bg-[#121428]": "#E8EAF2",
  "bg-[#14162A]": "#E8EAF2",
  "bg-[#141727]": "#E8EAF2",
  "bg-[#11131a]": "#E8EAF2",
  "bg-[#0f172a]": "#E8EAF2",
  // Card/panel backgrounds
  "bg-[#151728]": "#FFFFFF",
  "bg-[#151828]": "#FFFFFF",
  "bg-[#16182A]": "#FFFFFF",
  "bg-[#16192E]": "#FFFFFF",
  "bg-[#1A1D2E]": "#FFFFFF",
  "bg-[#1B1E2B]": "#FFFFFF",
  "bg-[#1b1f30]": "#FFFFFF",
  "bg-[#181A2C]": "#F5F6FA",
  "bg-[#1C1E32]": "#F5F6FA",
  "bg-[#1C1F33]": "#F5F6FA",
  "bg-[#1C2033]": "#F5F6FA",
  "bg-[#1C2036]": "#F5F6FA",
  "bg-[#1C2436]": "#F5F6FA",
  "bg-[#1E2035]": "#F5F6FA",
  "bg-[#1E2133]": "#F5F6FA",
  "bg-[#1e2133]": "#F5F6FA",
  "bg-[#1E2238]": "#F5F6FA",
  "bg-[#1E2F3F]": "#F5F6FA",
  // Border-level backgrounds
  "bg-[#252840]": "#EBEDF5",
  "bg-[#26293E]": "#EBEDF5",
  "bg-[#262F3E]": "#EBEDF5",
  "bg-[#2A2D3E]": "#EBEDF5",
  "bg-[#2A2D44]": "#EBEDF5",
  "bg-[#2A334A]": "#EBEDF5",
  "bg-[#2B2F45]": "#EBEDF5",
  "bg-[#23353E]": "#EBEDF5",
  "bg-[#252A5A]": "#EBEDF5",
  "bg-[#1D3141]": "#EBEDF5",
  "bg-[#15242C]": "#EBEDF5",
  "bg-[#30334A]": "#DDE0EE",
  "bg-[#31364B]": "#DDE0EE",
  "bg-[#374151]": "#DDE0EE",
  "bg-[#3A3E57]": "#DDE0EE",
};

/** Dark Tailwind text class → light colour replacement */
const TEXT_CLASS_MAP: Record<string, string> = {
  "text-white": "#1A1D2E",
  "text-[#B3B6C7]": "#4A4D6A",
  "text-[#8C9DB6]": "#4A4D6A",
  "text-[#8C8FA8]": "#4A4D6A",
  "text-[#6B6E8A]": "#5E6180",
  "text-[#B4B6C9]": "#5A5D7A",
  "text-[#E7FFFA]": "#3A6B63",
  "text-[#7EE6CA]": "#0D9E86",
  "text-[#9093AC]": "#4A4D6A",
  "text-[#9CA3AF]": "#5A5D7A",
};

/** Inline `style` background hex → light colour (substring match on style attr) */
const INLINE_STYLE_BG_MAP: [string, string][] = [
  // Most common dark inline backgrounds
  ["#0D0F1E", "#F0F2F8"],
  ["#101324", "#E8EAF2"],
  ["#0B0D18", "#F0F2F8"],
  ["#111324", "#E8EAF2"],
  ["#111425", "#E8EAF2"],
  ["#161828", "#FFFFFF"],
  ["#16192E", "#FFFFFF"],
  ["#16182A", "#FFFFFF"],
  ["#1A1D2E", "#FFFFFF"],
  ["#1E2133", "#F5F6FA"],
  ["#181A2C", "#F5F6FA"],
  ["#151728", "#FFFFFF"],
  ["#26293E", "#EBEDF5"],
  ["#30334A", "#DDE0EE"],
  ["#2A2D40", "#DDE0EE"],
  ["#2A2D44", "#EBEDF5"],
  ["#3E4468", "#DDE0EE"],
  ["#4A5080", "#C8CBD9"],
  ["#121424", "#F5F6FA"],
  ["#121428", "#F5F6FA"],
  ["#2A2D3E", "#EBEDF5"],
  ["#2B2F45", "#EBEDF5"],
  ["#31364B", "#DDE0EE"],
];

/** Gradient class patterns → light gradient */
const GRADIENT_CLASS_MAP: [string, string][] = [
  ["from-[#0D0F1E]", "from-[#F0F2F8]"],
  ["via-[#101324]", "via-[#E8EAF2]"],
  ["to-[#0D0F1E]", "to-[#F0F2F8]"],
  ["from-[#1a3a2e]", "from-[#E8F5F1]"],
  ["to-[#111324]", "to-[#E8EAF2]"],
];

const DATA_ATTR = "data-theme-orig-bg";
const DATA_ATTR_COLOR = "data-theme-orig-color";

function isDarkHex(hex: string): boolean {
  const h = hex.replace("#", "").toLowerCase();
  if (h.length !== 6) return false;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  // Luminance < 0.12 = very dark
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.25;
}

/** Apply light-mode overrides to a single element */
function applyLight(el: HTMLElement) {
  // ── 1. BG class overrides ──
  for (const [cls, color] of Object.entries(BG_CLASS_MAP)) {
    if (el.classList.contains(cls)) {
      if (!el.hasAttribute(DATA_ATTR)) {
        el.setAttribute(DATA_ATTR, el.style.backgroundColor || "");
      }
      el.style.setProperty("background-color", color, "important");
      // Also clear background shorthand if it's set via class
      break;
    }
  }

  // ── 2. Inline style background overrides ──
  const inlineStyle = el.getAttribute("style") || "";
  const inlineLower = inlineStyle.toLowerCase();
  for (const [darkHex, lightColor] of INLINE_STYLE_BG_MAP) {
    const hexLower = darkHex.toLowerCase();
    if (inlineLower.includes(hexLower)) {
      // Only override if the hex is used in a background/border property, not just border-only
      const hasBg = inlineLower.includes("background") || inlineLower.includes("bgcolor");
      const hasBorder = inlineLower.includes("border");
      // If element has ONLY border (no background), skip background override
      if (hasBorder && !hasBg) {
        // Only update border-color, not background
        continue;
      }
      if (hasBg) {
        if (!el.hasAttribute(DATA_ATTR)) {
          el.setAttribute(DATA_ATTR, el.style.backgroundColor || "");
        }
        el.style.setProperty("background-color", lightColor, "important");
        if (inlineLower.includes("background:") || inlineLower.includes("background :")) {
          el.style.setProperty("background", lightColor, "important");
        }
      }
      break;
    }
  }

  // ── 3. Gradient class overrides (convert gradient wrapper to plain bg) ──
  const classStr = el.getAttribute("class") || "";
  if (
    classStr.includes("from-[#0D0F1E]") ||
    classStr.includes("via-[#101324]") ||
    classStr.includes("from-[#1a3a2e]")
  ) {
    if (!el.hasAttribute(DATA_ATTR)) {
      el.setAttribute(DATA_ATTR, el.style.backgroundColor || "");
    }
    el.style.setProperty("background", "#EBEDF5", "important");
    el.style.setProperty("background-color", "#EBEDF5", "important");
  }

  // ── 4. Text class overrides ──
  for (const [cls, color] of Object.entries(TEXT_CLASS_MAP)) {
    if (el.classList.contains(cls)) {
      if (!el.hasAttribute(DATA_ATTR_COLOR)) {
        el.setAttribute(DATA_ATTR_COLOR, el.style.color || "");
      }
      el.style.setProperty("color", color, "important");
      break;
    }
  }

  // ── 4b. Inline style color overrides ──
  if (inlineLower.includes("color:") && !el.hasAttribute(DATA_ATTR_COLOR)) {
    if (inlineLower.includes("color: #ffffff") || inlineLower.includes("color:#ffffff") || inlineLower.includes("color: white")) {
      el.setAttribute(DATA_ATTR_COLOR, el.style.color || "");
      el.style.setProperty("color", "#1A1D2E", "important");
    }
  }

  // ── 5. SVG stop-color overrides ──
  if (el.tagName === "stop") {
    const stopColor = el.getAttribute("stop-color") || el.getAttribute("stopColor") || "";
    if (isDarkHex(stopColor)) {
      el.setAttribute("stop-color", "#E8EAF2");
      el.setAttribute("data-orig-stop", stopColor);
    }
    try {
      const sc = (el as any).style?.getPropertyValue("stop-color");
      if (sc && isDarkHex(sc)) {
        (el as any).style.setProperty("stop-color", "#E8EAF2", "important");
      }
    } catch {}
  }

  // ── 6. SVG rect/path fill overrides (dark backgrounds in SVG) ──
  if ((el.tagName === "rect" || el.tagName === "path" || el.tagName === "polygon" || el.tagName === "ellipse") ) {
    const fill = el.getAttribute("fill") || "";
    if (fill && fill !== "none" && fill !== "currentColor" && !fill.startsWith("url(") && isDarkHex(fill)) {
      el.setAttribute("data-orig-fill", fill);
      el.setAttribute("fill", "#E8EAF2");
    }
    // SVG stroke="white" → dark text in light mode
    const stroke = el.getAttribute("stroke") || "";
    if (stroke === "white" || stroke === "#ffffff" || stroke === "#FFFFFF") {
      if (!el.hasAttribute("data-orig-stroke")) {
        el.setAttribute("data-orig-stroke", stroke);
      }
      el.setAttribute("stroke", "#1A1D2E");
    }
  }
}

/** Remove light-mode overrides from a single element */
function removeLight(el: HTMLElement) {
  if (el.hasAttribute(DATA_ATTR)) {
    const orig = el.getAttribute(DATA_ATTR) || "";
    el.style.removeProperty("background-color");
    el.style.removeProperty("background");
    if (orig) el.style.backgroundColor = orig;
    el.removeAttribute(DATA_ATTR);
  }
  if (el.hasAttribute(DATA_ATTR_COLOR)) {
    const orig = el.getAttribute(DATA_ATTR_COLOR) || "";
    el.style.removeProperty("color");
    if (orig) el.style.color = orig;
    el.removeAttribute(DATA_ATTR_COLOR);
  }
  // Restore SVG stops
  if (el.tagName === "stop" && el.hasAttribute("data-orig-stop")) {
    el.setAttribute("stop-color", el.getAttribute("data-orig-stop")!);
    el.removeAttribute("data-orig-stop");
  }
  // Restore SVG fills
  if (el.hasAttribute("data-orig-fill")) {
    el.setAttribute("fill", el.getAttribute("data-orig-fill")!);
    el.removeAttribute("data-orig-fill");
  }
  // Restore SVG strokes
  if (el.hasAttribute("data-orig-stroke")) {
    el.setAttribute("stroke", el.getAttribute("data-orig-stroke")!);
    el.removeAttribute("data-orig-stroke");
  }
}

/** Walk all elements in the document and apply/remove light overrides */
function applyThemeToAll(isLight: boolean) {
  const all = document.querySelectorAll<HTMLElement>("*");
  all.forEach((el) => {
    if (isLight) {
      applyLight(el);
    } else {
      removeLight(el);
    }
  });
}

export default function ThemeStyleInjector() {
  const [mounted, setMounted] = useState(false);
  const styleRef = useState<{ el: HTMLStyleElement | null }>({ el: null })[0];

  useEffect(() => {
    // Delay execution until after hydration is completely finished
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Inject/remove hover CSS for light mode
  useEffect(() => {
    if (!mounted) return;

    const HOVER_CSS = `
      /* ── Hover background overrides ── */
      html:not(.dark) .hover\\:bg-\\[\\#1E2133\\]:hover { background-color: #E8EAF2 !important; }
      html:not(.dark) .hover\\:bg-\\[\\#26293E\\]:hover { background-color: #EBEDF5 !important; }
      html:not(.dark) .hover\\:bg-\\[\\#30334A\\]:hover { background-color: #DDE0EE !important; }
      html:not(.dark) .hover\\:bg-\\[\\#151728\\]:hover { background-color: #FFFFFF !important; }
      html:not(.dark) .hover\\:bg-\\[\\#1A1D2E\\]:hover { background-color: #FFFFFF !important; }
      html:not(.dark) .hover\\:bg-\\[\\#252840\\]:hover { background-color: #EBEDF5 !important; }
      html:not(.dark) .hover\\:bg-\\[\\#3E4468\\]:hover { background-color: #DDE0EE !important; }
      html:not(.dark) .hover\\:bg-\\[\\#0A0C1A\\]:hover { background-color: #F0F2F8 !important; }
      html:not(.dark) .hover\\:bg-\\[\\#0D0F1E\\]:hover { background-color: #F0F2F8 !important; }
      html:not(.dark) .hover\\:bg-\\[\\#16192E\\]:hover { background-color: #E8EAF2 !important; }
      html:not(.dark) .hover\\:bg-\\[\\#0AC07D\\]/10:hover { background-color: rgba(10,192,125,0.15) !important; }
      /* ── Hover text overrides ── */
      html:not(.dark) .hover\\:text-white:hover { color: #1A1D2E !important; }
      html:not(.dark) .hover\\:text-\\[\\#B3B6C7\\]:hover { color: #4A4D6A !important; }
      html:not(.dark) .hover\\:text-\\[\\#8C8FA8\\]:hover { color: #4A4D6A !important; }
      html:not(.dark) .hover\\:text-\\[\\#9CA3AF\\]:hover { color: #4A4D6A !important; }
      html:not(.dark) .hover\\:text-emerald-300:hover { color: #0D9E86 !important; }
      /* ── Inline style background overrides ── */
      html:not(.dark) [style*="background-color: #1E2133"] { background-color: #E8EAF2 !important; }
      html:not(.dark) [style*="background-color: #151728"] { background-color: #FFFFFF !important; }
      html:not(.dark) [style*="background-color: #26293E"] { background-color: #EBEDF5 !important; }
      html:not(.dark) [style*="background: #1E2133"] { background: #E8EAF2 !important; }
      html:not(.dark) [style*="background: #151728"] { background: #FFFFFF !important; }
      html:not(.dark) [style*="background: #26293E"] { background: #EBEDF5 !important; }
      html:not(.dark) [style*="background-color: #3E4468"] { background-color: #DDE0EE !important; }
      html:not(.dark) [style*="background: #3E4468"] { background: #DDE0EE !important; }
      html:not(.dark) [style*="background-color: #4A5080"] { background-color: #C8CBD9 !important; }
      html:not(.dark) [style*="background-color: #14162A"] { background-color: #E8EAF2 !important; }
      html:not(.dark) [style*="background: #14162A"] { background: #E8EAF2 !important; }
      html:not(.dark) [style*="background-color: #0A0C1A"] { background-color: #F0F2F8 !important; }
      html:not(.dark) [style*="background: #0A0C1A"] { background: #F0F2F8 !important; }
      html:not(.dark) [style*="background-color: #0D0F1E"] { background-color: #F0F2F8 !important; }
      html:not(.dark) [style*="background: #0D0F1E"] { background: #F0F2F8 !important; }
      html:not(.dark) [style*="background-color: #16192E"] { background-color: #E8EAF2 !important; }
      html:not(.dark) [style*="background: #16192E"] { background: #E8EAF2 !important; }
      /* ── Tailwind bg class overrides ── */
      html:not(.dark) .bg-\\[\\#1E2133\\] { background-color: #E8EAF2 !important; }
      html:not(.dark) .bg-\\[\\#14162A\\] { background-color: #E8EAF2 !important; }
      html:not(.dark) .bg-\\[\\#151728\\] { background-color: #FFFFFF !important; }
      html:not(.dark) .bg-\\[\\#0A0C1A\\] { background-color: #F0F2F8 !important; }
      html:not(.dark) .bg-\\[\\#0D0F1E\\] { background-color: #F0F2F8 !important; }
      html:not(.dark) .bg-\\[\\#0D0F1E\\]/50 { background-color: rgba(240,242,248,0.5) !important; }
      html:not(.dark) .bg-\\[\\#16192E\\] { background-color: #E8EAF2 !important; }
      html:not(.dark) .bg-\\[\\#252840\\] { background-color: #EBEDF5 !important; }
      html:not(.dark) .bg-\\[\\#0AC07D\\]/10 { background-color: rgba(10,192,125,0.1) !important; }
      /* ── Tailwind gradient class overrides ── */
      html:not(.dark) .from-\\[\\#1A1D2E\\] { --tw-gradient-from: #E8EAF2 !important; }
      html:not(.dark) .to-\\[\\#151728\\] { --tw-gradient-to: #FFFFFF !important; }
      html:not(.dark) .from-\\[\\#0A0C1A\\] { --tw-gradient-from: #F0F2F8 !important; }
      html:not(.dark) .via-\\[\\#0D0F1E\\] { --tw-gradient-via: #F0F2F8 !important; }
      html:not(.dark) .to-\\[\\#0A0C1A\\] { --tw-gradient-to: #F0F2F8 !important; }
      html:not(.dark) .from-\\[\\#0D0F1E\\] { --tw-gradient-from: #F0F2F8 !important; }
      html:not(.dark) .to-\\[\\#0D0F1E\\] { --tw-gradient-to: #F0F2F8 !important; }
      html:not(.dark) .bg-gradient-to-b { --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }
      html:not(.dark) .bg-gradient-to-r { --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }
      /* ── Tailwind border class overrides ── */
      html:not(.dark) .border-\\[\\#30334A\\] { border-color: #DDE0EE !important; }
      html:not(.dark) .border-\\[\\#1E2133\\] { border-color: #F5F6FA !important; }
      html:not(.dark) .border-\\[\\#2A2D3E\\] { border-color: #EBEDF5 !important; }
      html:not(.dark) .border-\\[\\#2A2D44\\] { border-color: #EBEDF5 !important; }
      html:not(.dark) .border-\\[\\#374151\\] { border-color: #DDE0EE !important; }
      /* ── Inline style color overrides ── */
      html:not(.dark) [style*="color: #B3B6C7"] { color: #4A4D6A !important; }
      html:not(.dark) [style*="color:#B3B6C7"] { color: #4A4D6A !important; }
      html:not(.dark) [style*="color: #FFFFFF"] { color: #1A1D2E !important; }
      html:not(.dark) [style*="color:#FFFFFF"] { color: #1A1D2E !important; }
      html:not(.dark) [style*="color: #8C8FA8"] { color: #5A5D7A !important; }
      html:not(.dark) [style*="color:#8C8FA8"] { color: #5A5D7A !important; }
      html:not(.dark) [style*="color: #9CA3AF"] { color: #5A5D7A !important; }
      html:not(.dark) [style*="color:#9CA3AF"] { color: #5A5D7A !important; }
      /* ── Gradient border overrides (emerald/cyan/purple/pink) ── */
      html:not(.dark) .border-emerald-500/30 { border-color: rgba(16,185,129,0.4) !important; }
      html:not(.dark) .hover\\:border-emerald-500/60:hover { border-color: rgba(16,185,129,0.6) !important; }
      /* ── Text color overrides for white text on dark bg ── */
      html:not(.dark) .text-white { color: #1A1D2E !important; }
    `;

    const isLight = !document.documentElement.classList.contains("dark");

    if (isLight && !styleRef.el) {
      const style = document.createElement("style");
      style.id = "theme-light-hover-overrides";
      style.textContent = HOVER_CSS;
      document.head.appendChild(style);
      styleRef.el = style;
    } else if (!isLight && styleRef.el) {
      styleRef.el.remove();
      styleRef.el = null;
    }

    const observer = new MutationObserver(() => {
      const light = !document.documentElement.classList.contains("dark");
      if (light && !styleRef.el) {
        const style = document.createElement("style");
        style.id = "theme-light-hover-overrides";
        style.textContent = HOVER_CSS;
        document.head.appendChild(style);
        styleRef.el = style;
      } else if (!light && styleRef.el) {
        styleRef.el.remove();
        styleRef.el = null;
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
      if (styleRef.el) { styleRef.el.remove(); styleRef.el = null; }
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    // ── Initial application ──
    const isLight = !document.documentElement.classList.contains("dark");
    if (isLight) applyThemeToAll(true);

    // ── Watch for theme class changes on <html> ──
    const htmlObserver = new MutationObserver(() => {
      const nowLight = !document.documentElement.classList.contains("dark");
      applyThemeToAll(nowLight);
    });
    htmlObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // ── Watch for new DOM nodes (SPA navigation, dynamic content) ──
    const domObserver = new MutationObserver((mutations) => {
      if (!document.documentElement.classList.contains("dark")) {
        for (const mutation of mutations) {
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              applyLight(node);
              node.querySelectorAll<HTMLElement>("*").forEach(applyLight);
            }
          });
        }
      }
    });
    domObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      htmlObserver.disconnect();
      domObserver.disconnect();
    };
  }, [mounted]);

  return null;
}
