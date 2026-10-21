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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-backdrop/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-inset border border-line-soft shadow-2xl p-6 sm:p-7 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-line">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent-fg-strong text-xs font-mono mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Session Setup</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-fg-strong">
              Choose Questions to Practice
            </h2>
            <p className="text-xs sm:text-sm text-fg-muted mt-1">
              Select how many questions you want to solve from the {totalAvailable}-question bank.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-fg-muted hover:text-fg-strong hover:bg-line transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question Count Selection */}
        <div className="mt-5">
          <label className="block text-xs font-mono uppercase tracking-wider text-accent-fg-strong mb-2.5">
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
                      ? 'bg-accent/15 border-accent text-fg-strong shadow-md shadow-accent/10'
                      : 'bg-surface-raised border-line text-fg-muted hover:border-line-hover hover:text-fg'
                  }`}
                >
                  <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-accent-fg-strong' : 'text-fg-subtle'}`} />
                  <span className="text-xs sm:text-sm font-bold block">{opt.label}</span>
                  <span className="text-[10px] text-fg-subtle line-clamp-1 mt-0.5">{opt.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mode Selector */}
        <div className="mt-5">
          <label className="block text-xs font-mono uppercase tracking-wider text-accent-fg-strong mb-2.5">
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
                      ? 'bg-accent/10 border-accent/80 text-fg-strong'
                      : 'bg-surface-raised border-line text-fg-muted hover:border-line-hover hover:text-fg'
                  }`}
                >
                  <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-accent bg-accent' : 'border-line-gray-strong'
                  }`}>
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-on-accent" />}
                  </div>
                  <div>
                    <span className={`text-xs sm:text-sm font-bold block ${isSelected ? 'text-accent-fg-strong' : 'text-fg-bright'}`}>
                      {opt.title}
                    </span>
                    <span className="text-[11px] sm:text-xs text-fg-muted leading-relaxed block mt-0.5">
                      {opt.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Shuffle Option */}
        <div className="mt-4 pt-3 border-t border-line flex items-center justify-between">
          <label className="flex items-center gap-2.5 text-xs text-fg cursor-pointer">
            <input
              type="checkbox"
              id="start-shuffle-checkbox"
              checked={shouldShuffle}
              onChange={(e) => setShouldShuffle(e.target.checked)}
              className="w-4 h-4 rounded-sm border-line-gray bg-elevated text-accent-fg focus:ring-accent/50 accent-accent cursor-pointer"
            />
            <span>Shuffle questions in random order</span>
          </label>
          <span className="text-[11px] font-mono text-fg-subtle">
            Pool: {totalAvailable} Qs
          </span>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex items-center gap-3">
          <button
            id="start-session-btn"
            type="button"
            onClick={handleStart}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-accent to-accent-hover text-on-accent font-bold text-sm sm:text-base hover:brightness-110 shadow-lg shadow-accent/20 transition-all cursor-pointer"
          >
            <span>Start Practice Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
