"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSocket } from "@/contexts/SocketProvider";
import { toast } from "@/utils/toast";
import LogoImg from "../../../public/assets/logo.png";
import { useTranslation } from "react-i18next";
import TickerBar from "@/Components/Shared/TickerBar";
import TopBar from "@/Components/Topbar";

const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Message {
  _id?: string;
  room: string;
  senderRole: "user" | "support" | "system";
  text: string;
  createdAt?: string;
}

interface ChatRoom {
  _id: string;
  subject?: string | null;
  status: string;
  lastMessageAt?: string | null;
}

interface SupportMessagePayload {
  room: string;
  message: Message;
}

/* ── Icons ─────────────────────────────────────────────────── */

const IcoFAQ = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" stroke="#8C8FA8" strokeWidth="1.5" />
    <path
      d="M6.5 6C6.5 5.17 7.17 4.5 8 4.5C8.83 4.5 9.5 5.17 9.5 6C9.5 6.83 8.83 7.5 8 7.5V9"
      stroke="#8C8FA8"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="8" cy="11" r="0.75" fill="#8C8FA8" />
  </svg>
);

const IcoEmoji = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="8.5" stroke="#50536F" strokeWidth="1.5" />
    <path
      d="M7 12C7 12 8 14 10 14C12 14 13 12 13 12"
      stroke="#50536F"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="7.5" cy="8.5" r="1" fill="#50536F" />
    <circle cx="12.5" cy="8.5" r="1" fill="#50536F" />
  </svg>
);

const IcoAttach = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M17 9.5L10 16.5C8.34 18.16 5.66 18.16 4 16.5C2.34 14.84 2.34 12.16 4 10.5L10.5 4C11.6 2.9 13.4 2.9 14.5 4C15.6 5.1 15.6 6.9 14.5 8L8.5 14C7.95 14.55 7.05 14.55 6.5 14C5.95 13.45 5.95 12.55 6.5 12L12 6.5"
      stroke="#50536F"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const IcoSend = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M18.5 1.5L1.5 8.5L8 10.5M18.5 1.5L11.5 18.5L8 10.5M18.5 1.5L8 10.5"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ── Ticker data (same as earn page) ───────────────────────── */

/* ── Scroll helper ─────────────────────────────────────────── */

const isNearBottom = (el: HTMLDivElement, threshold = 72) =>
  el.scrollHeight - el.scrollTop - el.clientHeight <= threshold;

const getTailKey = (msgs: Message[]) => {
  if (!msgs.length) return "";
  const last = msgs[msgs.length - 1];
  return `${last._id || ""}|${last.text || ""}|${last.createdAt || ""}`;
};

/* ── Page component ────────────────────────────────────────── */

export default function SupportPage() {
  const router = useRouter();
  const { socket } = useSocket();

  const [profileInitial, setProfileInitial] = useState("B");

  /* chat state */
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const { t } = useTranslation();

  const WELCOME_MESSAGE = t("support.welcomeMessage");

  const chatRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef(true);
  const tailRef = useRef("");

  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  /* init: profile initial */
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const u = JSON.parse(raw) as {
          displayName?: string;
          username?: string;
          email?: string;
        };
        const init = (u.displayName || u.username || u.email || "B")
          .charAt(0)
          .toUpperCase();
        if (init) setProfileInitial(init);
      }
    } catch {}
  }, []);

  /* scroll-to-bottom when messages change */
  useEffect(() => {
    const next = getTailKey(messages);
    const changed = next !== tailRef.current;
    const initial = tailRef.current === "" && messages.length > 0;
    if (initial)
      chatRef.current?.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "auto",
      });
    else if (changed && stickRef.current)
      chatRef.current?.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    tailRef.current = next;
  }, [messages]);

  const fetchRoomMessages = async (roomId: string, token: string) => {
    try {
      const r = await fetch(`${apiBase}/api/v1/support/chat/${roomId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!r.ok) return;
      const d = await r.json();
      if (Array.isArray(d?.messages)) setMessages(d.messages);
    } catch {}
  };

  const fetchRooms = useCallback(async () => {
    const token = getToken();
    if (!token) return;
    try {
      const r = await fetch(`${apiBase}/api/v1/support/chat`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!r.ok) return;
      const d = await r.json();
      if (Array.isArray(d?.rooms)) {
        setRooms(d.rooms);
        if (d.rooms.length > 0 && !activeRoomId) {
          const rid = String(d.rooms[0]._id);
          setActiveRoomId(rid);
          fetchRoomMessages(rid, token);
        }
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRoomId]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  /* socket: incoming messages */
  useEffect(() => {
    if (!socket) return;
    const onMsg = (payload: SupportMessagePayload) => {
      const { room, message } = payload || {};
      if (!room || !message || room !== activeRoomId) return;
      setMessages((prev) => {
        if (message._id && prev.some((m) => m._id === message._id)) return prev;
        return [...prev, message];
      });
    };
    socket.on("support:message", onMsg);
    return () => {
      try {
        socket.off("support:message", onMsg);
      } catch {}
    };
  }, [socket, activeRoomId]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const token = getToken();
    if (!token) {
      toast.warn(t("support.contactSignin"));
      return;
    }
    setSending(true);
    try {
      const body: Record<string, string> = { text: input.trim() };
      if (activeRoomId) body.roomId = activeRoomId;
      else body.subject = "User support request";
      const res = await fetch(`${apiBase}/api/v1/support/chat`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || t("support.sendFailed"));
      const newRoomId = data.roomId ? String(data.roomId) : activeRoomId;
      const newMsg: Message = {
        room: newRoomId || "",
        senderRole: "user",
        text: input.trim(),
        createdAt: data.sentAt || new Date().toISOString(),
      };
      if (newRoomId && !rooms.some((r) => String(r._id) === newRoomId)) {
        setRooms((prev) => [
          {
            _id: newRoomId,
            subject: "Support",
            status: "open",
            lastMessageAt: newMsg.createdAt || null,
          },
          ...prev,
        ]);
      }
      stickRef.current = true;
      setMessages((prev) => [...prev, newMsg]);
      if (!activeRoomId && newRoomId) setActiveRoomId(newRoomId);
      setInput("");
    } catch (err) {
      toast.error((err as Error).message || "Failed to send");
    } finally {
      setSending(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const now = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0D1F] text-white">

      <TopBar />

      <TickerBar />

      {/* ── Main content ────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-16 py-5 sm:py-8">
        {/* Heading */}
        <h1 className="text-white font-bold text-[26px] sm:text-[30px] md:text-[34px] tracking-tight mb-5">
          {t("support.title")}
        </h1>

        {/* Chat container */}
        <div
          className="flex-1 flex flex-col rounded-[16px] overflow-hidden"
          style={{
            background: "#0D0F1E",
            border: "1px solid #1E2133",
            minHeight: 480,
          }}
        >
          {/* "In need of help?" status bar */}
          <div
            className="flex flex-col items-center gap-3 px-4 py-5 shrink-0"
            style={{ borderBottom: "1px solid #1E2133" }}
          >
            <p
              className="font-bold text-[18px] text-white"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              {t("support.helpTitle")}
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#14A28A]" />
              <span
                className="text-[#14A28A] text-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {t("support.onlineStatus")}
              </span>
            </div>
            <a
              href="/faq"
              className="flex items-center gap-2 rounded-[8px] px-5 py-2 transition-colors hover:bg-[#1E2133]"
              style={{ background: "#151728", border: "1px solid #26293E" }}
            >
              <IcoFAQ />
              <span
                className="text-white text-sm font-medium"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {t("support.faq")}
              </span>
            </a>
          </div>

          {/* Messages area */}
          <div
            ref={chatRef}
            onScroll={() => {
              if (chatRef.current)
                stickRef.current = isNearBottom(chatRef.current);
            }}
            className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-5 flex flex-col gap-4"
          >
            {/* Static welcome */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center justify-center rounded-[6px] overflow-hidden shrink-0"
                  style={{ width: 32, height: 32, background: "#151728" }}
                >
                  <Image
                    src={LogoImg}
                    alt="LabWards"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <span
                  className="text-white text-sm font-semibold"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  LabWards
                </span>
                <div className="w-1 h-1 rounded-full bg-[#8C8FA8] opacity-50" />
                <span className="text-[#8C8FA8] text-xs">{now}</span>
              </div>
              <div
                className="rounded-[10px_10px_10px_0px] p-3 ml-2"
                style={{ background: "#151728", maxWidth: "min(90%, 520px)" }}
              >
                <p
                  className="text-white text-[13px] leading-[1.6]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {WELCOME_MESSAGE}
                </p>
              </div>
            </div>

            {/* Dynamic messages */}
            {messages.map((msg, idx) => {
              const isUser = msg.senderRole === "user";
              const isSystem = msg.senderRole === "system";
              if (isSystem) {
                return (
                  <p
                    key={msg._id || idx}
                    className="text-[#8C8FA8] text-xs text-center"
                  >
                    {msg.text}
                  </p>
                );
              }
              return (
                <div
                  key={msg._id || idx}
                  className={`flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}
                >
                  {!isUser && (
                    <div className="flex items-center gap-2">
                      <div
                        className="flex items-center justify-center rounded-[6px] overflow-hidden shrink-0"
                        style={{ width: 24, height: 24, background: "#151728" }}
                      >
                        <Image
                          src={LogoImg}
                          alt="Support"
                          width={18}
                          height={18}
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[#8C8FA8] text-xs">
                        {t("support.supportLabel")}
                      </span>
                      {msg.createdAt && (
                        <span className="text-[#8C8FA8] text-xs">
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      )}
                    </div>
                  )}
                  {isUser && msg.createdAt && (
                    <div className="flex items-center gap-2">
                      <span className="text-[#8C8FA8] text-xs">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span className="text-[#8C8FA8] text-xs">
                        {profileInitial}
                      </span>
                    </div>
                  )}
                  <div
                    className="p-3"
                    style={{
                      background: isUser ? "#14A28A" : "#151728",
                      maxWidth: "min(80%, 520px)",
                      borderRadius: isUser
                        ? "10px 10px 0px 10px"
                        : "10px 10px 10px 0px",
                    }}
                  >
                    <p
                      className="text-white text-[13px] leading-[1.6]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {msg.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input bar */}
          <div
            className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-4 shrink-0"
            style={{ borderTop: "1px solid #1E2133", background: "#0D0F1E" }}
          >
            <button className="shrink-0" aria-label="Emoji">
              <IcoEmoji />
            </button>
            <button className="shrink-0" aria-label="Attach">
              <IcoAttach />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={t("support.messagePlaceholder")}
              disabled={sending}
              className="flex-1 bg-transparent outline-none text-white placeholder-[#50536F] text-[14px]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || sending}
              className="flex items-center justify-center rounded-[10px] shrink-0 disabled:opacity-40 transition-opacity"
              style={{
                width: 44,
                height: 44,
                background:
                  "linear-gradient(12.07deg, rgba(255,255,255,0) 16.27%, rgba(255,255,255,0.7) 93.68%), #099F86",
                boxShadow: "0px 6px 16px rgba(20,169,144,0.3)",
              }}
              aria-label={t("support.send")}
            >
              <IcoSend />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
