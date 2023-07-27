import { SelectOption } from "@hilma/forms";
import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";

interface SearchBarProps {
   options: SelectOption[];
   onChange?: (value: SelectOption | null) => void;
   onSelect?: (value: SelectOption | null) => void;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
   const { onChange, onSelect, options } = props;
   const [value, setValue] = useState<string>("");

   function handleChange(_e: React.SyntheticEvent<Element, Event>, value: SelectOption | null) {
      if (onChange) onChange(value);
      setValue(value?.content ?? "");
   }

   function handleSelect() {}
   return (
      <search className="search_bar">
         <Autocomplete
            options={options}
            inputValue={value}
            onChange={handleChange}
            onSelect={handleSelect}
            renderInput={(params) => <TextField {...params} />}
         />
      </search>
   );
};

export default SearchBar;
