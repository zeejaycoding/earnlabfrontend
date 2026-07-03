"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Eye, Lock, Database, Users, Mail, Globe, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function PrivacyPolicyPage() {
    const { t } = useTranslation();
    const lastUpdated = "December 1, 2025";

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
                            <Shield className="w-6 h-6 text-emerald-400" />
                            <h1 className="text-xl font-bold"> {t("privacy_policy_page.header.title")}</h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4"> {t("privacy_policy_page.hero.title")}</h2>
                    <p className="text-[#9CA3AF]">{t("privacy_policy_page.hero.last_updated")} {lastUpdated}</p>
                </div>

                {/* Introduction */}
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 mb-10">
                    <p className="text-[#9CA3AF]">
                       {t("privacy_policy_page.intro.text")}
                    </p>
                </div>

                {/* Privacy Content */}
                <div className="space-y-8">
                    <section>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                <Database className="w-5 h-5 text-blue-400" />
                            </div>
                            {t("privacy_policy_page.sections.information_collect.title")}
                        </h3>
                        <div className="bg-[#1A1D2E] border border-[#2A2D3E] rounded-xl p-6 text-[#9CA3AF] space-y-4">
                            <p className="font-medium text-white">{t("privacy_policy_page.sections.information_collect.personal_info")}:</p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>{t("privacy_policy_page.sections.information_collect.personal_items.item1")}</li>
                                <li>{t("privacy_policy_page.sections.information_collect.personal_items.item2")}</li>
                                <li>{t("privacy_policy_page.sections.information_collect.personal_items.item3")}</li>
                                <li>{t("privacy_policy_page.sections.information_collect.personal_items.item4")}</li>
                            </ul>
                            
                            <p className="font-medium text-white mt-6">{t("privacy_policy_page.sections.information_collect.auto_info")}</p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>{t("privacy_policy_page.sections.information_collect.auto_items.item1")}</li>
                                <li>{t("privacy_policy_page.sections.information_collect.auto_items.item2")}</li>
                                <li>{t("privacy_policy_page.sections.information_collect.auto_items.item3")}</li>
                                <li>{t("privacy_policy_page.sections.information_collect.auto_items.item4")}</li>
                            </ul>

                            <p className="font-medium text-white mt-6">{t("privacy_policy_page.sections.information_collect.third_party")}</p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>{t("privacy_policy_page.sections.information_collect.third_party_items.item1")}</li>
                                <li>{t("privacy_policy_page.sections.information_collect.third_party_items.item2")}</li>
                                <li>{t("privacy_policy_page.sections.information_collect.third_party_items.item3")}</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                <Eye className="w-5 h-5 text-purple-400" />
                            </div>
                            {t("privacy_policy_page.sections.usage.title")}
                        </h3>
                        <div className="bg-[#1A1D2E] border border-[#2A2D3E] rounded-xl p-6 text-[#9CA3AF] space-y-4">
                            <p>{t("privacy_policy_page.sections.usage.description")}</p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>{t("privacy_policy_page.sections.usage.items.item1")}</li>
                                <li>{t("privacy_policy_page.sections.usage.items.item2")}</li>
                                <li>{t("privacy_policy_page.sections.usage.items.item3")}</li>
                                <li>{t("privacy_policy_page.sections.usage.items.item4")}</li>
                                <li>{t("privacy_policy_page.sections.usage.items.item5")}</li>
                                <li>{t("privacy_policy_page.sections.usage.items.item6")}</li>
                                <li>{t("privacy_policy_page.sections.usage.items.item7")}</li>
                                <li>{t("privacy_policy_page.sections.usage.items.item8")}</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                                <Users className="w-5 h-5 text-orange-400" />
                            </div>
                            {t("privacy_policy_page.sections.sharing.title")}
                        </h3>
                        <div className="bg-[#1A1D2E] border border-[#2A2D3E] rounded-xl p-6 text-[#9CA3AF] space-y-4">
                            <p>{t("privacy_policy_page.sections.sharing.description")}</p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li><strong className="text-white">{t("cookie_page.third_party.items.adstitle")}</strong> {t("privacy_policy_page.sections.sharing.items.item1")}</li>
                                <li><strong className="text-white">{t("cookie_page.third_party.items.paymentstitle")}</strong> {t("privacy_policy_page.sections.sharing.items.item2")}</li>
                                <li><strong className="text-white">{t("serviceprovider")}</strong> {t("privacy_policy_page.sections.sharing.items.item3")}</li>
                                <li><strong className="text-white">{t("legalauthorities")}</strong> {t("privacy_policy_page.sections.sharing.items.item4")}</li>
                            </ul>
                            <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                <p className="text-emerald-400">
                                    {t("privacy_policy_page.sections.sharing.note")}
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                                <Lock className="w-5 h-5 text-cyan-400" />
                            </div>
                            {t("privacy_policy_page.sections.security.title")}
                        </h3>
                        <div className="bg-[#1A1D2E] border border-[#2A2D3E] rounded-xl p-6 text-[#9CA3AF] space-y-4">
                            <p>{t("privacy_policy_page.sections.security.description")}</p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>{t("privacy_policy_page.sections.security.items.item1")}</li>
                                <li>{t("privacy_policy_page.sections.security.items.item2")}</li>
                                <li>{t("privacy_policy_page.sections.security.items.item3")}</li>
                                <li>{t("privacy_policy_page.sections.security.items.item4")}</li>
                                <li>{t("privacy_policy_page.sections.security.items.item5")}</li>
                            </ul>
                            <p className="mt-4">{t("privacy_policy_page.sections.security.note")}</p>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                                <Globe className="w-5 h-5 text-pink-400" />
                            </div>
                            {t("privacy_policy_page.sections.rights.title")}
                        </h3>
                        <div className="bg-[#1A1D2E] border border-[#2A2D3E] rounded-xl p-6 text-[#9CA3AF] space-y-4">
                            <p>{t("privacy_policy_page.sections.rights.description")}</p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li><strong className="text-white">{t("privacy_policy_page.sections.rights.items.item11")}</strong> {t("privacy_policy_page.sections.rights.items.item12")}</li>
                                <li><strong className="text-white">{t("privacy_policy_page.sections.rights.items.item21")}</strong> {t("privacy_policy_page.sections.rights.items.item22")}</li>
                                <li><strong className="text-white">{t("privacy_policy_page.sections.rights.items.item31")}</strong> {t("privacy_policy_page.sections.rights.items.item32")}</li>
                                <li><strong className="text-white">{t("privacy_policy_page.sections.rights.items.item41")}</strong> {t("privacy_policy_page.sections.rights.items.item42")}</li>
                                <li><strong className="text-white">{t("privacy_policy_page.sections.rights.items.item51")}</strong> {t("privacy_policy_page.sections.rights.items.item52")}</li>
                                <li><strong className="text-white">{t("privacy_policy_page.sections.rights.items.item61")}</strong> {t("privacy_policy_page.sections.rights.items.item62")}</li>
                            </ul>
                            <p className="mt-4">{t("privacy_policy_page.sections.rights.contact")}<a href="mailto:support@labwards.com" className="text-emerald-400 hover:text-emerald-300">support@labwards.com</a></p>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                                <Trash2 className="w-5 h-5 text-red-400" />
                            </div>
                            {t("privacy_policy_page.sections.retention.title")}
                        </h3>
                        <div className="bg-[#1A1D2E] border border-[#2A2D3E] rounded-xl p-6 text-[#9CA3AF] space-y-4">
                            <p>{t("privacy_policy_page.sections.retention.description")}</p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>{t("privacy_policy_page.sections.retention.items.item1")}</li>
                                <li>{t("privacy_policy_page.sections.retention.items.item2")}</li>
                                <li>{t("privacy_policy_page.sections.retention.items.item3")}</li>
                                <li>{t("privacy_policy_page.sections.retention.items.item4")}</li>
                            </ul>
                            <p className="mt-4">{t("privacy_policy_page.sections.retention.note")}</p>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                                <Mail className="w-5 h-5 text-yellow-400" />
                            </div>
                            {t("privacy_policy_page.sections.contact.title")}
                        </h3>
                        <div className="bg-[#1A1D2E] border border-[#2A2D3E] rounded-xl p-6 text-[#9CA3AF]">
                            <p>{t("privacy_policy_page.sections.contact.description")}</p>
                            <div className="mt-4 space-y-2">
                                <p>{t("privacy_policy_page.sections.contact.email")}: <a href="mailto:support@labwards.com" className="text-emerald-400 hover:text-emerald-300">support@labwards.com</a></p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Related Links */}
                <div className="mt-12 pt-8 border-t border-[#2A2D3E]">
                    <h3 className="font-bold mb-4">{t("privacy_policy_page.related.title")}</h3>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/terms" className="px-4 py-2 bg-[#1A1D2E] border border-[#2A2D3E] rounded-lg text-sm hover:bg-[#252840] transition-colors">
                            {t("privacy_policy_page.related.terms")}
                        </Link>
                        <Link href="/cookies" className="px-4 py-2 bg-[#1A1D2E] border border-[#2A2D3E] rounded-lg text-sm hover:bg-[#252840] transition-colors">
                            {t("privacy_policy_page.related.cookies")}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
