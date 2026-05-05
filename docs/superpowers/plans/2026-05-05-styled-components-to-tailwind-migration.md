# styled-components to Tailwind CSS Migration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate all styled-components styling to Tailwind CSS with market-standard color token hierarchy (raw colors → semantic colors) using a big bang approach.

**Architecture:** Tailwind CSS with two-layer color system: raw colors (gray-50, gray-100, etc.) as base, semantic tokens (background.primary, text.secondary) as extend. Migration follows leaf-to-root order to minimize dependency issues.

**Tech Stack:** Tailwind CSS, PostCSS, Autoprefixer, Vite, React, TypeScript

---

## File Map

| File | Responsibility | Status |
|------|----------------|--------|
| `tailwind.config.js` | Tailwind configuration with color tokens | CREATE |
| `postcss.config.js` | PostCSS config for Tailwind | CREATE |
| `src/styles/globals.css` | Tailwind directives + CSS reset | CREATE |
| `src/main.tsx` | Import globals.css | MODIFY |
| `src/App.tsx` | Remove ThemeProvider | MODIFY |
| `src/styles/themes/default.ts` | Delete after migration | DELETE |
| `src/components/Footer/styles.ts` | Migration | DELETE |
| `src/components/Footer/index.tsx` | Migration | MODIFY |
| `src/pages/Results/components/NoResultsFound/styles.ts` | Migration | DELETE |
| `src/pages/Results/components/NoResultsFound/index.tsx` | Migration | MODIFY |
| `src/pages/Results/components/ResultCard/styles.ts` | Migration | DELETE |
| `src/pages/Results/components/ResultCard/index.tsx` | Migration | MODIFY |
| `src/pages/Results/components/ResultContent/styles.ts` | Migration | DELETE |
| `src/pages/Results/components/ResultContent/index.tsx` | Migration | MODIFY |
| `src/components/SearchMenuBar/styles.ts` | Migration | DELETE |
| `src/components/SearchMenuBar/index.tsx` | Migration | MODIFY |
| `src/pages/Home/components/HomeHeader/styles.ts` | Migration | DELETE |
| `src/pages/Home/components/HomeHeader/index.tsx` | Migration | MODIFY |
| `src/pages/Results/components/ResultsHeader/styles.ts` | Migration | DELETE |
| `src/pages/Results/components/ResultsHeader/index.tsx` | Migration | MODIFY |
| `src/pages/Results/components/ResultContentMobile/styles.ts` | Migration | DELETE |
| `src/pages/Results/components/ResultContentMobile/index.tsx` | Migration | MODIFY |
| `src/pages/Home/styles.ts` | Migration | DELETE |
| `src/pages/Home/index.tsx` | Migration | MODIFY |
| `src/pages/Results/styles.ts` | Migration | DELETE |
| `src/pages/Results/index.tsx` | Migration | MODIFY |
| `package.json` | Remove styled-components deps | MODIFY |

---

## Task 1: Install Tailwind Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Tailwind CSS and dependencies**

Run: `npm install -D tailwindcss postcss autoprefixer`
Expected: Package.json updated with devDependencies

- [ ] **Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install Tailwind CSS dependencies"
```

---

## Task 2: Create Tailwind Configuration

**Files:**
- Create: `tailwind.config.js`
- Create: `postcss.config.js`

- [ ] **Step 1: Create tailwind.config.js with color hierarchy**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      // Layer 1: Raw colors
      gray: {
        50: '#F2F2F2',
        100: '#dfe1e5',
        150: '#ebebeb',
        300: '#5f5f5f',
      },
      blue: {
        300: '#1A0DAB',
      },
      white: '#FFFFFF',
      black: '#000000',
      'search-bar-shadow': 'rgba(64,60,67,.16)',
      'translucid-black': 'rgba(0,0,0,0.75)',
    },
    extend: {
      colors: {
        background: {
          primary: '#FFFFFF',
          secondary: '#F2F2F2',
        },
        text: {
          primary: '#000000',
          secondary: '#5f5f5f',
        },
        border: {
          DEFAULT: '#ebebeb',
          hover: '#dfe1e5',
        },
      },
      boxShadow: {
        'search-bar': '0 2px 5px 1px rgba(64,60,67,.16)',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Create postcss.config.js**

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.js postcss.config.js
git commit -m "chore: add Tailwind and PostCSS configuration"
```

---

## Task 3: Create globals.css and Update main.tsx

**Files:**
- Create: `src/styles/globals.css`
- Modify: `src/main.tsx`

- [ ] **Step 1: Create src/styles/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 1px #dfe1e5;
  }

  body {
    background-color: #FFFFFF;
    color: #000000;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  body, input, textarea, button {
    font: 400 1rem arial, sans-serif;
  }
}
```

- [ ] **Step 2: Update src/main.tsx to import globals.css**

Read `src/main.tsx` first, then modify to add:
```tsx
import './styles/globals.css'
```
at the top of the file (after the React import line).

- [ ] **Step 3: Commit**

```bash
git add src/styles/globals.css src/main.tsx
git commit -m "chore: add global CSS with Tailwind directives"
```

---

## Task 4: Migrate Footer Component

**Files:**
- Modify: `src/components/Footer/index.tsx`
- Delete: `src/components/Footer/styles.ts`

- [ ] **Step 1: Read Footer/index.tsx and Footer/styles.ts**

```tsx
// FooterContainer → className="flex w-full items-center justify-between p-6 bg-gray-50 fixed bottom-0 left-0"
// FooterText → className="text-sm text-gray-300"
```

- [ ] **Step 2: Update Footer/index.tsx with Tailwind classes**

Replace styled-components usage with Tailwind classes:

```tsx
import { useCurrentYear } from '../../hooks/useCurrentYear'

export function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="flex w-full items-center justify-between p-6 bg-gray-50 fixed bottom-0 left-0">
      <span className="text-sm text-gray-300">© Google {currentYear}</span>
      <span className="text-sm text-gray-300">version 0.1.0</span>
    </footer>
  )
}
```

Note: `FooterText` styled-component becomes a `span` with `text-sm text-gray-300`.

- [ ] **Step 3: Delete Footer/styles.ts**

Run: `Remove-Item -LiteralPath "src/components/Footer/styles.ts"`

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: SUCCESS

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer/index.tsx
git rm src/components/Footer/styles.ts
git commit -m "refactor(Footer): migrate from styled-components to Tailwind"
```

---

## Task 5: Migrate NoResultsFound Component

**Files:**
- Modify: `src/pages/Results/components/NoResultsFound/index.tsx`
- Delete: `src/pages/Results/components/NoResultsFound/styles.ts`

- [ ] **Step 1: Read NoResultsFound/index.tsx and styles.ts**

```tsx
// NoResultsContainer → className="flex flex-col"
// span:first-child → className="text-base mb-8"
// span:last-child → className="text-base"
```

- [ ] **Step 2: Update NoResultsFound/index.tsx with Tailwind classes**

```tsx
export function NoResultsFound() {
  return (
    <div className="flex flex-col">
      <span className="text-base mb-8">No results found</span>
      <span className="text-base">Try a different search term</span>
    </div>
  )
}
```

- [ ] **Step 3: Delete NoResultsFound/styles.ts**

- [ ] **Step 4: Verify and commit**

```bash
git add src/pages/Results/components/NoResultsFound/index.tsx
git rm src/pages/Results/components/NoResultsFound/styles.ts
git commit -m "refactor(NoResultsFound): migrate from styled-components to Tailwind"
```

---

## Task 6: Migrate ResultCard Component

**Files:**
- Modify: `src/pages/Results/components/ResultCard/index.tsx`
- Delete: `src/pages/Results/components/ResultCard/styles.ts`

- [ ] **Step 1: Read ResultCard/index.tsx and styles.ts**

```tsx
// ResultCardContainer → className="flex flex-col max-h-[200px] items-start mb-7"
// URLText → className="text-xs text-gray-300 mb-2"
// LinkText → className="text-2xl text-blue-300 mb-3 bg-transparent border-none cursor-pointer hover:brightness-60 transition-all"
// DescriptionText → className="text-base text-gray-300 mb-3 hover:brightness-60 transition-all"
```

- [ ] **Step 2: Update ResultCard/index.tsx with Tailwind classes**

```tsx
export function ResultCard() {
  return (
    <article className="flex flex-col max-h-[200px] items-start mb-7">
      <span className="text-xs text-gray-300 mb-2">example.com</span>
      <button className="text-2xl text-blue-300 mb-3 bg-transparent border-none cursor-pointer hover:brightness-60 transition-all">
        Result Title
      </button>
      <a className="text-base text-gray-300 mb-3 hover:brightness-60 transition-all" href="#">
        Result description...
      </a>
    </article>
  )
}
```

Note: `LinkText` was a styled.button, now use native `button` with same classes.

- [ ] **Step 3: Delete ResultCard/styles.ts**

- [ ] **Step 4: Verify and commit**

```bash
git add src/pages/Results/components/ResultCard/index.tsx
git rm src/pages/Results/components/ResultCard/styles.ts
git commit -m "refactor(ResultCard): migrate from styled-components to Tailwind"
```

---

## Task 7: Migrate ResultContent Component

**Files:**
- Modify: `src/pages/Results/components/ResultContent/index.tsx`
- Delete: `src/pages/Results/components/ResultContent/styles.ts`

- [ ] **Step 1: Read ResultContent/index.tsx and styles.ts**

```tsx
// ResultCardContainer → className="flex flex-col items-start justify-center max-w-[30vw] p-8 border border-gray-150"
// img → className="w-full mb-4"
// SpanContent → className="text-xs text-gray-300 mb-2 max-w-[90%]"
// TittleText → className="text-2xl text-blue-300 mb-4 hover:brightness-60 transition-all"
```

- [ ] **Step 2: Update ResultContent/index.tsx with Tailwind classes**

```tsx
export function ResultContent() {
  return (
    <article className="flex flex-col items-start justify-center max-w-[30vw] p-8 border border-gray-150">
      <img className="w-full mb-4" src="/image.jpg" alt="Result" />
      <span className="text-xs text-gray-300 mb-2 max-w-[90%]">example.com</span>
      <a className="text-2xl text-blue-300 mb-4 hover:brightness-60 transition-all" href="#">
        Result Title
      </a>
      <p className="text-sm text-gray-300">Description</p>
    </article>
  )
}
```

- [ ] **Step 3: Delete ResultContent/styles.ts**

- [ ] **Step 4: Verify and commit**

```bash
git add src/pages/Results/components/ResultContent/index.tsx
git rm src/pages/Results/components/ResultContent/styles.ts
git commit -m "refactor(ResultContent): migrate from styled-components to Tailwind"
```

---

## Task 8: Migrate SearchMenuBar Component

**Files:**
- Modify: `src/components/SearchMenuBar/index.tsx`
- Delete: `src/components/SearchMenuBar/styles.ts`

- [ ] **Step 1: Read SearchMenuBar/index.tsx and styles.ts**

```tsx
// SearchContainer → className="flex w-full items-center justify-center min-h-[44px] bg-white border border-transparent shadow-search-bar rounded-full mx-6 px-4"
// button (inside form) → className="bg-white border-none p-0 m-0"
// input → className="w-full mr-2 h-full p-0 border-none text-base"
// img:first-child → className="w-4 mr-2"
// img:hover → className="w-4 mr-2 hover:cursor-pointer hover:scale-110 transition-transform duration-300"
```

- [ ] **Step 2: Update SearchMenuBar/index.tsx with Tailwind classes**

The SearchContainer uses nested selectors for button, input, and img. Tailwind handles these differently - we need to apply classes to the child elements directly.

```tsx
export function SearchMenuBar() {
  return (
    <form className="flex w-full items-center justify-center min-h-[44px] bg-white border border-transparent shadow-search-bar rounded-full mx-6 px-4">
      <button type="button" className="bg-white border-none p-0 m-0">
        <img className="w-4 mr-2" src="/search-icon.svg" alt="Search" />
      </button>
      <input
        className="w-full mr-2 h-full p-0 border-none text-base"
        type="text"
        placeholder="Search..."
      />
      <button type="button" className="bg-white border-none p-0 m-0">
        <img className="w-4 hover:cursor-pointer hover:scale-110 transition-transform duration-300" src="/mic.svg" alt="Voice" />
      </button>
    </form>
  )
}
```

- [ ] **Step 3: Delete SearchMenuBar/styles.ts**

- [ ] **Step 4: Verify and commit**

```bash
git add src/components/SearchMenuBar/index.tsx
git rm src/components/SearchMenuBar/styles.ts
git commit -m "refactor(SearchMenuBar): migrate from styled-components to Tailwind"
```

---

## Task 9: Migrate HomeHeader Component

**Files:**
- Modify: `src/pages/Home/components/HomeHeader/index.tsx`
- Delete: `src/pages/Home/components/HomeHeader/styles.ts`

- [ ] **Step 1: Read HomeHeader/index.tsx and styles.ts**

```tsx
// HeaderContainer → className="flex w-full items-center justify-between p-6 border-b border-gray-150"
// HeaderText → className="text-xl font-light md:text-base"
// IconsContainer → className="flex flex-row p-2 w-[110px] h-[60px]"
// img:nth-child(2n) → className="ml-4"
```

- [ ] **Step 2: Update HomeHeader/index.tsx with Tailwind classes**

```tsx
export function HomeHeader() {
  return (
    <header className="flex w-full items-center justify-between p-6 border-b border-gray-150">
      <h1 className="text-xl font-light">Animal Search</h1>
      <div className="flex flex-row p-2 w-[110px] h-[60px]">
        <img className="w-6 h-6" src="/icon1.svg" alt="Icon 1" />
        <img className="w-6 h-6 ml-4" src="/icon2.svg" alt="Icon 2" />
      </div>
    </header>
  )
}
```

- [ ] **Step 3: Delete HomeHeader/styles.ts**

- [ ] **Step 4: Verify and commit**

```bash
git add src/pages/Home/components/HomeHeader/index.tsx
git rm src/pages/Home/components/HomeHeader/styles.ts
git commit -m "refactor(HomeHeader): migrate from styled-components to Tailwind"
```

---

## Task 10: Migrate ResultsHeader Component

**Files:**
- Modify: `src/pages/Results/components/ResultsHeader/index.tsx`
- Delete: `src/pages/Results/components/ResultsHeader/styles.ts`

- [ ] **Step 1: Read ResultsHeader/index.tsx and styles.ts**

```tsx
// HeaderContainer → className="flex w-full items-center justify-between p-6 border-b border-gray-150"
// SearchContainer → className="flex items-center"
// SearchContainer img → className="h-12"
// GoogleImg → className="cursor-pointer md:scale-150 md:w-auto md:h-auto"
// IconsContainer → className="flex flex-row p-2 w-[150px] h-[60px]"
// IconsContainer img → className="max-w-[44px]"
// img:nth-child(2n) → className="ml-4"
// @media (max-width: 500px) IconsContainer → className="hidden"
```

- [ ] **Step 2: Update ResultsHeader/index.tsx with Tailwind classes**

```tsx
export function ResultsHeader() {
  return (
    <header className="flex w-full items-center justify-between p-6 border-b border-gray-150">
      <div className="flex items-center">
        <img className="h-12" src="/google.svg" alt="Google" />
        <img className="cursor-pointer md:scale-150 md:w-auto md:h-auto" src="/logo.svg" alt="Logo" />
      </div>
      <div className="flex flex-row p-2 w-[150px] h-[60px]">
        <img className="max-w-[44px]" src="/icon1.svg" alt="Icon 1" />
        <img className="max-w-[44px] ml-4" src="/icon2.svg" alt="Icon 2" />
      </div>
    </header>
  )
}
```

Note: Responsive classes simplified. For responsive img sizing, use arbitrary values: `max-h-8 sm:max-h-12`.

- [ ] **Step 3: Delete ResultsHeader/styles.ts**

- [ ] **Step 4: Verify and commit**

```bash
git add src/pages/Results/components/ResultsHeader/index.tsx
git rm src/pages/Results/components/ResultsHeader/styles.ts
git commit -m "refactor(ResultsHeader): migrate from styled-components to Tailwind"
```

---

## Task 11: Migrate ResultContentMobile Component

**Files:**
- Modify: `src/pages/Results/components/ResultContentMobile/index.tsx`
- Delete: `src/pages/Results/components/ResultContentMobile/styles.ts`

- [ ] **Step 1: Read ResultContentMobile/index.tsx and styles.ts**

This component uses Radix Dialog. Key mappings:
```tsx
// ResultCardContainer → className="flex flex-col max-h-[200px] items-start mb-7"
// URLText → className="text-xs text-gray-300 mb-2"
// LinkButton → className="text-2xl text-blue-300 mb-3 bg-transparent border-none cursor-pointer hover:brightness-60 transition-all"
// DescriptionText → className="text-base text-gray-300 mb-3 hover:brightness-60 transition-all"
// Overlay → className="fixed inset-0 bg-black/75"
// Content → className="min-w-8 rounded bg-gray-100 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
```

- [ ] **Step 2: Update ResultContentMobile/index.tsx with Tailwind classes**

```tsx
import * as Dialog from "@radix-ui/react-dialog"

export function ResultContentMobile() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-2xl text-blue-300 mb-3 bg-transparent border-none cursor-pointer">
          Open
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/75" />
        <Dialog.Content className="min-w-8 rounded bg-gray-100 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4">
          <Dialog.Title className="text-lg font-bold">Result Title</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-300 mt-2">
            Description here
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
```

- [ ] **Step 3: Delete ResultContentMobile/styles.ts**

- [ ] **Step 4: Verify and commit**

```bash
git add src/pages/Results/components/ResultContentMobile/index.tsx
git rm src/pages/Results/components/ResultContentMobile/styles.ts
git commit -m "refactor(ResultContentMobile): migrate from styled-components to Tailwind"
```

---

## Task 12: Migrate Home Page

**Files:**
- Modify: `src/pages/Home/index.tsx`
- Delete: `src/pages/Home/styles.ts`

- [ ] **Step 1: Read Home/index.tsx and styles.ts**

```tsx
// HomeContainer → className="w-screen h-screen flex flex-col items-center"
// HomeContent → className="w-[40vw] flex flex-col items-center justify-around fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[80vw]"
// GoogleImg → className="w-3/4 mb-6"
```

- [ ] **Step 2: Update Home/index.tsx with Tailwind classes**

```tsx
export function Home() {
  return (
    <main className="w-screen h-screen flex flex-col items-center">
      <h1 className="sr-only">Animal Search Home</h1>
      <img className="w-3/4 mb-6" src="/google.png" alt="" />
      <SearchMenuBar />
    </main>
  )
}
```

Note: The inline `<h1 style={{...}}>` becomes `<h1 className="sr-only">` for accessibility.

- [ ] **Step 3: Delete Home/styles.ts**

- [ ] **Step 4: Verify and commit**

```bash
git add src/pages/Home/index.tsx
git rm src/pages/Home/styles.ts
git commit -m "refactor(Home): migrate from styled-components to Tailwind"
```

---

## Task 13: Migrate Results Page

**Files:**
- Modify: `src/pages/Results/index.tsx`
- Delete: `src/pages/Results/styles.ts`

- [ ] **Step 1: Read Results/index.tsx and styles.ts**

```tsx
// ResultContainer → className="w-screen h-screen flex flex-col items-center justify-start"
// ResultMainContent → className="w-full h-[80vh] flex flex-col items-center justify-start"
// StyledReactPaginate → ReactPaginate component with className="flex flex-nowrap text-lg cursor-pointer mt-4"
// StyledReactPaginate .selected → className="bg-gray-100 border border-gray-100 font-bold"
// StyledReactPaginate li → className="w-[30px] h-[30px] flex items-center justify-center border border-gray-100 m-0 mx-2"
// StyledReactPaginate li:hover → className="bg-gray-100 transition-all duration-1000"
// ResultData → className="flex flex-row items-start w-screen h-full p-6 cursor-pointer overflow-auto overflow-x-hidden"
// SearchResult → className="w-[55vw] flex flex-col items-start lg:mr-12 sm:w-[99vw]"
// ButtonContentModal → className="bg-transparent border-none p-0 m-0 flex w-full items-start justify-start"
```

- [ ] **Step 2: Update Results/index.tsx with Tailwind classes**

The ReactPaginate component requires special handling. Apply a className to the component and use CSS to target child elements.

```tsx
import ReactPaginate from "react-paginate"

export function Results() {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-start">
      <div className="w-full h-[80vh] flex flex-col items-center justify-start">
        <div className="flex flex-row items-start w-screen h-full p-6 cursor-pointer overflow-auto overflow-x-hidden">
          <section className="w-[55vw] flex flex-col items-start lg:mr-12 sm:w-[99vw]">
            <button className="bg-transparent border-none p-0 m-0 flex w-full items-start justify-start mb-4">
              Title Link
            </button>
          </section>
        </div>
        <ReactPaginate
          className="flex flex-nowrap text-lg cursor-pointer mt-4"
          pageCount={10}
          previousLabel="<"
          nextLabel=">"
          activeClassName="bg-gray-100 border border-gray-100 font-bold"
          pageClassName="w-[30px] h-[30px] flex items-center justify-center border border-gray-100 m-0 mx-2 hover:bg-gray-100 transition-all duration-1000"
        />
      </div>
    </main>
  )
}
```

For more precise ReactPaginate styling, add to globals.css:
```css
.pagination-page.selected {
  @apply bg-gray-100 border border-gray-100 font-bold;
}

.pagination-page {
  @apply w-[30px] h-[30px] flex items-center justify-center border border-gray-100 m-0 mx-2;
}
```

- [ ] **Step 3: Delete Results/styles.ts**

- [ ] **Step 4: Verify and commit**

```bash
git add src/pages/Results/index.tsx src/styles/globals.css
git rm src/pages/Results/styles.ts
git commit -m "refactor(Results): migrate from styled-components to Tailwind"
```

---

## Task 14: Cleanup - Remove ThemeProvider and styled-components

**Files:**
- Modify: `src/App.tsx`
- Delete: `src/styles/themes/default.ts`
- Modify: `package.json`

- [ ] **Step 1: Read and update src/App.tsx**

Remove ThemeProvider wrapper:

```tsx
// Before:
<ThemeProvider theme={defaultTheme}>
  <GlobalStyle />
  <BrowserRouter>
    ...
  </BrowserRouter>
</ThemeProvider>

// After:
<BrowserRouter>
  ...
</BrowserRouter>
```

- [ ] **Step 2: Delete src/styles/themes/default.ts**

Run: `Remove-Item -LiteralPath "src/styles/themes/default.ts"`

- [ ] **Step 3: Update package.json**

Remove from dependencies:
```json
"styled-components": "^6.0.8"
```

Remove from devDependencies:
```json
"@types/styled-components": "^5.1.28"
```

- [ ] **Step 4: Run npm install to update lockfile**

Run: `npm install`

- [ ] **Step 5: Verify complete build**

Run: `npm run lint && npm test && npm run build`
Expected: All pass with no styled-components references

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx package.json package-lock.json
git rm src/styles/themes/default.ts
git rm src/styles/global.ts  # no longer needed if all styles migrated
git commit -m "chore: remove styled-components and ThemeProvider"
```

---

## Task 15: Final Verification

- [ ] **Step 1: Search for any remaining styled-components references**

Run: `grep -r "styled-components" src/ --include="*.tsx" --include="*.ts"`
Expected: No matches

- [ ] **Step 2: Verify no .styles.ts files remain**

Run: `Get-ChildItem -Path src -Recurse -Filter "*.styles.ts" | Select-Object -ExpandProperty FullName`
Expected: No output

- [ ] **Step 3: Final build test**

Run: `npm run build`
Expected: SUCCESS

- [ ] **Step 4: Commit any remaining changes**

```bash
git add -A
git commit -m "chore: complete styled-components to Tailwind migration"
```

---

## Spec Coverage Check

- [x] Design tokens: Layer 1 raw colors, Layer 2 semantic tokens in tailwind.config.js
- [x] globals.css: Tailwind directives + reset CSS
- [x] main.tsx: imports globals.css
- [x] App.tsx: ThemeProvider removed
- [x] All 10 component files migrated
- [x] All .styles.ts files deleted
- [x] styled-components removed from package.json
- [x] Verification commands included

## Plan Complete

Saved to `docs/superpowers/plans/2026-05-05-styled-components-to-tailwind-migration.md`.

**Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?