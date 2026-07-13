"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  User,
  Trophy,
  Wallet,
  MessageSquare,
  HelpCircle,
  Settings,
  Share2,
  Users,
  DollarSign,
  Gift,
} from "lucide-react";

interface DesktopNavLinksProps {
  variant: "authenticated" | "landing";
  onSignUp?: () => void;
}

const DesktopNavLinks: React.FC<DesktopNavLinksProps> = ({ variant, onSignUp }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const highlightedSrc: Record<string, string> = {
    home: "/home-highlight.png",
    earn: "/wallet-highlight.png",
    tasks: "/tasks-highlight.png",
    surveys: "/surveys-highlight.png",
    menu: "/menu-highlight.png",
  };

  const normalSrc: Record<string, string> = {
    home: "/home-svgrepo-com.png",
    earn: "/wallet-minus-svgrepo-com 1.png",
    tasks: "/tasks-svgrepo-com 1.png",
    surveys: "/document-1-svgrepo-com 1.png",
    menu: "/menu-svgrepo-com 1.png",
  };

  const navItems = [
    { id: "home", label: "Home", path: "/home" },
    { id: "earn", label: "Earn", path: "/earn" },
    { id: "tasks", label: "Tasks", path: "/tasks" },
    { id: "surveys", label: "Surveys", path: "/surveys" },
  ];

  const menuItems = [
    { id: "account", label: "Account", path: "/account", icon: <User className="w-[18px] h-[18px]" /> },
    { id: "profiles", label: "Profiles", path: "/profile", icon: <Users className="w-[18px] h-[18px]" /> },
    { id: "rewards", label: "Rewards", path: "/rewards", icon: <DollarSign className="w-[18px] h-[18px]" /> },
    { id: "leaderboard", label: "Leaderboard", path: "/leaderboard", icon: <Trophy className="w-[18px] h-[18px]" /> },
    { id: "referrals", label: "Referrals", path: "/referrals", icon: <Share2 className="w-[18px] h-[18px]" /> },
    { id: "chat", label: "Chat", path: "/chat", icon: <MessageSquare className="w-[18px] h-[18px]" /> },
    { id: "support", label: "Support", path: "/support", icon: <HelpCircle className="w-[18px] h-[18px]" /> },
    { id: "settings", label: "Settings", path: "/settings", icon: <Settings className="w-[18px] h-[18px]" /> },
    { id: "cashout", label: "Cashout", path: "/cashout", icon: <Wallet className="w-[18px] h-[18px]" /> },
  ];

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

  const handleNavClick = (path: string) => {
    if (variant === "landing") {
      onSignUp?.();
    } else {
      router.push(path);
    }
  };

  return (
    <div className="hidden lg:flex items-center gap-1">
      {navItems.map((item) => {
        const active = isActive(item.path);
        return (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.path)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors duration-200 ${
              active
                ? "text-[#0AC07D] bg-[#0AC07D]/10"
                : "text-[#8C8FA8] hover:text-white hover:bg-[#1E2133]"
            }`}
          >
            <Image
              src={active ? highlightedSrc[item.id] : normalSrc[item.id]}
              alt=""
              width={18}
              height={18}
            />
            <span className="text-[13px] font-semibold" style={{ fontFamily: "'Manrope', sans-serif" }}>
              {item.label}
            </span>
          </button>
        );
      })}

      {/* Menu dropdown */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors duration-200 ${
            menuOpen
              ? "text-[#0AC07D] bg-[#0AC07D]/10"
              : "text-[#8C8FA8] hover:text-white hover:bg-[#1E2133]"
          }`}
        >
          <Image
            src={menuOpen ? highlightedSrc.menu : normalSrc.menu}
            alt=""
            width={18}
            height={18}
          />
          <span className="text-[13px] font-semibold" style={{ fontFamily: "'Manrope', sans-serif" }}>
            Menu
          </span>
        </button>

        {menuOpen && (
          <div
            className="absolute top-full left-0 mt-2 w-56 rounded-xl shadow-2xl z-50 overflow-hidden border border-[#2A2D3E] py-1"
            style={{ backgroundColor: "#1E2133" }}
          >
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setMenuOpen(false);
                  if (variant === "landing") {
                    onSignUp?.();
                  } else {
                    router.push(item.path);
                  }
                }}
                className="flex items-center gap-3 px-4 py-2.5 w-full text-left transition-colors hover:bg-[#151728] text-[#B3B6C7] hover:text-white"
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopNavLinks;
