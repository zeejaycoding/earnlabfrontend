"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import TopBar from "@/Components/Topbar";
import TickerBar from "@/Components/Shared/TickerBar";
import { useTranslation } from "react-i18next";

const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const REWARDS = [
  { id: 1, amount: "$0.25", color: "text-[#14A990]", image:"/0.25.png" },
  { id: 2, amount: "$0.25", color: "text-[#14A990]", image:"/0.25.png" },
  { id: 3, amount: "$200", color: "text-[#F59E0B]", highlight: true, image:"/200.png" },
  { id: 4, amount: "$0.05", color: "text-[#14A990]", image:"/0.05.png" },
  { id: 5, amount: "$0.25", color: "text-[#14A990]", image:"/0.25.png" },
  { id: 6, amount: "$0.25", color: "text-[#14A990]", image:"/0.25.png" },
];

export default function BonusPage() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState("--h --m --s");
  const [progress, setProgress] = useState(0);
  const [claims, setClaims] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const token = getToken();
    if (!token) { setLoading(false); return; }
    fetch(`${apiBase}/api/v1/rewards/bonus`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json().catch(() => ({})))
      .then((data) => {
        if (data && data.timeRemainingMs !== undefined) {
          setProgress(data.progress ?? 0);
          const claimMap: Record<number, boolean> = {};
          if (Array.isArray(data.boxes)) {
            data.boxes.forEach((b: any) => { claimMap[b.id] = !!b.claimed; });
          }
          setClaims(claimMap);
          // start countdown
          const updateTimer = () => {
            const remaining = Math.max(0, data.timeRemainingMs - (Date.now() - fetchStart));
            const h = Math.floor(remaining / 3600000);
            const m = Math.floor((remaining % 3600000) / 60000);
            const s = Math.floor((remaining % 60000) / 1000);
            setTimeLeft(`${h}h ${m.toString().padStart(2, "0")}m ${s.toString().padStart(2, "0")}s`);
          };
          const fetchStart = Date.now();
          updateTimer();
          const id = setInterval(updateTimer, 1000);
          return () => clearInterval(id);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0F1E] text-white flex flex-col">
      <TopBar />
      <TickerBar />

      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 sm:px-6 md:px-10 py-8">
        <div className="flex items-center gap-4 mb-10">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-[#15242C] border border-[#23353E] flex items-center justify-center text-white hover:bg-[#1E2F3F] transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{t("bonus_page.title")}</h1>
        </div>

        <div className="flex flex-col w-full">
          {/* Timer Badge */}
<div className="self-start bg-[#151828] border border-[#1E2F3F] rounded-lg px-4 py-2 text-sm mb-8">
  <span className="text-[#8C9DB6]"> {t("bonus_page.timer_label")}{" "} </span>
  <span className="text-[#0AC07D] font-bold">{timeLeft}</span>
</div>
          {/* Reward Carousel Section */}
<div className="relative w-full flex flex-col items-center mb-12">            {/* Top Pointer */}
            <div className="mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
<path d="M12 21l-12-18h24z" />
              </svg>
            </div>

            {/* Carousel */}
            <div className="flex items-center w-full py-4 overflow-x-auto scrollbar-hide px-3 gap-2 sm:gap-4">
              {REWARDS.map((reward) => (
                <div 
                  key={reward.id}
className={`w-full max-w-[73.61px] h-[64px] sm:max-w-none sm:w-[15%] sm:min-w-[120px] sm:h-[180px] rounded-2xl border ${
  reward.highlight
    ? "border-[#F59E0B] bg-gradient-to-b from-[#3A2A12] via-[#241B0F] to-[#18120A]"
    : "border-[#1E2F3F] bg-[#151828]"
} flex flex-col items-center justify-center gap-1 sm:gap-4 transition-all hover:scale-[1.02] shadow-xl shrink-0`}                >
<div className="w-8 h-8 sm:w-20 sm:h-20 flex items-center justify-center">
  <img
    src={reward.image}
    alt={reward.amount}
    className={`w-full h-full object-contain ${
      reward.highlight ? "animate-spin-slow" : ""
    } ${claims[reward.id] ? "opacity-40" : ""}`}
  />
</div>                  <span className={`text-[10px] sm:text-xl font-black ${reward.color}`}>{reward.amount}</span>
                </div>
              ))}
            </div>

            {/* Bottom Pointer */}
            <div className="mt-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12 21l-12-18h24z" transform="rotate(180 12 12)" />
              </svg>
            </div>
          </div>

{/* Progress Bar */}
<div className="w-full mb-8 px-2">
  <div className="relative">
    <div className="h-2 bg-[#151828] rounded-full overflow-hidden border border-[#1E2F3F]">
      <div className="absolute left-0 top-0 h-full transition-all duration-500 bg-[#14A990] shadow-[0_0_10px_#14A990]" style={{ width: `${Math.min(progress, 100)}%` }} />
    </div>
    <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 px-3 py-1 bg-[#14A990] rounded-full text-[10px] font-bold whitespace-nowrap">$0</span>
    <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 px-3 py-1 bg-[#14A990] rounded-full text-[10px] font-bold whitespace-nowrap">$2</span>
  </div>
</div>
<p className="text-[#FFFFF] text-center font-bold text-sm sm:text-base mb-8">
   {t("bonus_page.reward_label")}{" "}
  <span className="text-[#73DFCE]">
   {t("bonus_page.reward_highlight")}
  </span>
</p>

<div className="flex justify-center">
  <button
      onClick={() => router.push("/signup")}

    className="px-10 py-4 rounded-xl text-white font-bold text-lg transition-all hover:brightness-110 active:scale-[0.95] flex items-center gap-3 shadow-2xl shadow-[#14A990]/40"
    style={{
      background:
        "linear-gradient(135deg, #0AC07D 0%, #14A290 100%)",
    }}
  >
    {t("bonus_page.cta")}
  </button>
</div>

        </div>
      </main>
    </div>
  );
}