"use client";

import React, { useState, useCallback } from "react";
import { Lock, Shield, Eye, EyeOff, Trash2, KeyRound } from "lucide-react";
import TopBar from "@/Components/Topbar";
import TickerBar from "@/Components/Shared/TickerBar";
import { toast } from "@/utils/toast";
import { useTranslation } from "react-i18next";


const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const Switch = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
  <button
    type="button"
    onClick={onToggle}
    className={`relative h-[24px] w-[44px] rounded-full transition-all duration-300 ease-in-out focus:outline-none ${
      enabled ? "bg-[#18C3A7]" : "bg-[#2A2E3F]"
    }`}
    aria-pressed={enabled}
  >
    <span
      className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-all duration-300 ease-in-out ${
        enabled ? "left-[23px]" : "left-[3px]"
      }`}
    />
  </button>
);

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(false);
      const { t } = useTranslation();
  

  const getToken = () =>
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleChangePassword = useCallback(async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.warn(t("settings_page.toast.fill_fields"));
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error(t("settings_page.toast.password_mismatch"));
      return;
    }
    if (newPassword.length < 8) {
      toast.error(t("settings_page.toast.password_short"));
      return;
    }

    const token = getToken();
    if (!token) {
      toast.error(t("settings_page.toast.signin_first"));
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${API}/api/v1/user/change-password`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message ||t("settings_page.toast.change_failed"));
      }

      toast.success(t("settings_page.toast.password_success"));
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err.message ||t("settings_page.toast.change_failed") );
    } finally {
      setSaving(false);
    }
  }, [currentPassword, newPassword, confirmPassword]);

  return (
    <div className="min-h-screen bg-[#0D0F1E] text-white">
      <TopBar />
      <TickerBar />

      <main className="mx-auto w-full max-w-[900px] px-4 py-6 md:px-8">
        <h1 className="text-[30px] font-bold tracking-[0.02em] text-white mb-6">
          {t("settings_page.title")}
        </h1>

        <div className="flex flex-col gap-5">
          {/* Change Password */}
          <section className="rounded-[10px] border border-[#1E2133] bg-[#111324] p-5">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="h-5 w-5 text-[#14A28A]" />
              <h2 className="text-[20px] font-bold">{t("settings_page.change_password.title")}</h2>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-[14px] text-[#6B6E8A] mb-1">{t("settings_page.change_password.current_password")}</label>
                <div className="flex items-center gap-2 rounded-[10px] border border-[#262A3A] bg-[#151828] p-2">
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder={t("settings_page.change_password.current_placeholder")}
                    className="w-full bg-transparent px-1 text-[16px] text-white outline-none placeholder:text-[#3A3D55]"
                  />
                  <button type="button" onClick={() => setShowCurrent((v) => !v)} className="text-[#6B6E8A] hover:text-white">
                    {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[14px] text-[#6B6E8A] mb-1">{t("settings_page.change_password.new_password")}</label>
                <div className="flex items-center gap-2 rounded-[10px] border border-[#262A3A] bg-[#151828] p-2">
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={t("settings_page.change_password.new_placeholder")}
                    className="w-full bg-transparent px-1 text-[16px] text-white outline-none placeholder:text-[#3A3D55]"
                  />
                  <button type="button" onClick={() => setShowNew((v) => !v)} className="text-[#6B6E8A] hover:text-white">
                    {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[14px] text-[#6B6E8A] mb-1">{t("settings_page.change_password.confirm_password")}</label>
                <div className="flex items-center gap-2 rounded-[10px] border border-[#262A3A] bg-[#151828] p-2">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t("settings_page.change_password.confirm_placeholder")}
                    className="w-full bg-transparent px-1 text-[16px] text-white outline-none placeholder:text-[#3A3D55]"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleChangePassword}
                disabled={saving}
                className="w-full py-3 rounded-[10px] text-[14px] font-semibold text-white disabled:opacity-60 transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #0AC07D 0%, #0BBFA0 100%)" }}
              >
                {saving ? t("settings_page.change_password.saving") : t("settings_page.change_password.update_button")}
              </button>
            </div>
          </section>

          {/* Security */}
          <section className="rounded-[10px] border border-[#1E2133] bg-[#111324] p-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-[#14A28A]" />
              <h2 className="text-[20px] font-bold">{t("settings_page.security.title")}</h2>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 rounded-[10px] border border-[#262A3A] bg-[#151828] px-4 py-3">
                <KeyRound className="h-5 w-5 text-[#14A28A] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] text-white font-medium">{t("settings_page.security.two_factor_title")}</p>
                  <p className="text-[13px] text-[#6B6E8A]">{t("settings_page.security.two_factor_desc")}</p>
                </div>
                <Switch enabled={twoFAEnabled} onToggle={() => {
                  setTwoFAEnabled((v) => !v);
                  toast.info(t("settings_page.toast.twofa_soon"));
                }} />
              </div>

              <div className="flex items-center gap-3 rounded-[10px] border border-[#262A3A] bg-[#151828] px-4 py-3">
                <Shield className="h-5 w-5 text-[#14A28A] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] text-white font-medium">{t("settings_page.security.login_alerts_title")}</p>
                  <p className="text-[13px] text-[#6B6E8A]">{t("settings_page.security.login_alerts_desc")}</p>
                </div>
                <Switch enabled={loginAlerts} onToggle={() => setLoginAlerts((v) => !v)} />
              </div>

              <div className="flex items-center gap-3 rounded-[10px] border border-[#262A3A] bg-[#151828] px-4 py-3">
                <Lock className="h-5 w-5 text-[#14A28A] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] text-white font-medium">{t("settings_page.security.session_timeout_title")}</p>
                  <p className="text-[13px] text-[#6B6E8A]">{t("settings_page.security.session_timeout_desc")}</p>
                </div>
                <Switch enabled={sessionTimeout} onToggle={() => setSessionTimeout((v) => !v)} />
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="rounded-[10px] border border-[#3D1A1A] bg-[#111324] p-5">
            <div className="flex items-center gap-2 mb-4">
              <Trash2 className="h-5 w-5 text-[#FF383C]" />
              <h2 className="text-[20px] font-bold text-[#FF383C]">{t("settings_page.danger_zone.title")}</h2>
            </div>

            <p className="text-[14px] text-[#6B6E8A] mb-4">
              {t("settings_page.danger_zone.description")}
            </p>

            <button
              type="button"
              className="w-full py-3 rounded-[10px] border border-[#FF383C] text-[14px] font-semibold text-[#FF383C] hover:bg-[#FF383C]/10 transition-all"
              onClick={() => toast.warn(t("settings_page.toast.delete_contact"))}
            >
              {t("settings_page.danger_zone.delete_button")}
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
