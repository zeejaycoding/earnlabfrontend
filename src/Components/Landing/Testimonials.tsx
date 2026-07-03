"use client";

import Image from "next/image";
import { Star, Zap, MessageCircle } from "lucide-react";
import IconTop from "../../../public/assets/testi.png";
import { useTranslation } from "react-i18next";
const {t} = useTranslation();

const testimonials = [
    {
        id: 1,
        text: t("testimonials1.items.1.text"),
        name: "James R.",
        location: t("testimonials1.items.1.location"),
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5,
    },
    {
        id: 2,
        text:t("testimonials1.items.2.text"),
        name: "Sarah M.",
        location: t("testimonials1.items.2.location"),
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
    },
    {
        id: 3,
        text: t("testimonials1.items.3.text"),
        name: "David K.",
        location: t("testimonials1.items.3.location"),
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        rating: 5,
    },
    {
        id: 4,
        text: t("testimonials1.items.4.text"),
        name: "Emily C.",
        location: t("testimonials1.items.4.location"),
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        rating: 5,
    },
    {
        id: 5,
        text: t("testimonials1.items.5.text"),
        name: "Michael T.",
        location: t("testimonials1.items.5.location"),
        avatar: "https://randomuser.me/api/portraits/men/52.jpg",
        rating: 5,
    },
    {
        id: 6,
        text: t("testimonials1.items.6.text"),
        name: "Jessica L.",
        location: t("testimonials1.items.6.location"),
        avatar: "https://randomuser.me/api/portraits/women/33.jpg",
        rating: 5,
    },
];

export default function Testimonials() {
    return (
        <section className="w-full bg-gradient-to-b from-[#0A0C1A] via-[#0D0F1E] to-[#0A0C1A] text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <div className="flex justify-center items-center gap-2 mb-4">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-emerald-500/20">
                            <MessageCircle className="w-5 h-5 text-cyan-400" />
                        </div>
                        <span className="uppercase tracking-widest text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                            {t("testimonials1.realStories")}
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                        {t("testimonials1.title")}
                    </h2>
                    <p className="text-sm md:text-base text-[#9CA3AF] leading-relaxed">
                        {t("testimonials1.subtitle")}
                    </p>
                </div>

                {/* Compact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {testimonials.map((item, index) => (
                        <div
                            key={item.id}
                            className="group relative"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {/* Card */}
                            <div className="relative bg-gradient-to-br from-[#1A1D2E]/80 to-[#151728]/80 backdrop-blur-sm rounded-xl p-4 border border-[#2A2D3E] group-hover:border-cyan-500/30 transition-all duration-300 h-full flex flex-col">
                                {/* Stars - Compact */}
                                <div className="flex gap-0.5 mb-3">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                {/* Text - Smaller */}
                                <p className="text-[#B3B6C7] mb-4 flex-1 leading-relaxed text-sm line-clamp-3">
                                    "{item.text}"
                                </p>

                                {/* User - Compact */}
                                <div className="flex items-center gap-3 pt-3 border-t border-[#2A2D3E]/50">
                                    <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-cyan-500 to-emerald-500 p-0.5 flex-shrink-0">
                                        <div className="w-full h-full rounded-full overflow-hidden bg-[#0A0C1A]">
                                            <img
                                                src={item.avatar}
                                                alt={item.name}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-white font-semibold text-sm truncate">{item.name}</p>
                                        <p className="text-[#9CA3AF] text-xs truncate">{item.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
