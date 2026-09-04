"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Wallet, ChevronDown, X, Loader } from "lucide-react";
import { toast } from "react-toastify";

interface GiftCardRedemptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userBalance: number;
  onRedemptionComplete?: () => void;
  selectedCardData?: {
    id: string;
    name: string;
    logoSrc: string;
    gradient: string;
  } | null;
}

const GIFT_CARDS = [
  { id: "amazon", name: "Amazon", logoSrc: "/assets/amazon.png", gradient: "linear-gradient(135deg,#2C14A6,#3F21C4)" },
  { id: "google_play", name: "Google Play", logoSrc: "/assets/g.png", gradient: "linear-gradient(135deg,#3B9627,#52B338)" },
  { id: "apple_itunes", name: "Apple iTunes", logoSrc: "/itunes.png", gradient: "linear-gradient(135deg,#B87B0B,#D99A1C)" },
  { id: "steam", name: "Steam", logoSrc: "/assets/cb.png", gradient: "linear-gradient(135deg,#0A8C63,#10A479)" },
  { id: "xbox", name: "Xbox", logoSrc: "/assets/n.png", gradient: "linear-gradient(135deg,#107C10,#1DB954)" },
  { id: "playstation", name: "PlayStation", logoSrc: "/assets/play.png", gradient: "linear-gradient(135deg,#3B9627,#52B338)" },
];

const COUNTRIES = [
  { code: "AF", name: "Afghanistan" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AD", name: "Andorra" },
  { code: "AO", name: "Angola" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" },
  { code: "BT", name: "Bhutan" },
  { code: "BO", name: "Bolivia" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BW", name: "Botswana" },
  { code: "BR", name: "Brazil" },
  { code: "BN", name: "Brunei" },
  { code: "BG", name: "Bulgaria" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" },
  { code: "KH", name: "Cambodia" },
  { code: "CM", name: "Cameroon" },
  { code: "CA", name: "Canada" },
  { code: "CV", name: "Cape Verde" },
  { code: "CF", name: "Central African Republic" },
  { code: "TD", name: "Chad" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CO", name: "Colombia" },
  { code: "KM", name: "Comoros" },
  { code: "CG", name: "Congo" },
  { code: "CD", name: "Congo (DRC)" },
  { code: "CR", name: "Costa Rica" },
  { code: "CI", name: "Cote d'Ivoire" },
  { code: "HR", name: "Croatia" },
  { code: "CU", name: "Cuba" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "DJ", name: "Djibouti" },
  { code: "DM", name: "Dominica" },
  { code: "DO", name: "Dominican Republic" },
  { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" },
  { code: "SV", name: "El Salvador" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "ER", name: "Eritrea" },
  { code: "EE", name: "Estonia" },
  { code: "SZ", name: "Eswatini" },
  { code: "ET", name: "Ethiopia" },
  { code: "FJ", name: "Fiji" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GA", name: "Gabon" },
  { code: "GM", name: "Gambia" },
  { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" },
  { code: "GR", name: "Greece" },
  { code: "GD", name: "Grenada" },
  { code: "GT", name: "Guatemala" },
  { code: "GN", name: "Guinea" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "GY", name: "Guyana" },
  { code: "HT", name: "Haiti" },
  { code: "HN", name: "Honduras" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IR", name: "Iran" },
  { code: "IQ", name: "Iraq" },
  { code: "IE", name: "Ireland" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "JM", name: "Jamaica" },
  { code: "JP", name: "Japan" },
  { code: "JO", name: "Jordan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KE", name: "Kenya" },
  { code: "KI", name: "Kiribati" },
  { code: "KW", name: "Kuwait" },
  { code: "KG", name: "Kyrgyzstan" },
  { code: "LA", name: "Laos" },
  { code: "LV", name: "Latvia" },
  { code: "LB", name: "Lebanon" },
  { code: "LS", name: "Lesotho" },
  { code: "LR", name: "Liberia" },
  { code: "LY", name: "Libya" },
  { code: "LI", name: "Liechtenstein" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MG", name: "Madagascar" },
  { code: "MW", name: "Malawi" },
  { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" },
  { code: "ML", name: "Mali" },
  { code: "MT", name: "Malta" },
  { code: "MR", name: "Mauritania" },
  { code: "MU", name: "Mauritius" },
  { code: "MX", name: "Mexico" },
  { code: "MD", name: "Moldova" },
  { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" },
  { code: "ME", name: "Montenegro" },
  { code: "MA", name: "Morocco" },
  { code: "MZ", name: "Mozambique" },
  { code: "MM", name: "Myanmar" },
  { code: "NA", name: "Namibia" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "NZ", name: "New Zealand" },
  { code: "NI", name: "Nicaragua" },
  { code: "NE", name: "Niger" },
  { code: "NG", name: "Nigeria" },
  { code: "KP", name: "North Korea" },
  { code: "MK", name: "North Macedonia" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PA", name: "Panama" },
  { code: "PG", name: "Papua New Guinea" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "QA", name: "Qatar" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russia" },
  { code: "RW", name: "Rwanda" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SN", name: "Senegal" },
  { code: "RS", name: "Serbia" },
  { code: "SC", name: "Seychelles" },
  { code: "SL", name: "Sierra Leone" },
  { code: "SG", name: "Singapore" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "SO", name: "Somalia" },
  { code: "ZA", name: "South Africa" },
  { code: "KR", name: "South Korea" },
  { code: "SS", name: "South Sudan" },
  { code: "ES", name: "Spain" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SD", name: "Sudan" },
  { code: "SR", name: "Suriname" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "SY", name: "Syria" },
  { code: "TW", name: "Taiwan" },
  { code: "TJ", name: "Tajikistan" },
  { code: "TZ", name: "Tanzania" },
  { code: "TH", name: "Thailand" },
  { code: "TL", name: "Timor-Leste" },
  { code: "TG", name: "Togo" },
  { code: "TT", name: "Trinidad and Tobago" },
  { code: "TN", name: "Tunisia" },
  { code: "TR", name: "Turkey" },
  { code: "TM", name: "Turkmenistan" },
  { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VU", name: "Vanuatu" },
  { code: "VE", name: "Venezuela" },
  { code: "VN", name: "Vietnam" },
  { code: "YE", name: "Yemen" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
];

function FlagImg({ code, size = 28 }: { code: string; size?: number }) {
  return (
    <img
      src={`https://flagcdn.com/w80/${code.toLowerCase()}.png`}
      alt={code}
      width={size}
      height={Math.round(size * 0.75)}
      className="rounded-[3px] object-cover"
      style={{ width: size, height: Math.round(size * 0.75) }}
    />
  );
}

export default function GiftCardRedemptionModal({
  isOpen,
  onClose,
  userBalance,
  onRedemptionComplete,
  selectedCardData,
}: GiftCardRedemptionModalProps) {
  const [internalSelectedCard, setInternalSelectedCard] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES.find(c => c.code === "US") || COUNTRIES[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchedDenomination, setFetchedDenomination] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeCardInfo = selectedCardData || GIFT_CARDS.find((c) => c.id === internalSelectedCard) || null;
  const activeCardId = activeCardInfo?.id || null;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!activeCardId) { setFetchedDenomination(null); return; }
    const fetchDenoms = async () => {
      try {
        const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${api}/api/v1/giftcard/denominations/${activeCardId}`);
        const data = await res.json();
        if (res.ok && data.denominations?.length > 0) {
          setFetchedDenomination(data.denominations[0]);
        } else {
          setFetchedDenomination(10);
        }
      } catch {
        setFetchedDenomination(10);
      }
    };
    fetchDenoms();
  }, [activeCardId]);

  const handleRedeem = async () => {
    if (!activeCardId) {
      toast.error("No card selected");
      return;
    }

    const denomination = fetchedDenomination || 10;
    const availableBalance = userBalance / 100;
    if (availableBalance < denomination) {
      toast.error(`Insufficient balance. You need $${denomination} but only have $${availableBalance.toFixed(2)}`);
      return;
    }

    setIsSubmitting(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        toast.error("Please sign in to redeem a gift card");
        return;
      }

      const payload = {
        giftCardType: activeCardId,
        denomination,
        currency: "USD",
        country: selectedCountry.code,
      };

      const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${api}/api/v1/user/giftcard/redeem`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        const message = data.requiresManualEntry
          ? "Request submitted! Admin will generate and send the code to your email."
          : "Gift card redemption submitted! Check your email for the code.";
        toast.success(message);
        setInternalSelectedCard(null);
        onClose();
        onRedemptionComplete?.();
      } else {
        toast.error(data.message || "Failed to redeem gift card");
      }
    } catch {
      toast.error("Failed to redeem gift card. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  /* ── If no card pre-selected, show brand picker ── */
  if (!selectedCardData) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
        <div
          className="w-full sm:max-w-[520px] md:max-w-[640px] lg:max-w-[720px] rounded-t-2xl sm:rounded-2xl flex flex-col overflow-hidden"
          style={{ background: "#0B0D1F", maxHeight: "min(90vh, 700px)" }}
        >
          <div className="flex items-center justify-between px-4 sm:px-6 pt-5 pb-4 shrink-0" style={{ background: "#0B0D1F" }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(20,162,138,0.15)" }}>
                <Wallet className="w-4 h-4" style={{ color: "#14A28A" }} />
              </div>
              <h2 className="text-white font-bold text-[20px] leading-none" style={{ fontFamily: "Manrope, sans-serif" }}>
                Redeem Card
              </h2>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          <div className="px-4 sm:px-6 shrink-0"><div className="h-px w-full" style={{ background: "#1E2133" }} /></div>

          <div className="px-4 sm:px-6 py-5 overflow-y-auto flex-1 min-h-0">
            <p className="text-[13px] text-gray-400 mb-3 font-medium">Select Gift Card</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {GIFT_CARDS.map((card) => (
                <button
                  key={card.id}
                  onClick={() => setInternalSelectedCard(card.id)}
                  className="relative overflow-hidden rounded-[16px] flex flex-col items-center justify-start hover:scale-[1.02] transition-transform active:scale-[0.98] w-full min-h-[145px] sm:min-h-[170px]"
                  style={{ border: "1px solid rgba(255,255,255,0.1)", background: card.gradient }}
                >
                  <div className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
                      backgroundSize: "8px 8px",
                      WebkitMaskImage: "radial-gradient(ellipse 70% 65% at 50% 55%, black 20%, transparent 80%)",
                      maskImage: "radial-gradient(ellipse 70% 65% at 50% 55%, black 20%, transparent 80%)",
                    }}
                  />
                  {/* Top: icon + name in same line */}
                  <div className="relative z-10 flex items-center gap-1.5 pt-3 sm:pt-4 px-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 flex items-center justify-center">
                      <Image src={card.logoSrc} alt={card.name} width={32} height={32} className="object-contain w-full h-full" />
                    </div>
                    <p className="text-white font-bold text-[13px] sm:text-[14px] leading-none">
                      {card.name}
                    </p>
                  </div>
                  {/* Bottom: name repeated */}
                  <div className="relative z-10 flex items-center justify-center pb-3 mt-auto">
                    <p className="text-white font-bold text-[16px] sm:text-[18px] leading-none">
                      {card.name}
                    </p>
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-[16px] ring-1 ring-inset ring-white/10" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Card selected — show redeem UI ── */
  return (
    <div className="fixed inset-0 bg-black/60 z-50">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 sm:static sm:flex sm:items-center sm:justify-center sm:p-4">
        <div
          className="w-full sm:max-w-[520px] rounded-t-2xl sm:rounded-2xl flex flex-col overflow-hidden"
          style={{ background: "#0B0D1F", maxHeight: "95vh" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-4 pb-3 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(20,162,138,0.15)" }}>
                <Wallet className="w-4 h-4" style={{ color: "#14A28A" }} />
              </div>
              <h2 className="text-white font-bold text-[20px] leading-none" style={{ fontFamily: "Manrope, sans-serif" }}>
                Redeem Card
              </h2>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Divider */}
          <div className="px-4 shrink-0"><div className="h-px w-full" style={{ background: "#1E2133" }} /></div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <div className="px-4 pt-4 pb-2">
              {/* Country Dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-colors"
                  style={{ background: "#151728", borderColor: dropdownOpen ? "#14A28A" : "#26293E" }}
                >
                  <div className="flex items-center gap-3">
                    <FlagImg code={selectedCountry.code} size={32} />
                    <span className="text-white text-[14px] font-medium">{selectedCountry.name}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute left-0 right-0 top-full mt-1 rounded-xl border overflow-hidden z-50 max-h-[200px] overflow-y-auto"
                    style={{ background: "#151728", borderColor: "#26293E" }}
                  >
                    {COUNTRIES.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => { setSelectedCountry(country); setDropdownOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-white/5 ${selectedCountry.code === country.code ? "bg-white/5" : ""}`}
                      >
                        <FlagImg code={country.code} size={28} />
                        <span className="text-white text-[13px]">{country.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Cards */}
              <div className="flex justify-center gap-3 mt-4 pb-2">
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden rounded-[16px] flex flex-col items-center justify-start w-[calc(50%-6px)] sm:w-[176.5px] h-[160px] sm:h-[215px]"
                    style={{ border: "1px solid rgba(255,255,255,0.1)", background: activeCardInfo?.gradient }}
                  >
                    <div className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
                        backgroundSize: "8px 8px",
                        WebkitMaskImage: "radial-gradient(ellipse 70% 65% at 50% 55%, black 20%, transparent 80%)",
                        maskImage: "radial-gradient(ellipse 70% 65% at 50% 55%, black 20%, transparent 80%)",
                      }}
                    />
                    <div className="relative z-10 flex items-center gap-1.5 pt-3 sm:pt-4 px-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 flex items-center justify-center">
                        <Image src={activeCardInfo?.logoSrc || ""} alt={activeCardInfo?.name || ""} width={32} height={32} className="object-contain w-full h-full" />
                      </div>
                      <p className="text-white font-bold text-[13px] sm:text-[14px] leading-none">{activeCardInfo?.name}</p>
                    </div>
                    <div className="relative z-10 flex items-center justify-center pb-3 mt-auto">
                      <p className="text-white font-bold text-[16px] sm:text-[18px] leading-none">{activeCardInfo?.name}</p>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-[16px] ring-1 ring-inset ring-white/10" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Buttons — pinned */}
          <div className="px-4 py-4 shrink-0 border-t" style={{ borderColor: "#1E2133" }}>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRedeem}
                disabled={isSubmitting}
                className="flex-1 py-3.5 rounded-xl text-[15px] font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ background: "#14A28A" }}
              >
                {isSubmitting ? <><Loader className="w-4 h-4 animate-spin" /> Processing...</> : "Redeem"}
              </button>
              <button
                onClick={() => { setInternalSelectedCard(null); onClose(); }}
                disabled={isSubmitting}
                className="flex-1 py-3.5 rounded-xl text-[15px] font-bold text-white border transition-colors disabled:opacity-40"
                style={{ background: "transparent", borderColor: "#26293E" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
