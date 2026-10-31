# Exam Simulator

A responsive exam simulator and question practice app for the **AWS Certified AI Professional (AIP-C01)** certification. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **Practice Mode** — Answer questions one at a time with instant feedback and detailed explanations
- **Exam Mode** — Timed exam simulation with a score report at the end (2 minutes per question)
- **Flashcard Mode** — Review questions in a flashcard-style format
- **Multiple Question Sets** — Switch between different question sets from the navbar
- **JSON Import** — Load your own question sets from a JSON file
- **Dark/Light Theme** — Persisted theme preference with system default detection
- **Mobile Responsive** — Full mobile support with a bottom navigation bar
- **Question Drawer** — Navigate questions, flag items for review, and track progress
- **Sound Effects & Confetti** — Audio feedback and celebration animations on correct answers
- **Gemini AI Integration** — Optional AI-powered features via the Gemini API

## Question Sets

| Set | Description | Questions |
|-----|-------------|-----------|
| Set-001 | AWS Certified Generative AI - Part 1 | 31 |
| Set-002 | AWS Certified Generative AI - Part 2 | 30 |
| Set-P01 | Practice Set 1 | 20 |
| Set-P02 | Practice Set 2 | 20 |
| Set-P03 | AWS Certified AI Professional - Practice Set 3 | 22 |
| Set-P04 | AWS Certified AI Professional - Practice Set 4 | 20 |
| Set-P05 | AWS Certified AI Professional - Agentic AI Lens | 20 |
| Flash Cards | AI Professional - Quick Recall Flash Cards | 30 |

**Total: 193 questions across 8 sets**

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+) or [Bun](https://bun.sh/)

### Installation

```bash
# Clone the repository
git clone https://github.com/lep511/questions-set-aip-c01.git
cd questions-set-aip-c01

# Install dependencies
npm install
# or
bun install
```

### Environment Variables

Copy the example env file and add your keys:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | API key for Gemini AI features (optional) |
| `APP_URL` | URL where the app is hosted |

### Development

```bash
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:3000`.

### Build

```bash
npm run build
npm run preview
```

## Adding New Question Sets

1. Create a new file in `src/data/sets/` (e.g., `set-003.ts`):

```typescript
import { RawQuestion } from '../../types';

export const SET_003_QUESTIONS: RawQuestion[] = [
  {
    question: "Your question text here",
    options: [
      { id: "A", text: "Option A" },
      { id: "B", text: "Option B" },
      { id: "C", text: "Option C" },
      { id: "D", text: "Option D" }
    ],
    correct_answer: "A",
    explanation: "Explanation of the correct answer."
  }
];
```

2. Register the set in `src/data/questionSets.ts`:

```typescript
import { SET_003_QUESTIONS } from './sets/set-003';

// Add to the QUESTION_SETS array
{
  id: 'set-003',
  name: 'Set-003',
  description: 'AWS Certified Generative AI - Part 3',
  questionCount: 30,
  questions: SET_003_QUESTIONS
}
```

## JSON Import Format

You can also import questions at runtime using the JSON import feature. The expected format:

```json
[
  {
    "question": "What is Amazon Bedrock?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct_answer": "A",
    "explanation": "Amazon Bedrock is..."
  }
]
```

## Tech Stack

- **React 19** — UI framework
- **TypeScript** — Type safety
- **Vite** — Build tool and dev server
- **Tailwind CSS 4** — Styling
- **Lucide React** — Icons
- **Motion** — Animations
- **Canvas Confetti** — Celebration effects

## License

Apache-2.0
