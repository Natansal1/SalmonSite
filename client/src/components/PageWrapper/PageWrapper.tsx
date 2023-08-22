
import React from "react";
import useLocationTransition from "../../common/hooks/useLocationTransition";

interface PageWrapperProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const PageWrapper: React.FC<PageWrapperProps> = (props) => {
   const { style = {}, ...rest } = props;
   const transitionState = useLocationTransition();

   return (
      <div
         style={{ ...style, ...transitionState }}
         {...rest}
      />
   );
};

export default PageWrapper;
