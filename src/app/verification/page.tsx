"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import TopBar from "@/Components/Topbar";
import TickerBar from "@/Components/Shared/TickerBar";

const DISCORD_URL =
  process.env.NEXT_PUBLIC_DISCORD_URL ||
  "https://discord.gg/htr9C8EjKG";

const TELEGRAM_URL = "https://t.me/labwardscom";
const X_URL = "https://x.com/labwards?s=21";

interface VerificationCardProps {
  title: string;
  subtitle: string;
  reward: string;
  icon: React.ReactNode;
  buttonText: string;
  onClick?: () => void;
}

const VerificationCard: React.FC<VerificationCardProps> = ({
  title,
  subtitle,
  reward,
  icon,
  buttonText,
  onClick,
}) => (
  <div className="relative overflow-hidden rounded-[24px] border border-gray-200 dark:border-[#1E2F3F] bg-gradient-to-r from-gray-100 to-gray-200 dark:from-[#111324] dark:to-[#0C343F] p-7 flex items-center justify-between group transition-all hover:translate-y-[-2px]">

    {/* overlay */}
    <div
      className="absolute inset-0 opacity-[0.05] pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
        backgroundSize: "24px 24px",
      }}
    />

    <div className="relative z-10 flex items-center gap-5">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-[#15242C] border border-gray-200 dark:border-[#23353E] flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>

      <div>
        <h3 className="text-gray-900 dark:text-white text-[20px] font-bold leading-tight">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-[#8C9DB6] text-[13px] font-medium mt-1.5">
          {subtitle} and earn{" "}
          <span className="text-[#0AC07D] font-bold">{reward}</span>
        </p>
      </div>
    </div>

    <button
      onClick={onClick}
      className="relative z-10 px-7 py-3 rounded-xl text-gray-900 dark:text-white font-bold text-[15px] leading-none transition-all hover:brightness-110 active:scale-[0.98]"
      style={{
        background:
          "linear-gradient(135deg, #0AC07D 0%, #14A290 100%)",
        boxShadow: "0 8px 24px rgba(20, 169, 144, 0.25)",
      }}
    >
      {buttonText}
    </button>
  </div>
);

export default function VerificationPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0D0F1E] text-gray-900 dark:text-white flex flex-col">
      <TopBar />
      <TickerBar />

      <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 sm:px-6 md:px-10 py-10">
        {/* header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-200 dark:bg-[#15242C] border border-gray-300 dark:border-[#23353E] flex items-center justify-center hover:bg-gray-300 dark:hover:bg-[#1E2F3F] transition-colors"
          >
            <ArrowLeft size={20} />
          </button>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Verification
          </h1>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* TELEGRAM */}
          <VerificationCard
            title="Telegram"
            subtitle="Join our Telegram"
            reward="$0.05"
            buttonText="Join Now"
            icon={
              <div className="relative w-6 h-6">
                <img
                  src="./telegram-dark.png"
                  className="w-6 h-6 object-contain block dark:hidden"
                />
                <img
                  src="./telegram.png"
                  className="w-6 h-6 object-contain hidden dark:block"
                />
              </div>
            }
            onClick={() => window.open(TELEGRAM_URL, "_blank")}
          />

          {/* X */}
          <VerificationCard
            title="Follow on X"
            subtitle="Follow us on X"
            reward="$0.05"
            buttonText="Follow"
            icon={
              <div className="relative w-6 h-6">
                <img
                  src="./x-dark.jpg"
                  className="w-6 h-6 object-contain block dark:hidden"
                />
                <img
                  src="./x.png"
                  className="w-6 h-6 object-contain hidden dark:block"
                />
              </div>
            }
            onClick={() => window.open(X_URL, "_blank")}
          />

          {/* DISCORD */}
          <VerificationCard
            title="Discord"
            subtitle="Join us on Discord"
            reward="$0.05"
            buttonText="Join"
            icon={
              <div className="relative w-6 h-6">
                <img
                  src="./discord-dark.png"
                  className="w-6 h-6 object-contain block dark:hidden"
                />
                <img
                  src="./discord.png"
                  className="w-6 h-6 object-contain hidden dark:block"
                />
              </div>
            }
            onClick={() => window.open(DISCORD_URL, "_blank")}
          />

        </div>
      </main>

      {/* floating button */}
      <div className="fixed bottom-8 right-8 z-40">
        <button className="w-16 h-16 rounded-full bg-[#14A990] flex items-center justify-center text-white shadow-2xl shadow-[#14A990]/40 hover:scale-110 transition-transform">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="11" r="3" />
            <path d="M7 16c0-2 2-3 5-3s5 1 5 3" />
          </svg>
        </button>
      </div>
    </div>
  );
}