import React from "react";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import { useSearchContext } from "../contexts/SearchContextProvider.context";

const SearchResults: React.FC = () => {
   const { question } = useSearchContext();
   
   return (
      <PageWrapper className="page page_scroll">
         <h1 className="title">{question}</h1>
      </PageWrapper>
   );
};

export default SearchResults;
