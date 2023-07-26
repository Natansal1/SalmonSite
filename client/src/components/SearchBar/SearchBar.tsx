import { Autocomplete } from "@mui/material";
import React, { useState } from "react";

interface SearchBarProps {
   options: {
      content: string;
      value: string;
   }[];
   onChange: (value: string) => void;
   onSelect: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
   const { onChange, onSelect, options } = props;
   const [value, setValue] = useState<string>("");

   return (
      <search className="search_bar">
         <Autocomplete options={options} />
      </search>
   );
};

export default SearchBar;
