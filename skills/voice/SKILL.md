---
name: voice
description: >
  Full VOICE pass (Verified, Owned, Insightful, Clear, Engaging, after Sandeep Swadia) for
  high-stakes prose: LinkedIn posts, proposals, sales copy, and emails or reports going to a
  client or prospect. Traces every claim to a source, pulls in the author's own material (notes,
  knowledge base, brand files, memory, git), tests for a real take, and can interview the author
  one question at a time. Everyday writing is covered by the substance checks in writing-style;
  use this skill for the pieces where being specific and useful to the reader matters most.
  Triggers on "/voice", "voice pass", "make this sound like me", or drafting a post, proposal or
  client-facing piece.
user-invocable: true
---

# Voice

Adapted from Sandeep Swadia's VOICE method ("Everyone Can Spot AI Writing, Here's How To Fix It",
YouTube). His point is that AI gives you an accent, and these five checks give your voice back.
writing-style fixes the words. This skill fixes what the words say.

"The author" below means the person you're writing for or as: the user in this session.

## Your sources (edit this block once)

The O check searches these, in order. Replace the examples with your own and delete what you
don't have; a missing source is skipped, never an error.

- Knowledge base: `<your notes/wiki search, e.g. an Obsidian vault path, a Notion or Drive MCP, or a CLI>`
- Brand files: `personal-brand/`, `content/week-log.md`, proof or case-study files in the workspace
- Memory: Claude Code auto-memory for this project
- Work history: git log of the repos the piece is about

## Pick the mode

Default is all five. Internal docs (PR bodies, handoffs, READMEs, decision records) don't need
this skill; writing-style's substance checks cover them. Run V + C only if the author asks for a
quick pass on one of those.

## V: Verified (is it real?)

Before delivering, list every factual claim in the draft: numbers, dates, names, quotes, prices,
and any "works / passes / shipped / fixed" statement.

Each claim has to trace to something you actually saw this session: a file, command output, a
URL, a knowledge-base page, or the author's own words. For each one:
- It traces: keep it.
- It doesn't trace but can be checked cheaply: check it now.
- It can't be checked: cut it, or mark it plainly unverified in the note to the author.

Never invent statistics, client names, quotes, testimonials, case results or dates. If a number
would make the piece stronger and you don't have one, leave an `[AUTHOR: number?]` slot. For
high-stakes pieces (money, a client commitment, a public claim), have a fresh agent check the
claim list against the sources. Its job is to find the one you got wrong.

## O: Owned (is the author in it?)

Generic is the default failure. Before drafting, look for the author's own material, in this
order:
1. What they said in this conversation.
2. The sources listed under "Your sources" above.

Use real specifics from those sources: what happened, what it cost, what they got wrong, and who
it was for. Anonymize clients in anything public, and never carry one client's details into a
piece for another client.

If the piece needs a personal detail and you have none, draft around a visible
`[AUTHOR: the time this happened to a client]` slot and offer, in one line, to ask for it.
Never make up an anecdote to fill it. Interview first (one question at a time, push back on
vague answers, stop at five specifics) only for posts, or when the author asks for it.

Swap test: put a competitor's name where the author's is. If it still reads as true, it isn't
owned.

## I: Insightful (so what?)

Fill in this sentence before writing: "Most people think ___. The author thinks ___, because ___."
It's a thinking step. Never put that shape in the draft; writing-style bans it as a Binary Split.
- If you can't fill the middle blank from the author's material, there is no take. For a post,
  say so and stop: no take, no post. For a doc, fall back to the decision.
- Then argue against the take once, as a sharp skeptic would. If it survives, keep it. If
  nobody would disagree with it ("failure teaches lessons"), it's a platitude, so cut it or dig
  further.

In technical writing the insight is the decision and why it was made, plus the gotcha the next
person would hit. "Updated the config" has no insight. "Pinned node via nvm because launchd
doesn't read your shell PATH" does.

Watch for lines shaped like wisdom that fall apart when you ask what they mean. If you can't
say what a line means in plain words, delete it.

## C: Clear (will they get it?)

1. Restate the whole piece in two plain sentences, as if to a bright 12-year-old. If the
   restatement doesn't match what you meant to say, the draft is unclear. Rewrite it, don't
   polish it.
2. Read it as the named reader (a client owner, a contractor on day one, the author in three
   months). Mark every sentence where they'd have to guess what you mean, and fix each one.
3. Write it the way you'd say it across a table. Turn abstractions into the plain thing:
   "strategic development of capabilities aligned with emerging opportunities" becomes "learn
   what people will pay for."
4. Run writing-style's self-check, if that skill is installed.

## E: Engaging (is the next line needed?)

This check is mostly taste, and taste is the author's. Do the mechanical part:
- **Cut test:** take each sentence out in turn. If nothing is lost, leave it out.
- Open on the stakes or the news, not the setup.
- Put the strongest point where it lands hardest. That's often last, not first.
- For public posts, offer at most one alternative opening line. Don't offer a menu.

## Delivering

Deliver the piece clean. Only if something needs the author's attention, add a short note after
it (never inside client-facing text):

```
Voice notes: 2 unverified claims cut (pricing, launch date) · 1 [AUTHOR] slot to fill · take: <one line>
```

No note when there's nothing to flag. Don't report that the checks ran; the writing shows it.
