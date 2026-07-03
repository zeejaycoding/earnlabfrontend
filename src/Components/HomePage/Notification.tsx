"use client";

import TopBar from "@/Components/Topbar";
import Image, { type StaticImageData } from "next/image";
import React from "react";

import PayPalImg from "../../../public/assets/paypal.png";
import SteamImg from "../../../public/assets/cb.png";
import AmazonImg from "../../../public/assets/ama.png";
import AppleImg from "../../../public/assets/apple.png";
import { useTranslation } from "react-i18next";


interface Notification {
    id: number;
    icon: StaticImageData;
    title: string;
    subtitle: string;
}



export default function Notification() {
    const { t } = useTranslation();

    const notifications: Notification[] = [
    {
        id: 1,
        icon: PayPalImg,
        title: t("notif_maria_earned"),
        subtitle: t("minutes_ago"),
    },
    {
        id: 2,
        icon: SteamImg,
        title: t("notif_jacob_withdrew"),
        subtitle: t("minutes_ago"),
    },
    {
        id: 3,
        icon: AmazonImg,
        title: t("notif_alex_earned"),
        subtitle: t("minutes_ago"),
    },
    {
        id: 4,
        icon: AppleImg,
        title: t("notif_jacob_withdrew"),
        subtitle: t("minutes_ago"),
    },
    {
        id: 5,
        icon: PayPalImg,
        title: t("notif_maria_earned"),
        subtitle: t("minutes_ago"),
    },
    {
        id: 6,
        icon: SteamImg,
        title: t("notif_emma_withdrew"),
        subtitle: t("minutes_ago"),
    },
    {
        id: 7,
        icon: AmazonImg,
        title: t("notif_michael_earned"),
        subtitle: t("minutes_ago"),
    },
    {
        id: 8,
        icon: AppleImg,
        title: t("notif_sarah_withdrew"),
        subtitle: t("minutes_ago"),
    },
];

    return (
        <>
            <TopBar />
            <main className="md:p-6 p-3 bg-[#1E2133] min-h-screen">
                <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex gap-4 md:min-w-max">
                        {notifications.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center cursor-pointer gap-3 bg-[#26293E] text-white rounded-lg md:px-6 md:py-4 px-4 py-3 md:min-w-[250px] min-w-[200px] shadow-md"
                            >
                                <div className="flex-shrink-0">
                                    <Image
                                        src={item.icon}
                                        alt={item.title}
                                        className="object-contain md:w-8 md:h-8 w-6 h-6"
                                    />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <span className="font-semibold md:text-sm text-xs leading-tight">
                                        {item.title}
                                    </span>
                                    <span className="text-xs text-gray-400 leading-tight">
                                        {item.subtitle}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
