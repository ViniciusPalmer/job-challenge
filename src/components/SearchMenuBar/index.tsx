import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContainer } from "./styles";

import SearchIcon from "../../assets/search_icon.svg";
import CloseIcon from "../../assets/close_icon.svg";
import { SearchInputContext } from "../../contexts/searchInput";

export function SearchMenuBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { searchInput, setSearchInput } = useContext(SearchInputContext);

  const resetSearch = () => {
    setSearchInput("");
  };

  function submitSearchInput(e: any) {
    e.preventDefault();
    if (location.pathname === "/") return navigate("/results");
  }

  return (
    <SearchContainer onSubmit={submitSearchInput}>
      <button type="submit" aria-label="Submit search">
        <img src={SearchIcon} alt="" />
      </button>
      <input
        type="text"
        value={searchInput}
        onChange={(value) => setSearchInput(value.target.value)}
      />
      <img src={CloseIcon} alt="" aria-label="Clear search" onClick={resetSearch} />
    </SearchContainer>
  );
}
