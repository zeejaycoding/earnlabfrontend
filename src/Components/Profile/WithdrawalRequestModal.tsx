"use client";

import React, { useState, useEffect } from "react";
import { FaX } from "react-icons/fa6";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface WithdrawalMethod {
  key: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface WithdrawalRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  userBalance: number;
  onSuccess: () => void;
}


const PRESET_AMOUNTS = [5, 10, 20, 25, 50, 100];


const WithdrawalRequestModal: React.FC<WithdrawalRequestModalProps> = ({
  isOpen,
  onClose,
  userBalance,
  onSuccess,
}) => {
  const [methods, setMethods] = useState<WithdrawalMethod[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [giftCardType, setGiftCardType] = useState<string>("");
  const [cryptoType, setCryptoType] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  const CRYPTO_TYPES = [
  { id: "btc", name: t("rewards.bitcoin") },
  { id: "eth", name: t("cards_cc.ethereum") },
  { id: "ltc", name:  t("cards_cc.litecoin") },
  { id: "usdt", name: t("cards_cc.usdt")},
  { id: "sol", name: t("cards_cc.solana") },
];


  const GIFT_CARD_TYPES = [
  { id: "amazon", name: t("rewards.amazon") },
  { id: "google_play", name: t("rewards.google_play") },
  { id: "apple_itunes", name: t("rewards.apple_itunes") },
  { id: "steam", name: t("cards_cc.steam") },
  { id: "xbox", name: t("rewards.xbox") },
  { id: "playstation", name: t("rewards.playstation") },
  { id: "netflix", name: t("rewards.netflix") },
  { id: "spotify", name: t("rewards.spotify") },
  { id: "roblox", name: t("rewards.roblox") },
  { id: "nintendo", name: t("rewards.nintendo") },
];


  useEffect(() => {
    if (isOpen) {
      fetchMethods();
    }
  }, [isOpen]);

  const fetchMethods = async () => {
    try {
      const response = await axios.get("/api/v1/payouts/options");
      setMethods(response.data);
      if (response.data.length > 0) {
        setSelectedMethod(response.data[0].key);
      }
    } catch (err) {
      console.error("Failed to fetch withdrawal methods:", err);
      setError(t("withdrawalModal.errors.failedToLoad"));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!selectedMethod) {
      setError(t("withdrawalModal.errors.selectMethod"));
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError(t("withdrawalModal.errors.invalidAmount"));
      return;
    }

    const amountValue = parseFloat(amount);
    if (amountValue < 5) {
      setError(t("withdrawalModal.errors.minimumAmount"));
      return;
    }

    const amountCents = Math.round(amountValue * 100);
    if (amountCents > userBalance) {
      setError(t("withdrawalModal.errors.insufficientBalance"));
      return;
    }

    if (!destination) {
      setError(
        selectedMethod === "giftcard"
          ? t("withdrawalModal.errors.enterEmail")
          : selectedMethod === "paypal"
            ? t("withdrawalModal.errors.enterPayPalEmail")
            : selectedMethod === "crypto"
              ? t("withdrawalModal.errors.walletAddress")
              : t("withdrawalModal.errors.enterDestination")
      );
      return;
    }

    // Validate email format for PayPal and gift card
    if ((selectedMethod === "paypal" || selectedMethod === "giftcard") && destination) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(destination)) {
        setError(t("withdrawalModal.errors.invalidEmail"));
        return;
      }
    }

    if (selectedMethod === "giftcard" && !giftCardType) {
      setError(t("withdrawalModal.errors.selectGiftCardType"));
      return;
    }

    if (selectedMethod === "crypto" && !cryptoType) {
      setError(t("withdrawalModal.errors.selectCryptoType"));
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/v1/user/withdrawals/request",
        {
          amountCents,
          method: selectedMethod,
          destination,
          giftCardType: selectedMethod === "giftcard" ? giftCardType : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      setAmount("");
      setDestination("");
      setGiftCardType("");
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          t("withdrawalModal.errors.submissionFailed")
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1E2133] rounded-lg p-5 max-w-sm w-full mx-4 border border-[#2A2D44] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">{t("withdrawalModal.title")}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <FaX size={20} />
          </button>
        </div>

        {success ? (
          <div className="text-center py-6">
            <div className="text-green-500 text-4xl mb-3">✓</div>
            <h3 className="text-lg font-bold text-white mb-2">
              {t("withdrawalModal.success.title")}
            </h3>
            <p className="text-gray-400 text-sm">
              {t("withdrawalModal.success.description")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-2.5 text-red-400 text-xs">
                {error}
              </div>
            )}

            {/* Balance Info */}
            <div className="bg-[#151728] rounded-lg p-2.5 border border-[#2A2D44]">
              <p className="text-gray-400 text-xs">{t("withdrawalModal.balance")}</p>
              <p className="text-xl font-bold text-[#18C3A7]">
                ${(userBalance / 100).toFixed(2)}
              </p>
            </div>

            {/* Method Selection */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">
                {t("withdrawalModal.method")}
              </label>
              <select
                value={selectedMethod}
                onChange={(e) => {
                  setSelectedMethod(e.target.value);
                  setDestination("");
                  setGiftCardType("");
                  setCryptoType("");
                }}
                className="w-full bg-[#151728] border border-[#2A2D44] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#18C3A7]"
              >
                {methods.map((method) => (
                  <option key={method.key} value={method.key}>
                    {method.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Preset Amount Buttons */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">
                {t("withdrawalModal.amount")}
              </label>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {PRESET_AMOUNTS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset.toString())}
                    className={`py-2 px-3 rounded-lg text-sm font-semibold transition ${
                      amount === preset.toString()
                        ? "bg-[#18C3A7] text-black"
                        : "bg-[#151728] border border-[#2A2D44] text-white hover:border-[#18C3A7]"
                    }`}
                  >
                    ${preset}
                  </button>
                ))}
              </div>
              <input
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={t("withdrawalModal.customAmountPlaceholder")}
                className="w-full bg-[#151728] border border-[#2A2D44] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#18C3A7]"
              />
            </div>

            {/* Gift Card Type Selection */}
            {selectedMethod === "giftcard" && (
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  {t("withdrawalModal.giftCardType")}
                </label>
                <select
                  value={giftCardType}
                  onChange={(e) => setGiftCardType(e.target.value)}
                  className="w-full bg-[#151728] border border-[#2A2D44] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#18C3A7]"
                >
                  <option value="">{t("withdrawalModal.selectGiftCardType")}</option>
                  {GIFT_CARD_TYPES.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Crypto Type Selection */}
            {selectedMethod === "crypto" && (
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  {t("withdrawalModal.cryptocurrency")}
                </label>
                <select
                  value={cryptoType}
                  onChange={(e) => setCryptoType(e.target.value)}
                  className="w-full bg-[#151728] border border-[#2A2D44] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#18C3A7]"
                >
                  <option value="">{t("withdrawalModal.selectCryptocurrency")}</option>
                  {CRYPTO_TYPES.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Destination Input */}
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">
                {selectedMethod === "giftcard"
                  ? t("withdrawalModal.giftCardEmail")
                  : selectedMethod === "crypto"
                    ? t("withdrawalModal.walletAddress")
                    : selectedMethod === "paypal"
                      ? t("withdrawalModal.paypalEmail")
                      : selectedMethod === "bank_transfer"
                        ? t("withdrawalModal.bankAccountDetails")
                        : t("withdrawalModal.destination")}
              </label>
              <input
                type={selectedMethod === "giftcard" || selectedMethod === "paypal" ? "email" : "text"}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder={
                  selectedMethod === "giftcard"
                    ? t("withdrawalModal.giftCardEmailPlaceholder")
                    : selectedMethod === "paypal"
                      ? t("withdrawalModal.paypalEmailPlaceholder")
                      : selectedMethod === "crypto"
                        ? t("withdrawalModal.walletAddressPlaceholder")
                        : selectedMethod === "bank_transfer"
                          ? t("withdrawalModal.bankAccountDetailsPlaceholder")
                          : t("withdrawalModal.destinationPlaceholder")
                }
                className="w-full bg-[#151728] border border-[#2A2D44] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#18C3A7]"
              />
              {/* PayPal specific help text */}
              {selectedMethod === "paypal" && (
                <p className="text-xs text-gray-500 mt-1">
                  {t("withdrawalModal.paypalHelp")}
                </p>
              )}
            </div>

            {/* Info Message */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2.5 text-blue-400 text-xs">
              <p>
                {selectedMethod === "paypal" 
                  ? t("withdrawalModal.paypalInfo")
                  : selectedMethod === "giftcard"
                    ? t("withdrawalModal.giftCardInfo")
                    : selectedMethod === "crypto"
                      ? t("withdrawalModal.cryptoInfo")
                      : t("withdrawalModal.destinationInfo")}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-[#151728] border border-[#2A2D44] rounded-lg py-2 text-sm text-white hover:bg-[#1a1f2e] transition"
              >
                {t("withdrawalModal.cancel")}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#18C3A7] rounded-lg py-2 text-sm text-black font-semibold hover:bg-[#15b39a] transition disabled:opacity-50"
              >
                {loading ? t("withdrawalModal.submitting") : t("withdrawalModal.submit")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default WithdrawalRequestModal;
