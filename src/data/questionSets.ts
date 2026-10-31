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
import { SET_P02_QUESTIONS } from './sets/set-p02';
import { SET_P03_QUESTIONS } from './sets/set-p03';
import { SET_P04_QUESTIONS } from './sets/set-p04';
import { SET_P05_QUESTIONS } from './sets/set-p05';
import { FLASH_CARDS_001 } from './sets/flash-cards-001';
import { FLASH_CARDS_002 } from './sets/flash-cards-002';

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
  },
  {
    id: 'set-p02',
    name: 'Set-P02',
    description: 'AWS Certified Generative AI - Practice Set 2',
    questionCount: 20,
    questions: SET_P02_QUESTIONS
  },
  {
    id: 'set-p03',
    name: 'Set-P03',
    description: 'AWS Certified AI Professional - Practice Set 3',
    questionCount: 22,
    questions: SET_P03_QUESTIONS
  },
  {
    id: 'set-p04',
    name: 'Set-P04',
    description: 'AWS Certified AI Professional - Practice Set 4',
    questionCount: 20,
    questions: SET_P04_QUESTIONS
  },
  {
    id: 'set-p05',
    name: 'Set-P05',
    description: 'AWS Certified AI Professional - Agentic AI Lens',
    questionCount: 20,
    questions: SET_P05_QUESTIONS
  },
  {
    id: 'flash-cards-001',
    name: 'Flash Cards',
    description: 'AI Professional - Quick Recall Flash Cards',
    questionCount: 30,
    questions: FLASH_CARDS_001
  },
  {
    id: 'flash-cards-002',
    name: 'Flash Cards 2',
    description: 'AI Professional - AWS AI Services & ML Concepts',
    questionCount: 30,
    questions: FLASH_CARDS_002
  }
];

// Default set (Set-001)
export const DEFAULT_SET = QUESTION_SETS[0];
