"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { 
  X, 
  User, 
  Trophy, 
  Wallet, 
  MessageCircle, 
  Headset,
  LogOut,
  Settings,
  Gift,
  HelpCircle,
  Share2
} from "lucide-react";
import { openLiveChatPanel } from "@/utils/liveChat";
import { useTranslation } from "react-i18next";


interface MenuTile {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  action?: () => void;
  color: string;
  bgColor: string;
}

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const FullScreenMenu: React.FC<FullScreenMenuProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  //const { t } = useTranslation();


  const handleSignOut = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      
      if (token) {
        try {
          await fetch(`${api}/api/v1/auth/logout`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (e) {
          // ignore
        }
      }

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }

      onClose();
      router.push("/");
    } catch (err) {
      console.error("Sign out failed", err);
    }
  };

  const menuTiles: MenuTile[] = [
    {
      id: "earn",
      label: "Earns",
      icon: <img src="/ri_coins-fill.svg" alt="Earns"     className="w-5 h-5 object-contain shrink-0"
 />,
      path: "/earn",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      id: "leaderboard",
      label: "Leaderboard",
      icon: <img src="/material-symbols_social-leaderboard-rounded.svg" alt="Leaderboard"     className="w-5 h-5 object-contain shrink-0"
 />,
      path: "/leaderboard",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
    },
    {
      id: "rewards",
      label: "Rewards",
      icon: <img
  src="/solar_gift-bold.svg"
  alt="Rewards"
  className="w-5 h-5 object-contain shrink-0"
/>,
      path: "/rewards",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      id: "faq",
      label: "FAQ",
      icon: <img src="/mingcute_question-fill.svg" alt="FAQ"     className="w-5 h-5 object-contain shrink-0"
/>,
      path: "/faq",
      color: "text-orange-400",
      bgColor: "bg-cyan-500/10",
    },
    {
      id: "support",
      label: "Support",
      icon: <img src="/streamline-plump_customer-support-3-solid.svg" alt="Support"     className="w-5 h-5 object-contain shrink-0"
 />,
      path: "/support",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
    },  ];

  const handleTileClick = (tile: MenuTile) => {
    if (tile.action) {
      tile.action();
    } else if (tile.path) {
      router.push(tile.path);
      onClose();
    }
  };

if (!isOpen) return null;

return (
  <>
    {/* Click outside */}
    <div
      className="fixed inset-0 z-40"
      onClick={onClose}
    />

    {/* Dropdown */}
    <div
  className="
    absolute top-[60px] w-64 rounded-xl shadow-2xl z-50 overflow-hidden border border-[#2A2D3E]
    right-4 rtl:right-auto rtl:left-4
  "
  style={{ backgroundColor: "#1E2133" }}
  onClick={(e) => e.stopPropagation()}
>
      {/* Items */}
      <div className="p-2 flex flex-col gap-1">
        {menuTiles.map((tile) => (
          <button
            key={tile.id}
            onClick={() => handleTileClick(tile)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover:opacity-90"
            style={{ backgroundColor: "#151728", color: "#B3B6C7" }}
          >
            {/* Icon */}
            <span className="w-5 h-5 flex items-center justify-center">
              {tile.icon}
            </span>

            {/* Label */}
            <span className="text-sm font-medium">
              {tile.label}
            </span>
          </button>
        ))}

<button
  onClick={() => {
    router.push("/cashout");
    onClose();
  }}
  className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover:opacity-90"
  style={{
    background: "linear-gradient(180deg, #099F86 100%, #ffffff 0%)",
    border: "1px solid #CECDCD",
    boxShadow: "0px 6px 18px #14A9904D",
    color: "#FFFFFF",
  }}
>
  <span className="w-5 h-5 flex items-center justify-center">
    <img
      src="/solar_cash-out-bold.svg"
      alt="Cashout"
      className="w-5 h-5 object-contain shrink-0"
    />
  </span>

  <span className="text-sm font-medium"> Cashout</span>
</button>


      </div>
    </div>
  </>
);};

export default FullScreenMenu;
