"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "@/utils/toast";
import { useTranslation } from "react-i18next";
import ServeyWalls from "@/Components/Servey/ServeyWalls";
import TickerBar from "@/Components/Shared/TickerBar";
import TopBar from "@/Components/Topbar";

const IcoHeadset = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 12C3 7.03 7.03 3 12 3s9 4.03 9 9v5a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h2v-1a7 7 0 0 0-14 0v1h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/* ── Types ───────────────────────────────────────────────────────── */
type SurveyQuestion = {
  id: string;
  prompt: string;
  placeholder: string;
  numericOnly?: boolean;
};
type SurveyProvider = {
  id: string;
  name: string;
  logoUrl?: string;
  launchUrl?: string;
};
type OfferwallApiItem = {
  _id?: string;
  id?: string;
  name?: string;
  displayName?: string;
  type?: string;
  category?: string;
  logoUrl?: string;
  callbackUrl?: string;
  isActive?: boolean;
  status?: string;
  metadata?: {
    logoUrl?: string;
    launchUrl?: string;
    offerUrl?: string;
    referralUrl?: string;
  };
};



/* ── Helpers ─────────────────────────────────────────────────────── */
const isSurveyProvider = (s: string) =>
  /survey|poll|questionnaire|cpx|bitlab|theorem|pollfish|inbrain|research/i.test(
    s,
  );

const COMPLETION_ENDPOINTS = [
  "/api/v1/offerwalls/surveys/complete",
  "/api/v1/surveys/complete",
];

/* ══════════════════════════════════════════════════════════════════ */
export default function SurveysPage() {
  const router = useRouter();

  /* survey state */
  const [providers, setProviders] = useState<SurveyProvider[]>([]);
  const [activeId, setActiveId] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [doneMsg, setDoneMsg] = useState("");
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const { t } = useTranslation();

  const QUESTIONS: SurveyQuestion[] = [
    {
      id: "householdIncome",
      prompt: t("survey.questions.householdIncome"),
      placeholder: t("survey.placeholders.numbersOnly"),
      numericOnly: true,
    },
    {
      id: "ageRange",
      prompt: t("survey.questions.ageRange"),
      placeholder: t("survey.placeholders.ageExample"),
    },
    {
      id: "occupation",
      prompt: t("survey.questions.occupation"),
      placeholder: t("survey.placeholders.occupationExample"),
    },
    {
      id: "education",
      prompt: t("survey.questions.education"),
      placeholder: t("survey.placeholders.educationExample"),
    },
    {
      id: "country",
      prompt: t("survey.questions.country"),
      placeholder: t("survey.placeholders.countryExample"),
    },
    {
      id: "maritalStatus",
      prompt: t("survey.questions.maritalStatus"),
      placeholder: t("survey.placeholders.maritalExample"),
    },
    {
      id: "children",
      prompt: t("survey.questions.children"),
      placeholder: t("survey.placeholders.numbersOnly"),
      numericOnly: true,
    },
    {
      id: "employment",
      prompt: t("survey.questions.employment"),
      placeholder: t("survey.placeholders.employmentExample"),
    },
    {
      id: "interests",
      prompt: t("survey.questions.interests"),
      placeholder: t("survey.placeholders.interestsExample"),
    },
  ];

  const question = QUESTIONS[stepIndex];
  const answer = answers[question.id] || "";
  const totalSteps = QUESTIONS.length;
  const progressWidth = useMemo(
    () => Math.round((stepIndex / totalSteps) * 100),
    [stepIndex, totalSteps],
  );

  /* load providers */
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`${API}/api/v1/offerwalls`, {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = await res.json();
        const all: OfferwallApiItem[] = Array.isArray(data?.offerwalls)
          ? data.offerwalls
          : Array.isArray(data?.data)
            ? data.data
            : [];
        const active = all.filter(
          (o) =>
            o.isActive !== false &&
            o.status !== "inactive" &&
            o.status !== "paused",
        );
        const src = active.length > 0 ? active : all;
        const mapped: SurveyProvider[] = src
          .filter((o) =>
            isSurveyProvider(
              `${o.name || ""} ${o.displayName || ""} ${o.type || ""} ${o.category || ""}`,
            ),
          )
          .map((o, i) => ({
            id: o._id || o.id || `prov-${i}`,
            name: (o.displayName || o.name || `Provider ${i + 1}`).trim(),
            logoUrl: o.metadata?.logoUrl || o.logoUrl,
            launchUrl:
              o.metadata?.launchUrl || o.metadata?.offerUrl || o.callbackUrl,
          }));
        const final =
          mapped.length > 0
            ? mapped
            : src
                .slice(0, 4)
                .map((o, i) => ({
                  id: o._id || o.id || `prov-${i}`,
                  name: (o.displayName || o.name || `Provider ${i + 1}`).trim(),
                }));
        if (!alive) return;
        setProviders(final);
        setActiveId((prev) => prev || final[0]?.id || "");
      } catch {}
    })();
    return () => {
      alive = false;
    };
  }, []);



  const setAnswer = (val: string) => {
    const v = question.numericOnly ? val.replace(/\D/g, "") : val;
    setAnswers((prev) => ({ ...prev, [question.id]: v }));
  };

  const goPrev = () => setStepIndex((p) => Math.max(0, p - 1));

  const goNext = async () => {
    if (!answer.trim()) {
      toast.warn(t("survey.messages.answerRequired"));
      return;
    }
    if (stepIndex < QUESTIONS.length - 1) {
      setStepIndex((p) => p + 1);
      return;
    }

    const provider = providers.find((p) => p.id === activeId);
    if (!provider) {
      toast.warn(t("survey.messages.noProvider"));
      return;
    }

    setSubmitting(true);
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) headers.Authorization = `Bearer ${token}`;
      const body = JSON.stringify({
        providerId: provider.id,
        providerName: provider.name,
        answers,
        completedAt: new Date().toISOString(),
      });

      let ok = false;
      let lastMsg = "";
      for (const ep of COMPLETION_ENDPOINTS) {
        const r = await fetch(`${API}${ep}`, { method: "POST", headers, body });
        if (r.status === 404 || r.status === 405) continue;
        const d = await r.json().catch(() => ({}));
        console.log("SURVEY RESPONSE:", r.status, JSON.stringify(d));

        if (!r.ok) throw new Error(d.message || `Error ${r.status}`);
        ok = true;
        lastMsg = d.message || "Survey completed!";
        break;
      }
      if (!ok) throw new Error("Completion endpoint unavailable.");

      toast.success(t("survey.messages.completed"));
      localStorage.setItem("profileCompleted", "true");
      setProfileCompleted(true);
      setDoneMsg(lastMsg);
    } catch (e) {
      toast.error((e as Error).message || t("survey.messages.submitFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Check localStorage cache first
    const localDone = localStorage.getItem("profileCompleted") === "true";
    if (localDone) setProfileCompleted(true);

    fetch(`${API}/api/v1/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        const done = data?.profile?.profileCompleted === true;
        if (done) localStorage.setItem("profileCompleted", "true");
        setProfileCompleted(done);
      })
      .catch(() => {
        // If API fails, keep localStorage value if set
      })
      .finally(() => setProfileLoading(false));
  }, []);

  const busy = submitting;

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0D1F] text-white">

      <TopBar />

      <TickerBar />

      {/* ── Main Survey Content ──────────────────────────────────── */}
      {profileLoading ? null : !profileCompleted ? (
        <main className="flex-1 flex flex-col w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 pt-5 pb-6 sm:py-10 overflow-hidden">
          {/* Progress */}
          <div className="mb-5 sm:mb-8 w-full">
            <span className="text-[#8C8FA8] text-sm font-medium">
              {stepIndex}/{totalSteps}
            </span>
            <div className="mt-2 w-full h-[5px] sm:h-[6px] rounded-full bg-[#1E2133] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progressWidth}%`,
                  background: "linear-gradient(90deg, #0AC07D, #14A990)",
                }}
              />
            </div>
          </div>

          {/* Question + Input + Buttons — centered in remaining space */}
          <div className="flex-1 flex flex-col items-center justify-center gap-5 sm:gap-8 w-full min-w-0">
            {/* Question */}
            <h1 className="w-full text-center text-[17px] sm:text-[24px] md:text-[30px] font-bold leading-snug break-words px-1">
              {question.prompt}
            </h1>

            {/* Input */}
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              inputMode={question.numericOnly ? "numeric" : "text"}
              placeholder={question.placeholder}
              disabled={busy}
              className="w-full max-w-[460px] h-[46px] sm:h-[52px] rounded-[8px] border border-[#2A2D3E] bg-[#151728] px-4 text-center text-[#8C8FA8] placeholder-[#4A4D63] text-[14px] sm:text-[15px] outline-none focus:border-[#0AC07D]/50 transition-colors disabled:opacity-60"
            />

            {/* Back / Next */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={goPrev}
                disabled={stepIndex === 0 || busy}
                className="flex items-center gap-1.5 px-4 sm:px-5 py-[8px] sm:py-[9px] rounded-[8px] text-[13px] sm:text-[14px] font-semibold text-white border border-[#2A2D3E] bg-[#151728] hover:border-[#0AC07D]/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <svg width="6" height="11" viewBox="0 0 7 12" fill="none">
                  <path
                    d="M6 1L1 6l5 5"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {t("survey.buttons.back")}
              </button>

              <button
                type="button"
                onClick={goNext}
                disabled={busy}
                className="flex items-center gap-1.5 px-4 sm:px-5 py-[8px] sm:py-[9px] rounded-[8px] text-[13px] sm:text-[14px] font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, #0AC07D 0%, #0BBFA0 100%)",
                  boxShadow: "0 6px 18px rgba(10,192,125,0.3)",
                }}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t("survey.buttons.submitting")}
                  </>
                ) : (
                  <>
                    {stepIndex === QUESTIONS.length - 1
                      ? t("survey.buttons.startSurvey")
                      : t("survey.buttons.next")}
                    <svg width="6" height="11" viewBox="0 0 7 12" fill="none">
                      <path
                        d="M1 1l5 5-5 5"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </main>
      ) : (
        <main className="flex-1 flex flex-col w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 pt-5 pb-6 sm:py-10 overflow-hidden">
          {/* Success banner */}
          <div className="w-full rounded-[12px] border border-[#0AC07D]/30 bg-[#0AC07D]/10 px-5 py-4 sm:py-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0AC07D]/20 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#0AC07D"/>
                </svg>
              </div>
              <div>
                <h2 className="text-white font-bold text-lg">{doneMsg || t("survey.messages.completionSuccess")}</h2>
                <p className="text-[#8C8FA8] text-sm mt-0.5">Choose a survey provider below to start earning</p>
              </div>
            </div>
          </div>

          {/* Available Surveys */}
          <ServeyWalls />
        </main>
      )}

      {/* ── Floating Support Button ──────────────────────────────── */}
      <button
        onClick={() => router.push("/support")}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center rounded-full hover:scale-105 transition-transform"
        style={{
          width: 52,
          height: 52,
          background: "linear-gradient(135deg, #0AC07D 0%, #0BBFA0 100%)",
          boxShadow: "0 8px 24px rgba(10,192,125,0.45)",
        }}
        aria-label={t("support.title")}
      >
        <IcoHeadset />
      </button>
    </div>
  );
}
