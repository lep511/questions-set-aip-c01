import json
import random
import re
import sys


def parse_questions(filepath: str) -> list[dict]:
    with open(filepath, "r") as f:
        content = f.read()

    match = re.search(r"QUESTIONS:\s*RawQuestion\[\]\s*=\s*(\[.*\]);", content, re.DOTALL)
    if not match:
        match = re.search(r"=\s*(\[[\s\S]*\]);\s*$", content, re.MULTILINE)
    if not match:
        raise ValueError("Could not find questions array in file")

    json_block = match.group(1)
    json_block = re.sub(r",(\s*[}\]])", r"\1", json_block)

    return json.loads(json_block)


def check_question(q: dict, idx: int, randomize: bool = True) -> dict:
    options = q["options"]
    correct = q["correct_answer"]
    if isinstance(correct, str):
        correct = [correct]

    option_ids = [o["id"] for o in options]

    if randomize:
        selected = random.sample(option_ids, len(correct))
    else:
        selected = correct

    is_correct = sorted(selected) == sorted(correct)

    return {
        "question_num": idx + 1,
        "total_options": len(options),
        "correct_answer": correct,
        "selected": selected,
        "is_correct": is_correct,
        "multi_select": len(correct) > 1,
    }


def main():
    filepath = "src/data/sets/set-p03.ts"
    if len(sys.argv) > 1:
        filepath = sys.argv[1]

    questions = parse_questions(filepath)
    print(f"Loaded {len(questions)} questions from {filepath}\n")

    total = len(questions)
    correct_count = 0
    results = []

    for i, q in enumerate(questions):
        result = check_question(q, i, randomize=True)
        results.append(result)
        if result["is_correct"]:
            correct_count += 1

    print("=" * 60)
    print("RANDOM ANSWER SELECTION RESULTS")
    print("=" * 60)

    for r in results:
        status = "CORRECT" if r["is_correct"] else "WRONG"
        multi = " (multi-select)" if r["multi_select"] else ""
        print(
            f"  Q{r['question_num']:2d}: Selected {r['selected']}, "
            f"Correct {r['correct_answer']} -> {status}{multi}"
        )

    print(f"\nScore: {correct_count}/{total} ({correct_count/total*100:.1f}%)")

    print("\n" + "=" * 60)
    print("ANSWER KEY VERIFICATION")
    print("=" * 60)

    all_valid = True
    for i, q in enumerate(questions):
        correct = q["correct_answer"]
        if isinstance(correct, str):
            correct = [correct]
        option_ids = [o["id"] for o in q["options"]]

        for c in correct:
            if c not in option_ids:
                print(f"  ERROR Q{i+1}: correct answer '{c}' not in options {option_ids}")
                all_valid = False

        if len(correct) > 1 and len(q["options"]) < 5:
            print(
                f"  WARNING Q{i+1}: multi-select question has only "
                f"{len(q['options'])} options (expected 5+)"
            )

    if all_valid:
        print("  All correct answers reference valid option IDs.")

    print("\n" + "=" * 60)
    print("QUESTION SUMMARY")
    print("=" * 60)

    single = sum(1 for q in questions if isinstance(q["correct_answer"], str))
    multi = total - single
    print(f"  Total questions:       {total}")
    print(f"  Single-select:         {single}")
    print(f"  Multi-select:          {multi}")

    answer_dist = {}
    for q in questions:
        ca = q["correct_answer"]
        if isinstance(ca, str):
            ca = [ca]
        for a in ca:
            answer_dist[a] = answer_dist.get(a, 0) + 1

    print(f"\n  Correct answer distribution:")
    for k in sorted(answer_dist):
        print(f"    {k}: {answer_dist[k]}")


if __name__ == "__main__":
    main()
