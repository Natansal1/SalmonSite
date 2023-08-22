import React, { useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { createContextHook } from "@hilma/tools";
import axios from "axios";
import { queryKeys } from "../common/enums";

export type SearchResult = {};

export type SearchContextValue = {
   results: SearchResult[] | null;
   question: string | null;
   fixedQuestion: string | null;
   isLoading: boolean;
};

const SearchContext = React.createContext<SearchContextValue | null>(null);
SearchContext.displayName = "search-context";
export const useSearchContext = createContextHook(SearchContext);

interface SearchContextProviderProps {
   children: React.ReactNode;
}

const SearchContextProvider: React.FC<SearchContextProviderProps> = (props) => {
   const { children } = props;
   const [params] = useSearchParams();
   const location = useLocation();

   const question = useMemo(() => {
      if (location.pathname !== "/search-results") return null;
      return params.get("q");
   }, [params, location.pathname]);

   const { data, isLoading } = useQuery({
      queryKey: [queryKeys.HEADER_SEARCH, question],
      queryFn: async ({ queryKey }) => {
         const question = queryKey[1];
         if (!question) return null;
         return (await axios<SearchResult[]>(`/api/search?q=${question}`)).data;
      },
   });

   return (
      <SearchContext.Provider value={{ results: data ?? null, question, isLoading, fixedQuestion: null }}>
         {children}
      </SearchContext.Provider>
   );
};

export default SearchContextProvider;
