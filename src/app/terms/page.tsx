"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Shield,
  AlertTriangle,
  Users,
  CreditCard,
  Scale,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function TermsOfServicePage() {
  const lastUpdated = "December 1, 2025";
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0C1A] via-[#0D0F1E] to-[#0A0C1A] text-white">
      {/* Header */}
      <div className="bg-[#0A0C1A] border-b border-[#2A2D3E] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/landing"
              className="p-2 rounded-lg bg-[#1A1D2E] border border-[#2A2D3E] hover:bg-[#252840] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-400" />
              <h1 className="text-xl font-bold">
                {t("cookie_page.related.terms")}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t("cookie_page.related.terms")}
          </h2>
          <p className="text-[#9CA3AF]">
            {t("cookie_page.hero.last_updated")} {lastUpdated}
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="bg-[#1A1D2E] border border-[#2A2D3E] rounded-xl p-6 mb-10">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-400" />
            {t("terms.quickNavigation")}
          </h3>
          <ul className="grid md:grid-cols-2 gap-2 text-sm">
            <li>
              <a
                href="#acceptance"
                className="text-[#9CA3AF] hover:text-blue-400"
              >
                {" "}
                {t("terms.nav.acceptance")}
              </a>
            </li>
            <li>
              <a
                href="#eligibility"
                className="text-[#9CA3AF] hover:text-blue-400"
              >
                {" "}
                {t("terms.nav.eligibility")}
              </a>
            </li>
            <li>
              <a href="#account" className="text-[#9CA3AF] hover:text-blue-400">
                {" "}
                {t("terms.nav.account")}
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="text-[#9CA3AF] hover:text-blue-400"
              >
                {" "}
                {t("terms.nav.services")}
              </a>
            </li>
            <li>
              <a
                href="#earnings"
                className="text-[#9CA3AF] hover:text-blue-400"
              >
                {" "}
                {t("terms.nav.earnings")}
              </a>
            </li>
            <li>
              <a href="#conduct" className="text-[#9CA3AF] hover:text-blue-400">
                {" "}
                {t("terms.nav.conduct")}
              </a>
            </li>
            <li>
              <a
                href="#termination"
                className="text-[#9CA3AF] hover:text-blue-400"
              >
                {" "}
                {t("terms.nav.termination")}
              </a>
            </li>
            <li>
              <a
                href="#liability"
                className="text-[#9CA3AF] hover:text-blue-400"
              >
                {" "}
                {t("terms.nav.liability")}
              </a>
            </li>
          </ul>
        </div>

        {/* Terms Content */}
        <div className="prose prose-invert max-w-none space-y-8">
          <section id="acceptance">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm">
                1
              </span>
              {t("terms.sections.acceptance.title")}
            </h3>
            <div className="bg-[#1A1D2E] border border-[#2A2D3E] rounded-xl p-6 text-[#9CA3AF] space-y-4">
              <p>{t("terms.sections.acceptance.p1")}</p>
              <p>{t("terms.sections.acceptance.p2")}</p>
            </div>
          </section>

          <section id="eligibility">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm">
                2
              </span>
              {t("terms.sections.eligibility.title")}
            </h3>
            <div className="bg-[#1A1D2E] border border-[#2A2D3E] rounded-xl p-6 text-[#9CA3AF] space-y-4">
              <p>{t("terms.sections.eligibility.intro")}</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>{t("terms.sections.eligibility.item1")}</li>
                <li>{t("terms.sections.eligibility.item2")}</li>
                <li>{t("terms.sections.eligibility.item3")}</li>
                <li>{t("terms.sections.eligibility.item4")}</li>
              </ul>
              <p>{t("terms.sections.eligibility.outro")}</p>
            </div>
          </section>

          <section id="account">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm">
                3
              </span>
              {t("terms.sections.account.title")}
            </h3>
            <div className="bg-[#1A1D2E] border border-[#2A2D3E] rounded-xl p-6 text-[#9CA3AF] space-y-4">
              <p>{t("terms.sections.account.intro")}</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>{t("terms.sections.account.item1")}</li>
                <li>{t("terms.sections.account.item2")}</li>
                <li>{t("terms.sections.account.item3")}</li>
                <li>{t("terms.sections.account.item4")}</li>
                <li>{t("terms.sections.account.item5")}</li>
              </ul>
              <p>{t("terms.sections.account.outro")}</p>
            </div>
          </section>

          <section id="services">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm">
                4
              </span>
              {t("terms.sections.services.title")}
            </h3>
            <div className="bg-[#1A1D2E] border border-[#2A2D3E] rounded-xl p-6 text-[#9CA3AF] space-y-4">
              <p>{t("terms.sections.services.intro")}</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>{t("terms.sections.services.item1")}</li>
                <li>{t("terms.sections.services.item2")}</li>
                <li>{t("terms.sections.services.item3")}</li>
                <li>{t("terms.sections.services.item4")}</li>
                <li>{t("terms.sections.services.item5")}</li>
                <li>{t("terms.sections.services.item6")}</li>
              </ul>
              <p>{t("terms.sections.services.outro")}</p>
            </div>
          </section>

          <section id="earnings">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm">
                5
              </span>
              {t("terms.sections.earnings.title")}
            </h3>
            <div className="bg-[#1A1D2E] border border-[#2A2D3E] rounded-xl p-6 text-[#9CA3AF] space-y-4">
              <p>{t("terms.sections.earnings.intro")}</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>{t("terms.sections.earnings.item1")}</li>
                <li>{t("terms.sections.earnings.item2")}</li>
                <li>{t("terms.sections.earnings.item3")}</li>
                <li>{t("terms.sections.earnings.item4")}</li>
                <li>{t("terms.sections.earnings.item5")}</li>
              </ul>
              <p>{t("terms.sections.earnings.outro")}</p>
            </div>
          </section>

          <section id="conduct">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm">
                6
              </span>
              {t("terms.sections.conduct.title")}
            </h3>
            <div className="bg-[#1A1D2E] border border-[#2A2D3E] rounded-xl p-6 text-[#9CA3AF] space-y-4">
              <p>{t("terms.sections.conduct.intro")}</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>{t("terms.sections.conduct.item1")}</li>
                <li>{t("terms.sections.conduct.item2")}</li>
                <li>{t("terms.sections.conduct.item3")}</li>
                <li>{t("terms.sections.conduct.item4")}</li>
                <li>{t("terms.sections.conduct.item5")}</li>
                <li>{t("terms.sections.conduct.item6")}</li>
                <li>{t("terms.sections.conduct.item7")}</li>
                <li>{t("terms.sections.conduct.item8")}</li>
              </ul>
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{t("terms.sections.conduct.warning")}</span>
                </p>
              </div>
            </div>
          </section>

          <section id="termination">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm">
                7
              </span>
              {t("terms.sections.termination.title")}
            </h3>
            <div className="bg-[#1A1D2E] border border-[#2A2D3E] rounded-xl p-6 text-[#9CA3AF] space-y-4">
              <p>{t("terms.sections.termination.intro")}</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>{t("terms.sections.termination.item1")}</li>
                <li>{t("terms.sections.termination.item2")}</li>
                <li>{t("terms.sections.termination.item3")}</li>
                <li>{t("terms.sections.termination.item4")}</li>
              </ul>
              <p>{t("terms.sections.termination.outro")}</p>
            </div>
          </section>

          <section id="liability">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm">
                8
              </span>
              {t("terms.sections.liability.title")}
            </h3>
            <div className="bg-[#1A1D2E] border border-[#2A2D3E] rounded-xl p-6 text-[#9CA3AF] space-y-4">
              <p>{t("terms.sections.liability.intro")}</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>{t("terms.sections.liability.item1")}</li>
                <li>{t("terms.sections.liability.item2")}</li>
                <li>{t("terms.sections.liability.item3")}</li>
                <li>{t("terms.sections.liability.item4")}</li>
              </ul>
            </div>
          </section>

          <section id="contact">
            <h3 className="text-xl font-bold mb-4">
              {t("terms.sections.contact.title")}
            </h3>
            <div className="bg-[#1A1D2E] border border-[#2A2D3E] rounded-xl p-6 text-[#9CA3AF]">
              <p>{t("terms.sections.contact.desc")}</p>
              <p className="mt-2">
                <a
                  href="mailto:support@labwards.com"
                  className="text-blue-400 hover:text-blue-300"
                >
                  support@labwards.com
                </a>
              </p>
            </div>
          </section>
        </div>

        {/* Related Links */}
        <div className="mt-12 pt-8 border-t border-[#2A2D3E]">
          <h3 className="font-bold mb-4">{t("terms.relatedPolicies")}</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/privacy"
              className="px-4 py-2 bg-[#1A1D2E] border border-[#2A2D3E] rounded-lg text-sm hover:bg-[#252840] transition-colors"
            >
              {t("terms.privacyPolicy")}
            </Link>
            <Link
              href="/cookies"
              className="px-4 py-2 bg-[#1A1D2E] border border-[#2A2D3E] rounded-lg text-sm hover:bg-[#252840] transition-colors"
            >
              {t("terms.cookiePolicy")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
