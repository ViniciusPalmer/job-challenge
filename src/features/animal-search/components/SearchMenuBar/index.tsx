import React, { useContext } from "react";

import SearchIcon from "../../../../assets/search_icon.svg";
import CloseIcon from "../../../../assets/close_icon.svg";
import { SearchInputContext } from "../../state/searchInput";

interface SearchMenuBarProps {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  variant?: "hero" | "results";
}

export function SearchMenuBar({ onSubmit, variant = "hero" }: SearchMenuBarProps) {
  const { searchInput, setSearchInput } = useContext(SearchInputContext);

  const isHero = variant === "hero";
  const placeholder = isHero ? "Search an animal in English" : "Search an animal in English";
  const shellClassName = isHero
    ? "w-full max-w-[560px] rounded-[1.75rem] border border-slate-200/90 bg-slate-50 p-4 shadow-[0_18px_44px_rgba(15,23,42,0.12)] transition-colors focus-within:border-lime-400 focus-within:shadow-[0_18px_44px_rgba(124,255,124,0.18)]"
    : "w-full rounded-[1.75rem] border border-slate-200/90 bg-slate-50 px-4 py-3.5 shadow-[0_18px_44px_rgba(15,23,42,0.12)] transition-colors focus-within:border-lime-400 focus-within:shadow-[0_18px_44px_rgba(124,255,124,0.18)]";

  const resetSearch = () => {
    setSearchInput("");
  };

  function submitSearchInput(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit?.(e);
  }

  return (
    <form className={shellClassName} onSubmit={submitSearchInput}>
      <div className="flex items-center gap-4">
        <button
          type="submit"
          aria-label="Submit search"
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-lime-300"
        >
          <img className="h-4 w-4" src={SearchIcon} alt="" />
        </button>
        <label className="sr-only" htmlFor="search-input">
          Search
        </label>
        <input
          id="search-input"
          className="w-full rounded-xl border-none bg-transparent px-1 py-2 text-base text-slate-700 placeholder:text-slate-400 outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
          placeholder={placeholder}
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          type="button"
          aria-label="Clear search"
          className="flex h-11 w-11 items-center justify-center rounded-2xl text-slate-400 transition hover:bg-slate-200/70 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
          onClick={resetSearch}
        >
          <img className="h-4 w-4" src={CloseIcon} alt="" />
        </button>
      </div>
      {isHero ? (
        <div className="mt-4 flex items-center justify-between gap-4 text-sm">
          <span className="text-slate-900">Try: lion, fox, dolphin</span>
          <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-50">
            Press Enter
          </span>
        </div>
      ) : null}
    </form>
  );
}
