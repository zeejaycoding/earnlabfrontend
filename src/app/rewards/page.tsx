"use client";

import React from "react";
import TopBar from "@/Components/Topbar";
import OffersSurveysRewardsDisclaimer from "@/Components/Shared/OffersSurveysRewardsDisclaimer";
import TickerBar from "../../Components/Shared/TickerBar";
import BonusSection from "@/Components/HomePage/BonusSection";

export default function RewardsPage() {
  return (
    <div className="min-h-screen bg-[#0D0F1E] flex flex-col">
      <TopBar />
      <TickerBar />

      <main className="flex-1 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-10 w-full">
        <BonusSection />
       {/* <OffersSurveysRewardsDisclaimer className="mt-6" /> */}
      </main>
    </div>
  );
}
