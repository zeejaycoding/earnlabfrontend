"use client";
import React from "react";
import { ChevronLeft, ChevronRight, Disc, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface BonusCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  buttonText: string;
  onClick?: () => void;
  accentColor?: string;
}

const BonusCard: React.FC<BonusCardProps> = ({ title, subtitle, icon, buttonText, onClick, accentColor = "#14A990" }) => (
  <div className="relative overflow-hidden rounded-[28px] border border-[#1E2F3F] bg-[#0C1320] p-7 group transition-all hover:translate-y-[-4px] min-h-[220px] flex flex-col justify-between w-full">
    {/* Subtle Pattern Overlay */}
    <div 
      className="absolute inset-0 opacity-[0.05] pointer-events-none" 
      style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}
    />
    
    <div className="relative z-10">
      <h3 className="text-white text-[22px] font-bold leading-tight">{title}</h3>
      <p className="text-[#8C9DB6] text-[14px] font-medium mt-1">{subtitle}</p>
    </div>

    <div className="relative z-10 flex items-center justify-between mt-6">
      <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      
      <button
        onClick={onClick}
        className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl text-white font-bold text-[14px] sm:text-[15px] transition-all hover:brightness-110 active:scale-[0.95]"
        style={{ 
          background: `linear-gradient(135deg, ${accentColor} 0%, #14A290 100%)`,
          boxShadow: `0 8px 24px ${accentColor}40`
        }}
      >
        <span className="flex items-center gap-2 whitespace-nowrap">
          {buttonText === "Spin" ? <Disc size={18} className="animate-spin-slow" /> : <MoveRight size={18} />}
          {buttonText}
        </span>
      </button>
    </div>
  </div>
);

const BonusSection: React.FC = () => {
  const router = useRouter();

  return (
    <section className="w-full mt-8 sm:mt-12 max-w-[1440px] mx-auto pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-6 md:px-10">
        <BonusCard
          title="Sign up bonus"
          subtitle="Win up to $30"
          buttonText="Spin"
          accentColor="#0AC07D"
          onClick={() => router.push("/bonus")}
          icon={
            <img src="/spin.png" alt="Spin" className="w-full h-full object-contain" />
          }
        />
        <BonusCard
          title="7 days Streak"
          subtitle="Earn $1 daily to keep up with streak"
          buttonText="Go to streak"
          accentColor="#0AC07D"
          onClick={() => router.push("/streak")}
          icon={<
            img src="/streak.png" alt="Streak" className="w-full h-full object-contain" /
          >
          }
        />
        <BonusCard
          title="Verification"
          subtitle="Win $0.2 each"
          buttonText="Go to Verification"
          accentColor="#0AC07D"
          onClick={() => router.push("/verification")}
          icon={<
            img src="/verification.png" alt="Verification" className="w-full h-full object-contain" /
          >
          }
        />
      </div>
    </section>
  );
};

export default BonusSection;
