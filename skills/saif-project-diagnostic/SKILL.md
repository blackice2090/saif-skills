---
name: saif-project-diagnostic
description: Evaluates a SAIF project idea for scientific completeness, gap clarity, innovation, methodology, evidence, readiness, and track fit, then gives a prioritized improvement plan.
---

# SAIF Project Diagnostic

## Goal
Determine whether the contestant has:
1. a broad idea,
2. a defined project,
3. a working prototype,
4. a validated competition-ready submission.

Do not confuse "interesting idea" with "complete project".

## References
Use:
- `../references/official_submission_rules.md`
- `../references/judge_video_notes.md`
- `../references/project_readiness_model.md`

## Intake
If missing, ask only the minimum critical questions:
1. What specific problem are you solving, for whom, and where?
2. What already exists, and what exact gap remains?
3. What have you actually built or tested today?
4. What evidence/results do you already have?
5. What is your age category and team size, if track/submission fit is being checked?

Do not ask all five if the answer is already known.

## Project decomposition
Extract the project into:
- Problem
- Target user/context
- Existing solutions
- Unresolved gap
- Core innovation
- Objective(s)
- Methodology
- Prototype / implementation
- Results / evidence
- Baseline / comparison
- Current readiness
- Future work
- Candidate SAIF track

Use UNKNOWN for missing parts.

## Hard questions
A project is not ready until the answers are concrete:
- What fails today?
- Who experiences the failure?
- What do current solutions do?
- Where exactly do they fail?
- What is new in this project beyond using AI / an app / IoT?
- What did the team build themselves?
- How was it tested?
- What number, observation, prototype, or experiment supports the claim?
- What alternative is it compared against?
- What is still not proven?

## Internal scoring
Use the 100-point Project Readiness Score in `project_readiness_model.md`.
Always write:
`Internal advisory score — not an official SAIF judging score.`

For every dimension return GREEN / AMBER / RED and one-sentence justification.

## Track selection
When the user asks for the best track:
- compare only against the official 14-track list in the reference file;
- recommend one primary track and optionally one secondary track;
- explain the mapping through the project's core technical contribution, not buzzwords;
- do not invent track-specific judging criteria.

## Completeness gates
### Gate A — Problem
Pass only if the problem is specific enough to name user + context + failure + consequence.

### Gate B — Gap
Pass only if the contestant can explain existing solutions and one unresolved limitation.

### Gate C — Innovation
Pass only if the novelty can be stated in 1–3 sentences and linked to the gap.

### Gate D — Method
Pass only if the approach can be described as reproducible steps with tools/data.

### Gate E — Evidence
Pass only if the claimed stage is supported by a prototype, experiment, measured result, or clearly labeled pending test.

### Gate F — Competition story
Pass only if the project can form a coherent sequence:
Problem → Existing solutions → Gap → Objective → Method → Results → Innovation → Impact → Next step.

## Action plan
Return at most five priority actions by default.
Each action must include:
- `Action`
- `Why`
- `Artifact/Evidence needed`
- `Done when`

Do not recommend poster polishing before fundamental RED items in Problem, Gap, Method, or Evidence are fixed.
