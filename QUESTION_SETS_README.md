# Question Sets System

This application now supports multiple question sets that can be selected from the navigation bar.

## Current Sets

- **Set-001**: AWS Certified Generative AI - Part 1 (31 questions)
- **Set-002**: AWS Certified Generative AI - Part 2 (30 questions)
- **Set-P01**: AWS Certified Generative AI - Practice Set (20 questions)

**Total: 81 questions across 3 sets**

## File Structure

```
src/
├── data/
│   ├── questionSets.ts          # Main index of all available sets
│   ├── defaultExam.ts           # Original file with normalizeQuestions function
│   └── sets/
│       ├── set-001.ts           # Questions 1-31
│       └── set-002.ts           # Questions 32-61
```

## How to Add New Sets

1. Create a new file in `src/data/sets/` (e.g., `set-003.ts`)
2. Export your questions with the format:

```typescript
import { RawQuestion } from '../../types';

export const SET_003_QUESTIONS: RawQuestion[] = [
  // Your questions here
];
```

3. Update `src/data/questionSets.ts` to include your new set:

```typescript
import { SET_003_QUESTIONS } from './sets/set-003';

export const QUESTION_SETS: QuestionSet[] = [
  // ... existing sets
  {
    id: 'set-003',
    name: 'Set-003',
    description: 'AWS Certified Generative AI - Part 3',
    questionCount: 30,
    questions: SET_003_QUESTIONS
  }
];
```

## Features

- **Set Selector**: Dropdown in the navbar to switch between question sets
- **Auto-Reset**: Switching sets automatically resets progress and timer
- **Toast Notification**: Shows feedback when switching sets
- **Persistent State**: Each set maintains its own question pool for the session

## User Experience

When a user selects a different set:
1. All progress is reset (answers, flags, checked status)
2. Question index returns to 0
3. Timer is reset based on the new set size
4. A toast message confirms the set change
5. The exam title updates to reflect the new set

## Technical Implementation

The system uses:
- `QuestionSet` interface to define set metadata
- `QUESTION_SETS` array as the source of truth
- `currentSetId` state to track the active set
- `handleSelectSet` function to manage set transitions
- Normalized questions for consistency across the app
