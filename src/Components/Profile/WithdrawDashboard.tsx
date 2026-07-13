"use client";

import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import WithdrawalRequestModal from "./WithdrawalRequestModal";
import { useTranslation } from "react-i18next";

interface Withdrawal {
  _id: string;
  amountCents: number;
  method: string;
  status: string;
  giftCardType?: string;
  createdAt: string;
}

const WithdrawDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [userBalance, setUserBalance] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // Fetch user balance
      const userRes = await axios.get("/api/v1/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserBalance(userRes.data.balanceCents);

      // Fetch withdrawal history
      const historyRes = await axios.get("/api/v1/user/withdrawals/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWithdrawals(historyRes.data.history || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case t("withdrawDashboard.status.pending"):
        return "bg-yellow-500/20 text-yellow-400";
      case t("withdrawDashboard.status.approved"):
        return "bg-green-500/20 text-green-400";
      case t("withdrawDashboard.status.completed"):
        return "bg-blue-500/20 text-blue-400";
      case t("withdrawDashboard.status.rejected"):
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getMethodLabel = (method: string, giftCardType?: string) => {
    if (method === "giftcard") {
      return `${giftCardType ||t("withdrawDashboard.methods.giftCard")}`;
    }
    return method.charAt(0).toUpperCase() + method.slice(1);
  };

  const filteredWithdrawals = withdrawals.filter((w) =>
    w._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-8">
        <div className="text-gray-400">{t("withdrawDashboard.loading")}</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header with Request Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">{t("withdrawDashboard.title")}</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#18C3A7] hover:bg-[#15b39a] text-black font-semibold px-6 py-2 rounded-lg transition"
        >
          {t("withdrawDashboard.requestWithdrawal")}
        </button>
      </div>

      {/* Balance Card */}
      <div className="bg-[#151728] border border-[#2A2D44] rounded-lg p-4 mb-6">
        <p className="text-gray-400 text-sm">{t("withdrawDashboard.availableBalance")}</p>
        <p className="text-3xl font-bold text-[#18C3A7]">
          ${(userBalance / 100).toFixed(2)}
        </p>
      </div>

      {/* Search */}
      <div className="mt-4 relative mb-4">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-md" />
        <input
          type="text"
          placeholder={t("withdrawDashboard.searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#26293E] text-sm text-gray-300 focus:outline-none focus:border-[#18C3A7] border border-[#2A2D44]"
        />
      </div>

      {/* Table */}
      {filteredWithdrawals.length === 0 ? (
        <div className="bg-[#1E2133] border border-[#2A2D44] rounded-lg p-8 text-center">
          <p className="text-gray-400">
            {searchTerm
              ? t("withdrawDashboard.emptySearch")
              : t("withdrawDashboard.emptyHistory")}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <div className="min-w-[1000px]">
            {/* Header */}
            <div className="grid grid-cols-6 py-3 bg-[#0D0F1E] text-gray-400 text-xs rounded-t-lg mb-0 sticky top-0">
              <div className="px-6 py-3 text-left">{t("withdrawDashboard.table.requestId")}</div>
              <div className="px-6 py-3 text-left">{t("withdrawDashboard.table.method")}</div>
              <div className="px-6 py-3 text-left">{t("withdrawDashboard.table.amount")}</div>
              <div className="px-6 py-3 text-left">{t("withdrawDashboard.table.status")}</div>
              <div className="px-6 py-3 text-left">{t("withdrawDashboard.table.date")}</div>
              <div className="px-6 py-3 text-left">{t("withdrawDashboard.table.action")}</div>
            </div>

            {/* Rows */}
            {filteredWithdrawals.map((withdrawal, i) => (
              <div
                key={withdrawal._id}
                className={`grid grid-cols-6 py-4 px-0 border-b border-[#2A2D44] hover:bg-[#1b1f30] transition ${
                  i === filteredWithdrawals.length - 1 ? "rounded-b-lg" : ""
                }`}
              >
                <div className="px-6 py-3 text-xs text-gray-300 font-mono">
                  {withdrawal._id.slice(0, 8)}...{withdrawal._id.slice(-4)}
                </div>
                <div className="px-6 py-3 text-xs text-gray-300">
                  {getMethodLabel(withdrawal.method, withdrawal.giftCardType)}
                </div>
                <div className="px-6 py-3 text-xs font-semibold text-[#18C3A7]">
                  ${(withdrawal.amountCents / 100).toFixed(2)}
                </div>
                <div className="px-6 py-3 text-xs">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      withdrawal.status
                    )}`}
                  >
                    {withdrawal.status}
                  </span>
                </div>
                <div className="px-6 py-3 text-xs text-gray-400">
                  {new Date(withdrawal.createdAt).toLocaleDateString()} |{" "}
                  {new Date(withdrawal.createdAt).toLocaleTimeString()}
                </div>
                <div className="px-6 py-3 text-xs">
                  <button className="text-[#18C3A7] hover:text-[#15b39a] transition">
                    {t("withdrawDashboard.view")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Withdrawal Request Modal */}
      <WithdrawalRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userBalance={userBalance}
        onSuccess={fetchData}
      />
    </div>
  );
};

export default WithdrawDashboard;
