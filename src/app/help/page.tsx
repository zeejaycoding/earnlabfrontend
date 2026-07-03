"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Book, Video, FileText, MessageCircle } from "lucide-react";
import TopBar from "@/Components/Topbar";
import { useTranslation } from "react-i18next";

export default function HelpPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const helpCategories = [
    {
      title: t("help_page.categories.getting_started.title"),
      icon: <Book className="w-6 h-6" />,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      articles: [
        t("help_page.categories.getting_started.article1"),
        t("help_page.categories.getting_started.article2"),
        t("help_page.categories.getting_started.article3"),
        t("help_page.categories.getting_started.article4"),
      ],
    },
    {
      title: t("help_page.categories.video_tutorials.title"),
      icon: <Video className="w-6 h-6" />,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      articles: [
        t("help_page.categories.video_tutorials.article1"),
        t("help_page.categories.video_tutorials.article2"),
        t("help_page.categories.video_tutorials.article3"),
        t("help_page.categories.video_tutorials.article4"),
      ],
    },
    {
      title: t("help_page.categories.account_billing.title"),
      icon: <FileText className="w-6 h-6" />,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      articles: [
        t("help_page.categories.account_billing.article1"),
        t("help_page.categories.account_billing.article2"),
        t("help_page.categories.account_billing.article3"),
        t("help_page.categories.account_billing.article4"),
      ],
    },
    {
      title: t("help_page.categories.contact_support.title"),
      icon: <MessageCircle className="w-6 h-6" />,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      articles: [
        t("help_page.categories.contact_support.article1"),
        t("help_page.categories.contact_support.article2"),
        t("help_page.categories.contact_support.article3"),
        t("help_page.categories.contact_support.article4"),
      ],
    },
  ];

  return (
    <>
      <TopBar />
      <div className="min-h-screen bg-[#0A0C1A] pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.back()}
              className="lg:hidden p-2 rounded-lg bg-[#1A1D2E] border border-[#2A2D3E] hover:bg-[#252840] transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {t("help_page.header.title")}
              </h1>
              <p className="text-sm text-[#9CA3AF]">
                {t("help_page.header.subtitle")}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder={t("help_page.search.placeholder")}
              className="w-full px-6 py-4 rounded-xl bg-[#1A1D2E] border border-[#2A2D3E] text-white placeholder-[#9CA3AF] focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          {/* Help Categories */}
          <div className="grid md:grid-cols-2 gap-6">
            {helpCategories.map((category, index) => (
              <div
                key={index}
                className="rounded-2xl bg-[#1A1D2E] border border-[#2A2D3E] p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-lg ${category.bgColor}`}>
                    <div className={category.color}>{category.icon}</div>
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    {category.title}
                  </h2>
                </div>

                <div className="space-y-2">
                  {category.articles.map((article, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left px-4 py-3 rounded-lg bg-[#252840] hover:bg-[#2A2D3E] text-sm text-[#9CA3AF] hover:text-white transition-colors"
                    >
                      {article}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <button
              onClick={() => router.push("/chat")}
              className="flex items-center justify-center gap-3 p-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 transition-colors"
            >
              <MessageCircle className="w-6 h-6 text-white" />
              <span className="text-white font-semibold">
                {t("help_page.actions.live_chat")}
              </span>
            </button>
            <button
              onClick={() => router.push("/support")}
              className="flex items-center justify-center gap-3 p-6 rounded-xl bg-[#1A1D2E] border border-[#2A2D3E] hover:bg-[#252840] transition-colors"
            >
              <FileText className="w-6 h-6 text-emerald-400" />
              <span className="text-white font-semibold">
                {t("help_page.actions.browse_articles")}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
