"use client";

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSocket } from '@/contexts/SocketProvider';
import { useTranslation } from "react-i18next";

const getApi = () => process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const ProfileControls: React.FC = () => {
  const { t } = useTranslation();
  const [daily, setDaily] = useState<any>(null);
  const [loadingDaily, setLoadingDaily] = useState(false);
  const [redBlack, setRedBlack] = useState<any>(null);
  const [playing, setPlaying] = useState(false);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [code, setCode] = useState('');
  const [tasks, setTasks] = useState<any[]>([]);
  const { socket } = useSocket();

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    fetchDaily();
    fetchRedBlack();
    fetchLeaderboard();
    fetchTasks();
  }, []);

  useEffect(() => {
    if (!socket) return;
    const onNotif = (n: any) => {
      // if notification affects daily or balance, refetch
      if (n?.type === 'daily.checkin' || n?.type === 'balance.updated') fetchDaily();
    };
    try { socket.on('notification', onNotif); } catch {}
    return () => { try { socket.off('notification', onNotif); } catch {} };
  }, [socket]);

  async function fetchDaily() {
    setLoadingDaily(true);
    try {
      const res = await fetch(`${getApi()}/api/v1/user/daily-checkin`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (!res.ok) {
        const errorText = await res.text().catch(() => 'Unknown error');
        throw new Error(`Failed to fetch daily checkin: ${res.status} ${res.statusText} - ${errorText}`);
      }
      const data = await res.json();
      setDaily(data);
    } catch (err) {
      console.error('fetchDaily error:', err instanceof Error ? err.message : err);
      setDaily(null);
    } finally { setLoadingDaily(false); }
  }

  async function claimDaily() {
    try {
      const res = await fetch(`${getApi()}/api/v1/user/daily-checkin/claim`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      });
      const body = await res.json().catch(()=>({}));
      if (!res.ok) {
        toast.error(body?.message || t("profileControls.claimFailed"));
        return;
      }
      toast.success(body?.message || t("profileControls.claimed"));
      fetchDaily();
    } catch (err) {
      console.error('claimDaily error:', err instanceof Error ? err.message : err);
      toast.error(t("profileControls.claimFailed"));
    }
  }

  async function fetchRedBlack() {
    try {
      const res = await fetch(`${getApi()}/api/v1/games/red-or-black`);
      if (!res.ok) {
        const errorText = await res.text().catch(() => 'Unknown error');
        throw new Error(`Failed to fetch red-or-black: ${res.status} ${res.statusText} - ${errorText}`);
      }
      const data = await res.json();
      setRedBlack(data);
    } catch (err) {
      console.error('fetchRedBlack error:', err instanceof Error ? err.message : err);
      setRedBlack(null);
    }
  }

  async function playRedBlack(choice: 'red'|'black') {
    setPlaying(true);
    try {
      const res = await fetch(`${getApi()}/api/v1/games/red-or-black/play`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ choice }),
      });
      const data = await res.json().catch(()=>({}));
      if (!res.ok) { toast.error(data?.message || t("profileControls.playFailed")); return; }
      toast.success(data?.message || t("profileControls.playResultReceived"));
      fetchRedBlack();
      fetchDaily();
    } catch (err) {
      console.error('playRedBlack error:', err instanceof Error ? err.message : err);
      toast.error(t("profileControls.playFailed"));
    }
    finally { setPlaying(false); }
  }

  async function fetchLeaderboard() {
    try {
      const res = await fetch(`${getApi()}/api/v1/leaderboard/monthly`);
      if (!res.ok) {
        const errorText = await res.text().catch(() => 'Unknown error');
        throw new Error(`Failed to fetch leaderboard: ${res.status} ${res.statusText} - ${errorText}`);
      }
      const data = await res.json();
      setLeaderboard(Array.isArray(data?.leaders) ? data.leaders : []);
    } catch (err) {
      console.error('fetchLeaderboard error:', err instanceof Error ? err.message : err);
      setLeaderboard([]);
    }
  }

  async function redeemCode() {
    try {
      const res = await fetch(`${getApi()}/api/v1/user/bonus-code/redeem`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ code }),
      });
      const data = await res.json().catch(()=>({}));
      if (!res.ok) { toast.error(data?.message || t("profileControls.redeemFailed")); return; }
      toast.success(data?.message || t("profileControls.redeemed"));
      setCode('');
      fetchDaily();
    } catch (err) {
      console.error('redeemCode error:', err instanceof Error ? err.message : err);
      toast.error(t("profileControls.redeemFailed"));
    }
  }

  async function fetchTasks() {
    try {
      const res = await fetch(`${getApi()}/api/v1/tasks?limit=5`);
      if (!res.ok) {
        const errorText = await res.text().catch(() => 'Unknown error');
        throw new Error(`Failed to fetch tasks: ${res.status} ${res.statusText} - ${errorText}`);
      }
      const data = await res.json();
      setTasks(Array.isArray(data?.tasks) ? data.tasks : []);
    } catch (err) {
      console.error('fetchTasks error:', err instanceof Error ? err.message : err);
      setTasks([]);
    }
  }

  return (
    <div className="w-full mt-4 mb-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-[#0f172a] p-4 rounded">
          <h4 className="text-sm font-semibold text-white">{t("profileControls.bonusCode")}</h4>
          <div className="mt-2 flex gap-2">
            <input value={code} onChange={(e)=>setCode(e.target.value)} className="flex-1 px-2 py-1 bg-[#11131a] rounded text-sm text-white placeholder:text-gray-400" placeholder={t("profileControls.enterCode")} />
            <button onClick={redeemCode} className="px-3 py-1 bg-[#04b39a] rounded text-white text-sm">{t("profileControls.redeem")}</button>
          </div>
        </div>

        <div className="bg-[#0f172a] p-4 rounded">
          <h4 className="text-sm font-semibold text-white">{t("profileControls.dailyStreak")}</h4>
          <p className="text-xs text-white">{loadingDaily ? t("profileControls.checking") : `${daily?.streakDays ?? 0} ${t("profileControls.dayStreak")}`}</p>
          <div className="mt-2">
            <p className="text-xs text-gray-400">{t("profileControls.rewardsPageNote")}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <div className="bg-[#0f172a] p-4 rounded">
          <h4 className="text-sm font-semibold text-white">{t("profileControls.monthlyLeaders")}</h4>
          <ul className="mt-2 text-xs space-y-2">
            {leaderboard.length === 0 ? (
              <li className="text-gray-400">{t("profileControls.noLeaders")}</li>
            ) : (
              leaderboard.slice(0,5).map((l:any, i:number)=> (
                <li key={i} className="flex justify-between"><span className="text-white">{l.username ?? l.name ?? t("profileControls.anonymous")}</span><span className="text-white">{l.score ?? l.points ?? ''}</span></li>
              ))
            )}
          </ul>
        </div>

        <div className="bg-[#0f172a] p-4 rounded">
          <h4 className="text-sm font-semibold text-white">{t("profileControls.recentTasks")}</h4>
          <ul className="mt-2 text-xs space-y-2">
            {tasks.map((t:any)=> (
              <li key={t._id ?? t.id} className="flex justify-between"><span className="text-white">{t.title ?? t.name ?? t("profileControls.task")}</span><span className="text-white">{t.rewardCents ? (t.rewardCents/100).toFixed(2) : (t.reward ?? '')}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileControls;
