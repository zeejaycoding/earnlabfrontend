"use client";

import React from "react";
import { StaticImageData } from "next/image";
import { Play } from "lucide-react";
import Fe1 from "../../../public/assets/freedom.png";
import Fe2 from "../../../public/assets/kobo.png";
import Fe3 from "../../../public/assets/amaz.png";
import ModernSection from "../Shared/ModernSection";
import ModernCard from "../Shared/ModernCard";
import { useTranslation } from "react-i18next";
const {t} = useTranslation();

interface WatchWallItem {
    image: StaticImageData;
    title: string;
}

const offers: WatchWallItem[] = [
    { image: Fe1, title: t("watchWalls.offers.vegasCraze") },
    { image: Fe2, title: t("watchWalls.offers.morningShow") },
    { image: Fe3, title: t("watchWalls.offers.amazon") },
];

const WatchWalls: React.FC = () => {
    const {t} = useTranslation();
    const handleVideoClick = (video: WatchWallItem) => {
        console.log("Clicked video:", video.title);
    };

    return (
        <ModernSection
            title={t("watchWalls.title")}
            description={t("watchWalls.description")}
            icon={<Play className="text-teal-400" size={20} />}
        >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                {offers.map((offer, index) => (
                    <ModernCard
                        key={index}
                        image={offer.image}
                        title={offer.title}
                        onClick={() => handleVideoClick(offer)}
                        variant="compact"
                    />
                ))}
            </div>
        </ModernSection>
    );
};

export default WatchWalls;
