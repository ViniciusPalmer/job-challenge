import { useNavigate } from "react-router-dom";

import { SearchMenuBar } from "../../../features/animal-search/components/SearchMenuBar";

export function ResultsHeader() {
  const navigate = useNavigate();

  function returnToMain(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <header className="rounded-[32px] border border-white/10 bg-slate-900/80 p-4 shadow-[0_16px_48px_rgba(2,6,23,0.3)] sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <button
          type="button"
          aria-label="Go to home"
          className="flex w-fit items-center gap-3 rounded-full border border-white/10 bg-slate-950/60 px-4 py-2 text-left text-slate-100 transition hover:border-lime-300/60 hover:text-lime-200"
          onClick={returnToMain}
        >
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-lime-300" />
          <span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Back to search
            </span>
            <span className="block text-base font-semibold">Animal Search</span>
          </span>
        </button>
        <div className="w-full max-w-3xl lg:flex-1 lg:max-w-[720px]">
          <SearchMenuBar variant="results" />
          <p className="mt-3 pl-1 text-sm text-slate-300">Search an animal in English</p>
        </div>
      </div>
    </header>
  );
}
