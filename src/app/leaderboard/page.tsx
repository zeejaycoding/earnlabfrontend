import TopBar from "@/Components/Topbar";
import PageNavigation from "@/Components/Shared/PageNavigation";
import React from "react";
import LeaderBoard from "@/Components/Leaderboard.tsx/Leaderboard";
import FeedBar from "@/Components/HomePage/FeedBar";

export default function LeaderBoardMain() {
    return (
        <>
            <TopBar />
            <PageNavigation />
            <main className="min-h-screen bg-[#0A0C1A] pb-20 lg:pb-0">
                {/* Page Content */}
                <LeaderBoard />
            </main>
        </>
    );
}
