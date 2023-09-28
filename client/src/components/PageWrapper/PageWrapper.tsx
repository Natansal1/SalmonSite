import React from "react";
import useLocationTransition from "../../common/hooks/useLocationTransition";

interface PageWrapperProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
   forwardRef?: React.MutableRefObject<HTMLDivElement | null> | ((ref: HTMLDivElement | null) => void);
}

const PageWrapper: React.FC<PageWrapperProps> = (props) => {
   const { style = {}, forwardRef, ...rest } = props;
   const transitionState = useLocationTransition();

   return (
      <div
         ref={(ref) => {
            if (forwardRef) {
               if (forwardRef instanceof Function) forwardRef(ref);
               else forwardRef.current = ref;
            }
         }}
         style={{ ...style, ...transitionState }}
         {...rest}
      />
   );
};

export default PageWrapper;
