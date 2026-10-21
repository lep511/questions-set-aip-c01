import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Send,
  ListOrdered
} from 'lucide-react';

interface MobileBottomBarProps {
  currentIndex: number;
  totalQuestions: number;
  mode: 'practice' | 'exam' | 'flashcard';
  isChecked: boolean;
  hasSelected: boolean;
  onPrev: () => void;
  onNext: () => void;
  onCheckAnswer: () => void;
  onSubmitExam: () => void;
  onOpenDrawer: () => void;
  isExamSubmitted: boolean;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  currentIndex,
  totalQuestions,
  mode,
  isChecked,
  hasSelected,
  onPrev,
  onNext,
  onCheckAnswer,
  onSubmitExam,
  onOpenDrawer,
  isExamSubmitted,
}) => {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;
  const progressPercent = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  return (
    <div className="sticky bottom-0 z-20 w-full bg-canvas/95 border-t border-line backdrop-blur-md px-3 sm:px-6 py-2.5 sm:py-3 transition-colors shadow-2xl">
      
      {/* Visual Progress Bar on top of bottom bar */}
      <div className="w-full bg-elevated h-1 absolute top-0 left-0">
        <div 
          className="bg-accent h-full transition-all duration-300 shadow-xs shadow-accent/50"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Prev Button */}
        <button
          id="nav-prev-btn"
          onClick={onPrev}
          disabled={isFirst}
          className="flex items-center gap-1 sm:gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl border border-line bg-surface text-fg text-xs sm:text-sm font-semibold disabled:opacity-30 disabled:pointer-events-none hover:border-accent/40 hover:bg-elevated transition active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden xs:inline">Prev</span>
        </button>

        {/* Center: Context Action */}
        <div className="flex items-center gap-2">
          {mode === 'practice' && !isChecked && (
            <button
              id="mobile-check-answer-btn"
              onClick={onCheckAnswer}
              disabled={!hasSelected}
              className="flex items-center gap-1.5 px-4 sm:px-6 py-2 rounded-xl bg-accent hover:bg-accent-hover disabled:opacity-30 disabled:pointer-events-none text-on-accent text-xs sm:text-sm font-bold shadow-lg shadow-accent/20 transition active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Check Answer</span>
            </button>
          )}

          {mode === 'exam' && isLast && !isExamSubmitted && (
            <button
              id="mobile-submit-exam-btn"
              onClick={onSubmitExam}
              className="flex items-center gap-1.5 px-4 sm:px-6 py-2 rounded-xl bg-accent hover:bg-accent-hover text-on-accent text-xs sm:text-sm font-bold shadow-lg shadow-accent/20 transition active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Finish Exam</span>
            </button>
          )}

          {/* Quick Navigator matrix icon for mobile */}
          <button
            id="mobile-open-matrix-btn"
            onClick={onOpenDrawer}
            className="p-2 rounded-xl border border-line bg-surface text-accent-fg-strong hover:border-accent/40 hover:bg-elevated transition cursor-pointer"
            title="Question list"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
        </div>

        {/* Next Button */}
        <button
          id="nav-next-btn"
          onClick={onNext}
          disabled={isLast}
          className="flex items-center gap-1 sm:gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-accent hover:bg-accent-hover text-on-accent font-bold text-xs sm:text-sm disabled:opacity-30 disabled:pointer-events-none transition active:scale-95 shadow-md shadow-accent/20 cursor-pointer"
        >
          <span className="hidden xs:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
