"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DateImg from '../../../public/assets/date.png'
import SecurityComponent from "./SecurityComponent";
import PreferencesComponent from "./PreferencesComponent";
import OthersComponents from "./OthersComponents";
import { useTranslation } from "react-i18next";


const SettingsDashboard = () => {
    const { t } = useTranslation();
    type Tab = "personal" | "security" | "preferences" | "others" | "support";

    const [activeTab, setActiveTab] = useState<Tab>("personal");

    

    return (
        <div className="w-full bg-[#151728] flex justify-center items-start">

            <div className="w-full bg-[#151728] rounded-xl">
                {/* Tabs */}
                <div className="flex border-b border-gray-700 mb-6">
                    {[
                        { key: "personal", label: t("settings.tabs.personal") },
                        { key: "security", label: t("settings.tabs.security") },
                        { key: "preferences", label: t("settings.tabs.preferences") },
                        { key: "others", label: t("settings.tabs.others") },
                        { key: "support", label: t("settings.tabs.support") },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key as Tab)}
                            className={`flex-1 py-3 text-center md:text-lg text-xs font-medium transition-all ${activeTab === tab.key
                                ? "text-[#4DD6C1] border-b-2 border-[#4DD6C1]"
                                : "text-gray-400 hover:text-gray-200"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div>
                    {activeTab === "personal" && <PersonalInformation />}
                    {activeTab === "security" && <Security />}
                    {activeTab === "preferences" && <Preferences />}
                    {activeTab === "others" && <Others />}
                    {activeTab === "support" && <Support />}
                </div>
            </div>
        </div>
    );
};

export default SettingsDashboard;

const Input = ({
    label,
    type = "text",
    placeholder,
    value,
}: {
    label: string;
    type?: string;
    placeholder?: string;
    value?: string;
}) => (
    <div className="flex flex-col gap-2 mb-4">
        <label className="text-[#B3B6C7] text-md">{label}</label>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            className="w-full px-4 py-3 rounded-md bg-[#26293E] text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
    </div>
);

const PersonalInformation = () => {
    const { t } = useTranslation();
    const [selectedEmoji, setSelectedEmoji] = useState<string>('😊');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [saving, setSaving] = useState(false);
    
    // Common emoji options for avatars
    const emojiOptions = [
        '😊', '😎', '🤩', '😄', '🥳', '😇', '🤓', '😏',
        '🦊', '🐱', '🐶', '🦁', '🐯', '🐻', '🐼', '🐨',
        '👨', '👩', '👦', '👧', '🧑', '👴', '👵', '🧔',
        '🎮', '🎯', '🎪', '🎨', '🎭', '🎰', '🎲', '🎳',
        '💎', '💰', '🏆', '🥇', '⭐', '🌟', '✨', '💫',
        '🔥', '💪', '🎉', '🚀', '💡', '🌈', '🎵', '❤️',
    ];

    // Load current emoji from profile
    useEffect(() => {
        const loadProfile = async () => {
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
            if (!token) return;
            
            try {
                const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
                const res = await fetch(`${api}/api/v1/user/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.profile?.emoji) {
                        setSelectedEmoji(data.profile.emoji);
                    }
                }
            } catch (err) {
                console.error("Failed to load profile", err);
            }
        };
        loadProfile();
    }, []);

    const handleSaveEmoji = async () => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) return;
        
        setSaving(true);
        try {
            const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
            const res = await fetch(`${api}/api/v1/user/profile`, {
                method: 'PUT',
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ emoji: selectedEmoji }),
            });
            if (res.ok) {
                setShowEmojiPicker(false);
            }
        } catch (err) {
            console.error("Failed to save emoji", err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <form className="space-y-4">
            {/* Avatar Emoji Selector */}
            <div className="flex flex-col gap-2 mb-6">
                <label className="text-[#B3B6C7] text-md">{t("settings.personal.profileAvatar")}</label>
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-purple-600 flex items-center justify-center text-4xl hover:scale-105 transition-transform border-4 border-teal-500/50"
                    >
                        {selectedEmoji}
                    </button>
                    <div className="text-sm text-[#9CA3AF]">
                        <p>{t("settings.personal.clickToChange")}</p>
                        <p className="text-xs text-[#6B7280] mt-1">{t("settings.personal.avatarDesc")}</p>
                    </div>
                </div>
                
                {/* Emoji Picker Grid */}
                {showEmojiPicker && (
                    <div className="mt-3 p-4 bg-[#26293E] rounded-lg border border-[#30334A]">
                        <div className="grid grid-cols-8 gap-2 mb-4">
                            {emojiOptions.map((emoji) => (
                                <button
                                    key={emoji}
                                    type="button"
                                    onClick={() => setSelectedEmoji(emoji)}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl hover:bg-[#30334A] transition ${
                                        selectedEmoji === emoji ? 'bg-teal-500/30 ring-2 ring-teal-500' : 'bg-[#1E2133]'
                                    }`}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={handleSaveEmoji}
                            disabled={saving}
                            className="w-full py-2 rounded-md bg-gradient-to-t from-[#099F86] to-[#0EA88F] text-white font-medium transition disabled:opacity-50"
                        >
                            {saving ? t("settings_page.change_password.saving") : t("settings.personal.save")}
                        </button>
                    </div>
                )}
            </div>

            <Input label="Username" />
            <Input label="Email Address" type="email" />
            <div className="flex flex-col gap-2 mb-4">
                <label className="text-gray-300 text-sm">{t("settings.personal.dob")}</label>
                <div className="relative">
                    <input
                        type="text"
                        className="w-full px-4 py-3 rounded-md bg-[#26293E] text-gray-200 focus:outline-none"
                    />
                    <span className="absolute right-3 top-3 text-gray-400">
                        <Image
                            src={DateImg}
                            alt="Profile"
                            width={20}
                            height={20}
                            className="rounded-full"
                        />
                    </span>
                </div>
            </div>
            <Input label="Post code" value="37590232" />
            <button
                type="submit"
                className="w-full py-4 rounded-md bg-gradient-to-t cursor-pointer from-[#099F86] to-[#0EA88F] text-white font-medium transition"
            >
                {t("settings.personal.savebutton")}
            </button>
        </form>
    );
};

const Security = () => (
    <SecurityComponent />
);

const Preferences = () => (
    <PreferencesComponent />
);

const Others = () => (
    <OthersComponents />
);

const Support = () => {
    const router = useRouter();
    const [activeChannel, setActiveChannel] = useState<"faq" | "chat">("faq");
    const { t } = useTranslation();

    const channels = [
        { id: "General", label: t("settings.support.general"), online: true },
        { id: "Support", label: t("settings.support.support"), online: false },
    ];

    return (
        <div className="w-full h-auto">
            {/* Channel Switcher */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setActiveChannel("faq")}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                        activeChannel === "faq"
                            ? "bg-[#099F86] text-white"
                            : "bg-[#26293E] text-[#9CA3AF] hover:text-white"
                    }`}
                >
                    {t("settings.support.faq")}
                </button>
                <button
                    onClick={() => setActiveChannel("chat")}
                    className={`px-6 py-2 rounded-lg font-medium transition-all ${
                        activeChannel === "chat"
                            ? "bg-[#099F86] text-white"
                            : "bg-[#26293E] text-[#9CA3AF] hover:text-white"
                    }`}
                >
                    {t("settings.support.chat")}
                </button>
            </div>

            {/* FAQ Tab */}
            {activeChannel === "faq" && (
                <div className="space-y-6">
                    {/* Withdrawal Times */}
                    <div className="bg-[#26293E] rounded-lg p-6 border border-[#30334A]">
                        <h3 className="text-lg font-semibold text-white mb-4">{t("settings.support.withdrawalTimes")}</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-[#30334A]">
                                <span className="text-[#9CA3AF]">{t("settings.support.withdrawalUnder5")}</span>
                                <span className="text-white font-medium">{t("settings.support.withdrawalInstant")}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#30334A]">
                                <span className="text-[#9CA3AF]">{t("settings.support.withdrawal10_15")}</span>
                                <span className="text-white font-medium">{t("settings.support.withdrawal15Days")}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-[#30334A]">
                                <span className="text-[#9CA3AF]">{t("settings.support.withdrawal15_25")}</span>
                                <span className="text-white font-medium">{t("settings.support.withdrawal25Days")}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-[#9CA3AF]">{t("settings.support.withdrawal25Plus")}</span>
                                <span className="text-white font-medium">{t("settings.support.withdrawal35Days")}</span>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="bg-[#26293E] rounded-lg p-6 border border-[#30334A]">
                        <h3 className="text-lg font-semibold text-white mb-4">{t("settings.support.frequentlyAsked")}</h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-white font-medium mb-2">{t("settings.support.faq1_q")}</h4>
                                <p className="text-[#9CA3AF] text-sm">{t("settings.support.faq1_a")}</p>
                            </div>
                            <div className="border-t border-[#30334A] pt-4">
                                <h4 className="text-white font-medium mb-2">{t("settings.support.faq2_q")}</h4>
                                <p className="text-[#9CA3AF] text-sm">{t("settings.support.faq2_a")}</p>
                            </div>
                            <div className="border-t border-[#30334A] pt-4">
                                <h4 className="text-white font-medium mb-2">{t("settings.support.faq3_q")}</h4>
                                <p className="text-[#9CA3AF] text-sm">{t("settings.support.faq3_a")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Chat Tab */}
            {activeChannel === "chat" && (
                <div className="bg-[#26293E] rounded-lg p-6 border border-[#30334A]">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-white">{t("settings.support.chat")}</h3>
                            <p className="text-sm text-[#9CA3AF]">{t("settings.support.onlineUsers")}</p>
                        </div>
                    </div>

                    <div className="space-y-2 mb-6">
                        {channels.map((channel) => (
                            <div
                                key={channel.id}
                                className="flex items-center gap-3 p-3 rounded-lg bg-[#1C1F33] hover:bg-[#252840] cursor-pointer transition"
                            >
                                <div className={`w-2 h-2 rounded-full ${channel.online ? "bg-emerald-400" : "bg-gray-500"}`}></div>
                                <span className="text-white font-medium">{channel.label}</span>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => router.push("/chat")}
                        className="w-full py-3 bg-gradient-to-t from-[#099F86] to-[#0EA88F] text-white font-medium rounded-lg hover:opacity-90 transition"
                    >
                        {t("settings.support.openFullChat")}
                    </button>
                </div>
            )}
        </div>
    );
};
