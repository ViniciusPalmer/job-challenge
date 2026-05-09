import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import SearchIcon from "../../../../assets/search_icon.svg";
import CloseIcon from "../../../../assets/close_icon.svg";
import { SearchInputContext } from "../../state/searchInput";

export function SearchMenuBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { searchInput, setSearchInput } = useContext(SearchInputContext);

  const resetSearch = () => {
    setSearchInput("");
  };

  function submitSearchInput(e: React.FormEvent) {
    e.preventDefault();

    if (location.pathname === "/") {
      navigate("/results");
    }
  }

  return (
    <form
      className="flex w-full items-center justify-center min-h-[44px] bg-white border border-transparent shadow-search-bar rounded-full mx-6 px-4"
      onSubmit={submitSearchInput}
    >
      <button type="submit" aria-label="Submit search" className="bg-white border-none p-0 m-0">
        <img className="w-4 mr-2" src={SearchIcon} alt="" />
      </button>
      <label className="sr-only" htmlFor="search-input">
        Search
      </label>
      <input
        id="search-input"
        className="w-full mr-2 h-full p-0 border-none text-base"
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button
        type="button"
        aria-label="Clear search"
        className="bg-white border-none p-0 m-0 hover:cursor-pointer hover:scale-110 transition-transform duration-300"
        onClick={resetSearch}
      >
        <img className="w-4" src={CloseIcon} alt="" />
      </button>
    </form>
  );
}
