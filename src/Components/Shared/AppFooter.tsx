"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe, Moon, Sun } from "lucide-react";
import LogoImg from "../../../public/assets/logo.png";
import { useEffect, useState } from "react";
import { languages } from "@/lib/languages";
import { useTranslation } from "react-i18next";
import i18n from "@/locales/i18n";



const DISCORD_URL = process.env.NEXT_PUBLIC_DISCORD_URL || "https://discord.gg/htr9C8EjKG";
const TELEGRAM_URL = "https://t.me/labwardscom";
const X_URL = "https://x.com/labwards?s=21";

const StarTile = ({ half }: { half?: boolean }) => {
  return (
    <div
      className="w-8 h-8 rounded-[6px] relative overflow-hidden flex items-center justify-center text-white"
      style={{
        background: half
          ? 'linear-gradient(90deg, #00B67A 50%, #30334A 50%)'
          : '#00B67A',
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="relative z-10">
        <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    </div>
  );
};



function SocialBtn({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-[10px] bg-[#1C2033] border border-[#2A2D3E] flex items-center justify-center text-[#8C9DB6] hover:text-white hover:bg-[#252840] transition-all"
    >
      {children}
    </a>
  );
}

const MoneyBagIcon = () => (
  <svg width="13" height="13" viewBox="0 -960 960 960" fill="currentColor">
    <path d="M480-320q-33 0-56.5-23.5T400-400q0-33 23.5-56.5T480-480q33 0 56.5 23.5T560-400q0 33-23.5 56.5T480-320ZM295-680h370l51-102q10-20-1.5-39T680-840H280q-23 0-34.5 19t-1.5 39l51 102Zm41 560h288q90 0 153-62.5T840-336q0-38-13-74t-37-65L686-600H274L170-475q-24 29-37 65t-13 74q0 91 62.5 153.5T336-120Z"/>
  </svg>
);

const CupStarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.9999 8.16234 21.9999 8.23487C21.9999 9.09561 21.9999 9.52598 21.7927 9.8781C21.5855 10.2302 21.2093 10.4392 20.4569 10.8572L19.6636 11.298C20.2102 9.44984 20.3926 7.46414 20.4601 5.76597C20.4629 5.69316 20.4662 5.61945 20.4695 5.54497L20.4718 5.49279C21.1231 5.71896 21.4887 5.88758 21.7168 6.20408C22 6.59692 22 7.11873 21.9999 8.16234Z"/>
    <path d="M2 8.16234 2 8.23487C2.00003 9.09561 2.00004 9.52598 2.20723 9.8781C2.41442 10.2302 2.79063 10.4392 3.54305 10.8572L4.33681 11.2982C3.79007 9.45001 3.60767 7.46422 3.54025 5.76597C3.53736 5.69316 3.5341 5.61945 3.53081 5.54497L3.5285 5.49266C2.87701 5.7189 2.51126 5.88752 2.2831 6.20408C1.99996 6.59692 1.99997 7.11873 2 8.16234Z"/>
    <path fill-rule="evenodd" d="M12.0002 2C13.7837 2 15.2531 2.15709 16.3771 2.34674C17.5159 2.53887 18.0852 2.63494 18.5609 3.22083C19.0367 3.80673 19.0115 4.43998 18.9612 5.70647C18.7886 10.0545 17.8503 15.4853 12.75 15.9657V19.5H14.1802C14.6569 19.5 15.0673 19.8365 15.1608 20.3039L15.35 21.25H18C18.4142 21.25 18.75 21.5858 18.75 22C18.75 22.4142 18.4142 22.75 18 22.75H6C5.58579 22.75 5.25 22.4142 5.25 22C5.25 21.5858 5.58579 21.25 6 21.25H8.65L8.83922 20.3039C8.93271 19.8365 9.34312 19.5 9.8198 19.5H11.25V15.9657C6.14996 15.4851 5.21169 10.0544 5.03907 5.70647C4.98879 4.43998 4.96365 3.80673 5.43937 3.22083C5.91508 2.63494 6.48445 2.53887 7.62318 2.34674C8.74724 2.15709 10.2166 2 12.0002 2ZM12.9524 6.19887L12.8541 6.02251C12.4741 5.34084 12.2841 5 12 5C11.7159 5 11.5259 5.34084 11.1459 6.02251L11.0476 6.19887C10.9397 6.39258 10.8857 6.48944 10.8015 6.55334C10.7173 6.61725 10.6125 6.64097 10.4028 6.68841L10.2119 6.73161C9.47396 6.89857 9.10501 6.98205 9.01723 7.26432C8.92945 7.54659 9.18097 7.84072 9.68403 8.42898L9.81418 8.58117C9.95713 8.74833 10.0286 8.83191 10.0608 8.93532C10.0929 9.03872 10.0821 9.15023 10.0605 9.37327L10.0408 9.57632C9.96476 10.3612 9.92674 10.7536 10.1565 10.9281C10.3864 11.1025 10.7318 10.9435 11.4227 10.6254L11.6014 10.5431C11.7978 10.4527 11.8959 10.4075 12 10.4075C12.1041 10.4075 12.2022 10.4527 12.3986 10.5431L12.5773 10.6254C13.2682 10.9435 13.6136 11.1025 13.8435 10.9281C14.0733 10.7536 14.0352 10.3612 13.9592 9.57632L13.9395 9.37327C13.9179 9.15023 13.9071 9.03872 13.9392 8.93532C13.9714 8.83191 14.0429 8.74833 14.1858 8.58117L14.316 8.42898C14.819 7.84072 15.0706 7.54659 14.9828 7.26432C14.895 6.98205 14.526 6.89857 13.7881 6.73161L13.5972 6.68841C13.3875 6.64097 13.2827 6.61725 13.1985 6.55334C13.1143 6.48944 13.0603 6.39258 12.9524 6.19887Z"/>
  </svg>
);

const GiftBoldIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.2498 2C7.03145 2.00411 4.84888 2.07958 3.46423 3.46423C2.07958 4.84888 2.00411 7.03145 2 11.2498H6.91352C6.56255 10.8114 6.30031 10.2943 6.15731 9.72228C5.61906 7.56926 7.56926 5.61906 9.72228 6.15731C10.2943 6.30031 10.8114 6.56255 11.2498 6.91352V2Z"/>
    <path d="M2 12.7498C2.00411 16.9681 2.07958 19.1506 3.46423 20.5353C4.84888 21.9199 7.03145 21.9954 11.2498 21.9995V14.1234C10.4701 15.6807 8.8598 16.7498 6.99976 16.7498C6.58555 16.7498 6.24976 16.414 6.24976 15.9998C6.24976 15.5856 6.58555 15.2498 6.99976 15.2498C8.53655 15.2498 9.82422 14.1831 10.1628 12.7498H2Z"/>
    <path d="M12.7498 21.9995C16.9681 21.9954 19.1506 21.9199 20.5353 20.5353C21.9199 19.1506 21.9954 16.9681 21.9995 12.7498H13.8367C14.1753 14.1831 15.463 15.2498 16.9998 15.2498C17.414 15.2498 17.7498 15.5856 17.7498 15.9998C17.7498 16.414 17.414 16.7498 16.9998 16.7498C15.1397 16.7498 13.5294 15.6807 12.7498 14.1234V21.9995Z"/>
    <path d="M21.9995 11.2498C21.9954 7.03145 21.9199 4.84888 20.5353 3.46423C19.1506 2.07958 16.9681 2.00411 12.7498 2V6.91352C13.1882 6.56255 13.7053 6.30031 14.2772 6.15731C16.4303 5.61906 18.3805 7.56926 17.8422 9.72228C17.6992 10.2943 17.437 10.8114 17.086 11.2498H21.9995Z"/>
    <path d="M9.35847 7.61252C10.47 7.8904 11.2498 8.88911 11.2498 10.0348V11.2498H10.0348C8.88911 11.2498 7.8904 10.47 7.61252 9.35847C7.34891 8.30403 8.30403 7.34891 9.35847 7.61252Z"/>
    <path d="M12.7498 10.0348V11.2498H13.9647C15.1104 11.2498 16.1091 10.47 16.387 9.35847C16.6506 8.30403 15.6955 7.34891 14.6411 7.61252C13.5295 7.8904 12.7498 8.88911 12.7498 10.0348Z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="11" height="13" viewBox="0 0 448 512" fill="currentColor">
    <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128m89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4"/>
  </svg>
);

const DocTextIcon = () => (
  <svg width="13" height="13" viewBox="0 0 56 56" fill="currentColor">
    <path d="M15.555 53.125h24.89c4.852 0 7.266-2.461 7.266-7.336V24.508H30.742c-3 0-4.406-1.43-4.406-4.43V2.875H15.555c-4.828 0-7.266 2.484-7.266 7.36v35.554c0 4.898 2.438 7.336 7.266 7.336m15.258-31.828h16.64c-.164-.961-.844-1.899-1.945-3.047L32.57 5.102c-1.078-1.125-2.062-1.805-3.047-1.97v16.9c0 .843.446 1.265 1.29 1.265m-11.836 13.36c-.961 0-1.641-.68-1.641-1.594c0-.915.68-1.594 1.64-1.594h18.07c.938 0 1.665.68 1.665 1.593c0 .915-.727 1.594-1.664 1.594Zm0 8.929c-.961 0-1.641-.68-1.641-1.594s.68-1.594 1.64-1.594h18.07c.938 0 1.665.68 1.665 1.594s-.727 1.594-1.664 1.594Z"/>
  </svg>
);

const FaqQuestionIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
    <path d="M6 1.002h3v3.5a1.5 1.5 0 0 0 1.5 1.5H14v6.996a2 2 0 0 1-2 2H8.666A5.5 5.5 0 0 0 4 5.207V3.002a2 2 0 0 1 2-2m4.5 4h3.497l-3.989-4H10v3.5a.5.5 0 0 0 .5.5M10 10.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-4.5 1.88a.625.625 0 1 0 0 1.25a.625.625 0 0 0 0-1.25m0-4.877c-1.048 0-1.864.818-1.853 1.955a.5.5 0 0 0 1-.01c-.006-.579.36-.945.853-.945c.472 0 .853.392.853.95c0 .202-.07.315-.36.544l-.277.215C5.21 10.616 5 10.929 5 11.5a.5.5 0 0 0 .992.09l.011-.156c.017-.148.1-.254.346-.448l.277-.215c.513-.41.727-.732.727-1.318c0-1.104-.822-1.95-1.853-1.95"/>
  </svg>
);

const PersonSupportIcon = () => (
  <svg width="13" height="13" viewBox="0 0 28 28" fill="currentColor">
    <path d="m12.167 17.802l-.006-.014a8 8 0 0 1-.36-.094l-.009-.003A8 8 0 0 1 8.708 16a8 8 0 1 1 13.257-6.75c.039.413-.3.75-.715.75c-.414 0-.745-.337-.793-.749A6.5 6.5 0 1 0 11.496 16l.04.017q.3.123.616.217A2 2 0 0 1 16 17a2 2 0 0 1-3.833.802m-.986 1.272a9.5 9.5 0 0 1-4.53-3.054A3 3 0 0 0 4 19v.715C4 23.433 8.21 26 14 26s10-2.708 10-6.285V19a3 3 0 0 0-3-3h-3.645a3.5 3.5 0 0 1-6.174 3.074M19 10c0-1.512-.67-2.867-1.731-3.784a5 5 0 1 0-5.624 8.195A3.5 3.5 0 0 1 14 13.5a3.5 3.5 0 0 1 2.356.911A5 5 0 0 0 19 10"/>
  </svg>
);

const LegalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 512 512" fill="currentColor">
    <path d="M318.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-120 120c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l4-4l106.8 106.7l-4 4c-12.5 12.5-12.5 32.8 0 45.3l16 16c12.5 12.5 32.8 12.5 45.3 0l120-120c12.5-12.5 12.5-32.8 0-45.3l-16-16c-12.5-12.5-32.8-12.5-45.3 0l-4 4L330.6 74.6l4-4c12.5-12.5 12.5-32.8 0-45.3l-16-16zm-152 288c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l48 48c12.5 12.5 32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-1.4-1.4l58.8-58.7l-45.3-45.3l-58.7 58.7l-1.4-1.4z"/>
  </svg>
);

const PrivacyTipIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.19 4.47C3.47 4.79 3 5.51 3 6.3V11c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V6.3c0-.79-.47-1.51-1.19-1.83l-7-3.11c-.52-.23-1.11-.23-1.62 0zM12 7c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1m0 4c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1v-4c0-.55.45-1 1-1"/>
  </svg>
);

const CookieIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12q0-2.025.838-3.937T5.163 4.7T8.7 2.5t4.5-.45q.375.05.575.313t.225.712q.05 1.6 1.188 2.738T17.9 7q.525.025.8.3t.3.85q.05 1.05.638 1.725t1.637 1.025q.35.125.538.363t.187.587q.05 2.075-.725 3.925t-2.125 3.238t-3.2 2.187T12 22m-1.5-12q.625 0 1.063-.437T12 8.5t-.437-1.062T10.5 7t-1.062.438T9 8.5t.438 1.063T10.5 10m-2 5q.625 0 1.063-.437T10 13.5t-.437-1.062T8.5 12t-1.062.438T7 13.5t.438 1.063T8.5 15m6.5 1q.425 0 .713-.288T16 15t-.288-.712T15 14t-.712.288T14 15t.288.713T15 16"/>
  </svg>
);

const MobileLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => {
  return (
    <Link href={href} className="flex items-center gap-2 text-[#8C9DB6] hover:text-white transition-colors text-sm py-1">
      <span className="text-[#8C8FA8] flex-shrink-0">{icon}</span>
      {label}
    </Link>
  );
}

const SocialIcons = () => (
  <div className="flex items-center gap-3">
    <SocialBtn href={X_URL} label="X (Twitter)">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </SocialBtn>
    <SocialBtn href={TELEGRAM_URL} label="Telegram">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    </SocialBtn>
    <SocialBtn href={DISCORD_URL} label="Discord">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.1.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
      </svg>
    </SocialBtn>
  </div>
);

const LangThemeBtns = ({
  theme,
  toggleTheme,
  changeLanguage,
  t,
}: {
  theme: string;
  toggleTheme: () => void;
  changeLanguage: (lang: string) => void;
  t: (key: string) => string;
}) => (
  <div className="flex items-center gap-2">
    {/* Language Selector */}
    <select
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value)}
      className="px-3 py-1.5 rounded-lg bg-[#1C2033] border border-[#2A2D3E] text-[#8C9DB6] text-xs font-bold outline-none cursor-pointer"
    >
      {languages.map((lang) => (
        <option
          key={lang.code}
          value={lang.code}
          className="bg-[#1C2033]"
        >
          {lang.label}
        </option>
      ))}
    </select>

    {/* Theme Button */}
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1C2033] border border-[#2A2D3E] text-[#8C9DB6] text-xs font-bold hover:text-white transition-all"
    >
      {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
      {theme === "dark"
        ? t("footer.light")
        : t("footer.dark")}
    </button>
  </div>
);

export default function AppFooter() {
  const [theme, setTheme] = useState("dark");
  const { t } = useTranslation() as any;



  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

const changeLanguage = (lang: string) => {
  i18n.changeLanguage(lang);
  localStorage.setItem("language", lang);
  document.documentElement.lang = lang;

  document.documentElement.dir = lang === "ur" || lang === "ar" ? "rtl" : "ltr";
};

return (
<footer className="relative w-full bg-[#0D0F1E] border-t border-[#1E2133] pt-10 pb-10 md:pb-44 overflow-hidden">
      {/* Watermark */}
<div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 select-none pointer-events-none">
<h2 className="text-[80px] md:text-[100px] lg:text-[120px] font-black leading-none whitespace-nowrap
bg-gradient-to-b from-[#1E3A5F] via-[#1E3A5F66] to-[#76A3DC00]
bg-clip-text text-transparent opacity-90">
  LAB WARDS
</h2>

</div>
       <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10">

        {/* ── MOBILE layout ── */}
        <div className="md:hidden flex flex-col items-center gap-7">
          <Image src={LogoImg} alt="LabWards" className="h-14 w-auto object-contain" />

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              <StarTile /><StarTile /><StarTile /><StarTile /><StarTile half />
            </div>
            <p className="text-[#B3B6C7] text-sm font-bold">
              {t("footer.trust_score")}

              <span className="mx-2 text-[#2C3146]">|</span>
              {t("footer.reviews")}

            </p>
          </div>

          {/* Platform + User Center 2-col */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-1 w-full max-w-[340px]">
            <div className="flex flex-col gap-0.5">
              <h4 className="text-white font-bold text-sm mb-2">{t("footer.platform")}</h4>
              <MobileLink href="/earn"        icon={<MoneyBagIcon />}                  label={t("footer.earn")} />
              <MobileLink href="/leaderboard" icon={<CupStarIcon />}                  label={t("footer.leaderboard")} />
              <MobileLink href="/rewards"     icon={<GiftBoldIcon />}                 label={t("footer.rewards")} />
            </div>
            <div className="flex flex-col gap-0.5">
              <h4 className="text-white font-bold text-sm mb-2">{t("footer.userCenter")}</h4>
              <MobileLink href="/account"     icon={<UserIcon />}                     label={t("footer.account")} />
              <MobileLink href="/wallet"      icon={<DocTextIcon />}                  label={t("footer.transaction")} />
              <MobileLink href="/faq"         icon={<FaqQuestionIcon />}              label={t("footer.faq")} />
              <MobileLink href="/support"     icon={<PersonSupportIcon />}            label={t("footer.support")} />
            </div>
          </div>

          {/* Terms — centred */}
          <div className="flex flex-col items-center gap-1">
            <h4 className="text-white font-bold text-sm mb-2">{t("footer.terms")}</h4>
            <MobileLink href="/terms"   icon={<LegalIcon />}       label={t("footer.service_terms")} />
            <MobileLink href="/privacy" icon={<PrivacyTipIcon />}  label={t("footer.privacy")} />
            <MobileLink href="/cookies" icon={<CookieIcon />}      label={t("footer.cookie_policy")} />
          </div>

          {/* Bottom bar */}
          <div className="w-full border-t border-[#1E2133] pt-5 flex flex-col items-center gap-4">
            <p className="text-[#64748B] text-xs">@2026 Lab Wards, All Rights Reserved</p>
            <SocialIcons />
            <LangThemeBtns
  theme={theme}
  toggleTheme={toggleTheme}
  changeLanguage={changeLanguage}
  t={t}
/>
          </div>

          {/* Mobile watermark */}
          <div className="select-none pointer-events-none mt-6 mb-10">
            <h2 className="text-[84px] font-black leading-none whitespace-nowrap
              bg-gradient-to-b from-[#1E3A5F] via-[#1E3A5F66] to-[#76A3DC00]
              bg-clip-text text-transparent opacity-90">
              LAB WARDS
            </h2>
          </div>
        </div>

        {/* ── DESKTOP layout (4-column grid) ── */}
        <div className="hidden md:grid md:grid-cols-[1.8fr_1fr_1fr_1.2fr] gap-10 mb-10">

          {/* Col 1 — Logo + trust + description */}
          <div className="flex flex-col gap-5">
            <Image src={LogoImg} alt="LabWards" className="h-9 w-auto object-contain" />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <StarTile /><StarTile /><StarTile /><StarTile /><StarTile half />
              </div>
              <p className="text-[#B3B6C7] text-sm font-bold">
                TrustScore 4.5
                <span className="mx-2 text-[#2C3146]">|</span>
                200 reviews
              </p>
            </div>
            <p className="text-[#8C9DB6] text-[14px] leading-relaxed max-w-[340px]">
               {t("footer.description")}
            </p>
          </div>

          {/* Col 2 — Platform */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-bold text-lg">{t("footer.support")}</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/contact" className="text-[#8C9DB6] hover:text-white transition-colors text-sm font-medium">{t("footer.contact")}</Link></li>
              <li><Link href="/faq" className="text-[#8C9DB6] hover:text-white transition-colors text-sm font-medium">{t("footer.faq")}</Link></li>
            </ul>
          </div>

          {/* Col 3 — User Center */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-bold text-lg">{t("footer.features")}</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/games"      className="text-[#8C9DB6] hover:text-white transition-colors text-sm font-medium">{t("footer.games")}</Link></li>
              <li><Link href="/rewards" className="text-[#8C9DB6] hover:text-white transition-colors text-sm font-medium">{t("footer.rewards")}</Link></li>
              <li><Link href="/tasks"          className="text-[#8C9DB6] hover:text-white transition-colors text-sm font-medium">{t("footer.tasks")}</Link></li>
            </ul>
          </div>

          {/* Col 4 — Connect With Us */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-bold text-lg">{t("footer.connect")}</h4>
            <SocialIcons />
          <LangThemeBtns
  theme={theme}
  toggleTheme={toggleTheme}
  changeLanguage={changeLanguage}
  t={t}
/>
          </div>
        </div>

        {/* Desktop bottom divider */}
        <div className="hidden md:flex border-t border-[#1E2133] pt-6 items-center justify-between gap-4">
          <p className="text-[#64748B] text-xs">{t("footer.copyright")}</p>
          <div className="flex items-center gap-4 text-xs text-[#64748B]">
            <Link href="/terms"   className="hover:text-white transition-colors">{t("footer.terms_use")}</Link>
            <span className="text-[#2C3146]">|</span>
            <Link href="/privacy" className="hover:text-white transition-colors">{t("footer.privacy")}</Link>
            <span className="text-[#2C3146]">|</span>
            <Link href="/cookies" className="hover:text-white transition-colors">{t("footer.cookie")}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
