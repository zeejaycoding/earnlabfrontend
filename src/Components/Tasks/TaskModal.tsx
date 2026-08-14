"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import Image, { StaticImageData } from "next/image";
import { IoClose } from "react-icons/io5";
import { FaThumbsUp, FaApple, FaAndroid, FaGamepad, FaUsers, FaClipboardList } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";

const formatPrimaryReward = (rewardValue: number): string => {
  const safeValue = Number.isFinite(rewardValue) ? rewardValue : 0;
  return `$${(safeValue / 100).toFixed(2)}`;
};

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (claimedTask?: any) => void;
  task: {
    image: string | StaticImageData;
    title: string;
    description: string;
    reward: number;
    raw?: any;
  } | null;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onStart,
  task,
}) => {
  const [activeTab, setActiveTab] = useState<"rewards" | "details">("rewards");

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="max-w-lg w-full rounded-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Image Section */}
        <div className="relative w-full h-56">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #00000033 0%, #00000026 100%)",
            }}
          />
          {typeof task.image === "string" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={task.image}
              alt={task.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={task.image}
              alt={task.title}
              fill
              className="object-cover"
            />
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center bg-[#F0F4F8] hover:bg-white transition-colors"
          >
            <IoClose size={20} className="text-[#333]" />
          </button>
        </div>

        {/* Content Section */}
        <div className="bg-[#151728] px-5 py-5 flex flex-col gap-3">
          {/* Title Row */}
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold text-[20px]" style={{ fontFamily: "Manrope, sans-serif" }}>
              {task.title}
            </h2>
            <span className="text-[#0AC07D] font-semibold text-[20px]" style={{ fontFamily: "Manrope, sans-serif" }}>
              {formatPrimaryReward(task.reward)}
            </span>
          </div>

          {/* 3 Info Boxes Row */}
          <div className="flex gap-3">
            {/* Popularity */}
            <div className="flex-1 bg-[#151728] border border-[#1E2133] rounded-xl px-3 py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#62828E] font-medium text-[10px]" style={{ fontFamily: "Manrope, sans-serif" }}>
                  Popularity
                </span>
                <div className="flex items-center gap-1.5">
                  <FaThumbsUp className="text-white text-[10px]" />
                  <span className="text-[#B3B6C7] font-medium text-[10px]" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    {task.raw?.metadata?.likes ?? 128}
                  </span>
                </div>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#1E2133]">
                <div
                  className="h-full rounded-full bg-[#4DD6C1]"
                  style={{ width: `${Math.min(task.raw?.metadata?.popularity ?? 65, 100)}%` }}
                />
              </div>
            </div>

            {/* Featured On */}
            <div className="flex-1 bg-[#151728] border border-[#1E2133] rounded-xl px-3 py-3">
              <span className="text-[#8C8FA8] font-medium text-[10px] block mb-2" style={{ fontFamily: "DM Sans, sans-serif" }}>
                Featured on:
              </span>
              <div className="flex items-center gap-3">
                <FaApple className="text-white text-sm" />
                <FaAndroid className="text-white text-sm" />
                <FiGlobe className="text-white text-sm" />
              </div>
            </div>

            {/* Status */}
            <div className="flex-1 bg-[#151728] border border-[#1E2133] rounded-xl px-3 py-3">
              <span className="text-[#8C8FA8] font-medium text-[10px] block mb-1" style={{ fontFamily: "DM Sans, sans-serif" }}>
                Status
              </span>
              <span className="text-white font-medium text-[12px]" style={{ fontFamily: "DM Sans, sans-serif" }}>
                {task.raw?.status === "completed"
                  ? "Played"
                  : task.raw?.status === "in_progress"
                  ? "In Progress"
                  : "Not Played"}
              </span>
            </div>
          </div>

          {/* Play and Earn Button */}
          <button
            onClick={async () => {
              try {
                const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
                const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
                if (!task.raw || !task.raw._id) {
                  onClose();
                  onStart(task.raw ?? null);
                  return;
                }
                const headers: any = { "Content-Type": "application/json" };
                if (token) headers.Authorization = `Bearer ${token}`;
                const res = await fetch(`${api}/api/v1/tasks/${task.raw._id}/claim`, {
                  method: "POST",
                  headers,
                });
                if (res.status === 401) {
                  toast.warn("Please sign in to claim this task.");
                  return;
                }
                if (!res.ok) {
                  const body = await res.json().catch(() => ({}));
                  toast.error(body?.message || "Failed to claim task");
                  return;
                }
                const body = await res.json().catch(() => ({}));
                const claimed = body?.task ?? null;
                onClose();
                onStart(claimed ?? task.raw ?? null);
              } catch (err) {
                console.error(err);
                toast.error("Failed to start task. Try again later.");
              }
            }}
            className="w-full h-12 rounded-xl flex items-center justify-center gap-2 text-white font-semibold text-[14px] transition-all active:scale-[0.98]"
            style={{
              fontFamily: "Manrope, sans-serif",
              background: "linear-gradient(180deg, #099F86 0%, #FFFFFF00)",
              backgroundColor: "#099F86",
              boxShadow: "0 4px 12px #14A9904D",
            }}
          >
            <FaGamepad className="text-white text-[22px]" />
            Play and Earn {formatPrimaryReward(task.reward)}
          </button>

          {/* Tabs */}
          <div className="flex justify-center gap-10 mt-1 w-full">
            <button
              onClick={() => setActiveTab("rewards")}
              className="relative pb-2 text-[15px] font-medium transition-colors"
              style={{
                fontFamily: "Manrope, sans-serif",
                color: activeTab === "rewards" ? "#FFFFFF" : "#8C8FA8",
              }}
            >
              Rewards
              {activeTab === "rewards" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] rounded-full bg-[#099F86]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className="relative pb-2 text-[15px] font-medium transition-colors"
              style={{
                fontFamily: "Manrope, sans-serif",
                color: activeTab === "details" ? "#FFFFFF" : "#8C8FA8",
              }}
            >
              Details
              {activeTab === "details" && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] rounded-full bg-[#099F86]" />
              )}
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "rewards" && (
            <div className="flex flex-col gap-3">

                <div className="bg-[#151728] border border-[#1E2133] rounded-lg px-3 py-2.5 flex items-center justify-between">
                  <span className="text-[#8C8FA8] text-[15px]" style={{ fontFamily: "DM Sans, sans-serif" }}>Install App</span>
                  <div className="bg-[#0E252E] rounded-md px-2.5 py-1">
                    <span className="font-semibold text-[15px] text-[#18C3A7]" style={{ fontFamily: "Manrope, sans-serif" }}>
                      {formatPrimaryReward(task.reward * 0.2)}
                    </span>
                  </div>
                </div>

                <div className="bg-[#151728] border border-[#1E2133] rounded-lg px-3 py-2.5 flex items-center justify-between">
                  <span className="text-[#8C8FA8] text-[15px]" style={{ fontFamily: "DM Sans, sans-serif" }}>Reach Level 3</span>
                  <div className="bg-[#0E252E] rounded-md px-2.5 py-1">
                    <span className="font-semibold text-[15px] text-[#18C3A7]" style={{ fontFamily: "Manrope, sans-serif" }}>
                      {formatPrimaryReward(task.reward * 0.2)}
                    </span>
                  </div>
                </div>

                <div className="bg-[#151728] border border-[#1E2133] rounded-lg px-3 py-2.5 flex items-center justify-between">
                  <span className="text-[#8C8FA8] text-[15px]" style={{ fontFamily: "DM Sans, sans-serif" }}>Reach Level 7</span>
                  <div className="bg-[#0E252E] rounded-md px-2.5 py-1">
                    <span className="font-semibold text-[15px] text-[#18C3A7]" style={{ fontFamily: "Manrope, sans-serif" }}>
                      {formatPrimaryReward(task.reward * 0.3)}
                    </span>
                  </div>
                </div>

                <div className="bg-[#151728] border border-[#1E2133] rounded-lg px-3 py-2.5 flex items-center justify-between">
                  <span className="text-[#8C8FA8] text-[15px]" style={{ fontFamily: "DM Sans, sans-serif" }}>Reach Level 10</span>
                  <div className="bg-[#0E252E] rounded-md px-2.5 py-1">
                    <span className="font-semibold text-[15px] text-[#18C3A7]" style={{ fontFamily: "Manrope, sans-serif" }}>
                      {formatPrimaryReward(task.reward * 0.3)}
                    </span>
                  </div>
                </div>
              </div>
          )}

          {activeTab === "details" && (
            <div className="flex flex-col gap-3">
              {/* Description Container */}
              <div className="bg-[#151728] border border-[#1E2133] rounded-xl px-4 py-4 flex flex-col gap-3">
                <h4 className="text-white font-bold text-[14px]" style={{ fontFamily: "Manrope, sans-serif" }}>
                  Description
                </h4>
                <p className="text-[#6B6E8A] font-medium text-[13px] leading-relaxed" style={{ fontFamily: "Manrope, sans-serif" }}>
                  {task.description || "Complete this task to earn rewards. Progress is tracked automatically once you start."}
                </p>

                {/* 2 Info Boxes */}
                <div className="flex gap-3 mt-1">
                  {/* New Users Only */}
                  <div className="flex-1 bg-[#111A30] rounded-xl px-3 py-3 flex flex-col gap-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: "#18233C" }}
                    >
                      <FaUsers className="text-[#099F86] text-sm" />
                    </div>
                    <h5 className="text-white font-bold text-[14px]" style={{ fontFamily: "Manrope, sans-serif" }}>
                      New users only
                    </h5>
                    <p className="text-[#6B6E8A] font-medium text-[11px] leading-relaxed" style={{ fontFamily: "Manrope, sans-serif" }}>
                      Only new users who haven&apos;t installed &quot;{task.title}&quot; on their device before are eligible to earn points.
                    </p>
                  </div>

                  {/* Task Order */}
                  <div className="flex-1 bg-[#111A30] rounded-xl px-3 py-3 flex flex-col gap-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: "#18233C" }}
                    >
                      <FaClipboardList className="text-[#099F86] text-sm" />
                    </div>
                    <h5 className="text-white font-bold text-[14px]" style={{ fontFamily: "Manrope, sans-serif" }}>
                      Task order
                    </h5>
                    <p className="text-[#6B6E8A] font-medium text-[11px] leading-relaxed" style={{ fontFamily: "Manrope, sans-serif" }}>
                      Complete each milestone in order. Rewards are credited after each step is verified.
                    </p>
                  </div>
                </div>
              </div>

              {/* Provider Container */}
              <div className="bg-[#151728] border border-[#1E2133] rounded-xl px-4 py-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#1E2133] flex items-center justify-center overflow-hidden">
                  {task.raw?.metadata?.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={task.raw.metadata.logoUrl} alt="Provider" className="w-8 h-8 object-contain" />
                  ) : (
                    <span className="text-[#099F86] font-bold text-sm">
                      {(task.raw?.metadata?.providerName || "P").charAt(0)}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-[14px]" style={{ fontFamily: "Manrope, sans-serif" }}>
                    Provider
                  </span>
                  <span className="text-[#8C8FA8] text-[12px]" style={{ fontFamily: "Manrope, sans-serif" }}>
                    {task.raw?.metadata?.providerName || task.raw?.metadata?.offerwallName || "Unknown Provider"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e2133;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #3a3e57;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default TaskModal;
