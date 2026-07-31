# Clutch Command — Project Handover Summary

Prepared as a migration document so a new Claude account/project can pick up this work with full context. Paste this file into the new project's knowledge base, alongside the actual files listed at the end (which must be downloaded from the old account and re-uploaded manually).

## What This Project Is

Clutch Command is an AI-powered tennis pressure-performance platform, merging Mark Jeffery's TRUST methodology and Clutch Quotient (CQ) model with an AI engineering stack (computer vision, scoring, coaching intelligence, voice delivery). Aakash is the tech co-founder, sole point of contact between the dev team and Mark.

## Key People

- **Mark Jeffery** — Founder. Owns TRUST framework, CQ model, testimonials, coach network, offer/PDF/VSL/autoresponder.
- **Aakash (the user)** — Tech co-founder. Owns website, AI engine, contract with the dev team, website copy.
- **Prernaa** — Co-founder; owns the CQ Diagnostic landing page.
- **Vlado Platenik** — Grand Slam singles coach; singles academy is the main paid offer (Dan's doubles academy to follow later).
- **Dan Kiernan** — Grand Slam doubles coach.
- **Harshit Latiyan** — The Developer. Individual freelancer, Budina Kalan, Muzaffarnagar, Uttar Pradesh, India, trading as **Studio Dezinn**. Signed the contract; bank details on file (HDFC Bank) for milestone payments.
- **Executing company (Client, on the contract)**: Gladiator Tennis and Training Limited, Flat 2, 7 Grange Rd, Camberley, Surrey, GU15 2DH, company no. 08708291.

## Offer Structure (current)

- **$197/month** primary offer — Vlado's CLUTCH singles academy, cancel anytime, no lock-in.
- **$97/month** down-sell "sprinter" option.
- **$67 waitlist** — standalone price for non-members; **free** as a bonus bundled inside the $197 plan, alongside a $397 course and Grand Slam coach access.
- Founding-member 60% discount idea still exists conceptually but is **not yet reconciled** with the $67/bonus-stack structure.

## Website — Current State and Direction

**Scope changed significantly since the original plan.** It is no longer an email/capture funnel, it's a lean, four-page **branding and communications site**. Full detail lives in the separate file `Clutch_Command_Website_Approach.md` (see file inventory); summary below.

- **Purpose now**: tell the story, then hand off.
- **The funnel**: Website → CQ Diagnostic → VSL → Clutch Command AI. **However, final conversion strategy is DEFERRED until after the professor meeting (2nd/3rd August).**
- **Single CTA Strategy Shift**: Agreed in principle to sell beta waitlist access (£59-£69) as the primary CTA. The Diagnostic can be mentioned, but NOT as a co-equal sell, to avoid confusing users. Final structure deferred.
- **Copy Ownership**: Prernaa (Marketing) owns the final copy. Aakash to coordinate with her directly and CC her on all future website updates.
- **Diagnostic Coordination**: Diagnostic / Score App coordination to go directly through Prernaa, not via Dan.
- **Confirmed signature feature**: Splash screen ("Enter the Arena" + heartbeat animation) confirmed as intentional during live review.
- **Unresolved**: a separate "Courtix" Project Brief (Bento grid, Web Audio API amplitude analysis, editorial collage) describes a far more elaborate build than what's actually agreed and scoped/fee'd for — not yet reconciled with Mark.
- Built so the codebase can merge with the beta platform in a couple of months — not a rebuild later, just sensible structure now.
- **Priority**: Prepare tech stack PDF for Professor Meeting (2nd/3rd August). Send combined PDF to Dan before meeting.

## The Contract (Website Development Services Agreement)

- Structure: 3-page lean version, on Clutch Command letterhead, Poppins font, left-aligned, no em dashes. Now at **v10** after many rounds of edits — treat v10 as the only live copy.
- **Both parties are filled in and signed on the Developer side.** Client: Gladiator Tennis and Training Limited (details above). Developer: **Harshit Latiyan**, Budina Kalan, Muzaffarnagar, Uttar Pradesh, India (individual freelancer, no company number — none applicable), signature image embedded, dated 21 July 2026.
- **All five of the lawyer's original points are addressed**: a mutual liability cap, a Client warranty on supplied content, convenience termination extended from 7 to 14 days, a DPA/Article 28 commitment (clause 4.4), and a good-faith-negotiation-before-litigation line (clause 8.2).
- **Scope clauses expanded**: clause 1.2 rewritten as a branding/communications site (see Website section above); new clauses **1.4 (Build Scope)** and **1.5 (Integration Scope)** added, naming the heartbeat/pulse feature explicitly and separating "build the site" from "integrate with Score App/Kit"; new clause **4.5** clarifies personal data flows through Score App/Kit, not the site itself.
- **VAT**: clause 2.4 no longer mentions VAT at all (removed entirely, not just resolved) — Harshit is a non-VAT-registered individual freelancer in India, so it never applied; UK reverse-charge obligations, if any, sit with Gladiator, not the contract.
- **Schedule now has five milestones** (a "Diagnostic integration" milestone was added, split out from the original Build milestone): Mobilisation & set-up (22 Jul, £350, on signing) → Design & structure (24 Jul, £200) → Build (25 Jul, £150, includes the heartbeat/pulse feature) → Diagnostic integration (29 Jul, £100, Score App/Kit wiring) → Delivery & launch (30 Jul, £150, within 14 days of completion). **Total: £950**, fully resolved.
- **Only two placeholders remain** (shown orange in the docx): clause 2.3's payment window (`[14]` days) and clause 5.1's warranty notice window (`[30]` days) — both still need Aakash/Mark to confirm a number.
- **Invoice pending**: Harshit (Studio Dezinn) owes Gladiator a £350 invoice for Milestone 1; bank details already shared with Mark (HDFC Bank, India) but the actual invoice document hasn't been sent yet.
- Status: contract has been through several rounds with Mark directly (not just his lawyer) — VAT wording removed, heartbeat/pulse named explicitly, milestone order and numbers corrected against Mark's own manual edits. Very close to fully signable once the two remaining placeholders are confirmed.

## Mark's "Evan" Proof-of-Concept Deck

Mark built (with Claude, ~30 min) an 8-slide narrative deck walking through a fictional user "Evan" using the full CLUTCH loop end to end: onboarding/diagnostic → 3-axis "Memory Surface" model → pre-match focus cue → real-time in-match intervention → post-match SwingVision ingestion and model update → weekly loop → "hard to beat" close.

This triggered a real strategic discussion: Mark's challenge was "everything is already proven separately (TRUST, coaches, Aakash, AI) — why build anything? What's the cheapest/quickest prototype or deck?" Resolved position: the ingredients are proven individually, but the *packaged system converting to paying members* is not yet proven — that's a packaging/demand question, solvable with a slide deck or clickable mockup (no engineering), not a reason to build the real AI engine early. The real 4-layer AI engine stays the long-term moat/licensing play, held back until demand is proven. This does **not** change the website plan — website still ships as planned; the mockup is a separate, parallel proof piece for the VSL/investors.

## Mark's Other Live Threads

- **AI lead-generation agent ask**: Mark wants a 24/7 AI agent for lead-gen, split into (1) individual players and (2) bulk channels — influencers/affiliates/promo partners, and coaches/coach-education bodies (International Coaches Association, ~30,000-coach network). Still **not scoped or committed to**.
- **Aakash's own role**: Mark asked whether Aakash wants to be more involved in marketing/AI agents/revenue share. Aakash's stance: open to it, but needs concrete detail (scope, revenue split, fit alongside existing tech scope) before committing.
- **David (Investor) Update**: David is investing personally (can likely raise £100k, strong Dubai government/royal network connections). Interested in edutech/AI as a separate business. Pondering if online business and AI should be one entity or two. Dan to send David the website and diagnostic front-end early next week. Next touchpoint with David: week of 10th/11th August.
- **Pricing Benchmark**: Aakash to research Swing Vision pricing (£14-£25/month). Clutch likely positioned at £25-£30/month.
- **Health note**: Mark mentioned earlier in the project that he had a scare resembling a second stroke (he is a stroke survivor); it passed and he said he was okay. Worth keeping in mind as context, not something to reference unprompted.

## The Progress Tracker (separate file)

A 6-tab Excel workbook was built to track the project going forward: **Overview, Building Now, To Figure Out, Next to Build, Content/Direction/AI Metrics, Timeline & Milestones.** It was built from the last three meetings plus the joint session with Prernaa on the website and model, and is meant to be shared with Mark as a living reference document (status dropdowns, colour coding, auto-updating snapshot counts). See file inventory below — re-upload this and update it going forward rather than rebuilding it.

## Formatting/Style Preferences to Carry Over

- UK English, no em dashes, no emojis unless the person uses one first, lead with the answer (no preamble).
- Plain, direct writing; short words over long; prose by default, minimal headers.
- For this project specifically: Poppins font, left-aligned, on Clutch Command's letterhead (a full-page branded background image with a top-left logo and bottom-right red/black corner graphic — text must stay clear of both).
- Contracts: keep lean (this one was deliberately cut from 7 pages to 3 on request), point-by-point replies preferred over long documents.

## Open Action Items (as of this update)

1. Confirm the two remaining contract placeholders: the payment window in clause 2.3 and the warranty notice window in clause 5.1.
2. Send Harshit's (Studio Dezinn) £350 invoice for Milestone 1 to Gladiator.
3. Send Mark the VSL and landing page so he can cross-check the khaki branding and log them in his tracker.
4. Chase Mark for the ball-clustering examples he owes from your last call, and confirm nothing else from that call is outstanding.
5. Reconcile the "Courtix" Project Brief against the actual agreed website scope and fee before design locks in.
6. Resolve which offer mechanic leads — the 60% founding-member discount vs. the $67 waitlist/bonus-stack (unresolved since early on, hasn't resurfaced recently).
7. Decide exactly when/how the website gets introduced to people, given most traffic now goes straight to the diagnostic (Mark's own words: "that I haven't worked out yet").
8. Confirm the final four-page list with Mark, and whether "The Offer" needs its own page.
9. Scope (or decline) the AI lead-generation agent, and Aakash's broader marketing/revenue-share role.
10. Launch the marketing website by end of July 2026.
11. Keep the tracker spreadsheet updated as the single source of truth.

## File Inventory (download from old account, re-upload to new project)

| File | What it is |
|---|---|
| `Clutch Command - Project Memory.md` | Original project brief uploaded at the start — full background on people, IP, pricing history, timeline, website brief structure (largely superseded on website scope, see below). |
| `Clutch_contract.docx` | The Clutch Command letterhead template (logo + corner graphic), used as the branded background for the contract. |
| `Clutch_check.pdf` | Mark's 8-slide "Evan" proof-of-concept narrative deck. |
| `Clutch_Command_Website_Agreement_3page_v10.docx` / `.pdf` | **Current, live version of the contract.** Both parties filled in, Harshit's signature embedded, five milestones with dates/fees resolved (Total £950), all five lawyer points addressed, VAT wording removed entirely, heartbeat/pulse named explicitly. Only two placeholders remain: clause 2.3's `[14]` days and clause 5.1's `[30]` days. |
| `Clutch_Command_Tracker.xlsx` | 6-tab build and progress tracker, to be shared with Mark and kept updated. |
| `Clutch_Command_Website_Approach.md` | Detailed synthesis of the website's current scope, the confirmed four-stage funnel, traffic strategy, branding cross-check status, and open items — the fuller version of the Website section above. |
