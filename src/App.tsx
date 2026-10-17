/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { QuestionCard } from './components/QuestionCard';
import { QuestionDrawer } from './components/QuestionDrawer';
import { JsonImportModal } from './components/JsonImportModal';
import { StartQuizModal } from './components/StartQuizModal';
import { ExamScoreReport } from './components/ExamScoreReport';
import { FlashcardView } from './components/FlashcardView';
import { MobileBottomBar } from './components/MobileBottomBar';
import { normalizeQuestions } from './data/defaultExam';
import { QUESTION_SETS, DEFAULT_SET } from './data/questionSets';
import { NormalizedQuestion, TextScale } from './types';
import { sounds } from './utils/sound';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  Clock, 
  Sparkles, 
  FileCode,
  BookOpen,
  Shuffle
} from 'lucide-react';

export default function App() {
  // Questions and Exam Info
  const [currentSetId, setCurrentSetId] = useState<string>(DEFAULT_SET.id);
  const [examTitle, setExamTitle] = useState<string>(DEFAULT_SET.description);
  const [allQuestionsPool, setAllQuestionsPool] = useState<NormalizedQuestion[]>(() => {
    return normalizeQuestions(DEFAULT_SET.questions);
  });
  const [questions, setQuestions] = useState<NormalizedQuestion[]>(() => {
    return normalizeQuestions(DEFAULT_SET.questions);
  });
  const [selectedCountSetting, setSelectedCountSetting] = useState<number | 'all'>('all');
  const [isStartSetupOpen, setIsStartSetupOpen] = useState<boolean>(false);

  // Navigation and Modes
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [mode, setMode] = useState<'practice' | 'exam' | 'flashcard'>('practice');
  const [isExamSubmitted, setIsExamSubmitted] = useState<boolean>(false);

  // User responses
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});

  // Modals and Drawers
  const [isImportOpen, setIsImportOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Appearance & Audio Settings
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [textScale, setTextScale] = useState<TextScale>('base');

  // Exam Timer (Default 20 mins for 10 questions)
  const examDurationSeconds = questions.length * 120; // 2 minutes per question
  const [timeRemaining, setTimeRemaining] = useState<number>(examDurationSeconds);
  const [examStartTime, setExamStartTime] = useState<number>(Date.now());

  // Dark mode effect
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Audio mute effect
  useEffect(() => {
    sounds.setMuted(isMuted);
  }, [isMuted]);

  // Auto-dismiss toast message
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Exam countdown timer effect
  useEffect(() => {
    if (mode !== 'exam' || isExamSubmitted) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, isExamSubmitted]);

  // Current question helper
  const currentQuestion = questions[currentIndex] || questions[0];
  const currentSelected = selectedAnswers[currentQuestion?.id] || [];
  const currentIsChecked = Boolean(checkedQuestions[currentQuestion?.id]);
  const currentIsFlagged = Boolean(flaggedQuestions[currentQuestion?.id]);

  // Option selection logic
  const handleSelectOption = useCallback((optionId: string) => {
    if (!currentQuestion) return;
    sounds.playClick();

    setSelectedAnswers(prev => {
      const existing = prev[currentQuestion.id] || [];

      if (currentQuestion.isMultipleChoice) {
        // Toggle selection
        if (existing.includes(optionId)) {
          return {
            ...prev,
            [currentQuestion.id]: existing.filter(id => id !== optionId)
          };
        } else {
          // Cap at required select count if desired, or allow toggle
          if (existing.length >= currentQuestion.requiredSelectCount && currentQuestion.requiredSelectCount > 1) {
            // Replace oldest or toggle
            return {
              ...prev,
              [currentQuestion.id]: [...existing.slice(1), optionId]
            };
          }
          return {
            ...prev,
            [currentQuestion.id]: [...existing, optionId]
          };
        }
      } else {
        // Single choice: select option
        const updated = {
          ...prev,
          [currentQuestion.id]: [optionId]
        };

        // In practice mode, if single choice, we can auto-check for instant feedback!
        if (mode === 'practice') {
          setCheckedQuestions(cPrev => ({
            ...cPrev,
            [currentQuestion.id]: true
          }));

          // Sound check
          const isCorrect = currentQuestion.correctAnswers.includes(optionId);
          if (isCorrect) {
            sounds.playCorrect();
          } else {
            sounds.playIncorrect();
          }
        }

        return updated;
      }
    });
  }, [currentQuestion, mode]);

  // Instant Check Answer in Practice Mode
  const handleCheckAnswer = useCallback(() => {
    if (!currentQuestion || currentSelected.length === 0) return;

    setCheckedQuestions(prev => ({
      ...prev,
      [currentQuestion.id]: true
    }));

    // Evaluate correct vs incorrect
    const isCorrect = currentQuestion.correctAnswers.length === currentSelected.length &&
      currentQuestion.correctAnswers.every(ans => currentSelected.includes(ans));

    if (isCorrect) {
      sounds.playCorrect();
    } else {
      sounds.playIncorrect();
    }
  }, [currentQuestion, currentSelected]);

  // Reset single question answer
  const handleResetCurrentQuestion = useCallback(() => {
    if (!currentQuestion) return;
    setSelectedAnswers(prev => {
      const next = { ...prev };
      delete next[currentQuestion.id];
      return next;
    });
    setCheckedQuestions(prev => {
      const next = { ...prev };
      delete next[currentQuestion.id];
      return next;
    });
  }, [currentQuestion]);

  // Toggle Flag
  const handleToggleFlag = useCallback(() => {
    if (!currentQuestion) return;
    setFlaggedQuestions(prev => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id]
    }));
  }, [currentQuestion]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, questions.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  // Reset entire exam
  const handleResetExam = () => {
    if (window.confirm("Are you sure you want to reset all answers and restart?")) {
      setSelectedAnswers({});
      setCheckedQuestions({});
      setFlaggedQuestions({});
      setCurrentIndex(0);
      setIsExamSubmitted(false);
      setTimeRemaining(questions.length * 120);
      setExamStartTime(Date.now());
    }
  };

  // Remix / Shuffle questions to random order
  const handleRemixQuestions = useCallback(() => {
    sounds.playClick();
    setQuestions(prev => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
    setCurrentIndex(0);
    setToastMessage(`🔀 Remixed ${questions.length} questions into random order!`);
  }, [questions.length]);

  // Submit Exam
  const handleSubmitExam = () => {
    setIsExamSubmitted(true);
    // In exam mode, automatically check all questions so user can review
    const allChecked: Record<string, boolean> = {};
    questions.forEach(q => {
      allChecked[q.id] = true;
    });
    setCheckedQuestions(allChecked);
  };

  // Retake missed questions
  const handleRetakeMissed = () => {
    const missedQuestions = questions.filter(q => {
      const userAns = selectedAnswers[q.id] || [];
      const isCorrect = q.correctAnswers.length === userAns.length &&
        q.correctAnswers.every(ans => userAns.includes(ans));
      return !isCorrect;
    });

    if (missedQuestions.length > 0) {
      setQuestions(missedQuestions);
      setExamTitle(`${examTitle} (Missed Review - ${missedQuestions.length} Qs)`);
      setSelectedAnswers({});
      setCheckedQuestions({});
      setFlaggedQuestions({});
      setCurrentIndex(0);
      setIsExamSubmitted(false);
      setMode('practice');
    }
  };

  // Retake full exam
  const handleRetakeFullExam = () => {
    setSelectedAnswers({});
    setCheckedQuestions({});
    setFlaggedQuestions({});
    setCurrentIndex(0);
    setIsExamSubmitted(false);
    setTimeRemaining(questions.length * 120);
    setExamStartTime(Date.now());
  };

  // Review single question from score report
  const handleReviewFromReport = (idx: number) => {
    setCurrentIndex(idx);
    setIsExamSubmitted(false);
    setMode('practice');
  };

  // Start a new session with custom count and mode
  const handleStartSession = (count: number | 'all', newMode: 'practice' | 'exam' | 'flashcard', shouldShuffle: boolean) => {
    let pool = [...allQuestionsPool];
    if (shouldShuffle) {
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
    }
    
    const sliceCount = count === 'all' ? pool.length : Math.min(count, pool.length);
    const selectedSubset = pool.slice(0, sliceCount);

    setQuestions(selectedSubset);
    setSelectedCountSetting(count);
    setMode(newMode);
    setSelectedAnswers({});
    setCheckedQuestions({});
    setFlaggedQuestions({});
    setCurrentIndex(0);
    setIsExamSubmitted(false);
    setTimeRemaining(selectedSubset.length * 120);
    setExamStartTime(Date.now());
    setIsStartSetupOpen(false);
    
    setToastMessage(`✨ Started ${newMode.toUpperCase()} session with ${selectedSubset.length} questions!`);
  };

  // Load custom questions
  const handleLoadQuestions = (newQuestions: NormalizedQuestion[], title?: string) => {
    setAllQuestionsPool(newQuestions);
    setQuestions(newQuestions);
    setSelectedCountSetting('all');
    setExamTitle(title || `Custom Exam (${newQuestions.length} Questions)`);
    setSelectedAnswers({});
    setCheckedQuestions({});
    setFlaggedQuestions({});
    setCurrentIndex(0);
    setIsExamSubmitted(false);
    setTimeRemaining(newQuestions.length * 120);
    setExamStartTime(Date.now());
  };

  // Change question set
  const handleSelectSet = (setId: string) => {
    const selectedSet = QUESTION_SETS.find(s => s.id === setId);
    if (!selectedSet) return;
    
    const normalizedQuestions = normalizeQuestions(selectedSet.questions);
    setCurrentSetId(setId);
    setAllQuestionsPool(normalizedQuestions);
    setQuestions(normalizedQuestions);
    setSelectedCountSetting('all');
    setExamTitle(selectedSet.description);
    setSelectedAnswers({});
    setCheckedQuestions({});
    setFlaggedQuestions({});
    setCurrentIndex(0);
    setIsExamSubmitted(false);
    setTimeRemaining(normalizedQuestions.length * 120);
    setExamStartTime(Date.now());
    
    setToastMessage(`📚 Loaded ${selectedSet.name} with ${selectedSet.questionCount} questions!`);
  };

  // Keyboard navigation & quick shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in a textarea or modal
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'n') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'p') {
        handlePrev();
      } else if (e.key.toLowerCase() === 'f') {
        handleToggleFlag();
      } else if (e.key === 'Enter') {
        if (mode === 'practice' && !currentIsChecked && currentSelected.length > 0) {
          handleCheckAnswer();
        } else if (mode === 'practice' && currentIsChecked) {
          handleNext();
        }
      } else if (['a', 'b', 'c', 'd', 'e', '1', '2', '3', '4', '5'].includes(e.key.toLowerCase())) {
        const key = e.key.toLowerCase();
        let targetOptId = '';
        if (key === '1' || key === 'a') targetOptId = 'A';
        else if (key === '2' || key === 'b') targetOptId = 'B';
        else if (key === '3' || key === 'c') targetOptId = 'C';
        else if (key === '4' || key === 'd') targetOptId = 'D';
        else if (key === '5' || key === 'e') targetOptId = 'E';

        const optExists = currentQuestion?.options.some(o => o.id === targetOptId);
        if (optExists) {
          handleSelectOption(targetOptId);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleToggleFlag, handleCheckAnswer, handleSelectOption, mode, currentIsChecked, currentSelected.length, currentQuestion]);

  // Calculate text scaling cycler
  const cycleTextScale = () => {
    setTextScale(prev => prev === 'sm' ? 'base' : prev === 'base' ? 'lg' : 'sm');
  };

  // Accuracy calculation for live badge
  const answeredCount = Object.keys(selectedAnswers).filter(k => (selectedAnswers[k] || []).length > 0).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0B0E] text-[#D1D5DB] transition-colors">
      
      {/* Top Navigation Bar */}
      <Navbar
        mode={mode}
        setMode={(newMode) => {
          setMode(newMode);
          if (newMode === 'exam' && !isExamSubmitted) {
            // Keep exam flow
          }
        }}
        onOpenSetup={() => setIsStartSetupOpen(true)}
        onOpenImport={() => setIsImportOpen(true)}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onResetExam={handleResetExam}
        onRemixQuestions={handleRemixQuestions}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        textScale={textScale}
        onChangeTextScale={cycleTextScale}
        totalQuestions={questions.length}
        timeRemainingSeconds={timeRemaining}
        isExamSubmitted={isExamSubmitted}
        currentSetId={currentSetId}
        onSelectSet={handleSelectSet}
        availableSets={QUESTION_SETS.map(s => ({
          id: s.id,
          name: s.name,
          questionCount: s.questionCount
        }))}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col justify-start">
        
        {/* Exam Title & Stats Banner */}
        <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#DFB76C] text-[11px] font-bold uppercase tracking-wider">
                {mode === 'practice' ? '⚡ Instant Feedback Mode' : mode === 'exam' ? '⏱️ Timed Simulation' : '🗂️ Study Flashcards'}
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-[#F3F4F6] tracking-tight mt-1">
              {examTitle}
            </h2>
          </div>

          {/* Quick Progress Badges & Count Selector */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
            {/* Quick 5, 10, 20, All pills */}
            <div className="flex items-center rounded-lg bg-[#12141A] border border-[#1F2430] p-0.5">
              {[5, 10, 20, 'all' as const].map((c) => {
                const isActive = selectedCountSetting === c;
                const label = c === 'all' ? `All (${allQuestionsPool.length})` : `${c} Qs`;
                return (
                  <button
                    key={String(c)}
                    id={`quick-count-${c}`}
                    onClick={() => handleStartSession(c, mode, false)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#C5A059] text-[#0A0B0E] shadow-xs'
                        : 'text-[#9CA3AF] hover:text-[#DFB76C] hover:bg-[#181B23]'
                    }`}
                    title={`Practice ${c === 'all' ? allQuestionsPool.length : c} questions`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <span className="hidden sm:inline px-3 py-1.5 rounded-lg bg-[#12141A] border border-[#1F2430] text-[#9CA3AF] shadow-xs">
              Answered: <strong className="text-[#DFB76C] font-semibold">{answeredCount}</strong> / {questions.length}
            </span>

            <button
              id="banner-remix-btn"
              onClick={handleRemixQuestions}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#12141A] border border-[#1F2430] hover:border-[#C5A059]/50 text-[#D1D5DB] hover:text-[#DFB76C] hover:bg-[#181B23] transition cursor-pointer shadow-xs"
              title="Shuffle all questions into random order"
            >
              <Shuffle className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="font-semibold hidden sm:inline">Remix</span>
            </button>
          </div>
        </div>

        {/* View Switcher: Exam Score Report vs Flashcards vs Question Card */}
        {isExamSubmitted ? (
          <ExamScoreReport
            questions={questions}
            selectedAnswers={selectedAnswers}
            flaggedQuestions={flaggedQuestions}
            onReviewQuestion={handleReviewFromReport}
            onRetakeExam={handleRetakeFullExam}
            onRetakeMissed={handleRetakeMissed}
            timeSpentSeconds={Math.max(1, Math.round((Date.now() - examStartTime) / 1000))}
          />
        ) : mode === 'flashcard' ? (
          <FlashcardView
            question={currentQuestion}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            textScale={textScale}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        ) : (
          <QuestionCard
            question={currentQuestion}
            currentIndex={currentIndex}
            totalQuestions={questions.length}
            selectedAnswers={currentSelected}
            isChecked={currentIsChecked}
            isFlagged={currentIsFlagged}
            mode={mode}
            textScale={textScale}
            onSelectOption={handleSelectOption}
            onCheckAnswer={handleCheckAnswer}
            onResetQuestion={handleResetCurrentQuestion}
            onToggleFlag={handleToggleFlag}
          />
        )}

      </main>

      {/* Mobile & Desktop Bottom Navigation Bar */}
      {!isExamSubmitted && mode !== 'flashcard' && (
        <MobileBottomBar
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          mode={mode}
          isChecked={currentIsChecked}
          hasSelected={currentSelected.length > 0}
          onPrev={handlePrev}
          onNext={handleNext}
          onCheckAnswer={handleCheckAnswer}
          onSubmitExam={handleSubmitExam}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          isExamSubmitted={isExamSubmitted}
        />
      )}

      {/* Question Navigator Matrix Drawer (Mobile bottom sheet / Desktop sidebar) */}
      <QuestionDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        questions={questions}
        currentIndex={currentIndex}
        onSelectIndex={(idx) => setCurrentIndex(idx)}
        selectedAnswers={selectedAnswers}
        checkedQuestions={checkedQuestions}
        flaggedQuestions={flaggedQuestions}
        mode={mode}
        onSubmitExam={handleSubmitExam}
        isExamSubmitted={isExamSubmitted}
        onRemixQuestions={handleRemixQuestions}
      />

      {/* Start Quiz / Question Count Setup Modal */}
      <StartQuizModal
        isOpen={isStartSetupOpen}
        onClose={() => setIsStartSetupOpen(false)}
        totalAvailable={allQuestionsPool.length}
        selectedCount={selectedCountSetting}
        onSelectCount={setSelectedCountSetting}
        mode={mode}
        onSelectMode={setMode}
        onStart={handleStartSession}
      />

      {/* JSON File Loader & Importer Modal */}
      <JsonImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onLoadQuestions={handleLoadQuestions}
        currentCount={questions.length}
      />

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#161922] border border-[#C5A059]/40 text-[#F3F4F6] text-xs sm:text-sm font-medium shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Shuffle className="w-4 h-4 text-[#C5A059] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
