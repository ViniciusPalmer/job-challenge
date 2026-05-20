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

  const resetSearch = () => {
    setSearchInput("");
  };

  function submitSearchInput(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit?.(e);
  }

  return (
    <form
      className={
        isHero
          ? "w-full max-w-[560px] rounded-[1.5rem] bg-white p-4 shadow-[0_16px_50px_rgba(124,255,124,0.14)]"
          : "w-full rounded-[1.375rem] bg-white px-4 py-3 shadow-[0_10px_34px_rgba(124,255,124,0.12)]"
      }
      onSubmit={submitSearchInput}
    >
      <div className="flex items-center gap-4">
        <button
          type="submit"
          aria-label="Submit search"
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-lime-300"
        >
          <img className="h-4 w-4" src={SearchIcon} alt="" />
        </button>
        <label className="sr-only" htmlFor="search-input">
          Search
        </label>
        <input
          id="search-input"
          className="w-full rounded-xl border-none bg-transparent px-1 py-2 text-base text-slate-700 placeholder:text-slate-400 outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          placeholder={placeholder}
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          type="button"
          aria-label="Clear search"
          className="text-slate-400 transition hover:text-slate-700"
          onClick={resetSearch}
        >
          <img className="h-4 w-4" src={CloseIcon} alt="" />
        </button>
      </div>
      {isHero ? (
        <div className="mt-4 flex items-center justify-between gap-4 text-sm">
          <span className="text-slate-900">Try: lion, fox, dolphin</span>
          <span className="rounded-full bg-slate-950 px-3 py-2 text-xs font-semibold text-white">
            Press Enter
          </span>
        </div>
      ) : null}
    </form>
  );
}
