import React from 'react';
import { 
  BookOpen, 
  Clock, 
  Sparkles, 
  Upload, 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun, 
  RotateCcw,
  ListOrdered,
  Type,
  Shuffle,
  Layers
} from 'lucide-react';
import { TextScale } from '../types';

interface NavbarProps {
  mode: 'practice' | 'exam' | 'flashcard';
  setMode: (mode: 'practice' | 'exam' | 'flashcard') => void;
  onOpenSetup?: () => void;
  onOpenImport: () => void;
  onOpenDrawer: () => void;
  onResetExam: () => void;
  onRemixQuestions: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  textScale: TextScale;
  onChangeTextScale: () => void;
  totalQuestions: number;
  timeRemainingSeconds: number;
  isExamSubmitted: boolean;
  currentSetId?: string;
  onSelectSet?: (setId: string) => void;
  availableSets?: Array<{ id: string; name: string; questionCount: number }>;
}

export const Navbar: React.FC<NavbarProps> = ({
  mode,
  setMode,
  onOpenSetup,
  onOpenImport,
  onOpenDrawer,
  onResetExam,
  onRemixQuestions,
  isMuted,
  onToggleMute,
  isDark,
  onToggleTheme,
  textScale,
  onChangeTextScale,
  totalQuestions,
  timeRemainingSeconds,
  isExamSubmitted,
  currentSetId,
  onSelectSet,
  availableSets = [],
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-[#1F2430] bg-[#0A0B0E]/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2 sm:gap-4">
        
        {/* Left: Brand & Mode Pills */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#C5A059] flex items-center justify-center text-[#0A0B0E] font-black text-lg shadow-sm shadow-[#C5A059]/30">
              Q
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-[#F3F4F6] tracking-tight leading-tight">
                Exam Simulator
              </h1>
              <p className="text-[11px] text-[#9CA3AF] hidden sm:block">
                Instant Feedback & Test Prep
              </p>
            </div>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center p-0.5 rounded-xl bg-[#12141A] border border-[#1F2430]">
            <button
              id="mode-practice-btn"
              onClick={() => setMode('practice')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === 'practice'
                  ? 'bg-[#C5A059] text-[#0A0B0E] font-bold shadow-xs'
                  : 'text-[#9CA3AF] hover:text-[#E5E7EB]'
              }`}
              title="Practice mode provides instant feedback after each answer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Practice</span>
            </button>
            
            <button
              id="mode-exam-btn"
              onClick={() => setMode('exam')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === 'exam'
                  ? 'bg-[#C5A059] text-[#0A0B0E] font-bold shadow-xs'
                  : 'text-[#9CA3AF] hover:text-[#E5E7EB]'
              }`}
              title="Timed exam mode with score breakdown upon submission"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Exam</span>
            </button>

            <button
              id="mode-flashcard-btn"
              onClick={() => setMode('flashcard')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === 'flashcard'
                  ? 'bg-[#C5A059] text-[#0A0B0E] font-bold shadow-xs'
                  : 'text-[#9CA3AF] hover:text-[#E5E7EB]'
              }`}
              title="Flashcard study mode for memorization"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Flashcards</span>
            </button>
          </div>
        </div>

        {/* Center / Right: Timer (if in exam) + Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {mode === 'exam' && !isExamSubmitted && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#DFB76C] font-mono text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 animate-pulse text-[#C5A059]" />
              <span>{formatTime(timeRemainingSeconds)}</span>
            </div>
          )}

          {/* Question grid drawer toggle */}
          <button
            id="open-question-matrix-btn"
            onClick={onOpenDrawer}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[#1F2430] bg-[#12141A] text-[#D1D5DB] hover:border-[#C5A059]/50 hover:bg-[#181B23] text-xs font-medium transition"
            title="Open Question Navigator Matrix"
          >
            <ListOrdered className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="hidden md:inline">Questions</span>
            <span className="px-1.5 py-0.2 rounded-md bg-[#1F2430] text-[10px] text-[#DFB76C] font-mono font-bold">
              {totalQuestions}
            </span>
          </button>

          {/* Question Set Selector */}
          {availableSets.length > 0 && onSelectSet && (
            <div className="relative">
              <select
                id="question-set-selector"
                value={currentSetId}
                onChange={(e) => onSelectSet(e.target.value)}
                className="appearance-none flex items-center gap-1.5 pl-8 pr-3 py-1.5 rounded-xl border border-[#C5A059]/40 bg-[#12141A] text-[#DFB76C] hover:bg-[#181B23] text-xs font-semibold transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50"
                title="Select question set"
              >
                {availableSets.map((set) => (
                  <option key={set.id} value={set.id} className="bg-[#12141A] text-[#DFB76C]">
                    {set.name} ({set.questionCount}Q)
                  </option>
                ))}
              </select>
              <Layers className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#C5A059] pointer-events-none" />
            </div>
          )}

          {/* Setup / Question count button */}
          {onOpenSetup && (
            <button
              id="open-setup-btn"
              onClick={onOpenSetup}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[#C5A059]/40 bg-[#C5A059]/10 text-[#DFB76C] hover:bg-[#C5A059]/20 text-xs font-semibold transition cursor-pointer"
              title="Change number of questions (5, 10, 20, All)"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden sm:inline">Count / Setup</span>
            </button>
          )}

          {/* Import / Paste JSON button */}
          <button
            id="import-json-btn"
            onClick={onOpenImport}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#DFB76C] hover:bg-[#C5A059]/20 text-xs font-semibold transition"
            title="Import or paste custom JSON file"
          >
            <Upload className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="hidden sm:inline">JSON Files</span>
          </button>

          {/* Remix / Shuffle Questions */}
          <button
            id="remix-questions-btn"
            onClick={onRemixQuestions}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[#1F2430] bg-[#12141A] text-[#D1D5DB] hover:border-[#C5A059]/50 hover:text-[#DFB76C] hover:bg-[#181B23] text-xs font-medium transition cursor-pointer"
            title="Remix & Shuffle questions into random order"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="hidden lg:inline">Remix</span>
          </button>

          {/* Text scale toggle */}
          <button
            id="toggle-font-scale-btn"
            onClick={onChangeTextScale}
            className="p-1.5 rounded-xl border border-[#1F2430] bg-[#12141A] text-[#D1D5DB] hover:border-[#C5A059]/50 hover:bg-[#181B23] transition"
            title={`Font size: ${textScale.toUpperCase()} (Click to change)`}
          >
            <div className="flex items-center justify-center w-4 h-4 text-xs font-bold font-mono text-[#DFB76C]">
              {textScale === 'sm' ? 'A-' : textScale === 'lg' ? 'A+' : 'A'}
            </div>
          </button>

          {/* Sound mute toggle */}
          <button
            id="toggle-sound-btn"
            onClick={onToggleMute}
            className="p-1.5 rounded-xl border border-[#1F2430] bg-[#12141A] text-[#D1D5DB] hover:border-[#C5A059]/50 hover:bg-[#181B23] transition"
            title={isMuted ? 'Unmute feedback sound' : 'Mute feedback sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#6B7280]" /> : <Volume2 className="w-4 h-4 text-[#C5A059]" />}
          </button>

          {/* Dark / Light toggle */}
          <button
            id="toggle-theme-btn"
            onClick={onToggleTheme}
            className="p-1.5 rounded-xl border border-[#1F2430] bg-[#12141A] text-[#D1D5DB] hover:border-[#C5A059]/50 hover:bg-[#181B23] transition"
            title="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-[#C5A059]" /> : <Moon className="w-4 h-4 text-[#9CA3AF]" />}
          </button>

          {/* Reset button */}
          <button
            id="reset-exam-btn"
            onClick={onResetExam}
            className="p-1.5 rounded-xl border border-[#1F2430] bg-[#12141A] text-[#9CA3AF] hover:text-[#F3F4F6] hover:border-[#C5A059]/50 hover:bg-[#181B23] transition"
            title="Reset answers and restart"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
