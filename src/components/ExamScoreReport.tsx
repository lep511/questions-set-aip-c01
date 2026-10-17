import React from 'react';
import { 
  Trophy, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  FileText, 
  Share2, 
  ArrowRight,
  Clock,
  Sparkles,
  Download,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { NormalizedQuestion } from '../types';

interface ExamScoreReportProps {
  questions: NormalizedQuestion[];
  selectedAnswers: Record<string, string[]>;
  flaggedQuestions: Record<string, boolean>;
  onReviewQuestion: (idx: number) => void;
  onRetakeExam: () => void;
  onRetakeMissed: () => void;
  timeSpentSeconds: number;
}

export const ExamScoreReport: React.FC<ExamScoreReportProps> = ({
  questions,
  selectedAnswers,
  flaggedQuestions,
  onReviewQuestion,
  onRetakeExam,
  onRetakeMissed,
  timeSpentSeconds,
}) => {
  // Compute results
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  const results = questions.map((q, idx) => {
    const userAns = selectedAnswers[q.id] || [];
    const isAnswered = userAns.length > 0;
    
    let isCorrect = false;
    if (isAnswered) {
      isCorrect = q.correctAnswers.length === userAns.length &&
        q.correctAnswers.every(ans => userAns.includes(ans));
      if (isCorrect) correctCount++;
      else incorrectCount++;
    } else {
      unansweredCount++;
    }

    return {
      index: idx,
      question: q,
      userAns,
      isCorrect,
      isAnswered,
      isFlagged: Boolean(flaggedQuestions[q.id]),
    };
  });

  const total = questions.length;
  const scorePercent = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  const isPassed = scorePercent >= 70; // 70% standard passing score for cloud certs

  // Trigger celebration confetti if passed
  React.useEffect(() => {
    if (isPassed) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isPassed]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const handleExportJSON = () => {
    const reportData = {
      examTitle: "Exam Simulation Report",
      date: new Date().toISOString(),
      scorePercent,
      isPassed,
      correctCount,
      incorrectCount,
      unansweredCount,
      timeSpentSeconds,
      details: results.map(r => ({
        questionNumber: r.index + 1,
        question: r.question.question,
        userSelection: r.userAns,
        correctAnswer: r.question.correctAnswers,
        isCorrect: r.isCorrect,
        isFlagged: r.isFlagged,
      }))
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `exam-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Primary Score Hero Card */}
      <div className={`p-6 sm:p-8 rounded-3xl border text-center transition-all ${
        isPassed
          ? 'bg-gradient-to-b from-[#C5A059]/15 to-[#12141A] border-[#C5A059]/40 shadow-xl'
          : 'bg-gradient-to-b from-rose-950/20 to-[#12141A] border-rose-900/40 shadow-xl'
      }`}>
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl mb-4 shadow-lg">
          {isPassed ? (
            <div className="w-full h-full rounded-2xl bg-[#C5A059] text-[#0A0B0E] flex items-center justify-center shadow-lg shadow-[#C5A059]/30">
              <Trophy className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
          ) : (
            <div className="w-full h-full rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/30">
              <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#F3F4F6] mb-1">
          {isPassed ? 'Exam Passed! 🎉' : 'Keep Practicing! 💪'}
        </h2>
        <p className="text-sm text-[#9CA3AF] mb-6 max-w-md mx-auto">
          {isPassed 
            ? 'Commendable result! You met the 70% passing requirement.' 
            : 'You scored below the 70% threshold. Review your answers and explanations below.'}
        </p>

        {/* Big Score Percentage Display */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="text-center">
            <span className={`text-5xl sm:text-7xl font-mono font-black ${
              isPassed ? 'text-[#DFB76C]' : 'text-rose-400'
            }`}>
              {scorePercent}%
            </span>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] mt-1">
              Final Score
            </p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto mb-6">
          <div className="p-3.5 rounded-xl bg-[#161922] border border-[#1F2430]">
            <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-semibold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Correct</span>
            </div>
            <p className="text-lg sm:text-xl font-mono font-bold text-[#F3F4F6]">
              {correctCount} / {total}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#161922] border border-[#1F2430]">
            <div className="flex items-center justify-center gap-1.5 text-rose-400 text-xs font-semibold mb-1">
              <XCircle className="w-3.5 h-3.5" />
              <span>Incorrect</span>
            </div>
            <p className="text-lg sm:text-xl font-mono font-bold text-[#F3F4F6]">
              {incorrectCount}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#161922] border border-[#1F2430]">
            <div className="flex items-center justify-center gap-1.5 text-[#9CA3AF] text-xs font-semibold mb-1">
              <FileText className="w-3.5 h-3.5" />
              <span>Unanswered</span>
            </div>
            <p className="text-lg sm:text-xl font-mono font-bold text-[#F3F4F6]">
              {unansweredCount}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#161922] border border-[#1F2430]">
            <div className="flex items-center justify-center gap-1.5 text-[#DFB76C] text-xs font-semibold mb-1">
              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Time Spent</span>
            </div>
            <p className="text-lg sm:text-xl font-mono font-bold text-[#F3F4F6]">
              {formatTime(timeSpentSeconds)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          <button
            id="report-review-all-btn"
            onClick={() => onReviewQuestion(0)}
            className="px-5 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#DFB76C] text-[#0A0B0E] font-bold text-xs sm:text-sm shadow-lg shadow-[#C5A059]/20 transition flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Review Full Explanations</span>
          </button>

          {incorrectCount > 0 && (
            <button
              id="report-retake-missed-btn"
              onClick={onRetakeMissed}
              className="px-4 py-2.5 rounded-xl bg-[#1A1E2A] hover:bg-[#222838] text-[#DFB76C] border border-[#C5A059]/40 font-bold text-xs sm:text-sm shadow-sm transition flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Missed ({incorrectCount})</span>
            </button>
          )}

          <button
            id="report-restart-exam-btn"
            onClick={onRetakeExam}
            className="px-4 py-2.5 rounded-xl border border-[#1F2430] bg-[#161922] text-[#D1D5DB] hover:border-[#C5A059]/40 hover:bg-[#1A1E2A] text-xs sm:text-sm font-semibold transition flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restart Exam</span>
          </button>

          <button
            id="report-export-json-btn"
            onClick={handleExportJSON}
            className="px-4 py-2.5 rounded-xl border border-[#1F2430] bg-[#161922] text-[#D1D5DB] hover:border-[#C5A059]/40 hover:bg-[#1A1E2A] text-xs sm:text-sm font-semibold transition flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>

      </div>

      {/* Detailed Question Review List */}
      <div className="bg-[#12141A] border border-[#1F2430] rounded-2xl p-4 sm:p-6 shadow-xl">
        <h3 className="text-base font-bold text-[#F3F4F6] mb-4">
          Question Breakdown & Results
        </h3>

        <div className="space-y-3">
          {results.map(r => (
            <div
              key={r.question.id}
              className={`p-3.5 sm:p-4 rounded-xl border flex flex-wrap items-center justify-between gap-3 transition ${
                r.isCorrect
                  ? 'border-emerald-900/60 bg-emerald-950/20'
                  : !r.isAnswered
                  ? 'border-[#1F2430] bg-[#161922]/50'
                  : 'border-rose-900/60 bg-rose-950/20'
              }`}
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="shrink-0 mt-0.5">
                  {r.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : !r.isAnswered ? (
                    <FileText className="w-5 h-5 text-[#6B7280]" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-bold text-xs text-[#F3F4F6]">
                      Q{r.index + 1}
                    </span>
                    <span className="text-[11px] font-mono text-[#9CA3AF]">
                      Your answer: {r.userAns.length > 0 ? r.userAns.join(', ') : 'None'} • Correct: {r.question.correctAnswers.join(', ')}
                    </span>
                  </div>
                  <p className="text-xs text-[#D1D5DB] line-clamp-2">
                    {r.question.question}
                  </p>
                </div>
              </div>

              <button
                id={`review-q-btn-${r.index + 1}`}
                onClick={() => onReviewQuestion(r.index)}
                className="shrink-0 px-3 py-1.5 rounded-lg border border-[#1F2430] bg-[#161922] hover:border-[#C5A059]/40 hover:bg-[#1A1E2A] text-xs font-semibold text-[#DFB76C] flex items-center gap-1.5 transition cursor-pointer"
              >
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
