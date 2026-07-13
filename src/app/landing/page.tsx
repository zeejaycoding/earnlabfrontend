"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SignInModal from '@/Components/HomePage/SigninModal';
import SignUpModal from '@/Components/HomePage/SignupModal';
import ForgotPasswordModal from '@/Components/HomePage/ForgotPasswordModal';
import { useTranslation } from "react-i18next";
import DesktopNavLinks from "@/Components/Shared/DesktopNavLinks";
import TickerBar from "@/Components/Shared/TickerBar";

import { Facebook, Globe } from "lucide-react";

const FAQItem = ({
  q,
  a,
  open,
  onClick,
}: {
  q: string;
  a: string;
  open: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-full text-left border-b border-[#EBEDF5] dark:border-[#26293E] pb-5 mb-5 last:border-0 last:mb-0 last:pb-0 bg-transparent cursor-pointer group"
  >
    <div className="flex justify-between items-center">
      <span className="text-[#1A1D2E] dark:text-white font-semibold text-base group-hover:text-[#18C2A3] transition-colors duration-200">{q}</span>
      <span className={`text-xl ml-4 w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${open ? 'bg-[#18C2A3] text-white' : 'bg-[#EBEDF5] dark:bg-[#26293E] text-[#4A4D6A] dark:text-[#B3B6C7]'}`}>{open ? '+' : '—'}</span>
    </div>
    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'}`}>
      <p className="text-[#5E6180] dark:text-[#6B6E8A] text-sm leading-relaxed">{a}</p>
    </div>
  </button>
);

/* ───────────── Testimonial Card ───────────── */
const TestimonialCard = ({
  avatarUrl,
  name,
  country,
  text,
  amount,
  activityDate,
}: {
  avatarUrl?: string | null;
  name: string;
  country: string;
  text: string;
  amount: string;
  activityDate: string;
}) => (
  <div className="bg-white dark:bg-[#16182A] border border-[#EBEDF5] dark:border-[#26293E] rounded-xl p-3 sm:p-4 flex flex-col gap-2.5 sm:gap-3 h-full">
    <div className="flex items-center gap-2.5 sm:gap-3">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
        />
      ) : (
        <div
          className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full shrink-0 ring-1 ring-white/10 overflow-hidden flex items-center justify-center"
          style={{ background: getGeneratedAvatarBackground(name) }}
          aria-label={`${name} generated avatar`}
        >
          <div
            aria-hidden="true"
            className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-white/25"
          />
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      )}
      <div>
        <p className="text-[#1A1D2E] dark:text-white font-semibold text-[13px] sm:text-sm">{name}</p>
        <p className="text-[#4A4D6A] dark:text-[#B3B6C7] text-[10px] sm:text-[11px] flex items-center gap-1.5">
          <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="#0AC07D"/></svg> {country}
        </p>
      </div>
    </div>
    <p className="text-[#4A4D6A] dark:text-[#B3B6C7] text-[12px] sm:text-[13px] leading-5">{text}</p>
    <div className="flex items-center justify-between text-[11px] text-[#4A4D6A] dark:text-[#8C8FA8] pt-1">
      <span>{activityDate}</span>
      <span className="text-[#0AC07D] font-semibold">{amount}</span>
    </div>
  </div>
);

/* ───────────── Stat Card ───────────── */
const StatCard = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => (
  <div className="flex flex-col items-center gap-3 sm:gap-4">
    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-b from-[rgba(255,255,255,0.15)] to-[#099F86] flex items-center justify-center shadow-[0_9px_24px_rgba(20,169,144,0.3)]">
      {icon}
    </div>
    <h3 className="text-[#0AC07D] text-2xl sm:text-4xl font-bold">{value}</h3>
    <p className="text-[#4A4D6A] dark:text-[#8C8FA8] text-xs sm:text-sm text-center">{label}</p>
  </div>
);

/* ───────────── Payout Ticker Row ───────────── */
const PayoutItem = ({
  icon,
  label,
  name,
  amount,
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  amount: string;
}) => (
  <div className="flex items-center gap-2 sm:gap-3 bg-[#181A2C] rounded-[10px] px-2 sm:px-3 py-2 sm:py-3 min-w-[200px] sm:min-w-[240px]">
    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-[#6B6E8A] text-xs sm:text-sm">{label}</span>
      <span className="text-[#B3B6C7] text-sm sm:text-base font-medium">{name}</span>
    </div>
    <span className="text-[#0AC07D] font-bold text-lg sm:text-xl ml-auto">{amount}</span>
  </div>
);

/* ───────────── SVG Icons ───────────── */
const GlobeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8C8FA8" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const ClipboardIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8C8FA8" strokeWidth="1.5" strokeLinecap="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M9 6h6M9 10h6M9 14h4"/>
  </svg>
);
const SolanaCircleIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#9945FF" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" fill="#9945FF"/>
  </svg>
);

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
type RecentActivityResponse = {
  activities?: Array<{
    type?: 'payout' | 'earning' | 'referral';
    username?: string;
    avatarUrl?: string | null;
    countryCode?: string | null;
    countryName?: string | null;
    amount?: number;
    method?: string;
    offerName?: string;
    provider?: string;
    timestamp?: string;
    logoSrc?: string | null;
  }>;
  stats?: {
    totalPayout24hCents?: number;
    completedPayouts24hCount?: number;
    totalRewardsEarnedCents?: number;
    averageMoneyEarnedCents?: number;
    tasksCompletedCount?: number;
  };
};

type LandingActivity = NonNullable<
  NonNullable<RecentActivityResponse['activities']>[number]
>;

type LandingViewModel = {
  activities: LandingActivity[];
  stats: {
    totalPayout24hCents: number | null;
    completedPayouts24hCount: number | null;
    totalRewardsEarnedCents: number | null;
    averageMoneyEarnedCents: number | null;
    tasksCompletedCount: number | null;
  };
};

const LANDING_BACKEND_CHECK_TIMEOUT_MS = 3_000;

const MOCK_LANDING_VIEW_MODEL: LandingViewModel = {
  activities: [
    {
      type: 'payout',
      username: 'User',
      countryCode: 'US',
      countryName: 'United States',
      amount: 1000,
      method: 'giftcard',
      timestamp: '2026-07-10T08:15:00.000Z',
      logoSrc: '/streamline-logos_amazon-logo-block.png',
    },
    {
      type: 'earning',
      username: 'User',
      countryCode: 'GB',
      countryName: 'United Kingdom',
      amount: 850,
      provider: 'Offerwall',
      timestamp: '2026-07-10T08:42:00.000Z',
      logoSrc: '/image-003.png',
    },
    {
      type: 'payout',
      username: 'User',
      countryCode: 'DE',
      countryName: 'Germany',
      amount: 80,
      method: 'giftcard',
      timestamp: '2026-07-10T09:08:00.000Z',
      logoSrc: '/Group.png',
    },
    {
      type: 'earning',
      username: 'User',
      countryCode: 'CA',
      countryName: 'Canada',
      amount: 600,
      provider: 'Monopoly',
      timestamp: '2026-07-10T09:24:00.000Z',
      logoSrc: '/image-005.png',
    },
    {
      type: 'payout',
      username: 'User',
      countryCode: 'AU',
      countryName: 'Australia',
      amount: 80,
      method: 'worldcoin',
      timestamp: '2026-07-10T09:41:00.000Z',
      logoSrc: '/curlyic.png',
    },
    {
      type: 'earning',
      username: 'User',
      countryCode: 'IN',
      countryName: 'India',
      amount: 45,
      provider: 'Torox',
      timestamp: '2026-07-10T10:03:00.000Z',
      logoSrc: '/game-torox.png',
    },
    {
      type: 'payout',
      username: 'User',
      countryCode: 'BR',
      countryName: 'Brazil',
      amount: 1500,
      method: 'ethereum',
      timestamp: '2026-07-10T10:17:00.000Z',
      logoSrc: '/ethereum.png',
    },
    {
      type: 'earning',
      username: 'User',
      countryCode: 'FR',
      countryName: 'France',
      amount: 375,
      provider: 'Solana',
      timestamp: '2026-07-10T10:34:00.000Z',
      logoSrc: '/simple-icons_solana.png',
    },
  ],
  stats: {
    totalPayout24hCents: 12_500,
    completedPayouts24hCount: 42,
    totalRewardsEarnedCents: 68_900,
    averageMoneyEarnedCents: 235,
    tasksCompletedCount: 1_428,
  },
};

const normalizeRecentActivityResponse = (
  data: RecentActivityResponse | null
): LandingViewModel => {
  const activities = Array.isArray(data?.activities)
    ? data.activities.filter(
        (activity): activity is LandingActivity =>
          typeof activity?.username === 'string' &&
          typeof activity?.amount === 'number'
      )
    : [];

  return {
    activities,
    stats: {
      totalPayout24hCents:
        typeof data?.stats?.totalPayout24hCents === 'number'
          ? data.stats.totalPayout24hCents
          : null,
      completedPayouts24hCount:
        typeof data?.stats?.completedPayouts24hCount === 'number'
          ? data.stats.completedPayouts24hCount
          : null,
      totalRewardsEarnedCents:
        typeof data?.stats?.totalRewardsEarnedCents === 'number'
          ? data.stats.totalRewardsEarnedCents
          : null,
      averageMoneyEarnedCents:
        typeof data?.stats?.averageMoneyEarnedCents === 'number'
          ? data.stats.averageMoneyEarnedCents
          : null,
      tasksCompletedCount:
        typeof data?.stats?.tasksCompletedCount === 'number'
          ? data.stats.tasksCompletedCount
          : null,
    },
  };
};

const hasUsableBackendContent = (payload: LandingViewModel): boolean => {
  if (payload.activities.length > 0) {
    return true;
  }

  return [
    payload.stats.totalPayout24hCents,
    payload.stats.completedPayouts24hCount,
    payload.stats.totalRewardsEarnedCents,
    payload.stats.averageMoneyEarnedCents,
    payload.stats.tasksCompletedCount,
  ].some((value) => typeof value === 'number' && value > 0);
};

const formatCurrencyFromCents = (value: number | null | undefined): string =>
  typeof value === 'number'
    ? `$${(value / 100).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : '—';

const formatCountryLabel = (activity: LandingActivity): string => {
  const explicitCountry = activity.countryName?.trim();
  if (explicitCountry) {
    return explicitCountry;
  }

  const code = activity.countryCode?.trim().toUpperCase();
  if (!code) {
    return 'Country unavailable';
  }

  try {
    const displayName = new Intl.DisplayNames(['en'], { type: 'region' }).of(
      code
    );
    return displayName || code;
  } catch {
    return code;
  }
};

const formatActivitySummary = (activity: LandingActivity): string => {
  if (activity.type === 'payout') {
    const payoutMethod = activity.method?.replace('_', ' ') || 'wallet payout';
    return `Completed a ${payoutMethod} withdrawal`;
  }

  if (activity.type === 'earning') {
    const source = activity.provider || activity.offerName || 'offerwall task';
    return `Earned rewards from ${source}`;
  }

  return 'Received a referral reward payout';
};

const formatActivityDate = (value: string | undefined): string => {
  if (!value) {
    return 'Recently';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Recently';
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

const getGeneratedAvatarBackground = (seed: string): string => {
  const safeSeed = seed || 'user';
  const hash = safeSeed
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const primaryHue = hash % 360;
  const secondaryHue = (primaryHue + 44) % 360;

  return `linear-gradient(135deg, hsl(${primaryHue} 68% 46%) 0%, hsl(${secondaryHue} 72% 38%) 100%)`;
};

const resolveLandingApiBaseUrl = (): string => {
  const configured = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (configured) {
    return configured.replace(/\/+$/, '');
  }

  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://earnlabbackend.vercel.app';
};


const STAR_PATH = 'M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z';
const HALF_STAR_PATH = 'M12 2L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26Z';

const StarIcon = ({ type }: { type: 'full' | 'half' | 'empty' }) => {
  if (type === 'full') return (
    <svg width="20" height="20" viewBox="0 0 24 24"><path d={STAR_PATH} fill="#F59E0B"/></svg>
  );
  if (type === 'half') return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d={STAR_PATH} fill="#3A3E55"/>
      <path d={HALF_STAR_PATH} fill="#F59E0B"/>
    </svg>
  );
  return <svg width="20" height="20" viewBox="0 0 24 24"><path d={STAR_PATH} fill="#3A3E55"/></svg>;
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <StarIcon
        key={n}
        type={n <= Math.floor(rating) ? 'full' : n - 0.5 <= rating ? 'half' : 'empty'}
      />
    ))}
  </div>
);

const LANDINGPAGEComponent = () => {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [recentActivities, setRecentActivities] = useState<LandingActivity[]>([]);
  const [totalPayout24hCents, setTotalPayout24hCents] = useState<number | null>(null);
  const [completedPayouts24hCount, setCompletedPayouts24hCount] = useState<number | null>(null);
  const [totalRewardsEarnedCents, setTotalRewardsEarnedCents] = useState<number | null>(null);
  const [averageMoneyEarnedCents, setAverageMoneyEarnedCents] = useState<number | null>(null);
  const [tasksCompletedCount, setTasksCompletedCount] = useState<number | null>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const { t } = useTranslation();

    /* ─── Static testimonials ─── */

  const TESTIMONIALS = [
  {
    name: 'Leslie Alexander',
    country: 'United Kingdom',
    flag: '🇬🇧',
    avatarUrl: '/leslie.png',
    text: t("testimonials_cards.leslie_text"),
    rating: 5,
  },
  {
    name: 'Bessie Cooper',
    country: 'United States',
    flag: '🇺🇸',
    avatarUrl: '/bessie.jpg',
    text: t("testimonials_cards.bessie_text"),
    rating: 4.5,
  },
  {
    name: 'Brooklyn Simmons',
    country: 'France',
    flag: '🇫🇷',
    avatarUrl: '/brooklyn.png',
    text: t("testimonials_cards.brooklyn_text"),
    rating: 4,
  },
  {
    name: 'Cameron Williamson',
    country: 'Germany',
    flag: '🇩🇪',
    text: t("testimonials_cards.cameron_text"),
    rating: 5,
  },
  {
    name: 'Robert Fox',
    country: 'Canada',
    flag: '🇨🇦',
    text: t("testimonials_cards.robert_text"),
    rating: 4.5,
  },
];

const faqData = [
  {
    q: t("faq.questions.start_earning.q"),
    a: t("faq.questions.start_earning.a"),
  },
  {
    q: t("faq.questions.payout_methods.q"),
    a: t("faq.questions.payout_methods.a"),
  },
  {
    q: t("faq.questions.withdraw.q"),
    a: t("faq.questions.withdraw.a"),
  },
  {
    q: t("faq.questions.withdraw_time.q"),
    a: t("faq.questions.withdraw_time.a"),
  },
  {
    q: t("faq.questions.worldwide.q"),
    a: t("faq.questions.worldwide.a"),
  },
];

const REWARD_LOGOS = [
  { id: 1, src: "/visa.png", bg: "#0619B9" },
  { id: 2, src: "/bitcoin.png", bg: "#D85F02" },
  { id: 3, src: "/skrill.png", bg: "#04A07C" },
  { id: 4, src: "/cib_cashapp.png", bg: "#0391C0" },
  { id: 5, src: "/apple.png", bg: "#FFFFFF" },
  { id: 6, src: "/worlcoin-2.png", bg: "#FFFFFF" },
  { id: 7, src: "/googleplay.png", bg: "#D802C3" },
  { id: 8, src: "/nike.png", bg: "#D82902" },
  { id: 9, src: "/mastercard.png", bg: "#1126D5" },
  { id: 10, src: "/roblox.png", bg: "#8A11D5" },
];



useEffect(() => {
  let active = true;

  const applyLandingPayload = (payload: LandingViewModel) => {
    if (!active) return;

    setTotalPayout24hCents(payload.stats.totalPayout24hCents);
    setCompletedPayouts24hCount(
      payload.stats.completedPayouts24hCount
    );
    setTotalRewardsEarnedCents(
      payload.stats.totalRewardsEarnedCents
    );
    setAverageMoneyEarnedCents(
      payload.stats.averageMoneyEarnedCents
    );
    setTasksCompletedCount(
      payload.stats.tasksCompletedCount
    );
    setRecentActivities(payload.activities);
  };

  const fetchPayoutSummary = async () => {
    const primaryApi = resolveLandingApiBaseUrl();

    const apiCandidates = [
      primaryApi,
      'https://earnlabbackend.vercel.app',
    ].filter(
      (api, index, self) =>
        self.indexOf(api) === index
    );

    const deadline =
      Date.now() + LANDING_BACKEND_CHECK_TIMEOUT_MS;

    let backendPayload: RecentActivityResponse | null =
      null;

    for (const api of apiCandidates) {
      const remainingMs = deadline - Date.now();

      if (remainingMs <= 0) break;

      const controller = new AbortController();

      const timeoutId = window.setTimeout(
        () => controller.abort(),
        remainingMs
      );

      try {
        const response = await fetch(
          `${api}/api/v1/offerwalls/recent-activity?limit=60`,
          {
            cache: 'no-store',
            signal: controller.signal,
          }
        );

        if (!response.ok) continue;

        backendPayload =
          (await response.json()) as RecentActivityResponse;

        break;
      } catch {
        continue;
      } finally {
        window.clearTimeout(timeoutId);
      }
    }

    const normalizedBackendPayload =
      normalizeRecentActivityResponse(
        backendPayload
      );

    applyLandingPayload(
      hasUsableBackendContent(
        normalizedBackendPayload
      )
        ? normalizedBackendPayload
        : MOCK_LANDING_VIEW_MODEL
    );
  };

  fetchPayoutSummary();

  const interval = window.setInterval(
    fetchPayoutSummary,
    60000
  );

  return () => {
    active = false;
    window.clearInterval(interval);
  };
}, []);


  const launchUserCount = 100;

  const payoutActivities = recentActivities.slice(0, 8);

  const totalPayout24hText =
    typeof totalPayout24hCents === 'number'
      ? formatCurrencyFromCents(totalPayout24hCents)
      : 'Live data unavailable';
  const totalRewardsEarnedText = formatCurrencyFromCents(totalRewardsEarnedCents);
  const averageMoneyEarnedText = formatCurrencyFromCents(averageMoneyEarnedCents);
  const tasksCompletedText =
    typeof tasksCompletedCount === 'number'
      ? tasksCompletedCount.toLocaleString('en-US')
      : '—';
  const launchUserCountText = launchUserCount.toLocaleString('en-US');

  const splitIndex = Math.max(1, Math.ceil(payoutActivities.length / 2));
  const payoutRowOneActivities = payoutActivities.slice(0, splitIndex);
  const payoutRowTwoActivities =
    payoutActivities.slice(splitIndex).length > 0
      ? payoutActivities.slice(splitIndex)
      : payoutRowOneActivities;

  const activitiesForTestimonials = (() => {
    const result: LandingActivity[] = [];
    const seenCountries = new Set<string>();

    for (const activity of recentActivities) {
      const countryKey =
        activity.countryCode?.toUpperCase() || activity.countryName || '';
      if (!countryKey || seenCountries.has(countryKey)) {
        continue;
      }
      seenCountries.add(countryKey);
      result.push(activity);

      if (result.length >= 6) {
        break;
      }
    }

    if (result.length < 6) {
      for (const activity of recentActivities) {
        const alreadyIncluded = result.some(
          (item) =>
            item.username === activity.username &&
            item.timestamp === activity.timestamp
        );

        if (!alreadyIncluded) {
          result.push(activity);
        }

        if (result.length >= 6) {
          break;
        }
      }
    }

    return result;
  })();

  const getPayoutItemMeta = (activity: LandingActivity) => {
    const logoIcon = activity.logoSrc ? (
      <img src={activity.logoSrc} alt="" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
    ) : null;

    if (activity.type === 'payout') {
      return {
        icon: logoIcon || <GlobeIcon />,
        label: `${activity.username} withdrew`,
        name: activity.method?.replace('_', ' ') || 'Wallet payout',
      };
    }

    if (activity.type === 'earning') {
      return {
        icon: logoIcon || <ClipboardIcon />,
        label: `${activity.username} earned`,
        name: activity.provider || activity.offerName || 'Offerwall',
      };
    }

    return {
      icon: logoIcon || <SolanaCircleIcon />,
      label: `${activity.username} referred`,
      name: 'Referral reward',
    };
  };

  return (
    <div className="w-full min-h-screen bg-[#0D0F1E] text-white font-['DM_Sans',sans-serif] overflow-x-hidden pb-16 sm:pb-0">
      {/* ═══════ NAVBAR ═══════ */}
      <nav className="w-full bg-[#16192E] px-4 sm:px-10 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-50">
        <img src="/landing-image-003.png" alt="Lab Wards" className="h-7 sm:h-9" />
        {/* Desktop Nav Links */}
        <DesktopNavLinks variant="landing" onSignUp={() => setShowSignUp(true)} />
        {/* Mobile hamburger */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="sm:hidden w-10 h-10 bg-[#26293E] rounded-lg flex items-center justify-center">
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
            <path d="M1 1h16M1 7h16M1 13h16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        {/* Desktop buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button onClick={() => setShowSignIn(true)} className="px-6 py-3 rounded-full border border-[#3A3E57] bg-[#30334A] text-white font-bold text-sm">
             {t("navbar.signin")}
          </button>
          <button onClick={() => setShowSignUp(true)} className="px-6 py-3 rounded-full bg-gradient-to-r from-[#0AC07D] to-[#14A990] text-white font-bold text-sm shadow-[0_9px_24px_rgba(20,169,144,0.3)]">
             {t("navbar.signup")}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0D0F1E] flex flex-col p-4 sm:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between mb-8">
            <img src="/landing-image-003.png" alt="Lab Wards" className="h-7" />
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="w-10 h-10 bg-[#26293E] rounded-lg flex items-center justify-center text-[#8C8FA8]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 1L13 13M1 13L13 1" />
              </svg>
            </button>
          </div>
          
          <div className="flex flex-col gap-4">
            <button onClick={() => { setIsMobileMenuOpen(false); setShowSignIn(true); }} className="w-full py-4 text-center rounded-xl border border-[#3A3E57] bg-[#30334A] text-white font-bold text-lg">
              {t("navbar.signin")}
            </button>
            <button onClick={() => { setIsMobileMenuOpen(false); setShowSignUp(true); }} className="w-full py-4 text-center rounded-xl bg-gradient-to-r from-[#0AC07D] to-[#14A990] text-white font-bold text-lg shadow-[0_9px_24px_rgba(20,169,144,0.3)]">
              {t("navbar.signup")}
            </button>
          </div>
        </div>
      )}

      <TickerBar />

      {/* ═══════ HERO ═══════ */}
<section className="bg-[#0D0F1E] py-8">
  <div
    className="relative mx-auto w-full max-w-[1360px] h-[620px] overflow-hidden rounded-[40px] bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/landing-page.png')" }}
  >
    <div className="absolute inset-0 flex items-center justify-between px-[80px]">
  {/* Left Content */}
  <div className="max-w-[620px]">
    <h1
      className="text-[60px] leading-[72px] font-semibold text-white"
      style={{ fontFamily: "DM Sans" }}
    >
      Get paid for what you already do online
    </h1>

    <p
      className="mt-6 max-w-[560px] text-[20px] leading-[32px] text-[#E6FFFD]"
      style={{ fontFamily: "DM Sans", fontWeight: 400 }}
    >
      Complete surveys, play games, and finish quick offers to earn real
      money, crypto, and rewards.
    </p>

    <button
      onClick={() => setShowSignUp(true)}
      className="mt-10 rounded-xl bg-white px-8 py-4 text-[#0D0F1E]"
      style={{
        fontFamily: "Manrope",
        fontWeight: 700,
        fontSize: "15px",
        boxShadow: "0px 8px 24px #14A9904D",
      }}
    >
      Get Started
    </button>
  </div>

  {/* Right Signup Card */}
  <div
    className="w-[390px] rounded-[24px] border backdrop-blur-md"
    style={{
      background: "#3F90CBAD",
      borderColor: "#5D9BC8",
      padding: "32px 20px",
    }}
  >
    <h2
      className="text-white text-[22px] font-semibold"
      style={{ fontFamily: "DM Sans" }}
    >
      Get Started!
    </h2>

    <p
      className="mt-2 text-[#E6FFFD] text-[14px]"
      style={{ fontFamily: "DM Sans", fontWeight: 400 }}
    >
      It's free! Sign up and start to earn money!
    </p>

    {/* Facebook */}
    <button onClick={() => setShowSignUp(true)} className="mt-6 flex h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-[#84C4DC] bg-[#C5E5F24D] text-white cursor-pointer hover:bg-[#C5E5F280] transition-colors">
  <img
    src="/facebook.png"
    alt="Facebook"
    className="w-5 h-5 object-contain"
  />
  <span
    className="text-[13px] text-white"
    style={{ fontFamily: "DM Sans", fontWeight: 500 }}
  >
    Sign up via Facebook
  </span>
</button>

<button onClick={() => setShowSignUp(true)} className="mt-3 flex h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-[#84C4DC] bg-[#C5E5F24D] text-white cursor-pointer hover:bg-[#C5E5F280] transition-colors">
  <img
    src="/google.png"
    alt="Google"
    className="w-5 h-5 object-contain"
  />
  <span
    className="text-[13px] text-white"
    style={{ fontFamily: "DM Sans", fontWeight: 500 }}
  >
    Sign up via Google
  </span>
</button>

    {/* Worldcoin */}
    <button onClick={() => setShowSignUp(true)} className="mt-3 flex h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-[#84C4DC] bg-[#C5E5F24D] text-white cursor-pointer hover:bg-[#C5E5F280] transition-colors">
  <img
    src="/worldcoin-1.png"
    alt="Worldcoin"
    className="w-5 h-5 object-contain"
  />
  <span
    className="text-[13px] text-white"
    style={{ fontFamily: "DM Sans", fontWeight: 500 }}
  >
    Sign up via Worldcoin
  </span>
</button>

    {/* Divider */}
    <div className="my-6 flex items-center gap-3">
      <div className="h-px flex-1 bg-[#66AEC9]" />
      <span
        className="text-white text-[13px]"
        style={{ fontFamily: "DM Sans" }}
      >
        Or
      </span>
      <div className="h-px flex-1 bg-[#66AEC9]" />
    </div>

    {/* Email */}
    <input
      type="email"
      placeholder="Email address"
      onClick={() => setShowSignUp(true)}
      readOnly
      className="h-[50px] w-full rounded-xl border border-[#7BB7CD] bg-[#C5E5F24D] px-4 text-white placeholder:text-[#FFFFFF99] outline-none cursor-pointer"
      style={{
        fontFamily: "Inter",
        fontWeight: 500,
        fontSize: "13px",
      }}
    />

    {/* CTA */}
    <button
      onClick={() => setShowSignUp(true)}
      className="mt-5 h-[52px] w-full rounded-xl bg-white cursor-pointer hover:bg-gray-100 transition-colors"
      style={{
        fontFamily: "Manrope",
        fontWeight: 600,
        fontSize: "14px",
        color: "#151728",
        boxShadow: "0px 8px 24px #14A9904D",
      }}
    >
      Start Earning Now!
    </button>
  </div>
</div>
  </div>
</section>

      {/* ═══════ HOW IT WORKS ═══════ */}
<section className="bg-[#0D0F1E] py-24">
  <div className="max-w-[1360px] mx-auto px-4">
    {/* Heading */}
    <div className="text-center">
      <h2
        className="text-white text-[48px] font-semibold"
        style={{ fontFamily: "DM Sans" }}
      >
        Start Earning in Just 4 Simple Steps
      </h2>

      <p
        className="mt-5 text-[24px] font-medium text-[#A5A9C8]"
        style={{ fontFamily: "DM Sans" }}
      >
        Create your account, complete available tasks, and withdraw your
        earnings.
      </p>
    </div>

    {/* Cards */}
    <div className="mt-20 flex justify-between gap-5">
      {/* Card 1 */}
      <div className="relative w-[325px] h-[512px] overflow-hidden rounded-[28px]">
        <img
          src="/step1.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

       <div className="absolute bottom-3 left-3 right-8">
          <h3
            className="text-white text-[24px] font-bold"
            style={{ fontFamily: "Manrope" }}
          >
            Create account
          </h3>

          <p
            className="mt-1 text-[13px] font-medium text-[#A9E5E2]"
            style={{ fontFamily: "DM Sans" }}
          >
            Sign up in seconds and unlock your rewards journey.
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="relative w-[325px] h-[512px] overflow-hidden rounded-[28px]">
        <img
          src="/step2.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

       <div className="absolute bottom-3 left-3 right-8">
          <h3
            className="text-white text-[24px] font-bold"
            style={{ fontFamily: "Manrope" }}
          >
            Select tasks
          </h3>

          <p
            className="mt-1 text-[13px] font-medium text-[#B8A2F2]"
            style={{ fontFamily: "DM Sans" }}
          >
            Choose simple tasks that match your interests.
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="relative w-[325px] h-[512px] overflow-hidden rounded-[28px]">
        <img
          src="/step3.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute bottom-3 left-3 right-8">
          <h3
            className="text-white text-[24px] font-bold"
            style={{ fontFamily: "Manrope" }}
          >
            Choose pay method
          </h3>

          <p
            className="mt-1 text-[13px] font-medium text-[#D7A4E7]"
            style={{ fontFamily: "DM Sans" }}
          >
            Pick your preferred way to get paid.
          </p>
        </div>
      </div>

      {/* Card 4 */}
      <div className="relative w-[325px] h-[512px] overflow-hidden rounded-[28px]">
        <img
          src="/step4.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

       <div className="absolute bottom-3 left-3 right-8">
          <h3
            className="text-white text-[24px] font-bold"
            style={{ fontFamily: "Manrope" }}
          >
            Receive Payment
          </h3>

          <p
            className="mt-1 text-[13px] font-medium text-[#E7D1A4]"
            style={{ fontFamily: "DM Sans" }}
          >
            Cash out your earnings quickly and securely.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ═══════ HOW IT WORKS ═══════ */}

<section className="relative z-10 max-w-[1312px] mx-auto px-4 pt-6 sm:pt-10 pb-16 sm:pb-20">
<div className="text-center mb-16">
  <h2
    className="text-[48px] font-semibold text-white"
    style={{ fontFamily: "DM Sans" }}
  >
    Flexible Reward Options
  </h2>

  <p
    className="mt-5 text-[24px] font-medium text-[#A5A9C8]"
    style={{ fontFamily: "DM Sans" }}
  >
    Withdraw your earnings using your preferred method.
  </p>
</div>


  {/* GRID */}
  {/* GRID */}
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-5">
  {REWARD_LOGOS.map((item) => (
   <div
  key={item.id}
  className="rounded-[15px] w-full h-[164px] flex items-center justify-center px-[40px] py-[38px] hover:scale-105 transition-transform duration-300"
  style={{ backgroundColor: item.bg }}
>
  <div className="w-14 h-14 flex items-center justify-center">
    <img
      src={item.src}
      alt=""
      className="w-full h-full object-contain"
    />
  </div>

    </div>
  ))}
</div>
</section>




      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="py-14 sm:py-20 bg-[#E8EAF2] dark:bg-[#111324]">
        <div className="max-w-[1312px] mx-auto px-4">
          <h2 className="text-3xl sm:text-5xl font-semibold text-center tracking-tight mb-10 sm:mb-14 text-[#1A1D2E] dark:text-white">
            {t("testimonials.title_highlight")}          </h2>

          {/* Cards — 3 visible at once on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-12">
            {[0, 1, 2].map((offset) => {
              const testimonial =
  TESTIMONIALS[
    (testimonialIdx + offset) % TESTIMONIALS.length
  ];
              return (
                <div
                  key={`${testimonial.name}-${offset}`}

                  className="rounded-2xl border border-[#EBEDF5] dark:border-[#252840] p-6 sm:p-7 flex flex-col gap-4 bg-white dark:bg-[#161828]"
                >
                  {/* Avatar + name */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full shrink-0 ring-2 ring-white/10 overflow-hidden">
                      <img
src={testimonial.avatarUrl || "/default-avatar.png"}
alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[#1A1D2E] dark:text-white font-semibold text-[15px] leading-tight">{testimonial.name}</p>
                      <p className="text-[#4A4D6A] dark:text-[#8C8FA8] text-[13px] mt-0.5">{testimonial.flag} {testimonial.country}</p>
                    </div>
                  </div>
                  {/* Review text */}
                  <p className="text-[#4A4D6A] dark:text-[#B3B6C7] text-sm leading-6 flex-1">{testimonial.text}</p>
                  {/* Stars */}
                  <StarRating rating={testimonial.rating} />
                </div>
              );
            })}
          </div>

          {/* Navigation */}
<div className="flex justify-center mt-12">
  <div className="flex items-center gap-5 rounded-full border border-[#26293E] bg-[#16182A] px-5 py-3">
    {/* Prev */}
   <button
  onClick={() =>
    setTestimonialIdx(
      (p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    )
  }
  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#3A3E57] bg-[#0D0F1E] transition hover:opacity-90"
>
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M20 12H6"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M11 7L6 12L11 17"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</button>

    {/* Indicators */}
    <div className="flex items-center gap-2">
      {TESTIMONIALS.map((_, i) => (
        <button
          key={i}
          onClick={() => setTestimonialIdx(i)}
          className={`rounded-full transition-all duration-300 ${
           i === testimonialIdx
  ? "w-[18px] h-[4px] bg-[#2DAD97]"
  : "w-[18px] h-[4px] bg-[#30334A]"
          }`}
        />
      ))}
    </div>

    {/* Next */}
   <button
  onClick={() =>
    setTestimonialIdx((p) => (p + 1) % TESTIMONIALS.length)
  }
  className="flex h-10 w-10 items-center justify-center rounded-full bg-white transition hover:opacity-90"
>
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M4 12H18"
      stroke="#0D0F1E"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M13 7L18 12L13 17"
      stroke="#0D0F1E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</button>

  </div>
</div>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="py-12 sm:py-20">
        <div className="max-w-[1312px] mx-auto px-4">
          <h2 className="text-3xl sm:text-5xl font-semibold text-center tracking-tight mb-8 sm:mb-12 animate-fadeInUp text-[#1A1D2E] dark:text-white">
            {t("stats.title_highlight")}{' '}
            <span className="text-[#18C2A3]">{t("stats.title_rest")}</span>
          </h2>
          <div className="bg-white dark:bg-[#111324] rounded-2xl px-4 sm:px-8 py-10 sm:py-16 border border-[#EBEDF5] dark:border-0">
            <div className="divide-y divide-[#EBEDF5] dark:divide-[#26293E] sm:divide-y-0 sm:grid sm:grid-cols-4 sm:gap-8">
              <div className="py-6 first:pt-0 sm:py-0">
                <StatCard
                  icon={
                    <img width="28" height="28" src="/earned.png" alt="Total rewards earned" />
                  }
                  value={totalRewardsEarnedText}
                  label={t("stats.total_rewards")}
                />
              </div>
              <div className="py-6 sm:py-0">
                <StatCard
                  icon={
                    <img width="28" height="28" src="/average.png" alt="Average money earned" />
                  }
                  value={averageMoneyEarnedText}
                  label={t("stats.average")}
                />
              </div>
              <div className="py-6 sm:py-0">
                <StatCard
                  icon={
                    <img width="28" height="28" src="/users.png" alt="Total users" />
                  }
                  value={launchUserCountText}
                  label={t("stats.users")}
                />
              </div>
              <div className="py-6 last:pb-0 sm:py-0">
                <StatCard
                  icon={
                    <img width="28" height="28" src="/tasks.png" alt="Tasks completed" />
                  }
                  value={tasksCompletedText}
                  label={t("stats.tasks")}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

{/* ═══════ FAQ + REWARDS WRAPPER (SMOOTH CONTINUOUS WAVE) ═══════ */}
<div className="relative bg-gradient-to-b from-[#F0F2F8] via-[#E8EAF2] to-[#F0F2F8] dark:from-[#0D0F1E] dark:via-[#101324] dark:to-[#0D0F1E] overflow-hidden">
  {/* ───────── TOP SMOOTH BLEND (from cards → FAQ) ───────── */}
  <div className="absolute top-0 left-0 w-full z-0">
    <svg
      className="w-full h-[160px]"
      viewBox="0 0 1440 160"
      preserveAspectRatio="none"
    >
      <defs>
<linearGradient id="faqTopWave" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0%" stopColor="var(--faq-top-wave-1)" />
  <stop offset="100%" stopColor="var(--faq-top-wave-2)" />
</linearGradient>

    </defs>

      <path
        d="
          M0,80
          C240,140 480,20 720,80
          C960,140 1200,20 1440,80
          L1440,160 L0,160 Z
        "
        fill="url(#faqTopWave)"
      />
    </svg>
  </div>

  {/* ───────── CONTENT ───────── */}
  <div className="relative z-10">

    {/* ═══════ FAQ ═══════ */}
    <section className="max-w-[1312px] mx-auto px-4 py-20">
      <h2 className="text-3xl sm:text-5xl font-semibold text-center mb-12 text-[#1A1D2E] dark:text-white">
        {t("faq.title_highlight")}
      </h2>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="hidden lg:block lg:w-[380px]">
          <img src="/faqitem.png" className="w-full rounded-2xl" />
        </div>

        <div className="flex-1">
          {faqData.map((item, i) => (
            <FAQItem
              key={i}
              q={item.q}
              a={item.a}
              open={openFaq === i}
              onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>


  </div>
</div>

    {/* ═══════ CTA SECTION ═══════ */}
      <section className="max-w-[1312px] mx-auto px-4 py-10 sm:py-16">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#1a3a2e] to-[#111324]">
          <img
            src="/cta-2.png"
            alt=""
            className="w-full h-[250px] sm:h-[350px] object-cover opacity-60"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 animate-fadeInUp">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              {t("cta.title_highlight")}
            </h2>
            <p className="text-[#B3B6C7] text-sm sm:text-base max-w-[520px] mb-5 sm:mb-8 leading-relaxed">
               {t("cta.desc")}
            </p>
            <button onClick={() => setShowSignUp(true)} className="inline-block px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-[#0D0F1E] dark:bg-white text-white dark:text-[#0D0F1E] font-bold text-sm sm:text-base hover:bg-[#18C2A3] hover:text-white transition-colors duration-300 hover:shadow-[0_0_30px_rgba(24,194,163,0.4)]">
              {t("cta.button")}
            </button>
          </div>
        </div>
      </section>

      {/* Shared footer is rendered globally from src/app/layout.tsx */}

      {/* ═══════ AUTH MODALS ═══════ */}
      <SignInModal
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onForgotPassword={() => { setShowSignIn(false); setShowForgotPassword(true); }}
        onSignUp={() => { setShowSignIn(false); setShowSignUp(true); }}
      />
      <SignUpModal
        isOpen={showSignUp}
        onClose={() => setShowSignUp(false)}
        onSignIn={() => { setShowSignUp(false); setShowSignIn(true); }}
      />
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />

      {/* ═══════ MOBILE BOTTOM NAV ═══════ */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-[#111324] border-t border-[#1C1E32] flex items-center justify-around py-2 z-50">
        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex flex-col items-center gap-0.5 text-[#0AC07D]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span className="text-[10px] font-medium">Home</span>
        </button>
        <button onClick={() => setShowSignUp(true)} className="flex flex-col items-center gap-0.5 text-[#6B6E8A]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          <span className="text-[10px]">Earn</span>
        </button>
        <button onClick={() => setShowSignUp(true)} className="flex flex-col items-center gap-0.5 text-[#6B6E8A]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12l2 2 4-4"/>
          </svg>
          <span className="text-[10px]">Tasks</span>
        </button>
        <button onClick={() => setShowSignUp(true)} className="flex flex-col items-center gap-0.5 text-[#6B6E8A]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          <span className="text-[10px]">Surveys</span>
        </button>
        <button onClick={() => setIsMobileMenuOpen(true)} className="flex flex-col items-center gap-0.5 text-[#6B6E8A]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
          <span className="text-[10px]">Menu</span>
        </button>
      </nav>

    </div>
  );
};

export default LANDINGPAGEComponent;

