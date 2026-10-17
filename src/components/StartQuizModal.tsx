import React from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  Layers, 
  Zap, 
  Flame, 
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  X
} from 'lucide-react';

interface StartQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAvailable: number;
  selectedCount: number | 'all';
  onSelectCount: (count: number | 'all') => void;
  mode: 'practice' | 'exam' | 'flashcard';
  onSelectMode: (mode: 'practice' | 'exam' | 'flashcard') => void;
  onStart: (count: number | 'all', mode: 'practice' | 'exam' | 'flashcard', shuffle: boolean) => void;
}

export const StartQuizModal: React.FC<StartQuizModalProps> = ({
  isOpen,
  onClose,
  totalAvailable,
  selectedCount,
  onSelectCount,
  mode,
  onSelectMode,
  onStart,
}) => {
  const [shouldShuffle, setShouldShuffle] = React.useState<boolean>(true);

  if (!isOpen) return null;

  const countOptions: Array<{ value: number | 'all'; label: string; desc: string; icon: typeof Zap }> = [
    { value: 5, label: '5 Questions', desc: 'Quick 5-min drill', icon: Zap },
    { value: 10, label: '10 Questions', desc: 'Focused study session', icon: Sparkles },
    { value: 20, label: '20 Questions', desc: 'Standard practice set', icon: Flame },
    { value: 'all', label: `All (${totalAvailable})`, desc: 'Full certification pool', icon: Layers },
  ];

  const modeOptions: Array<{ id: 'practice' | 'exam' | 'flashcard'; title: string; desc: string }> = [
    {
      id: 'practice',
      title: 'Practice Mode',
      desc: 'Instant answer checking with full AWS documentation explanations',
    },
    {
      id: 'exam',
      title: 'Timed Exam Simulation',
      desc: 'Simulated exam timer, review drawer, and comprehensive score breakdown',
    },
    {
      id: 'flashcard',
      title: 'Flashcard Review',
      desc: 'Flip-card active recall study with correct answers & architectural notes',
    },
  ];

  const handleStart = () => {
    onStart(selectedCount, mode, shouldShuffle);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050608]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-[#0E1015] border border-[#262B36] shadow-2xl p-6 sm:p-7 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-[#1F2430]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#DFB76C] text-xs font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Session Setup</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#F3F4F6]">
              Choose Questions to Practice
            </h2>
            <p className="text-xs sm:text-sm text-[#9CA3AF] mt-1">
              Select how many questions you want to solve from the {totalAvailable}-question bank.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1F2430] transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question Count Selection */}
        <div className="mt-5">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#DFB76C] mb-2.5">
            Number of Questions
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {countOptions.map((opt) => {
              const isSelected = selectedCount === opt.value;
              const Icon = opt.icon;
              return (
                <button
                  key={String(opt.value)}
                  type="button"
                  id={`count-opt-${opt.value}`}
                  onClick={() => onSelectCount(opt.value)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#C5A059]/15 border-[#C5A059] text-[#F3F4F6] shadow-md shadow-[#C5A059]/10'
                      : 'bg-[#141720] border-[#1F2430] text-[#9CA3AF] hover:border-[#384050] hover:text-[#D1D5DB]'
                  }`}
                >
                  <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-[#DFB76C]' : 'text-[#6B7280]'}`} />
                  <span className="text-xs sm:text-sm font-bold block">{opt.label}</span>
                  <span className="text-[10px] text-[#6B7280] line-clamp-1 mt-0.5">{opt.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mode Selector */}
        <div className="mt-5">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#DFB76C] mb-2.5">
            Study Mode
          </label>
          <div className="space-y-2">
            {modeOptions.map((opt) => {
              const isSelected = mode === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  id={`mode-opt-${opt.id}`}
                  onClick={() => onSelectMode(opt.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#C5A059]/10 border-[#C5A059]/80 text-[#F3F4F6]'
                      : 'bg-[#141720] border-[#1F2430] text-[#9CA3AF] hover:border-[#384050] hover:text-[#D1D5DB]'
                  }`}
                >
                  <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-[#C5A059] bg-[#C5A059]' : 'border-[#4B5563]'
                  }`}>
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#0A0B0E]" />}
                  </div>
                  <div>
                    <span className={`text-xs sm:text-sm font-bold block ${isSelected ? 'text-[#DFB76C]' : 'text-[#E5E7EB]'}`}>
                      {opt.title}
                    </span>
                    <span className="text-[11px] sm:text-xs text-[#9CA3AF] leading-relaxed block mt-0.5">
                      {opt.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Shuffle Option */}
        <div className="mt-4 pt-3 border-t border-[#1F2430] flex items-center justify-between">
          <label className="flex items-center gap-2.5 text-xs text-[#D1D5DB] cursor-pointer">
            <input
              type="checkbox"
              id="start-shuffle-checkbox"
              checked={shouldShuffle}
              onChange={(e) => setShouldShuffle(e.target.checked)}
              className="w-4 h-4 rounded-sm border-[#374151] bg-[#161922] text-[#C5A059] focus:ring-[#C5A059]/50 accent-[#C5A059] cursor-pointer"
            />
            <span>Shuffle questions in random order</span>
          </label>
          <span className="text-[11px] font-mono text-[#6B7280]">
            Pool: {totalAvailable} Qs
          </span>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex items-center gap-3">
          <button
            id="start-session-btn"
            type="button"
            onClick={handleStart}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#DFB76C] text-[#0A0B0E] font-bold text-sm sm:text-base hover:brightness-110 shadow-lg shadow-[#C5A059]/20 transition-all cursor-pointer"
          >
            <span>Start Practice Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
