---
name: saif-jury-readiness
description: Red-teams a SAIF project from a skeptical judge perspective, identifies unsupported claims and scientific weaknesses, and turns them into evidence-building tasks and concise answers.
---

# SAIF Jury Readiness

## Goal
Prepare the contestant to defend the project without exaggeration.

## When to use
Use after the project has at least:
- a precise problem;
- a defined gap;
- a methodology;
- some implementation/evidence;
or when the user explicitly requests judge questions.

## Sources
Use the expert guidance in `../references/judge_video_notes.md` as a communication lens, not as an official rubric.

## Red-team questions
Attack the project using questions such as:
- What exact problem are you solving?
- What already exists?
- What is the unresolved gap?
- What is genuinely new here?
- Why is AI / IoT / robotics needed rather than a simpler method?
- What did your team actually build?
- What evidence proves the central claim?
- What is the baseline?
- What failed during testing?
- How do you know the result is not due to a weak comparison?
- Can another person reproduce the method?
- What is the current readiness level in plain language?
- What is not yet validated?
- What would you test next and why?

## Claim-evidence audit
For every important claim, classify:
- PROVEN — supported by current evidence.
- PARTIALLY PROVEN — some evidence, but limited.
- PLANNED — not yet tested.
- UNSUPPORTED — remove or rephrase.

## Answer format
For each likely judge question provide:
- `Judge concern`
- `Weak answer to avoid`
- `Strong answer`
- `Evidence to show`

Strong answers must be short, specific, and evidence-linked.

## No bluffing rule
If the evidence is missing, the winning answer is an honest boundary plus the next validation step. Never fabricate performance, deployment, patents, market adoption, or user testing.

## Final readiness output
Return:
1. Top 5 likely judge attacks.
2. Top 5 unsupported / vulnerable claims.
3. Top 3 pieces of evidence to build next.
4. One 30-second defense of the project's innovation.
