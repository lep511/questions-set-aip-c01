import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  Bookmark, 
  HelpCircle, 
  Send,
  Sparkles,
  ArrowRight,
  Filter,
  Shuffle
} from 'lucide-react';
import { NormalizedQuestion } from '../types';

interface QuestionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  questions: NormalizedQuestion[];
  currentIndex: number;
  onSelectIndex: (idx: number) => void;
  selectedAnswers: Record<string, string[]>;
  checkedQuestions: Record<string, boolean>;
  flaggedQuestions: Record<string, boolean>;
  mode: 'practice' | 'exam' | 'flashcard';
  onSubmitExam: () => void;
  isExamSubmitted: boolean;
  onRemixQuestions?: () => void;
}

export const QuestionDrawer: React.FC<QuestionDrawerProps> = ({
  isOpen,
  onClose,
  questions,
  currentIndex,
  onSelectIndex,
  selectedAnswers,
  checkedQuestions,
  flaggedQuestions,
  mode,
  onSubmitExam,
  isExamSubmitted,
  onRemixQuestions,
}) => {
  const [filter, setFilter] = useState<'all' | 'flagged' | 'unanswered' | 'incorrect'>('all');

  if (!isOpen) return null;

  // Compute question statuses
  const getQuestionStatus = (q: NormalizedQuestion, index: number) => {
    const isSelected = (selectedAnswers[q.id] || []).length > 0;
    const isFlagged = Boolean(flaggedQuestions[q.id]);
    const isChecked = Boolean(checkedQuestions[q.id]);

    let isCorrect = false;
    if (isChecked) {
      const userSel = selectedAnswers[q.id] || [];
      isCorrect = q.correctAnswers.length === userSel.length &&
        q.correctAnswers.every(ans => userSel.includes(ans));
    }

    return {
      isSelected,
      isFlagged,
      isChecked,
      isCorrect,
    };
  };

  const answeredCount = questions.filter(q => (selectedAnswers[q.id] || []).length > 0).length;
  const flaggedCount = questions.filter(q => Boolean(flaggedQuestions[q.id])).length;

  const filteredQuestions = questions.map((q, idx) => ({ q, idx, status: getQuestionStatus(q, idx) }))
    .filter(({ q, status }) => {
      if (filter === 'flagged') return status.isFlagged;
      if (filter === 'unanswered') return !status.isSelected;
      if (filter === 'incorrect') return status.isChecked && !status.isCorrect;
      return true;
    });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div 
        className="w-full max-w-md bg-surface h-full shadow-2xl flex flex-col border-l border-line text-fg animate-in slide-in-from-right duration-200"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-line flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-fg-strong">
              Question Navigator
            </h3>
            <p className="text-xs text-fg-muted">
              {answeredCount} of {questions.length} answered • {flaggedCount} flagged
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            {onRemixQuestions && (
              <button
                id="drawer-remix-questions-btn"
                onClick={onRemixQuestions}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-elevated hover:bg-accent/20 hover:text-accent-fg-strong text-xs font-medium border border-line text-fg-muted transition cursor-pointer"
                title="Remix & Shuffle question order"
              >
                <Shuffle className="w-3.5 h-3.5 text-accent-fg" />
                <span>Remix</span>
              </button>
            )}

            <button
              id="close-question-drawer-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-fg-muted hover:text-fg-strong hover:bg-elevated transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="p-3 border-b border-line flex items-center gap-1.5 overflow-x-auto text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition cursor-pointer ${
              filter === 'all'
                ? 'bg-accent text-on-accent font-bold'
                : 'bg-elevated text-fg-muted hover:text-fg-strong border border-line'
            }`}
          >
            All ({questions.length})
          </button>
          <button
            onClick={() => setFilter('unanswered')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition cursor-pointer ${
              filter === 'unanswered'
                ? 'bg-accent text-on-accent font-bold'
                : 'bg-elevated text-fg-muted hover:text-fg-strong border border-line'
            }`}
          >
            Unanswered ({questions.length - answeredCount})
          </button>
          <button
            onClick={() => setFilter('flagged')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition cursor-pointer ${
              filter === 'flagged'
                ? 'bg-accent text-on-accent font-bold'
                : 'bg-elevated text-fg-muted hover:text-fg-strong border border-line'
            }`}
          >
            Flagged ({flaggedCount})
          </button>
          {mode === 'practice' && (
            <button
              onClick={() => setFilter('incorrect')}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition cursor-pointer ${
                filter === 'incorrect'
                  ? 'bg-rose-600 text-white font-bold'
                  : 'bg-elevated text-fg-muted hover:text-fg-strong border border-line'
              }`}
            >
              Missed
            </button>
          )}
        </div>

        {/* Legend */}
        <div className="px-4 py-2.5 bg-inset border-b border-line flex flex-wrap items-center gap-3 text-[11px] text-fg-muted">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-accent"></span>
            <span>Current</span>
          </div>
          {mode === 'practice' ? (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Correct</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span>Incorrect</span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-hover/60 border border-accent"></span>
              <span>Answered</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span>Flagged</span>
          </div>
        </div>

        {/* Grid List of Questions */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          <div className="grid grid-cols-5 gap-2.5">
            {filteredQuestions.map(({ q, idx, status }) => {
              const isCurrent = idx === currentIndex;
              
              let btnStyle = 'bg-elevated border-line text-fg hover:border-accent/40 hover:bg-elevated-hover';

              if (isCurrent) {
                btnStyle = 'ring-2 ring-accent bg-accent text-on-accent font-bold border-transparent';
              } else if (mode === 'practice' && status.isChecked) {
                if (status.isCorrect) {
                  btnStyle = 'bg-emerald-600 text-white border-emerald-500 font-bold';
                } else {
                  btnStyle = 'bg-rose-600 text-white border-rose-500 font-bold';
                }
              } else if (status.isSelected) {
                btnStyle = 'bg-accent/15 border-accent/50 text-accent-fg-strong font-semibold';
              }

              return (
                <button
                  key={q.id}
                  id={`jump-to-q-${idx + 1}`}
                  onClick={() => {
                    onSelectIndex(idx);
                    onClose();
                  }}
                  className={`relative h-12 rounded-xl flex flex-col items-center justify-center border text-xs font-semibold transition active:scale-95 cursor-pointer ${btnStyle}`}
                >
                  <span>Q{idx + 1}</span>

                  {/* Flag indicator icon */}
                  {status.isFlagged && (
                    <Bookmark className="w-3 h-3 text-accent-fg fill-accent absolute top-1.5 right-1.5" />
                  )}
                </button>
              );
            })}
          </div>

          {filteredQuestions.length === 0 && (
            <div className="text-center py-12 text-fg-subtle text-xs">
              No questions found for this filter.
            </div>
          )}
        </div>

        {/* Footer with Submit button for Exam Mode */}
        {mode === 'exam' && !isExamSubmitted && (
          <div className="p-4 border-t border-line bg-inset">
            <button
              id="drawer-submit-exam-btn"
              onClick={() => {
                onClose();
                onSubmitExam();
              }}
              className="w-full py-3 rounded-xl bg-accent hover:bg-accent-hover text-on-accent font-bold text-sm shadow-lg shadow-accent/20 flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Submit & Finish Exam</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
