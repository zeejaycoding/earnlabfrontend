"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";


export default function FAQPage() {
        const { t } = useTranslation();

        const faqCategories = [
    {
        title: t("faq_page.categories.getting_started.title"),
        faqs: [
            {
                question: t("faq_page.categories.getting_started.question1"),
                answer: t("faq_page.categories.getting_started.answer1")
            },
            {
                question: t("faq_page.categories.getting_started.question2"),
                answer: t("faq_page.categories.getting_started.answer2")
            },
            {
                question: t("faq_page.categories.getting_started.question3"),
                answer: t("faq_page.categories.getting_started.answer3")
            },
            {
                question: t("faq_page.categories.getting_started.question4"),
                answer: t("faq_page.categories.getting_started.answer4")
            },
        ]
    },
    {
        title: t("faq_page.categories.earning_tasks.title"),
        faqs: [
            {
                question: t("faq_page.categories.earning_tasks.question1"),
                answer: t("faq_page.categories.earning_tasks.answer1")
            },
            {
                question: t("faq_page.categories.earning_tasks.question2"),
                answer: t("faq_page.categories.earning_tasks.answer2")
            },
            {
                question: t("faq_page.categories.earning_tasks.question3"),
                answer: t("faq_page.categories.earning_tasks.answer3")
            },
            {
                question: t("faq_page.categories.earning_tasks.question4"),
                answer: t("faq_page.categories.earning_tasks.answer4")
            },
        ]
    },
    {
        title: t("faq_page.categories.payments.title"),
        faqs: [
            {
                question: t("faq_page.categories.payments.question1"),
                answer: t("faq_page.categories.payments.answer1")
            },
            {
                question: t("faq_page.categories.payments.question2"),
                answer: t("faq_page.categories.payments.answer2")
            },
            {
                question: t("faq_page.categories.payments.question3"),
                answer: t("faq_page.categories.payments.answer3")
            },
            {
                question: t("faq_page.categories.payments.question4"),
                answer: t("faq_page.categories.payments.answer4")
            },
        ]
    },
    {
        title: t("faq_page.categories.security.title"),
        faqs: [
            {
                question:t("faq_page.categories.security.question1"),
                answer: t("faq_page.categories.security.answer1")
            },
            {
                question: t("faq_page.categories.security.question2"),
                answer: t("faq_page.categories.security.answer2")
            },
            {
                question: t("faq_page.categories.security.question3"),
                answer: t("faq_page.categories.security.answer3")
            },
            {
                question: t("faq_page.categories.security.question4"),
                answer: t("faq_page.categories.security.answer4")
            },
        ]
    },
    {
        title: t("faq_page.categories.referrals.title"),
        faqs: [
            {
                question: t("faq_page.categories.referrals.question1"),
                answer: t("faq_page.categories.referrals.answer1")
            },
            {
                question: t("faq_page.categories.referrals.question2"),
                answer: t("faq_page.categories.referrals.answer2")
            },
            {
                question: t("faq_page.categories.referrals.question3"),
                answer: t("faq_page.categories.referrals.answer3")
            },
        ]
    },
];


    
    const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});


    const toggleItem = (categoryIdx: number, faqIdx: number) => {
        const key = `${categoryIdx}-${faqIdx}`;
        setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
    };



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
                            <HelpCircle className="w-6 h-6 text-purple-400" />
                            <h1 className="text-xl font-bold">{t("faq_page.header.title")}</h1>
                        </div>
                    </div>
                    <Link href="/contact" className="px-4 py-2 bg-[#1A1D2E] border border-[#2A2D3E] rounded-lg font-semibold text-sm hover:bg-[#252840] transition-all">
                        {t("faq_page.header.contact")}
                    </Link>
                </div>
            </div>

            {/* Hero Section */}
            <section className="py-16 px-4 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                         {t("faq_page.hero.title")}
                    </h2>
                    <p className="text-lg text-[#9CA3AF]">
                        {t("faq_page.hero.description")}
                    </p>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    {faqCategories.map((category, categoryIdx) => (
                        <div key={categoryIdx} className="mb-10">
                            <h3 className="text-xl font-bold mb-4 text-purple-400">{category.title}</h3>
                            <div className="space-y-3">
                                {category.faqs.map((faq, faqIdx) => {
                                    const isOpen = openItems[`${categoryIdx}-${faqIdx}`];
                                    return (
                                        <div 
                                            key={faqIdx}
                                            className="rounded-xl bg-[#1A1D2E] border border-[#2A2D3E] overflow-hidden"
                                        >
                                            <button
                                                onClick={() => toggleItem(categoryIdx, faqIdx)}
                                                className="w-full flex items-center justify-between p-4 text-left hover:bg-[#252840] transition-colors"
                                            >
                                                <span className="font-medium pr-4">{faq.question}</span>
                                                <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                            </button>
                                            {isOpen && (
                                                <div className="px-4 pb-4 text-[#9CA3AF] border-t border-[#2A2D3E] pt-4">
                                                    {faq.answer}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
