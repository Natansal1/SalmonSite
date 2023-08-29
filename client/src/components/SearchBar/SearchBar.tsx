import React, { useEffect, useRef, useState } from "react";
import { CircularProgress, IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useTimeout } from "../../common/hooks";

import "../../styles/components/search-bar.scss";

interface SearchBarProps
   extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "onChange" | "ref"> {
   onChange?: (value: string) => void;
   onSearch?: (value: string) => void;
   onClose?: () => void;
   loading?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
   const { onChange, onSearch, loading = false, onClose, className, children, ...rest } = props;
   const [open, setOpen] = useState<boolean>(false);
   const [value, setValue] = useState<string>("");
   const containerRef = useRef<HTMLDivElement>(null);
   const inputRef = useRef<HTMLInputElement>(null);
   const timeout = useTimeout();

   useEffect(() => {
      function handleDocumentClick(e: MouseEvent) {
         if (!containerRef.current!.contains(e.target as Node)) handleClickOutside();
      }

      function handleClickOutside() {
         if (!value) close();
      }

      if (!containerRef.current) return;

      document.addEventListener("mousedown", handleDocumentClick);
      return () => {
         document.removeEventListener("mousedown", handleDocumentClick);
      };
   }, [containerRef.current, value]);

   useEffect(() => {
      if (!open) return;

      function handleKeydown(e: KeyboardEvent) {
         switch (e.key) {
            case "Enter":
               if (value && onSearch) handleSearchClick();
               inputRef.current?.focus();
               break;
            case "Escape":
               close();
               break;
         }
      }

      document.addEventListener("keydown", handleKeydown);
      return () => document.removeEventListener("keydown", handleKeydown);
   }, [value, open]);

   function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      setValue(e.target.value);
      if (onChange) onChange(e.target.value);
   }

   function handleSearchClick() {
      setOpen((prev) => {
         if (prev && !value) return !prev;
         inputRef.current?.focus();
         return true;
      });
      if (value && onSearch) onSearch(value);
   }

   function close() {
      setOpen(false);
      timeout.set(() => setValue(""), 150);
      if (onClose) onClose();
   }

   return (
      <div
         className={clsx("search_bar", { search_bar_open: open }, className)}
         ref={containerRef}
         {...rest}
      >
         <motion.div
            className="input_container"
            animate={open ? "open" : "closed"}
            variants={{
               open: { width: "fit-content", opacity: 1 },
               closed: { width: 0, opacity: 0 },
            }}
            initial={false}
         >
            <IconButton
               onClick={close}
               className="search_icon_container"
               color="primary"
            >
               <CloseIcon className="search_icon" />
            </IconButton>
            <TextField
               className="search_input"
               placeholder="ניתן לחפש לפי אנשים, אירועים ועוד..."
               variant="standard"
               InputLabelProps={{ className: "search_label" }}
               value={value}
               onChange={handleInputChange}
               inputProps={{ className: "search_input_text", ref: inputRef }}
            />
         </motion.div>
         {children}
         <IconButton
            className="search_icon_container"
            onClick={handleSearchClick}
            color="primary"
         >
            {loading ? (
               <CircularProgress
                  color="primary"
                  className="search_loading"
                  size={32}
               />
            ) : (
               <SearchIcon className="search_icon" />
            )}
         </IconButton>
      </div>
   );
};

export default SearchBar;
