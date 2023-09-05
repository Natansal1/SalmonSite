import "react";

export type LordIconTrigger = "hover" | "click" | "loop" | "loop-on-hover" | "morph" | "morph-two-way" | "boomerang";

type LordIconProps = {
   src?: string;
   trigger?: LordIconTrigger;
   colors?: string;
   delay?: string | number;
};

type LordIconElement = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & LordIconProps;

declare global {
   // eslint-disable-next-line @typescript-eslint/no-namespace
   namespace JSX {
      interface IntrinsicElements {
         "lord-icon": LordIconElement;
      }
   }
}
