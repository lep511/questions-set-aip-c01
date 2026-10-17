export interface Reference {
  title: string;
  url: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  explanation?: string;
  references?: Reference[];
}

export interface RawQuestion {
  id?: string | number;
  question: string;
  options: (QuestionOption | string)[];
  correct_answer: string | string[];
  explanation?: string;
  category?: string;
  topic?: string;
}

export interface NormalizedQuestion {
  id: string;
  question: string;
  options: QuestionOption[];
  correctAnswers: string[]; // e.g. ['C', 'E'] or ['A']
  isMultipleChoice: boolean;
  requiredSelectCount: number;
  explanation?: string;
  category?: string;
}

export interface UserExamState {
  currentQuestionIndex: number;
  selectedAnswers: Record<string, string[]>; // questionId -> array of selected option IDs
  checkedQuestions: Record<string, boolean>; // questionId -> whether instant feedback was triggered
  flaggedQuestions: Record<string, boolean>; // questionId -> boolean
  mode: 'practice' | 'exam' | 'flashcard';
  isExamSubmitted: boolean;
  examStartTime: number | null;
  examEndTime: number | null;
  timeRemainingSeconds: number; // For exam mode
  examDurationMinutes: number;
  score: {
    correct: number;
    incorrect: number;
    unanswered: number;
    percentage: number;
    passed: boolean;
  } | null;
}

export type ThemeMode = 'light' | 'dark' | 'system';
export type TextScale = 'sm' | 'base' | 'lg';
