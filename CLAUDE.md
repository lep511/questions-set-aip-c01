# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Exam simulator for the **AWS Certified AI Professional (AIP-C01)** exam. React/TypeScript SPA with practice, timed exam, and flashcard modes. This is NOT an AI Practitioner exam — it targets the Professional level.

## Commands

```bash
npm run dev        # Dev server at http://localhost:3000
npm run build      # Production build to dist/
npm run lint       # TypeScript type-check (tsc --noEmit)
npm run preview    # Preview production build
```

Note: `npm run lint` will show many errors from `src/App.tsx` and components (implicit `any` types, missing module declarations). These are pre-existing and not blocking — the app builds and runs via Vite regardless. When adding new files, check only for errors in your files: `npx --package typescript tsc --noEmit 2>&1 | grep your-file`.

## Architecture

**Single-page React app** (`src/App.tsx` is the root) — all state lives in App via `useState`. No router, no state management library.

### Data flow for questions

1. **Raw questions** are defined in `src/data/sets/set-*.ts` as `RawQuestion[]` arrays
2. **Registry** in `src/data/questionSets.ts` imports each set and exports `QUESTION_SETS` array with metadata (id, name, description, questionCount)
3. **Normalization** via `normalizeQuestions()` in `src/data/defaultExam.ts` converts `RawQuestion` → `NormalizedQuestion` (standardizes option formats, extracts multi-select info)
4. **App.tsx** consumes normalized questions and manages all UI state

### Question format

Questions support two option styles (both are valid `RawQuestion`):
- **Rich options**: `{ id: "A", text: "...", explanation: "...", references: [...] }`
- **Simple strings**: `["Option A", "Option B", ...]` (auto-assigned A/B/C/D ids)

Multi-select questions use `correct_answer: ["A", "C"]` (array). Single-select uses `correct_answer: "A"` (string).

### Adding a new question set

1. Create `src/data/sets/set-XXX.ts` exporting a `RawQuestion[]` array
2. Import and register in `src/data/questionSets.ts` — add to `QUESTION_SETS` array with accurate `questionCount`
3. Validate with: `python3 check_answers.py src/data/sets/set-XXX.ts`

### Key types (`src/types.ts`)

- `RawQuestion` — input format with flexible options (string or object)
- `NormalizedQuestion` — processed format with `correctAnswers: string[]`, `isMultipleChoice`, `requiredSelectCount`
- `QuestionOption` — `{ id, text, explanation?, references? }`

### Creating questions using AWS MCP documentation

When generating new question sets, use `mcp__aws-mcp__aws___search_documentation` and `mcp__aws-mcp__aws___read_documentation` to source accurate AWS documentation. Each question option should include an `explanation` and `references` array with `{ title, url }` pointing to real AWS documentation URLs. Run the Python checker after creating each set.

## Validation tool

`check_answers.py` parses TypeScript question files, validates all correct answers reference valid option IDs, and reports question statistics:

```bash
python3 check_answers.py                           # defaults to set-p03.ts
python3 check_answers.py src/data/sets/set-p04.ts  # specific set
```
