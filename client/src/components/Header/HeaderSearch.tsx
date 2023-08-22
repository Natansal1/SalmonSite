import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../../contexts/SearchContextProvider.context";

const HeaderSearch: React.FC = () => {
   const { isLoading } = useSearchContext();
   const navigate = useNavigate();

   async function handleSearch(value: string) {
      navigate(`/search-results?q=${value}`);
   }

   return (
      <SearchBar
         className="header_search"
         loading={isLoading}
         onSearch={handleSearch}
      />
   );
};

export default HeaderSearch;
