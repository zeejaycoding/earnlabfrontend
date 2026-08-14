"use client";

import React, { useState, useEffect, useCallback } from "react";

interface UserProfile {
  uuid: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  emoji?: string;
  countryCode?: string;
  balanceCents: number;
  createdAt: string;
}

interface ProfileStats {
  offersCompleted: number;
  totalEarningsCents: number;
  last30DaysCents: number;
  referralCount: number;
}

interface ProgressionData {
  activityScore: number;
  currentLevel: string;
  currentRangeStart: number;
  currentRangeEnd: number;
  nextLevelThreshold: number | null;
  progressPercent: number;
  progressCurrent: number;
  progressTarget: number | null;
  nextLevel: string | null;
}

interface BadgeView {
  key: string;
  label: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

const DIAMOND_CLIP = "polygon(20% 15%, 80% 15%, 100% 50%, 50% 100%, 0% 50%)";

type BadgeVariant = "locked" | "first" | "second";

function LockIcon({ color }: { color: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
      <rect x="3.5" y="7" width="9" height="7" rx="1.5" fill={color} />
      <path d="M5.5 7V5C5.5 3.61929 6.61929 2.5 8 2.5C9.38071 2.5 10.5 3.61929 10.5 5V7" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8" cy="10.2" r="1.1" fill="#1A1D2E" />
    </svg>
  );
}

function BadgeDiamond({ variant }: { variant: BadgeVariant }) {
  if (variant === "locked") {
    return (
      <div
        className="mx-auto w-full max-w-[48px] aspect-square relative"
        style={{ clipPath: DIAMOND_CLIP, background: "#3E4468" }}
      >
        <div
          className="absolute inset-0"
          style={{ clipPath: DIAMOND_CLIP, background: "linear-gradient(180deg, #7279B000 0%, #4A5080 100%)" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <LockIcon color="#6B72A6" />
        </div>
      </div>
    );
  }

  const fill = variant === "first" ? "#099F86" : "#9F0997";
  const shadow = variant === "first" ? "#14A9904D" : "#A914174D";

  return (
    <div
      className="mx-auto w-full max-w-[48px] aspect-square relative"
      style={{ clipPath: DIAMOND_CLIP, background: fill, filter: `drop-shadow(0 2px 8px ${shadow})` }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <LockIcon color="#FFFFFF" />
      </div>
    </div>
  );
}

interface RecentOffer {
  _id: string;
  title: string;
  rewardCents: number;
  completedAt: string;
  provider?: string;
  imageUrl?: string;
}

interface UserProfileModalProps {
  userId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min${mins !== 1 ? "s" : ""} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs !== 1 ? "s" : ""} ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;
  return `${Math.floor(months / 12)} year${Math.floor(months / 12) !== 1 ? "s" : ""} ago`;
}

function joinedAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 30) return `Joined ${days} day${days !== 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `Joined ${months} month${months !== 1 ? "s" : ""} ago`;
  const years = Math.floor(months / 12);
  return `Joined ${years} year${years !== 1 ? "s" : ""} ago`;
}

function getAvatarColor(name: string): string {
  const colors = ["#6155F5", "#14A28A", "#E05A5A", "#F5A623", "#5A8AF5", "#A355F5"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

function getInitial(name: string): string {
  return (name || "U").charAt(0).toUpperCase();
}

function countryFlagEmoji(code: string): string {
  if (!code || code.length !== 2) return "";
  const offset = 127397;
  return String.fromCodePoint(...Array.from(code.toUpperCase()).map((c) => c.charCodeAt(0) + offset));
}

// ─── Stat Card ──────────────────────────────────────────────────────────────
interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  wide?: boolean;
}
const StatCard: React.FC<StatCardProps> = ({ icon, value, label, wide }) => (
  <div
    className="flex flex-col gap-2 rounded-[10px] p-4 bg-white dark:bg-[#151728] border border-gray-200 dark:border-[#1E2133]"
  >
    {icon}
    <span className="font-bold text-[20px] text-gray-900 dark:text-white" style={{ fontFamily: "'Manrope', sans-serif" }}>
      {value}
    </span>
    <span className="text-[12px] text-gray-500 dark:text-[#8C8FA8]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {label}
    </span>
  </div>
);

// ─── Icons ───────────────────────────────────────────────────────────────────
const ProfileFillIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 10C12.2091 10 14 8.20914 14 6C14 3.79086 12.2091 2 10 2C7.79086 2 6 3.79086 6 6C6 8.20914 7.79086 10 10 10Z" fill="#14A28A" />
    <path d="M10 11.5C6.13401 11.5 3 14.634 3 18.5H17C17 14.634 13.866 11.5 10 11.5Z" fill="#14A28A" />
  </svg>
);

const CloseIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M21 7L7 21M7 7L21 21" stroke="#8C8FA8" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <img src="/offers-completed.png" alt="Offers completed" style={{ width: 31, height: 28 }} />
);

const WalletIcon = () => (
  <img src="/total-earns.png" alt="Total earnings" style={{ width: 31, height: 28 }} />
);

const UsersIcon = () => (
  <img src="/user123.png" alt="Users referred" style={{ width: 31, height: 28 }} />
);

const DollarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <circle cx="6" cy="6" r="5.5" fill="#18C3A7" />
    <text x="6" y="9.5" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white">$</text>
  </svg>
);

const ChartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="10" width="3" height="8" rx="1" fill="#8C8FA8" />
    <rect x="7" y="6" width="3" height="12" rx="1" fill="#8C8FA8" />
    <rect x="12" y="2" width="3" height="16" rx="1" fill="#8C8FA8" />
  </svg>
);

const OfferIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2L12.39 7.26L18 8.27L14 12.14L15.18 18L10 15.27L4.82 18L6 12.14L2 8.27L7.61 7.26L10 2Z" fill="#8C8FA8" />
  </svg>
);

const MuteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M11 5L5 11M5 5L11 11" stroke="#50536F" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 2a6 6 0 100 12A6 6 0 008 2z" stroke="#50536F" strokeWidth="1.5" />
  </svg>
);

const defaultProgression: ProgressionData = {
  activityScore: 0,
  currentLevel: "Beginner",
  currentRangeStart: 0,
  currentRangeEnd: 30,
  nextLevelThreshold: 30,
  progressPercent: 0,
  progressCurrent: 0,
  progressTarget: 30,
  nextLevel: "Amateur",
};

// ─── Main Modal ─────────────────────────────────────────────────────────────
const UserProfileModal: React.FC<UserProfileModalProps> = ({ userId, isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<ProfileStats>({
    offersCompleted: 0,
    totalEarningsCents: 0,
    last30DaysCents: 0,
    referralCount: 0,
  });
  const [recentOffers, setRecentOffers] = useState<RecentOffer[]>([]);
  const [progression, setProgression] = useState<ProgressionData>(defaultProgression);
  const [badges, setBadges] = useState<BadgeView[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "badges">("all");

  const getApi = () => process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const fetchProfile = useCallback(async () => {
    if (!userId) {
      setProfile(null);
      setStats({ offersCompleted: 0, totalEarningsCents: 0, last30DaysCents: 0, referralCount: 0 });
      setRecentOffers([]);
      setProgression(defaultProgression);
      setBadges([]);
      setIsPrivate(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const api = getApi();

      // Public profile for selected user only
      const res = await fetch(`${api}/api/v1/games/user/${userId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.isPrivate) {
          setIsPrivate(true);
        } else {
          setProfile(data.profile);
          setStats(data.stats ?? { offersCompleted: 0, totalEarningsCents: 0, last30DaysCents: 0, referralCount: 0 });
          setRecentOffers(data.recentOffers ?? []);
          setProgression(data.progression ?? defaultProgression);
          setBadges(Array.isArray(data.badges) ? data.badges : []);
          setIsPrivate(false);
        }
      }
    } catch {
      // silently ignore fetch errors for modal
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (isOpen) {
      fetchProfile();
    } else {
      setProfile(null);
      setStats({ offersCompleted: 0, totalEarningsCents: 0, last30DaysCents: 0, referralCount: 0 });
      setRecentOffers([]);
      setProgression(defaultProgression);
      setBadges([]);
      setIsPrivate(false);
      setActiveTab("all");
    }
  }, [isOpen, userId, fetchProfile]);

  if (!isOpen) return null;

  const displayName = profile?.displayName || profile?.username || "User";
  const initial = getInitial(displayName);
  const avatarColor = getAvatarColor(displayName);
  const joinedText = profile?.createdAt ? joinedAgo(profile.createdAt) : "—";
  const flag = profile?.countryCode ? countryFlagEmoji(profile.countryCode) : "";
  const progressPct = Math.min(100, Math.max(0, progression.progressPercent || 0));
  const nextLevelName = progression.nextLevel || "MAX";

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 p-3 sm:p-6"
      onClick={onClose}
    >
      {/* Panel */}
      <div
        className="relative flex w-full max-w-[640px] max-h-[88vh] flex-col overflow-y-auto rounded-2xl border border-gray-200 dark:border-[#1E2133] bg-white dark:bg-[#151728] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ─────────────────────────────────────── */}
        <div
          className="flex items-center gap-[10px] px-4 shrink-0 border-b border-gray-200 dark:border-[#1E2133]"
          style={{ height: 68 }}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <ProfileFillIcon />
            <span
              className="font-[Manrope] font-bold text-[20px] text-gray-900 dark:text-white tracking-[0.02em] truncate"
              style={{ lineHeight: "34px" }}
            >
              User profile
            </span>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 flex items-center justify-center rounded hover:opacity-70 transition"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-1 items-center justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-[#14A28A] border-t-transparent animate-spin" />
          </div>
        )}

        {/* Private */}
        {!loading && isPrivate && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-20">
            <div className="text-5xl">🔒</div>
            <p className="text-gray-900 dark:text-white font-semibold text-lg">Private Profile</p>
            <p className="text-gray-500 dark:text-[#8C8FA8] text-sm text-center px-8">
              This user has set their profile to private.
            </p>
          </div>
        )}

        {/* Content */}
        {!loading && !isPrivate && profile && (
          <>
            {/* ── Profile Info ──────────────────────────── */}
            <div
              className="flex flex-col gap-4 px-4 py-4 shrink-0 border-b border-gray-200 dark:border-[#151728]"
            >
              {/* Avatar + name + meta */}
              <div className="flex flex-col gap-2">
                {/* Avatar */}
                {profile.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.avatarUrl}
                    alt={displayName}
                    className="rounded-[10px] object-cover"
                    style={{ width: 92, height: 76 }}
                  />
                ) : (
                  <div
                    className="flex items-center justify-center rounded-[10px] shrink-0"
                    style={{ width: 92, height: 76, background: avatarColor }}
                  >
                    <span
                      className="font-[Inter] font-bold text-white"
                      style={{ fontSize: 48, lineHeight: "21px", letterSpacing: "-0.03em" }}
                    >
                      {initial}
                    </span>
                  </div>
                )}

                {/* Name + flag + joined */}
                <div className="flex items-center gap-2 flex-wrap">
                  {flag && <span className="text-base leading-none">{flag}</span>}
                  <span
                    className="font-[Manrope] font-bold text-[18px] text-gray-900 dark:text-white tracking-[0.02em]"
                    style={{ lineHeight: "34px" }}
                  >
                    {displayName}
                  </span>
                  <div className="flex items-center gap-1">
                    <div
                      className="rounded-full"
                      style={{ width: 4, height: 4, background: "#8C8FA8", opacity: 0.4 }}
                    />
                    <span
                      className="font-[Inter] font-medium text-[10px] text-gray-500 dark:text-[#8C8FA8] tracking-[-0.03em]"
                      style={{ lineHeight: "21px" }}
                    >
                      {joinedText}
                    </span>
                  </div>
                </div>
              </div>

              {/* Level progress */}
              <div className="flex flex-col gap-3">
                {/* Labels row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div
                      className="rounded-[4px] overflow-hidden shrink-0"
                      style={{ width: 22, height: 22, border: "1px solid #0088FF" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/profileimage.png" alt="" className="w-full h-full object-cover" />
                    </div>
                    <span
                      className="font-[Inter] font-medium text-[13px] text-[#0088FF] tracking-[-0.03em]"
                      style={{ lineHeight: "21px" }}
                    >
                      {progression.currentLevel}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className="rounded-[4px] overflow-hidden shrink-0"
                      style={{ width: 22, height: 22, border: "1px solid #00C8B3" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/profileimage.png" alt="" className="w-full h-full object-cover" />
                    </div>
                    <span
                      className="font-[Inter] font-medium text-[13px] text-[#00C8B3] tracking-[-0.03em]"
                      style={{ lineHeight: "21px" }}
                    >
                      {nextLevelName}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div
                  className="relative rounded-[20px] w-full bg-gray-200 dark:bg-[#1E2133]"
                  style={{ height: 6 }}
                >
                  <div
                    className="absolute left-0 top-0 h-full rounded-[20px]"
                    style={{ width: `${progressPct}%`, background: "#0088FF" }}
                  />
                </div>

                {/* XP numbers */}
                <div className="flex items-center justify-between">
                  <span
                    className="font-[Inter] font-medium text-[12px] text-gray-500 dark:text-[#6B6E8A] tracking-[-0.03em]"
                    style={{ lineHeight: "21px" }}
                  >
                    {progression.progressCurrent.toLocaleString()}
                  </span>
                  <span
                    className="font-[Inter] font-medium text-[12px] text-gray-500 dark:text-[#6B6E8A] tracking-[-0.03em]"
                    style={{ lineHeight: "21px" }}
                  >
                    {(progression.progressTarget ?? progression.activityScore).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Mute user button */}
              <div
                className="flex items-center justify-center rounded-[5px] w-full cursor-pointer select-none bg-gray-100 dark:bg-[#151728] border border-gray-200 dark:border-[#26293E]"
                style={{
                  height: 48,
                }}
              >
                <div className="flex items-center gap-1">
                  <MuteIcon />
                  <span
                    className="font-[Inter] font-medium text-[14px] text-gray-700 dark:text-white tracking-[-0.03em]"
                    style={{ lineHeight: "21px" }}
                  >
                    Mute user
                  </span>
                </div>
              </div>
            </div>

            {/* ── Tabs ──────────────────────────────────── */}
            <div className="flex flex-col gap-3 shrink-0">
              {/* Tab bar */}
              <div className="flex items-start px-4 pt-2">
                <div
                  className="flex items-center gap-2 rounded-[20px] p-1 bg-gray-100 dark:bg-[#151728]"
                >
                  {(["all", "badges"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="flex items-center justify-center rounded-[15px] transition-colors"
                      style={{
                        padding: "8px 20px",
                        background: activeTab === tab ? "#14A28A" : undefined,
                        minWidth: 95,
                      }}
                    >
                      <span
                        className={`font-[Manrope] font-semibold text-[14px] tracking-[0.02em] ${activeTab === tab ? "text-white" : "text-gray-600 dark:text-white"}`}
                        style={{ lineHeight: "34px" }}
                      >
                        {tab === "all" ? "All" : "Badges"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── All tab ────────────────────────────── */}
              {activeTab === "all" && (
                <>
                  {/* Statistics */}
                  <div
                    className="flex flex-col gap-4 px-4 py-3 border-b border-gray-200 dark:border-[#1E2133]"
                  >
                    {/* Section header */}
                    <div className="flex items-center gap-2">
                      <ChartIcon />
                      <span
                        className="font-[Manrope] font-bold text-[16px] text-gray-900 dark:text-white tracking-[0.02em] flex-1"
                        style={{ lineHeight: "34px" }}
                      >
                        Statistics
                      </span>
                    </div>

                    {/* Stat cards row */}
                    <div className="grid grid-cols-2 gap-3">
                      <StatCard
                        icon={<CheckIcon />}
                        value={stats.offersCompleted.toLocaleString()}
                        label="Offers completed"
                      />
                      <StatCard
                        wide
                        icon={<WalletIcon />}
                        value={`$${(stats.totalEarningsCents / 100).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`}
                        label="Total Earnings"
                      />
                      <StatCard
                        icon={<UsersIcon />}
                        value={stats.referralCount.toLocaleString()}
                        label="Users Referred"
                      />
                      <StatCard
                        wide
                        icon={<WalletIcon />}
                        value={`$${(stats.last30DaysCents / 100).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`}
                        label="Last 30D Earnings"
                      />
                    </div>
                  </div>

                  {/* Offers table */}
                  <div className="flex flex-col gap-3 px-4 pb-6">
                    {/* Section header */}
                    <div className="flex items-center gap-2">
                      <OfferIcon />
                      <span
                        className="font-[Manrope] font-bold text-[16px] text-gray-900 dark:text-white tracking-[0.02em] flex-1"
                        style={{ lineHeight: "34px" }}
                      >
                        Offers
                      </span>
                    </div>

                    {/* Table */}
                    <div className="flex flex-col w-full">
                      {/* Header row */}
                      <div
                        className="flex items-center px-2 gap-4 border-b border-gray-200 dark:border-[#1E2133]"
                        style={{ height: 37 }}
                      >
                        {["Name", "Reward", "Time"].map((col, i) => (
                          <span
                            key={col}
                            className="font-[Inter] font-medium text-[14px] text-gray-500 dark:text-[#8C8FA8] tracking-[-0.03em]"
                            style={{
                              lineHeight: "21px",
                              flex: 1,
                              textAlign: i === 0 ? "left" : i === 1 ? "center" : "right",
                            }}
                          >
                            {col}
                          </span>
                        ))}
                      </div>

                      {/* Data rows */}
                      {recentOffers.length === 0 ? (
                        <div className="py-8 text-center text-gray-500 dark:text-[#8C8FA8] text-sm">
                          No offers to display
                        </div>
                      ) : (
                        recentOffers.map((offer, idx) => (
                          <div
                            key={offer._id}
                            className="flex items-center px-2 gap-4"
                            style={{
                              height: 47,
                              background: idx % 2 === 1 ? undefined : "transparent",
                            }}
                          >
                            {/* Name cell */}
                            <div className="flex items-center gap-1 flex-1 min-w-0">
                              {offer.imageUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                  src={offer.imageUrl}
                                  alt={offer.title}
                                  className="rounded shrink-0"
                                  style={{ width: 23, height: 23 }}
                                />
                              ) : (
                                <div
                                  className="shrink-0 rounded flex items-center justify-center bg-gray-100 dark:bg-[#26293E]"
                                  style={{ width: 23, height: 23 }}
                                >
                                  <OfferIcon />
                                </div>
                              )}
                              <span
                                className="font-[Inter] font-medium text-[13px] text-gray-900 dark:text-white tracking-[-0.03em] truncate"
                                style={{ lineHeight: "21px" }}
                              >
                                {offer.title}
                              </span>
                            </div>

                            {/* Reward cell */}
                            <div className="flex items-center justify-center gap-1" style={{ flex: 1 }}>
                              <DollarIcon />
                              <span
                                className="font-[Inter] font-medium text-[13px] text-gray-900 dark:text-white tracking-[-0.03em]"
                                style={{ lineHeight: "21px" }}
                              >
                                {(offer.rewardCents / 100).toFixed(2)}
                              </span>
                            </div>

                            {/* Time cell */}
                            <div className="flex items-center justify-end" style={{ flex: 1 }}>
                              <span
                                className="font-[Inter] font-medium text-[12px] text-gray-500 dark:text-[#6B6E8A] tracking-[-0.03em] text-right"
                                style={{ lineHeight: "21px" }}
                              >
                                {timeAgo(offer.completedAt)}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* ── Badges tab ─────────────────────────── */}
              {activeTab === "badges" && (
                <div className="grid grid-cols-5 md:grid-cols-8 gap-3 px-4 pb-6">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i}>
                      <BadgeDiamond variant="locked" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* No profile */}
        {!loading && !isPrivate && !profile && (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-gray-500 dark:text-[#8C8FA8]">Select a user to view profile</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileModal;
