"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle, Book, FileText, ChevronRight, Zap, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";



export default function HelpCenterPage() {
    const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
    const { t } = useTranslation();

    const categories = [
    {
        icon: <Book className="w-6 h-6" />,
        title:  t("help_center_page.categories.getting_started.title"),
        description: t("help_center_page.categories.getting_started.description"),
        articles: 12,
        color: "blue",
        items: [
             t("help_center_page.categories.getting_started.item1"),
            t("help_center_page.categories.getting_started.item2"),
            t("help_center_page.categories.getting_started.item3"),
            t("help_center_page.categories.getting_started.item4"),
            t("help_center_page.categories.getting_started.item5"),
        ],
    },
    {
        icon: <Zap className="w-6 h-6" />,
        title:  t("help_center_page.categories.earning_tasks.title"),
        description: t("help_center_page.categories.earning_tasks.description"),
        articles: 18,
        color: "emerald",
        items: [
            t("help_center_page.categories.earning_tasks.item1"),
            t("help_center_page.categories.earning_tasks.item2"),
            t("help_center_page.categories.earning_tasks.item3"),
            t("help_center_page.categories.earning_tasks.item4"),
            t("help_center_page.categories.earning_tasks.item5"),
        ],
    },
    {
        icon: <FileText className="w-6 h-6" />,
        title: t("help_center_page.categories.payments.title"),
        description: t("help_center_page.categories.payments.description"),
        articles: 15,
        color: "purple",
        items: [
            t("help_center_page.categories.payments.item1"),
            t("help_center_page.categories.payments.item2"),
            t("help_center_page.categories.payments.item3"),
            t("help_center_page.categories.payments.item4"),
            t("help_center_page.categories.payments.item5"),
        ],
    },
    {
        icon: <Shield className="w-6 h-6" />,
        title:  t("help_center_page.categories.security.title"),
        description: t("help_center_page.categories.security.description"),
        articles: 10,
        color: "orange",
        items: [
            t("help_center_page.categories.security.item1"),
            t("help_center_page.categories.security.item2"),
            t("help_center_page.categories.security.item3"),
            t("help_center_page.categories.security.item4"),
            t("help_center_page.categories.security.item5"),
        ],
    },
];


    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0A0C1A] via-[#0D0F1E] to-[#0A0C1A] text-white">
            {/* Header */}
            <div className="bg-[#0A0C1A] border-b border-[#2A2D3E] sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/landing" className="p-2 rounded-lg bg-[#1A1D2E] border border-[#2A2D3E] hover:bg-[#252840] transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div className="flex items-center gap-2">
                            <HelpCircle className="w-6 h-6 text-blue-400" />
                            <h1 className="text-xl font-bold">{t("help_center_page.header.title")}</h1>
                        </div>
                    </div>
                    <Link href="/contact" className="px-4 py-2 bg-[#1A1D2E] border border-[#2A2D3E] rounded-lg font-semibold text-sm hover:bg-[#252840] transition-all">
                        {t("help_center_page.header.contact")}
                    </Link>
                </div>
            </div>

            {/* Hero Section */}
            <section className="py-16 px-4 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {t("help_center_page.hero.title")}
                    </h2>
                    <p className="text-lg text-[#9CA3AF]">
                        {t("help_center_page.hero.description")}
                    </p>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="py-8 px-4 bg-[#0D0F1E]/50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 rounded-xl bg-[#1A1D2E] border border-[#2A2D3E]">
                            <div className="text-2xl font-bold text-white mb-1">55+</div>
                            <div className="text-sm text-[#9CA3AF]">{t("help_center_page.stats.articles")}</div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-[#1A1D2E] border border-[#2A2D3E]">
                            <div className="text-2xl font-bold text-white mb-1">24/7</div>
                            <div className="text-sm text-[#9CA3AF]">{t("help_center_page.stats.support")}</div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-[#1A1D2E] border border-[#2A2D3E]">
                            <div className="text-2xl font-bold text-white mb-1">&lt;1hr</div>
                            <div className="text-sm text-[#9CA3AF]">{t("help_center_page.stats.response")}</div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-[#1A1D2E] border border-[#2A2D3E]">
                            <div className="text-2xl font-bold text-white mb-1">98%</div>
                            <div className="text-sm text-[#9CA3AF]">{t("help_center_page.stats.satisfaction")}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-2xl font-bold mb-8">{t("help_center_page.categories_section_title")}</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        {categories.map((category, idx) => (
                            <div 
                                key={idx} 
                                className="rounded-2xl bg-[#1A1D2E] border border-[#2A2D3E] overflow-hidden hover:border-blue-500/50 transition-all duration-300"
                            >
                                <div 
                                    className="p-6 cursor-pointer"
                                    onClick={() => setExpandedCategory(expandedCategory === idx ? null : idx)}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-lg bg-${category.color}-500/10 flex items-center justify-center text-${category.color}-400`}>
                                            {category.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-lg font-bold">{category.title}</h4>
                                                <ChevronRight className={`w-5 h-5 transition-transform ${expandedCategory === idx ? 'rotate-90' : ''}`} />
                                            </div>
                                            <p className="text-sm text-[#9CA3AF] mt-1">{category.description}</p>
                                            <span className="text-xs text-blue-400 mt-2 block">{category.articles} { t("help_center_page.categories.getting_started.articles_label")}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {expandedCategory === idx && (
                                    <div className="px-6 pb-6 border-t border-[#2A2D3E] pt-4">
                                        <ul className="space-y-2">
                                            {category.items.map((item, itemIdx) => (
                                                <li key={itemIdx}>
                                                    <a href="#" className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-blue-400 transition-colors">
                                                        <ChevronRight className="w-4 h-4" />
                                                        {item}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
