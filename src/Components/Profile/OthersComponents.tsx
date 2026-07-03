"use client";
import { useState } from "react";
import { Loader2, Gift } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateProfileFields } from "@/store/userSlice";
import { useTranslation } from "react-i18next";

const OthersComponents = () => {
    const { t } = useTranslation();
    const [selected, setSelected] = useState<string>("");
    const [bonusCode, setBonusCode] = useState("");
    const [isRedeeming, setIsRedeeming] = useState(false);
    const dispatch = useDispatch();

    const options = [t("others.day1"), t("others.day3"), t("others.day7"), t("others.day14"), t("others.day30")];

    const handleRedeemBonus = async () => {
        if (!bonusCode.trim()) {
            toast.error(t("others.pleaseEnterBonusCode"));
            return;
        }

        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token) {
            toast.error(t("others.pleaseSignIn"));
            return;
        }

        setIsRedeeming(true);
        try {
            const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
            const res = await fetch(`${api}/api/v1/games/user/bonus-code/redeem`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code: bonusCode.trim() }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(`🎁 ${data.message || t("others.bonusRedeemed")}! +$${(data.rewardCents / 100).toFixed(2)}`);
                
                // Update balance in Redux
                if (typeof data.newBalanceCents === "number") {
                    dispatch(updateProfileFields({ balanceCents: data.newBalanceCents }));
                }

                // Clear the input
                setBonusCode("");

                // Emit event to update balance in Topbar
                if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("balance-updated", { 
                        detail: { balanceCents: data.newBalanceCents } 
                    }));
                }
            } else {
                toast.error(data.message || t("others.failedRedeem"));
            }
        } catch (err) {
            console.error("Error redeeming bonus code:", err);
            toast.error(t("others.failedRedeem"));
        } finally {
            setIsRedeeming(false);
        }
    };

    return (
        <div className="w-full space-y-8">
            {/* Bonus Code Section */}
            <div className="md:w-[58%]">
                <h2 className="text-white text-lg font-semibold mb-2 flex items-center gap-2">
                    <Gift size={20} className="text-teal-400" />
                    {t("others.bonusCode")}
                </h2>
                <p className="text-[#8C8FA8] text-sm mb-4">
                    {t("others.bonusDescription")}
                </p>
                
                <div className="flex flex-col gap-3">
                    <input
                        type="text"
                        value={bonusCode}
                        onChange={(e) => setBonusCode(e.target.value.toUpperCase())}
                        placeholder={t("others.enterBonusCode")}
                        className="px-4 py-3 text-sm bg-[#26293E] border border-gray-700 rounded-md outline-none text-white focus:border-teal-400 transition"
                        disabled={isRedeeming}
                    />
                    <button 
                        onClick={handleRedeemBonus}
                        disabled={isRedeeming || !bonusCode.trim()}
                        className="w-full px-4 py-3 bg-gradient-to-r from-[#099F86] to-[#0EA88F] text-white font-medium rounded-md transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isRedeeming ? (
                            <>
                                <Loader2 className="animate-spin" size={16} />
                                {t("others.redeeming")}
                            </>
                        ) : (
                            <>
                                <Gift size={16} />
                                {t("others.redeemBonusCode")}
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Self-exclusion Section */}
            <div className="md:w-[58%]">
                <h2 className="text-white text-lg font-semibold mb-2">{t("others.selfExclusion")}</h2>
            <p className="text-[#8C8FA8] text-sm mb-6">
                {t("others.selfExclusionDescription")}
            </p>

            {/* Options */}
            <div className="flex flex-wrap md:gap-3 gap-2 mb-3">
                {options.map((opt) => (
                    <button
                        key={opt}
                        onClick={() => setSelected(opt)}
                        className={`md:px-10 px-3 md:py-4 py-2 rounded-md md:text-sm text-xs font-medium transition ${selected === opt
                            ? "bg-teal-500 text-white"
                            : "bg-[#26293E] text-[#B3B6C]"
                            }`}
                    >
                        {opt}
                    </button>
                ))}
            </div>

            {/* Action Button */}
            <button
                disabled={!selected}
                className={'w-full bg-[#9F0909] md:py-4 py-3 cursor-pointer rounded-md font-medium text-white transition'}
            >
                {t("others.activateSelfExclusion")}
            </button>
            </div>
        </div>
    );
};

export default OthersComponents;
