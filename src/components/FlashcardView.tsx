import React, { useState, useEffect, useRef } from 'react';
import { 
  RotateCw, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NormalizedQuestion, TextScale } from '../types';

interface FlashcardViewProps {
  question: NormalizedQuestion;
  currentIndex: number;
  totalQuestions: number;
  textScale: TextScale;
  onNext: () => void;
  onPrev: () => void;
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({
  question,
  currentIndex,
  totalQuestions,
  textScale,
  onNext,
  onPrev,
}) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll to top when card changes
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

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    onNext();
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    onPrev();
  };

  const questionTextClass = textScale === 'sm' 
    ? 'text-sm sm:text-base' 
    : textScale === 'lg' 
    ? 'text-lg sm:text-xl' 
    : 'text-base sm:text-lg';

  return (
    <div ref={cardRef} className="w-full max-w-3xl mx-auto space-y-4">
      {/* Flashcard Card Container */}
      <div 
        onClick={handleFlip}
        className="w-full min-h-[380px] sm:min-h-[440px] bg-[#12141A] border border-[#1F2430] rounded-3xl p-5 sm:p-8 shadow-xl hover:border-[#C5A059]/40 transition-all cursor-pointer flex flex-col justify-between relative group select-none"
      >
        {/* Top badge bar */}
        <div className="flex items-center justify-between gap-2 border-b border-[#1F2430] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#DFB76C] font-bold text-xs">
              Card {currentIndex + 1} of {totalQuestions}
            </span>
            {question.category && (
              <span className="text-xs text-[#9CA3AF] hidden sm:inline">
                {question.category}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#9CA3AF] font-medium group-hover:text-[#DFB76C] transition">
            <RotateCw className="w-3.5 h-3.5" />
            <span>Tap anywhere to flip</span>
          </div>
        </div>

        {/* Content Body: Front (Question) vs Back (Answer + Explanations) */}
        <div className="flex-1 flex flex-col justify-center py-2">
          {!isFlipped ? (
            /* FRONT OF CARD */
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF]">
                Question
              </span>
              <h2 className={`${questionTextClass} font-bold text-[#F3F4F6] leading-relaxed whitespace-pre-line`}>
                {question.question}
              </h2>

              <div className="pt-3">
                <p className="text-xs text-[#9CA3AF] font-medium mb-2">Options available:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {question.options.map(opt => (
                    <div key={opt.id} className="p-2.5 rounded-xl bg-[#161922] border border-[#1F2430] text-xs text-[#D1D5DB] flex items-start gap-2">
                      <span className="font-bold text-[#DFB76C]">{opt.id}:</span>
                      <span className="line-clamp-2">{opt.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* BACK OF CARD */
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 font-bold text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Correct Answer: {question.correctAnswers.join(', ')}
                </span>
              </div>

              {/* Show the correct options and their explanation */}
              <div className="space-y-3 max-h-[260px] sm:max-h-[300px] overflow-y-auto pr-1">
                {question.options.filter(o => question.correctAnswers.includes(o.id)).map(opt => (
                  <div key={opt.id} className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/60 text-xs text-[#D1D5DB] space-y-2">
                    <p className="font-semibold text-emerald-300">
                      Option {opt.id}: {opt.text}
                    </p>
                    {opt.explanation && (
                      <p className="text-[#D1D5DB] leading-relaxed">
                        {opt.explanation}
                      </p>
                    )}
                    {opt.references && opt.references.length > 0 && (
                      <div className="pt-1 flex flex-wrap items-center gap-1.5">
                        {opt.references.map((ref, rIdx) => (
                          <span key={rIdx} className="text-[11px] text-[#DFB76C] inline-flex items-center gap-1">
                            <span>{ref.title}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Overall explanation if exists */}
                {question.explanation && (
                  <div className="p-3.5 rounded-xl bg-[#161922] border border-[#1F2430] text-xs text-[#D1D5DB]">
                    <p className="font-semibold text-[#DFB76C] mb-1">Overview:</p>
                    <p className="leading-relaxed">{question.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom hint / status */}
        <div className="pt-3 border-t border-[#1F2430] flex items-center justify-between text-xs text-[#9CA3AF]">
          <span>{isFlipped ? 'Answer revealed' : 'Prompt view'}</span>
          <span className="font-semibold text-[#DFB76C]">
            {isFlipped ? 'Click to show question' : 'Click to show answer'}
          </span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-3 px-2">
        <button
          id="flashcard-prev-btn"
          onClick={handlePrevCard}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded-xl border border-[#1F2430] bg-[#12141A] disabled:opacity-40 text-xs font-semibold text-[#D1D5DB] flex items-center gap-1.5 hover:border-[#C5A059]/40 hover:bg-[#161922] transition cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Card</span>
        </button>

        <button
          id="flashcard-flip-btn"
          onClick={handleFlip}
          className="px-5 py-2 rounded-xl bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#DFB76C] text-xs font-bold flex items-center gap-1.5 hover:bg-[#C5A059]/25 transition cursor-pointer"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>{isFlipped ? 'Show Question' : 'Flip Answer'}</span>
        </button>

        <button
          id="flashcard-next-btn"
          onClick={handleNextCard}
          disabled={currentIndex >= totalQuestions - 1}
          className="px-4 py-2 rounded-xl border border-[#1F2430] bg-[#12141A] disabled:opacity-40 text-xs font-semibold text-[#D1D5DB] flex items-center gap-1.5 hover:border-[#C5A059]/40 hover:bg-[#161922] transition cursor-pointer"
        >
          <span>Next Card</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
