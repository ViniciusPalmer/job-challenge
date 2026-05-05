# Migration Spec: styled-components → Tailwind CSS

## Overview

Big bang migration from styled-components to Tailwind CSS, using market-standard color token hierarchy (raw colors → semantic colors) and leaf-to-root component migration order.

## Color Token Architecture

### Layer 1: Raw Colors

All design tokens from the existing theme, mapped 1:1 to Tailwind native color palette.

| Token | Value | Usage |
|-------|-------|-------|
| `gray-50` | `#F2F2F2` | Background secondary |
| `gray-100` | `#dfe1e5` | Borders, selected states |
| `gray-150` | `#ebebeb` | Dividers, borders |
| `gray-300` | `#5f5f5f` | Secondary text, descriptions |
| `blue-300` | `#1A0DAB` | Links, interactive elements |
| `white` | `#FFFFFF` | Primary background |
| `black` | `#000000` | Primary text |

### Layer 2: Semantic Tokens (extend)

| Token | Value | Maps to |
|-------|-------|---------|
| `background.primary` | `#FFFFFF` | white |
| `background.secondary` | `#F2F2F2` | gray-50 |
| `text.primary` | `#000000` | black |
| `text.secondary` | `#5f5f5f` | gray-300 |
| `border.default` | `#ebebeb` | gray-150 |
| `border.hover` | `#dfe1e5` | gray-100 |

### Shadows

| Token | Value |
|-------|-------|
| `search-bar` | `0 2px 5px 1px rgba(64,60,67,.16)` |

## Implementation Tasks

### Phase 1: Setup

| # | Task | Agent |
|---|------|-------|
| 1.1 | Install Tailwind dependencies (`tailwindcss`, `postcss`, `autoprefixer`) | humans |
| 1.2 | Create `tailwind.config.js` with color hierarchy | humans |
| 1.3 | Create `src/styles/globals.css` with Tailwind directives and reset CSS | humans |
| 1.4 | Import `globals.css` in `src/main.tsx` | humans |
| 1.5 | Run `npx tailwindcss init -p` to create config files | humans |

### Phase 2: Component Migration (leaf to root)

| # | Component | Files | Agent |
|---|-----------|-------|-------|
| 2.1 | Footer | `Footer/index.tsx`, `Footer/styles.ts` | humans |
| 2.2 | NoResultsFound | `NoResultsFound/index.tsx`, `NoResultsFound/styles.ts` | humans |
| 2.3 | ResultCard | `ResultCard/index.tsx`, `ResultCard/styles.ts` | humans |
| 2.4 | ResultContent | `ResultContent/index.tsx`, `ResultContent/styles.ts` | humans |
| 2.5 | SearchMenuBar | `SearchMenuBar/index.tsx`, `SearchMenuBar/styles.ts` | humans |
| 2.6 | HomeHeader | `HomeHeader/index.tsx`, `HomeHeader/styles.ts` | humans |
| 2.7 | ResultsHeader | `ResultsHeader/index.tsx`, `ResultsHeader/styles.ts` | humans |
| 2.8 | ResultContentMobile (includes Radix Dialog) | `ResultContentMobile/index.tsx`, `ResultContentMobile/styles.ts` | humans |
| 2.9 | Home | `Home/index.tsx`, `Home/styles.ts` | humans |
| 2.10 | Results | `Results/index.tsx`, `Results/styles.ts` | humans |

### Phase 3: Cleanup

| # | Task | Agent |
|---|------|-------|
| 3.1 | Remove ThemeProvider from `src/App.tsx` | humans |
| 3.2 | Delete `src/styles/themes/default.ts` | humans |
| 3.3 | Delete all `*.styles.ts` files | humans |
| 3.4 | Remove `styled-components` from `package.json` | humans |
| 3.5 | Remove `@types/styled-components` from `package.json` | humans |
| 3.6 | Run `npm install` to update lockfile | humans |
| 3.7 | Run lint, tests, build verification | humans |

## Migration Pattern per Component

For each component:

1. Read `styles.ts` file
2. Map each styled-component class to Tailwind class
3. Apply Tailwind classes directly to JSX element in `index.tsx`
4. Remove styled-components import and styled-component usage
5. Delete `styles.ts` file

### Example Mapping

**Before (styled-components):**
```tsx
const FooterContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  background-color: ${(props) => props.theme["gray-050"]};
  position: fixed;
  bottom: 0px;
  left: 0px;
`;
```

**After (Tailwind):**
```tsx
<div className="flex w-full items-center justify-between p-6 bg-gray-50 fixed bottom-0 left-0">
```

## Special Cases

### Radix Dialog (ResultContentMobile)
- `Overlay` styled-component wraps Radix `Dialog.Overlay`
- Replace with Tailwind class `fixed inset-0 bg-black/75`
- `Content` styled-component wraps Radix `Dialog.Content`
- Replace with Tailwind classes `min-w-8 rounded bg-gray-100 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`

### ReactPaginate (Results page)
- `StyledReactPaginate` wraps react-paginate component
- Target child classes via Tailwind: `.selected`, `li`
- Use arbitrary selector if needed: `[.selected]:bg-gray-100`

## Verification

After each phase:
1. Run `npm run lint` - should pass with no styled-components references
2. Run `npm test` - all tests should pass
3. Run `npm run build` - should compile without errors

## Notes

- No feature flags or gradual rollout - full migration in one pass
- Design tokens follow market-standard: raw colors base layer, semantic tokens extend
- Component migration follows leaf-to-root order for dependency clarity