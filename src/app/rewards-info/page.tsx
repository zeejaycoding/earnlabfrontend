"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Gift, DollarSign, Zap, Shield, Clock, CreditCard, Bitcoin, ShoppingBag, Smartphone } from "lucide-react";
import { useTranslation } from "react-i18next";

import PaypalImg from "../../../public/assets/paypal.png";
import VisaImg from "../../../public/assets/visa.png";
import BitcoinImg from "../../../public/assets/bit.png";
import AmazonImg from "../../../public/assets/amazon.png";


export default function RewardsInfoPage() {
    const { t } = useTranslation();

    const rewardTypes = [
    {
        icon: <DollarSign className="w-8 h-8" />,
        title: t("rewards_page.reward_types.cash_rewards.title"),
        description:  t("rewards_page.reward_types.cash_rewards.description"),
        color: "emerald",
    },
    {
        icon: <ShoppingBag className="w-8 h-8" />,
        title:  t("rewards_page.reward_types.gift_cards.title"),
        description:  t("rewards_page.reward_types.gift_cards.description"),
        color: "purple",
    },
    {
        icon: <Bitcoin className="w-8 h-8" />,
        title: t("rewards_page.reward_types.crypto.title"),
        description: t("rewards_page.reward_types.crypto.description"),
        color: "orange",
    },
    {
        icon: <Smartphone className="w-8 h-8" />,
        title: t("rewards_page.reward_types.mobile_topup.title"),
        description: t("rewards_page.reward_types.mobile_topup.description"),
        color: "blue",
    },
];

const payoutMethods = [
    {
        icon: PaypalImg,
        name: t("rewards_page.payout_methods_section.methods.paypal.name"),
        minWithdraw: "$5",
        processingTime: t("rewards_page.payout_methods_section.methods.paypal.processing"),
        fee: t("rewards_page.payout_methods_section.methods.paypal.fee"),
    },
    {
        icon: VisaImg,
        name: t("rewards_page.payout_methods_section.methods.visa.name"),
        minWithdraw: "$10",
        processingTime: t("rewards_page.payout_methods_section.methods.visa.processing"),
        fee: t("rewards_page.payout_methods_section.methods.visa.fee"),
    },
    {
        icon: BitcoinImg,
        name: t("rewards_page.payout_methods_section.methods.bitcoin.name"),
        minWithdraw: "$2",
        processingTime: t("rewards_page.payout_methods_section.methods.bitcoin.processing"),
        fee: t("rewards_page.payout_methods_section.methods.bitcoin.fee"),
    },
    {
        icon: AmazonImg,
        name: t("rewards_page.payout_methods_section.methods.amazon.name"),
        minWithdraw: "$5",
        processingTime: t("rewards_page.payout_methods_section.methods.amazon.processing"),
        fee: t("rewards_page.payout_methods_section.methods.amazon.fee"),
    },
];


const features = [
    {
        icon: <Zap className="w-6 h-6" />,
        title: t("rewards_page.features.instant_payouts.title"),
        description: t("rewards_page.features.instant_payouts.description"),
    },
    {
        icon: <Shield className="w-6 h-6" />,
        title: t("rewards_page.features.secure_transactions.title"),
        description: t("rewards_page.features.secure_transactions.description"),
    },
    {
        icon: <Clock className="w-6 h-6" />,
        title: t("rewards_page.features.low_minimums.title"),
        description: t("rewards_page.features.low_minimums.description"),
    },
    {
        icon: <CreditCard className="w-6 h-6" />,
        title: t("rewards_page.features.no_fees.title"),
        description: t("rewards_page.features.no_fees.description"),
    },
];



    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0A0C1A] via-[#0D0F1E] to-[#0A0C1A] text-white">
            {/* Header */}
            <div className="bg-[#0A0C1A] border-b border-[#2A2D3E] sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/landing" className="p-2 rounded-lg bg-[#1A1D2E] border border-[#2A2D3E] hover:bg-[#252840] transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div className="flex items-center gap-2">
                            <Gift className="w-6 h-6 text-purple-400" />
                            <h1 className="text-xl font-bold">{t("rewards_page.header.title")}</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <section className="py-16 px-4 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                            <Gift className="w-4 h-4 text-purple-400" />
                            <span className="text-sm font-medium text-purple-400">{t("rewards_page.hero.badge")}</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            {t("rewards_page.hero.title")}
                        </h2>
                        <p className="text-lg text-[#9CA3AF] leading-relaxed">
                            {t("rewards_page.hero.description")}
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                        <div className="text-center p-6 rounded-xl bg-[#1A1D2E] border border-[#2A2D3E]">
                            <div className="text-3xl font-bold text-white mb-1">$5</div>
                            <div className="text-sm text-[#9CA3AF]">{t("rewards_page.stats.min_withdrawal")}</div>
                        </div>
                        <div className="text-center p-6 rounded-xl bg-[#1A1D2E] border border-[#2A2D3E]">
                            <div className="text-3xl font-bold text-white mb-1">10+</div>
                            <div className="text-sm text-[#9CA3AF]">{t("rewards_page.stats.payout_methods")}</div>
                        </div>
                        <div className="text-center p-6 rounded-xl bg-[#1A1D2E] border border-[#2A2D3E]">
                            <div className="text-3xl font-bold text-white mb-1">{t("rewards_page.payout_methods_section.methods.paypal.processing")}</div>
                            <div className="text-sm text-[#9CA3AF]">{t("rewards_page.stats.processing")}</div>
                        </div>
                        <div className="text-center p-6 rounded-xl bg-[#1A1D2E] border border-[#2A2D3E]">
                            <div className="text-3xl font-bold text-white mb-1">$2M+</div>
                            <div className="text-sm text-[#9CA3AF]">{t("rewards_page.stats.paid_out")}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reward Types */}
            <section className="py-16 px-4 bg-[#0D0F1E]/50">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-2xl font-bold mb-8 text-center">{t("rewards_page.reward_types.title")}</h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {rewardTypes.map((reward, idx) => (
                            <div key={idx} className="rounded-2xl bg-[#1A1D2E] border border-[#2A2D3E] p-6 hover:border-purple-500/50 transition-all duration-300">
                                <div className={`w-16 h-16 rounded-xl bg-${reward.color}-500/10 flex items-center justify-center mb-4 text-${reward.color}-400`}>
                                    {reward.icon}
                                </div>
                                <h4 className="text-xl font-bold mb-2">{reward.title}</h4>
                                <p className="text-sm text-[#9CA3AF]">{reward.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Payout Methods */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-2xl font-bold mb-8 text-center">{t("rewards_page.payout_methods_section.title")}</h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {payoutMethods.map((method, idx) => (
                            <div key={idx} className="rounded-2xl bg-[#1A1D2E] border border-[#2A2D3E] p-6 hover:border-purple-500/50 transition-all duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-lg bg-[#252840] p-2">
                                        <Image src={method.icon} alt={method.name} className="w-full h-full object-contain" />
                                    </div>
                                    <h4 className="text-lg font-bold">{method.name}</h4>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-[#9CA3AF]">{t("rewards_page.payout_methods_section.labels.min_withdraw")}</span>
                                        <span className="text-white">{method.minWithdraw}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#9CA3AF]">{t("rewards_page.payout_methods_section.labels.processing")}</span>
                                        <span className="text-emerald-400">{method.processingTime}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#9CA3AF]">{t("rewards_page.payout_methods_section.labels.fee")}</span>
                                        <span className="text-white">{method.fee}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 px-4 bg-[#0D0F1E]/50">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-2xl font-bold mb-8 text-center">{t("rewards_page.features.title")}</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, idx) => (
                            <div key={idx} className="p-6 rounded-xl bg-[#1A1D2E] border border-[#2A2D3E] hover:border-purple-500/50 transition-colors">
                                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 text-purple-400">
                                    {feature.icon}
                                </div>
                                <h4 className="font-bold mb-2">{feature.title}</h4>
                                <p className="text-sm text-[#9CA3AF]">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
