---
name: Animal Search
description: A study-friendly animal lookup interface for high school students.
colors:
  bioluminescent-lime: "#7CFF7C"
  nocturne-ink: "#06070B"
  deep-atlas: "#0E1118"
  midnight-slate: "#111827"
  panel-ink: "#0F172A"
  detail-ink: "#101723"
  paper-mist: "#F8FAFC"
  muted-cloud: "#AAB3C5"
  quiet-steel: "#8B95A7"
  ambient-blue: "#4AA3FF"
  hairline-light: "#FFFFFF14"
typography:
  display:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "54px"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "34px"
    fontWeight: 700
    lineHeight: 1.15
  title:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 650
    lineHeight: 1.2
  body:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.06em"
rounded:
  pill: "999px"
  md: "18px"
  lg: "22px"
  xl: "24px"
  shell: "28px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "18px"
  xl: "22px"
  section: "32px"
components:
  search-button:
    backgroundColor: "{colors.panel-ink}"
    textColor: "{colors.bioluminescent-lime}"
    rounded: "{rounded.md}"
    size: "48px"
  search-shell:
    backgroundColor: "{colors.paper-mist}"
    textColor: "{colors.panel-ink}"
    rounded: "{rounded.xl}"
    padding: "18px"
  result-card-featured:
    backgroundColor: "{colors.midnight-slate}"
    textColor: "{colors.paper-mist}"
    rounded: "{rounded.lg}"
    padding: "18px"
  result-card-default:
    backgroundColor: "{colors.panel-ink}"
    textColor: "{colors.paper-mist}"
    rounded: "{rounded.lg}"
    padding: "18px"
  detail-card:
    backgroundColor: "{colors.detail-ink}"
    textColor: "{colors.paper-mist}"
    rounded: "{rounded.xl}"
    padding: "22px"
  status-pill:
    backgroundColor: "{colors.panel-ink}"
    textColor: "{colors.paper-mist}"
    rounded: "{rounded.pill}"
    padding: "10px 14px"
---

# Design System: Animal Search

## Overview

**Creative North Star: "Quiet Atlas"**

This system frames animal search as guided discovery after dark: focused enough for homework, alive enough to reward curiosity. The surface is cinematic but controlled, built from deep ink fields, pale reading surfaces, and a single alert accent that behaves like a scientific signal rather than decoration.

The mood is playful but disciplined. Rounded forms, glow-led depth, and compact content blocks keep the experience approachable for high school students, while the typography and restrained palette keep it credible. The interface must never drift into either of the project's anti-references: generic school portal dashboards, especially flat administrative layouts that feel bureaucratic or dated, or dense encyclopedia-style experiences that overwhelm students with long text walls before they can orient themselves.

**Key Characteristics:**
- Dark-field canvas with bright reading islands.
- One living accent, used as signal, not wallpaper.
- Rounded "soft instruments" for search and selection.
- Short, digestible content blocks over long explanatory slabs.
- Ambient depth through glow and tonal contrast, not hard stacking.

## Colors

The palette is a nocturnal study surface interrupted by precise biological light.

### Primary
- **Bioluminescent Lime** (`#7CFF7C`): the only true accent. It marks search intent, selected state, key metadata labels, and glow sources. It is not a fill color for large surfaces.

### Secondary
- **Ambient Blue** (`#4AA3FF`): a supporting atmospheric hue used in background light blooms only. It must stay peripheral and never compete with the primary signal.

### Neutral
- **Nocturne Ink** (`#06070B`): the outermost canvas base.
- **Deep Atlas** (`#0E1118`): the dominant background gradient stop for hero and full-screen surfaces.
- **Midnight Slate** (`#111827`): featured result card fill and major dark content surfaces.
- **Panel Ink** (`#0F172A`): interactive dark control color for buttons, pills, and secondary cards.
- **Detail Ink** (`#101723`): the deepest content panel used for rich detail regions.
- **Paper Mist** (`#F8FAFC`): the bright search surface and high-emphasis text color.
- **Muted Cloud** (`#AAB3C5`): long-form supporting text and secondary descriptions.
- **Quiet Steel** (`#8B95A7`): low-priority metadata and footer copy.
- **Hairline Light** (`#FFFFFF14`): low-contrast borders and separators.

**The Signal Scarcity Rule.** Bioluminescent Lime is powerful because it is rare. Keep it to actions, selection, tiny tags, and glow sources. If a screen starts reading green from across the room, it is already wrong.

## Typography

**Display Font:** Inter (with Arial, sans-serif fallback)
**Body Font:** Inter (with Arial, sans-serif fallback)
**Label/Mono Font:** No secondary family. Consistency is the point.

**Character:** The type system is contemporary and legible, with enough weight contrast to feel intentional but never ornamental. It should read like a well-prepared study interface, not an editorial experiment.

### Hierarchy
- **Display** (700, `54px`, `1.05`): reserved for the landing headline only.
- **Headline** (700, `34px`, `1.15`): used for the selected animal and any major in-panel title.
- **Title** (650, `24px`, `1.2`): used on result cards and secondary content anchors.
- **Body** (400, `15px`, `1.45`): default reading text. Keep paragraphs compact and cap line length near `65ch` where the layout allows it.
- **Label** (600, `12px`, `0.06em`, mostly title case or restrained uppercase): used for tags, micro-labels, and compact status metadata.

**The Digestibility Rule.** Students should never meet an intimidating wall of copy first. Titles arrive fast, descriptions stay brief, and metadata gets chunked into small readable units.

## Elevation

This system uses ambient glow, not heavy card stacking. Depth comes from diffused shadows, low-contrast borders, and local light blooms inside otherwise dark surfaces. Panels feel suspended in a quiet atmosphere rather than piled on top of each other.

### Shadow Vocabulary
- **Canvas Lift** (`0 30px 90px rgba(0,0,0,0.40)`): used on major screen shells to detach them from the page background.
- **Search Glow** (`0 16px 50px rgba(124,255,124,0.13)`): used under bright search surfaces to make the search action feel alive.
- **Ambient Hover** (`0 10px 34px rgba(124,255,124,0.12)`): used for smaller raised controls and result-search surfaces.

**The Atmospheric Depth Rule.** Shadows must feel wide, soft, and quiet. If a panel looks like a physical card dropped onto a desk, the blur is too small or the opacity is too high.

## Components

Component behavior should feel like soft instruments: precise, calm, and immediately understandable.

### Buttons
- **Shape:** generously rounded, with compact icon-first forms (`18px` radius on the `48px` search trigger).
- **Primary:** dark fill (`#0F172A`) with Bioluminescent Lime iconography (`#7CFF7C`). The button reads as an activation key, not a marketing CTA.
- **Hover / Focus:** emphasis comes from clearer contrast and glow-adjacent context, never from oversized motion or loud color inversion.

### Chips
- **Style:** either translucent dark pills with subtle borders or solid dark pills on light surfaces.
- **State:** chips act as compact context markers, not filter clutter. They should stay sparse and text-light.

### Cards / Containers
- **Corner Style:** consistently rounded, usually `22px` to `28px`.
- **Background:** dark tonal fills or gradients, with one bright search shell exception in Paper Mist.
- **Shadow Strategy:** ambient and wide, tied to the Elevation system rather than per-card novelty.
- **Border:** hairline translucent strokes (`#FFFFFF14` to `#FFFFFF1A`) instead of heavy outlines.
- **Internal Padding:** `18px` to `22px`, with enough room for content blocks to breathe.

### Inputs / Fields
- **Style:** search inputs live inside bright shells (`#F8FAFC`) with dark text and icon anchors.
- **Focus:** focus must remain obvious with high contrast and a clean ring treatment. Clarity outranks subtlety here.
- **Error / Disabled:** when added later, preserve the bright-shell model and change state through border, helper text, and icon treatment instead of flooding the control with warning color.

### Signature Component
- **Search Shell:** the signature component is the bright, rounded input shell floating inside the dark canvas. It is the product's clearest invitation to act, so it must always read as the most approachable element on screen.

## Do's and Don'ts

### Do:
- **Do** keep Bioluminescent Lime (`#7CFF7C`) limited to signals, tags, search affordances, and glow sources.
- **Do** use bright search shells (`#F8FAFC`) as reading and interaction islands inside the darker canvas.
- **Do** keep containers rounded within the established range (`18px` to `28px`) so the interface feels calm and approachable.
- **Do** break information into short cards, compact metrics, and readable paragraphs instead of continuous text blocks.
- **Do** preserve strong contrast between foreground text (`#F8FAFC`, `#0F172A`) and its immediate surface.

### Don't:
- **Don't** recreate generic school portal dashboards, especially flat administrative layouts that feel bureaucratic or dated.
- **Don't** drift into dense encyclopedia-style experiences that overwhelm students with long text walls before they can orient themselves.
- **Don't** spread the lime accent across large surfaces or repeated decorative borders.
- **Don't** replace the ambient glow model with harsh, small-radius shadows or rigid card stacks.
- **Don't** let any search, result, or detail region read like a generic productivity SaaS template.
