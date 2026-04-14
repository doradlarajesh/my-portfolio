

## Plan: Unique Color Gradients for Each Certification

Currently, multiple certifications share the same gradient (e.g., `from-amber-500 via-orange-500 to-red-500` is repeated). I'll assign a distinct gradient to each certification card.

### Changes

**File: `src/components/AchievementsCertifications.tsx`**

Update the `gradient` field for each certification:

| Certification | New Gradient |
|---|---|
| Claude Code 101 | `from-orange-500 via-amber-500 to-yellow-500` |
| Backbase QA Certified | `from-sky-500 via-blue-500 to-indigo-500` |
| Claude 101 | `from-violet-500 via-purple-500 to-fuchsia-500` (keep) |
| AI Evaluations | `from-emerald-500 via-green-500 to-teal-500` |
| Prompt Engineering | `from-rose-500 via-pink-500 to-fuchsia-500` |
| ISTQB CTFL | `from-blue-500 via-cyan-500 to-teal-500` (keep) |
| CFA Foundations | `from-amber-500 via-orange-500 to-red-500` (keep) |
| Postman API Tester | `from-orange-500 via-rose-500 to-pink-500` (keep) |

This ensures all 8 cards have visually distinct color schemes while keeping the ones that already look good.

