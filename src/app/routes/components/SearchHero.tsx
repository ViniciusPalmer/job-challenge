import { useNavigate } from "react-router-dom";

import { SearchMenuBar } from "../../../features/animal-search/components/SearchMenuBar";

export function SearchHero() {
  const navigate = useNavigate();

  function handleSearchSubmit() {
    navigate("/results");
  }

  return (
    <section className="relative mx-auto flex min-h-screen w-full max-w-[1280px] items-center justify-center px-6 py-16">
      <div className="w-full max-w-[720px] rounded-[32px] border border-white/10 bg-slate-950 px-8 py-16 text-center shadow-[0_24px_60px_rgba(0,0,0,0.32)] sm:px-10">
        <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-slate-900 px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-slate-200">
          <span className="h-2.5 w-2.5 rounded-full bg-lime-300" />
          Animal Search
        </div>
        <h1 className="mx-auto max-w-[560px] text-5xl font-bold tracking-tight text-slate-50 sm:text-6xl">
          Find animals instantly
        </h1>
        <p className="mx-auto mt-6 max-w-[520px] text-base leading-7 text-slate-300 sm:text-lg">
          Search an animal in English and explore fast, rich results designed for quick discovery.
        </p>
        <div className="mt-8">
          <SearchMenuBar variant="hero" onSubmit={handleSearchSubmit} />
        </div>
        <p className="mt-6 text-sm text-slate-400">Minimal input. Instant discovery. Built for curious minds.</p>
      </div>
    </section>
  );
}
