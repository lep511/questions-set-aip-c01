import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ExternalLink, 
  Bookmark, 
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NormalizedQuestion, QuestionOption, TextScale } from '../types';

interface QuestionCardProps {
  question: NormalizedQuestion;
  currentIndex: number;
  totalQuestions: number;
  selectedAnswers: string[];
  isChecked: boolean;
  isFlagged: boolean;
  mode: 'practice' | 'exam' | 'flashcard';
  textScale: TextScale;
  onSelectOption: (optionId: string) => void;
  onCheckAnswer: () => void;
  onResetQuestion: () => void;
  onToggleFlag: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedAnswers,
  isChecked,
  isFlagged,
  mode,
  textScale,
  onSelectOption,
  onCheckAnswer,
  onResetQuestion,
  onToggleFlag,
}) => {
  const [expandedExplanations, setExpandedExplanations] = useState<Record<string, boolean>>({});
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll to top of card when question changes
  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
      // Add breathing room at the top on mobile
      setTimeout(() => {
        window.scrollBy({ top: -20, behavior: 'smooth' });
      }, 100);
    }
  }, [currentIndex]);

  const toggleExplanation = (optionId: string) => {
    setExpandedExplanations(prev => ({
      ...prev,
      [optionId]: !prev[optionId]
    }));
  };

  const isMulti = question.isMultipleChoice;
  const isAllCorrect = isChecked && 
    question.correctAnswers.length === selectedAnswers.length &&
    question.correctAnswers.every(ans => selectedAnswers.includes(ans));

  const isPartiallyCorrect = isChecked && 
    isMulti && 
    !isAllCorrect && 
    selectedAnswers.some(ans => question.correctAnswers.includes(ans));

  // Determine font scaling styles
  const questionTextClass = textScale === 'sm' 
    ? 'text-sm sm:text-base' 
    : textScale === 'lg' 
    ? 'text-lg sm:text-xl' 
    : 'text-base sm:text-lg';

  const optionTextClass = textScale === 'sm' 
    ? 'text-xs sm:text-sm' 
    : textScale === 'lg' 
    ? 'text-base sm:text-base' 
    : 'text-sm sm:text-base';

  return (
    <div ref={cardRef} className="w-full bg-[#12141A] border border-[#1F2430] rounded-2xl p-4 sm:p-7 shadow-xl transition-all">
      
      {/* Header bar: Question index, Multi-select badge, Category, Flag button */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-[#1F2430]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-[#1A1D27] text-[#D1D5DB] border border-[#1F2430] font-semibold text-xs">
            Question {currentIndex + 1} of {totalQuestions}
          </span>

          {isMulti && (
            <span className="px-2.5 py-1 rounded-lg bg-[#C5A059]/10 text-[#DFB76C] border border-[#C5A059]/30 text-xs font-semibold flex items-center gap-1">
              <span>Select {question.requiredSelectCount}</span>
              {selectedAnswers.length > 0 && (
                <span className="opacity-75">
                  ({selectedAnswers.length}/{question.requiredSelectCount})
                </span>
              )}
            </span>
          )}

          {question.category && (
            <span className="px-2.5 py-1 rounded-lg bg-[#161922] text-[#9CA3AF] border border-[#1F2430] text-xs hidden sm:inline-block">
              {question.category}
            </span>
          )}
        </div>

        {/* Action badges: Flag, Reset single question */}
        <div className="flex items-center gap-2">
          <button
            id={`flag-question-btn-${currentIndex + 1}`}
            onClick={onToggleFlag}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              isFlagged
                ? 'bg-[#C5A059] text-[#0A0B0E] border-[#C5A059] shadow-xs'
                : 'border-[#1F2430] bg-[#161922] text-[#9CA3AF] hover:text-[#F3F4F6] hover:border-[#C5A059]/40'
            }`}
            title={isFlagged ? 'Flagged for review' : 'Flag question for review'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isFlagged ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">{isFlagged ? 'Flagged' : 'Flag'}</span>
          </button>
        </div>
      </div>

      {/* Question Text */}
      <div className="mb-6">
        <h2 className={`${questionTextClass} font-bold text-[#F3F4F6] leading-relaxed whitespace-pre-line tracking-tight`}>
          {question.question}
        </h2>
      </div>

      {/* Options List */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswers.includes(option.id);
          const isCorrect = question.correctAnswers.includes(option.id);
          const showFeedback = mode === 'practice' && isChecked;

          // Determine option styling based on mode and checked state
          let containerStyle = 'border-[#1F2430] bg-[#161922] hover:border-[#C5A059]/40 hover:bg-[#1A1E2A]';
          let badgeStyle = 'bg-[#1F2430] text-[#D1D5DB] border-[#2A3244]';

          if (showFeedback) {
            if (isCorrect) {
              // Highlight correct answer
              containerStyle = 'border-emerald-500/80 bg-emerald-950/30';
              badgeStyle = 'bg-emerald-600 text-white border-emerald-500 font-bold';
            } else if (isSelected && !isCorrect) {
              // Highlight incorrect choice - maintain same opacity as correct
              containerStyle = 'border-rose-500/80 bg-rose-950/30';
              badgeStyle = 'bg-rose-600 text-white border-rose-500 font-bold';
            } else {
              // Unselected other options - maintain visibility
              containerStyle = 'border-[#1F2430] bg-[#161922]';
            }
          } else if (isSelected) {
            // Selected before checking
            containerStyle = 'border-[#C5A059] bg-[#C5A059]/10 ring-1 ring-[#C5A059]/40';
            badgeStyle = 'bg-[#C5A059] text-[#0A0B0E] border-[#C5A059] font-bold';
          }

          const hasDetails = Boolean(option.explanation || (option.references && option.references.length > 0));
          const isExpanded = expandedExplanations[option.id] ?? true; // Default expanded on feedback

          return (
            <div
              key={option.id}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${containerStyle}`}
            >
              {/* Option main clickable row */}
              <button
                id={`option-${currentIndex + 1}-${option.id}`}
                onClick={() => {
                  if (mode === 'practice' && isChecked) return; // Locked once checked, use reset button to change
                  onSelectOption(option.id);
                }}
                disabled={mode === 'practice' && isChecked}
                className="w-full text-left p-3.5 sm:p-4 flex items-start gap-3.5 cursor-pointer disabled:cursor-default"
              >
                {/* Option Identifier Badge (A, B, C, D...) */}
                <div className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs sm:text-sm font-semibold border ${badgeStyle} transition-colors`}>
                  {showFeedback && isCorrect ? (
                    <Check className="w-4 h-4 text-white stroke-[3]" />
                  ) : showFeedback && isSelected && !isCorrect ? (
                    <XCircle className="w-4 h-4 text-white" />
                  ) : (
                    option.id
                  )}
                </div>

                {/* Option Content Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                    <span className="text-[11px] font-mono text-[#9CA3AF] uppercase tracking-wider">
                      Option {option.id}
                    </span>

                    {/* Feedback Badges */}
                    {showFeedback && isCorrect && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-[11px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Correct Answer
                      </span>
                    )}

                    {showFeedback && isSelected && !isCorrect && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-950/80 border border-rose-700/60 text-rose-400 text-[11px] font-bold flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> Your Selection (Incorrect)
                      </span>
                    )}
                  </div>

                  <p className={`${optionTextClass} text-[#E5E7EB] leading-relaxed`}>
                    {option.text}
                  </p>
                </div>
              </button>

              {/* Option-Specific In-Depth Explanation & References (Revealed after checking) */}
              {showFeedback && hasDetails && (
                <div className="px-3.5 sm:px-4 pb-3.5 pt-1 border-t border-[#1F2430] bg-[#0E1015]/70">
                  <button
                    onClick={() => toggleExplanation(option.id)}
                    className="flex items-center justify-between w-full py-1 text-xs font-semibold text-[#9CA3AF] hover:text-[#F3F4F6] transition"
                  >
                    <span className="flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-[#C5A059]" />
                      Option Analysis & Explanation
                    </span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-2 space-y-2 text-sm text-[#D1D5DB] leading-relaxed">
                      {option.explanation && (
                        <p className="bg-[#161922] p-3 rounded-lg border border-[#1F2430]">
                          {option.explanation}
                        </p>
                      )}

                      {/* Official Reference Documentation Links */}
                      {option.references && option.references.length > 0 && (
                        <div className="pt-1 flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] font-medium text-[#9CA3AF]">References:</span>
                          {option.references.map((ref, rIdx) => (
                            <a
                              key={rIdx}
                              href={ref.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#C5A059]/10 text-[#DFB76C] border border-[#C5A059]/30 text-[11px] hover:underline"
                            >
                              <span>{ref.title || 'Documentation'}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Global Question Explanation (if provided on question level) */}
      {mode === 'practice' && isChecked && question.explanation && (
        <div className="mb-6 p-4 rounded-xl bg-[#161922] border border-[#1F2430]">
          <div className="flex items-center gap-2 mb-1.5 font-semibold text-xs text-[#DFB76C]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>General Overview</span>
          </div>
          <p className="text-sm sm:text-base text-[#D1D5DB] leading-relaxed">
            {question.explanation}
          </p>
        </div>
      )}

      {/* Instant Feedback Result Banner & Action Bar in Practice Mode */}
      {mode === 'practice' && (
        <div className="pt-3 border-t border-[#1F2430] flex flex-wrap items-center justify-between gap-3">
          {isChecked ? (
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm ${
                isAllCorrect 
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-700/60' 
                  : isPartiallyCorrect
                  ? 'bg-amber-950/60 text-amber-300 border border-amber-700/60'
                  : 'bg-rose-950/60 text-rose-300 border border-rose-700/60'
              }`}>
                {isAllCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Correct! Excellent precision.</span>
                  </>
                ) : isPartiallyCorrect ? (
                  <>
                    <HelpCircle className="w-4 h-4 text-amber-400" />
                    <span>Partially Correct ({selectedAnswers.filter(a => question.correctAnswers.includes(a)).length}/{question.correctAnswers.length})</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span>Incorrect. Review analysis above.</span>
                  </>
                )}
              </div>

              <button
                id={`retry-question-btn-${currentIndex + 1}`}
                onClick={onResetQuestion}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#1F2430] bg-[#161922] text-[#D1D5DB] hover:border-[#C5A059]/40 hover:bg-[#1A1E2A] text-xs font-semibold transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-[#9CA3AF]">
                {isMulti 
                  ? `Select ${question.requiredSelectCount} options, then check feedback`
                  : 'Select an option to view instant feedback'}
              </span>

              <button
                id={`check-answer-btn-${currentIndex + 1}`}
                onClick={onCheckAnswer}
                disabled={selectedAnswers.length === 0}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#DFB76C] disabled:opacity-40 disabled:pointer-events-none text-[#0A0B0E] text-xs font-bold shadow-lg shadow-[#C5A059]/20 transition active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Check Answer</span>
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
