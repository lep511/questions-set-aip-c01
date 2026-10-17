import { RawQuestion } from '../types';

export interface QuestionSet {
  id: string;
  name: string;
  description: string;
  questionCount: number;
  questions: RawQuestion[];
}

// Import question sets
import { SET_001_QUESTIONS } from './sets/set-001';
import { SET_002_QUESTIONS } from './sets/set-002';
import { SET_P01_QUESTIONS } from './sets/set-p01';

export const QUESTION_SETS: QuestionSet[] = [
  {
    id: 'set-001',
    name: 'Set-001',
    description: 'AWS Certified Generative AI - Part 1',
    questionCount: 31,
    questions: SET_001_QUESTIONS
  },
  {
    id: 'set-002',
    name: 'Set-002',
    description: 'AWS Certified Generative AI - Part 2',
    questionCount: 30,
    questions: SET_002_QUESTIONS
  },
  {
    id: 'set-p01',
    name: 'Set-P01',
    description: 'AWS Certified Generative AI - Practice Set',
    questionCount: 20,
    questions: SET_P01_QUESTIONS
  }
];

// Default set (Set-001)
export const DEFAULT_SET = QUESTION_SETS[0];
