"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Cookie, Settings, Shield, BarChart3, Target, Share2, Check } from "lucide-react";
import { useTranslation } from "react-i18next";


export default function CookiePolicyPage() {
    const { t } = useTranslation();
        
    const lastUpdated = "December 1, 2025";
    const [preferences, setPreferences] = useState({
        essential: true,
        analytics: true,
        marketing: false,
        functional: true,
    });

    const handlePreferenceChange = (key: keyof typeof preferences) => {
        if (key === 'essential') return; // Essential cookies cannot be disabled
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const howWeUseItems = t("cookie_page.how_we_use.items", {
  returnObjects: true,
}) as string[];

    const cookieTypes = [
        {
            icon: <Shield className="w-5 h-5" />,
            key: "essential" as const,
            title: t("cookie_page.cookie_types.essential.title"),
            description: t("cookie_page.cookie_types.essential.description"),
            examples: t("cookie_page.cookie_types.essential.examples", {
  returnObjects: true,
}) as string[],
            required: true,
            color: "emerald",
        },
        {
            icon: <BarChart3 className="w-5 h-5" />,
            key: "analytics" as const,
            title: t("cookie_page.cookie_types.analytics.title"),
            description: t("cookie_page.cookie_types.analytics.description"),
            examples: t("cookie_page.cookie_types.analytics.examples", {
  returnObjects: true,
}) as string[],
            required: false,
            color: "blue",
        },
        {
            icon: <Target className="w-5 h-5" />,
            key: "marketing" as const,
            title: t("cookie_page.cookie_types.marketing.title"),
            description: t("cookie_page.cookie_types.marketing.description"),
            examples: t("cookie_page.cookie_types.marketing.examples", {
  returnObjects: true,
}) as string[],
            required: false,
            color: "purple",
        },
        {
            icon: <Settings className="w-5 h-5" />,
            key: "functional" as const,
            title: t("cookie_page.cookie_types.functional.title"),
            description: t("cookie_page.cookie_types.functional.description"),
            examples: t("cookie_page.cookie_types.functional.examples", {
  returnObjects: true,
}) as string[],
            required: false,
            color: "orange",
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
                            <Cookie className="w-6 h-6 text-orange-400" />
                            <h1 className="text-xl font-bold">{t("cookie_page.header.title")}</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Cookie Policy</h2>
                    <p className="text-[#9CA3AF]">{t("cookie_page.hero.last_updated")}: {lastUpdated}</p>
                </div>

                {/* Introduction */}
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6 mb-10">
                    <p className="text-[#9CA3AF]">
{t("cookie_page.intro.text")}             
       </p>
                </div>

                {/* What Are Cookies */}
                <section className="mb-10">
                    <h3 className="text-xl font-bold mb-4">{t("cookie_page.what_are_cookies.title")}?</h3>
                    <div className="bg-[#1A1D2E] border border-[#2A2D3E] rounded-xl p-6 text-[#9CA3AF] space-y-4">
                        <p>
                            {t("cookie_page.what_are_cookies.description_1")}
                        </p>
                        <p>
                           {t("cookie_page.what_are_cookies.description_2")}
                        </p>
                    </div>
                </section>

                {/* Cookie Preferences */}
                <section className="mb-10">
                    <h3 className="text-xl font-bold mb-4">{t("cookie_page.manage.title")}</h3>
                    <div className="space-y-4">
                        {cookieTypes.map((cookie) => (
                            <div 
                                key={cookie.key}
                                className={`bg-[#1A1D2E] border border-[#2A2D3E] rounded-xl p-6 ${preferences[cookie.key] ? `border-l-4 border-l-${cookie.color}-500` : ''}`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-10 h-10 rounded-lg bg-${cookie.color}-500/20 flex items-center justify-center text-${cookie.color}-400 flex-shrink-0`}>
                                            {cookie.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h4 className="font-bold">{cookie.title}</h4>
                                                {cookie.required && (
                                                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">{t("cookie_page.cookie_types.essential.required")}</span>
                                                )}
                                            </div>
                                            <p className="text-[#9CA3AF] text-sm mb-3">{cookie.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {cookie.examples.map((example, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-[#252840] text-xs text-[#9CA3AF] rounded">
                                                        {example}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handlePreferenceChange(cookie.key)}
                                        disabled={cookie.required}
                                        className={`flex-shrink-0 w-14 h-8 rounded-full transition-colors relative ${
                                            preferences[cookie.key]
                                                ? 'bg-emerald-500'
                                                : 'bg-[#2A2D3E]'
                                        } ${cookie.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                    >
                                        <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-transform ${
                                            preferences[cookie.key] ? 'translate-x-7' : 'translate-x-1'
                                        }`} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition-all flex items-center justify-center gap-2">
                        <Check className="w-5 h-5" />
                        {t("cookie_page.manage.save_button")}
                    </button>
                </section>

                {/* How We Use Cookies */}
                <section className="mb-10">
                    <h3 className="text-xl font-bold mb-4">{t("cookie_page.cookie_types.essential.title")}</h3>
                    <div className="bg-[#1A1D2E] border border-[#2A2D3E] rounded-xl p-6 text-[#9CA3AF] space-y-4">
                        <p>We use cookies to:</p>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                             {howWeUseItems.map((item, idx) => (
      <li key={idx}>{item}</li> ))}
                        </ul>
                    </div>
                </section>

                {/* Third-Party Cookies */}
                <section className="mb-10">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Share2 className="w-5 h-5 text-blue-400" />
                        {t("cookie_page.third_party.title")}
                    </h3>
                    <div className="bg-[#1A1D2E] border border-[#2A2D3E] rounded-xl p-6 text-[#9CA3AF] space-y-4">
                        <p>{t("cookie_page.third_party.description")}, including:</p>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                            <li><strong className="text-white">{t("cookie_page.third_party.items.goganalytics")}:</strong> {t("cookie_page.third_party.items.analytics")}</li>
                            <li><strong className="text-white">{t("cookie_page.third_party.items.adstitle")}:</strong> {t("cookie_page.third_party.items.ads")}</li>
                            <li><strong className="text-white">{t("cookie_page.third_party.items.socialtitle")}:</strong> {t("cookie_page.third_party.items.social")}</li>
                            <li><strong className="text-white">{t("cookie_page.third_party.items.paymentstitle")}:</strong> {t("cookie_page.third_party.items.payments")}</li>
                        </ul>
                        <p className="mt-4">{t("cookie_page.third_party.note")}</p>
                    </div>
                </section>

                {/* Managing Cookies */}
                <section className="mb-10">
                    <h3 className="text-xl font-bold mb-4">{t("cookie_page.browser.title")}</h3>
                    <div className="bg-[#1A1D2E] border border-[#2A2D3E] rounded-xl p-6 text-[#9CA3AF] space-y-4">
                        <p>{t("cookie_page.browser.note")}</p>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                            <li><strong className="text-white">{t("cookie_page.browser.items.chrometitle")}</strong> {t("cookie_page.browser.items.chrome")}</li>
                            <li><strong className="text-white">{t("cookie_page.browser.items.firefoxtitle")}</strong> {t("cookie_page.browser.items.firefox")}</li>
                            <li><strong className="text-white">{t("cookie_page.browser.items.safarititle")}</strong> {t("cookie_page.browser.items.safari")}</li>
                            <li><strong className="text-white">{t("cookie_page.browser.items.edgetitle")}</strong> {t("cookie_page.browser.items.edge")}</li>
                        </ul>
                        <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                            <p className="text-yellow-400 text-sm">
                                {t("cookie_page.browser.warning1")}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <section>
                    <h3 className="text-xl font-bold mb-4">{t("cookie_page.contact.title")}</h3>
                    <div className="bg-[#1A1D2E] border border-[#2A2D3E] rounded-xl p-6 text-[#9CA3AF]">
                        <p>{t("cookie_page.contact.text")}</p>
                        <p className="mt-2">
                            Email: <a href="mailto:support@labwards.com" className="text-orange-400 hover:text-orange-300">{t("cookie_page.contact.email")}</a>
                        </p>
                    </div>
                </section>

                {/* Related Links */}
                <div className="mt-12 pt-8 border-t border-[#2A2D3E]">
                    <h3 className="font-bold mb-4">{t("cookie_page.related.title")}</h3>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/terms" className="px-4 py-2 bg-[#1A1D2E] border border-[#2A2D3E] rounded-lg text-sm hover:bg-[#252840] transition-colors">
                            {t("cookie_page.related.terms")}
                        </Link>
                        <Link href="/privacy" className="px-4 py-2 bg-[#1A1D2E] border border-[#2A2D3E] rounded-lg text-sm hover:bg-[#252840] transition-colors">
                            {t("cookie_page.related.privacy")}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
