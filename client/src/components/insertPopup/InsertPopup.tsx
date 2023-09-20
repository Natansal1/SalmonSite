import React, { useState } from "react";
import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   MenuItem,
   SelectChangeEvent,
   TextField,
} from "@mui/material";
import { FormProvider, FormSelect } from "@hilma/forms";
import { Select } from "@mui/material";

type InsertOption = "update" | "story" | "congrats" | "event" | "family-picture";

const INSERT_OPTIONS: { content: string; value: InsertOption }[] = [
   { value: "update", content: "" },
   { value: "story", content: "" },
   { value: "congrats", content: "" },
   { value: "event", content: "" },
   { value: "family-picture", content: "" },
];

interface InsertPopupProps {
   open: boolean;
   onClose: () => void;
}

const InsertPopup: React.FC<InsertPopupProps> = (props) => {
   const { open, onClose } = props;
   const [selection, setSelection] = useState<InsertOption>("event");

   function handleSelectionChange(event: SelectChangeEvent<InsertOption>) {
      setSelection(event.target.value as InsertOption);
   }

   function handleSave() {
      onClose();
   }

   return (
      <Dialog
         open={true}
         onClose={onClose}
      >
         <DialogTitle>הוספה</DialogTitle>
         <DialogContent>
            <Select
               value={selection}
               onChange={handleSelectionChange}
            >
               {INSERT_OPTIONS.map(({ content, value }) => (
                  <MenuItem value={value}>{content}</MenuItem>
               ))}
            </Select>
         </DialogContent>
         <DialogActions>
            <Button onClick={onClose}>ביטול</Button>
            <Button onClick={handleSave}>שמירה</Button>
         </DialogActions>
      </Dialog>
   );
};

export default InsertPopup;
