"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ClipboardList,
  Clock,
  DollarSign,
  Shield,
  Star,
  TrendingUp,
  Users,
  CheckCircle,
  Target,
  MessageSquare,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function SurveysInfoPage() {
  const { t } = useTranslation();

  const tips = [
    t("surveysInfo.tips.tip1"),
    t("surveysInfo.tips.tip2"),
    t("surveysInfo.tips.tip3"),
    t("surveysInfo.tips.tip4"),
    t("surveysInfo.tips.tip5"),
  ];

  const benefits = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: t("surveysInfo.benefits.benefit1Title"),
      description: t("surveysInfo.benefits.benefit1Description"),
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t("surveysInfo.benefits.benefit2Title"),
      description: t("surveysInfo.benefits.benefit2Description"),
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t("surveysInfo.benefits.benefit3Title"),
      description: t("surveysInfo.benefits.benefit3Description"),
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: t("surveysInfo.benefits.benefit4Title"),
      description: t("surveysInfo.benefits.benefit4Description"),
    },
  ];

  const surveyProviders = [
    {
      name: t("surveysInfo.bitlabs"),
      avgPay: "$1.50",
      surveys: "50+",
      time: "5-15 min",
    },
    {
      name: t("surveysInfo.cpx"),
      avgPay: "$2.00",
      surveys: "40+",
      time: "10-20 min",
    },
    {
      name: t("surveysInfo.theorem"),
      avgPay: "$1.25",
      surveys: "60+",
      time: "5-10 min",
    },
    {
      name: t("surveysInfo.pollfish"),
      avgPay: "$0.75",
      surveys: "100+",
      time: "2-8 min",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0C1A] via-[#0D0F1E] to-[#0A0C1A] text-white">
      {/* Header */}
      <div className="bg-[#0A0C1A] border-b border-[#2A2D3E] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <div className="flex items-center gap-4">
            <Link
              href="/landing"
              className="p-2 rounded-lg bg-[#1A1D2E] border border-[#2A2D3E] hover:bg-[#252840] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <ClipboardList className="w-6 h-6 text-blue-400" />
              <h1 className="text-xl font-bold">{t("surveysInfo.title")}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <ClipboardList className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">
                {t("surveysInfo.shareOpinion")}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {t("surveysInfo.heroTitle")}
            </h2>
            <p className="text-lg text-[#9CA3AF] leading-relaxed">
              {t("surveysInfo.heroDescription")}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="text-center p-6 rounded-xl bg-[#1A1D2E] border border-[#2A2D3E]">
              <div className="text-3xl font-bold text-white mb-1">200+</div>
              <div className="text-sm text-[#9CA3AF]">
                {t("surveysInfo.stats.dailySurveys")}
              </div>
            </div>
            <div className="text-center p-6 rounded-xl bg-[#1A1D2E] border border-[#2A2D3E]">
              <div className="text-3xl font-bold text-white mb-1">$5</div>
              <div className="text-sm text-[#9CA3AF]">
                {t("surveysInfo.stats.avgPerSurvey")}
              </div>
            </div>
            <div className="text-center p-6 rounded-xl bg-[#1A1D2E] border border-[#2A2D3E]">
              <div className="text-3xl font-bold text-white mb-1">30K+</div>
              <div className="text-sm text-[#9CA3AF]">
                {t("surveysInfo.stats.surveyTakers")}
              </div>
            </div>
            <div className="text-center p-6 rounded-xl bg-[#1A1D2E] border border-[#2A2D3E]">
              <div className="text-3xl font-bold text-white mb-1">$750K+</div>
              <div className="text-sm text-[#9CA3AF]">
                {t("surveysInfo.stats.paidOut")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Survey Providers */}
      <section className="py-16 px-4 bg-[#0D0F1E]/50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-400" />
            {t("surveysInfo.partners")}
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {surveyProviders.map((provider, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#1A1D2E] border border-[#2A2D3E] p-6 hover:border-blue-500/50 transition-all duration-300"
              >
                <h4 className="text-xl font-bold mb-4">{provider.name}</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9CA3AF]">
                      {t("surveysInfo.providerLabels.avgPay")}
                    </span>
                    <span className="text-emerald-400 font-bold">
                      {provider.avgPay}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9CA3AF]">
                      {t("surveysInfo.providerLabels.surveys")}
                    </span>
                    <span className="text-white">{provider.surveys}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#9CA3AF]">
                      {t("surveysInfo.providerLabels.duration")}
                    </span>
                    <span className="text-white">{provider.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">
            {t("surveysInfo.howItWorks")}
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: t("surveysInfo.steps.step1Title"),
                desc: t("surveysInfo.steps.step1Desc"),
              },
              {
                step: "2",
                title: t("surveysInfo.steps.step2Title"),
                desc: t("surveysInfo.steps.step2Desc"),
              },
              {
                step: "3",
                title: t("surveysInfo.steps.step3Title"),
                desc: t("surveysInfo.steps.step3Desc"),
              },
              {
                step: "4",
                title: t("surveysInfo.steps.step4Title"),
                desc: t("surveysInfo.steps.step4Desc"),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="text-center p-6 rounded-xl bg-[#1A1D2E] border border-[#2A2D3E]"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h4 className="font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-[#9CA3AF]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4 bg-[#0D0F1E]/50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">
            {t("surveysInfo.tipsTitle")}
          </h3>
          <div className="bg-[#1A1D2E] border border-[#2A2D3E] rounded-2xl p-8">
            <ul className="space-y-4">
              {tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-[#9CA3AF]">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">
            {t("surveysInfo.benefitsTitle")}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#1A1D2E] border border-[#2A2D3E] hover:border-blue-500/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 text-blue-400">
                  {benefit.icon}
                </div>
                <h4 className="font-bold mb-2">{benefit.title}</h4>
                <p className="text-sm text-[#9CA3AF]">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
