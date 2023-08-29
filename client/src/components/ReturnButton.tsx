import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ReturnIcon from "@mui/icons-material/Forward";

import "../styles/components/return-button.scss";

interface ReturnButtonProps {
   /**
    * defaults to:
    * ```ts
    * navigate(-1);
    * ```
    */
   onClick?: () => void;
}

const ReturnButton: React.FC<ReturnButtonProps> = (props) => {
   const { onClick = defaultOnClick } = props;
   const navigate = useNavigate();

   function defaultOnClick() {
      navigate(-1);
   }
   return (
      <Button
         className="return_button"
         onClick={onClick}
         variant="contained"
      >
         <ReturnIcon
            className="return_icon"
            fontSize="large"
         />
         חזור
      </Button>
   );
};

export default ReturnButton;
