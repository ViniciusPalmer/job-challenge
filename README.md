# Job Challenge - Animal Search App

A React + TypeScript application built as part of a **2021 job interview challenge**. The project simulates an animal search system with fake in-memory data and now uses a **feature-based architecture** organized around `app`, `features`, and `shared`.

## Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint

## Architecture

```text
src/
  app/        # application composition, routes, and cross-feature coordination
  features/   # domain modules such as animal-search, animal-results, animal-data
  shared/     # reusable UI, types, and helpers with no feature-specific behavior
```

### Where new code goes

- Put **routes, route headers, and provider composition** in `src/app`
- Put **domain components, hooks, and state** in the owning folder inside `src/features`
- Put **reusable domain-agnostic pieces** in `src/shared`

### Current features

- `animal-data`: in-memory dataset and provider
- `animal-search`: search input state and search bar UI
- `animal-results`: filtering, pagination, and result rendering
