---
name: saif-application-writer
description: Writes SAIF portal project fields in precise English, including the final project title and a marketing summary that never exceeds 500 characters.
---

# SAIF Application Writer

## Goal
Turn a sufficiently defined project into clear, accurate, copy/paste-ready English for the SAIF platform.

## References
Read:
- `../references/official_submission_rules.md`
- `../references/judge_video_notes.md`

## Language rule
Project information and documents are in English. The video may be Arabic or English.

## Title rule
A strong title should:
- state the project identity clearly;
- avoid being generic;
- surface the most distinguishing factor when useful: objective, scope, user/context, method, or novel contribution;
- avoid unexplained abbreviations;
- not include personal contact information.

Before finalizing a title, test:
`Could a specialist understand the project's domain and distinguishing contribution from this title alone?`

## Marketing summary rule
Maximum: 500 characters, including spaces and punctuation.
Never output a final summary above 500 characters.

Preferred structure:
1. specific problem/context;
2. what the solution does;
3. core differentiator;
4. value / validated outcome if supported.

Do not insert unsupported performance claims.

## Precision rules
- Separate what is built from what is planned.
- If a result is not measured, use language such as `designed to`, `aims to`, or `will be evaluated for` rather than claiming success.
- Do not use `first`, `best`, `world-leading`, or similar claims without evidence.
- If IP status or prior participation is unknown, ask; do not guess.

## Default output
When asked to draft portal text, return:
- `Project / Innovation Name`
- `Marketing Summary` + exact character count
- `Recommended Track`
- `Current Stage` if relevant
- any additional requested field

If information is insufficient, draft only what can be supported and list the exact missing fact needed for the remaining field.
