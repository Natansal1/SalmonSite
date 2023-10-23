import React, { createContext, useCallback, useEffect, useRef, useState } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import {
   TransformWrapper,
   TransformComponent,
   ReactZoomPanPinchContentRef,
   ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import FamilyTree from "../../components/FamilyTree/FamilyTree";
import { FamilyMember } from "../../common/types/ServerTypes/FamilyMember";
import { motion } from "framer-motion";

import "../../styles/pages/origin.scss";
import { useTimeout, useWait, useWindowListener } from "../../common/hooks";
import Title from "../../components/Title";
import { getInnerSize } from "../../common/functions";
import { createContextHook } from "@hilma/tools";
import clsx from "clsx";

const temp: FamilyMember[] = [
   {
      _id: "1",
      firstName: "John",
      lastName: "Doe",
      DOB: new Date("1980-01-15"),
      gender: "male",
      partner: "2",
   },
   {
      _id: "2",
      firstName: "Jane",
      lastName: "Doe",
      DOB: new Date("1982-03-20"),
      gender: "female",
      partner: "1",
   },
   {
      _id: "3",
      firstName: "Alice",
      lastName: "Smith",
      DOB: new Date("1990-05-10"),
      gender: "female",
      parents: {
         mother: "2",
         father: "1",
      },
   },
   {
      _id: "4",
      firstName: "Michael",
      lastName: "Johnson",
      DOB: new Date("1985-09-25"),
      gender: "male",
      partner: "5",
      parents: {
         mother: "2",
         father: "1",
      },
   },
   {
      _id: "5",
      firstName: "Emily",
      lastName: "Davis",
      DOB: new Date("1987-12-12"),
      gender: "female",
      partner: "4",
   },
   {
      _id: "6",
      firstName: "Daniel",
      lastName: "Brown",
      DOB: new Date("1992-07-08"),
      gender: "male",
      parents: {
         mother: "5",
         father: "4",
      },
   },
   {
      _id: "7",
      firstName: "Sophia",
      lastName: "Wilson",
      DOB: new Date("1994-04-03"),
      gender: "female",
      parents: {
         mother: "5",
         father: "4",
      },
   },
   {
      _id: "8",
      firstName: "Sophia",
      lastName: "Wilson",
      DOB: new Date("1994-04-03"),
      gender: "male",
      parents: {
         mother: "5",
         father: "4",
      },
   },
   {
      _id: "9",
      firstName: "Alice",
      lastName: "Smith",
      DOB: new Date("1990-05-10"),
      gender: "female",
      parents: {
         mother: "2",
         father: "1",
      },
   },
];

export type OriginContextValue = {
   members: FamilyMember[];
   centerOnMember: (id: string) => void;
};

const OriginContext = createContext<OriginContextValue | null>(null);
OriginContext.displayName = "originContext";
export const useOriginContext = createContextHook(OriginContext);

const OriginTree: React.FC = () => {
   const minScale = useRef<number | null>(null);
   const [titleVisible, setTitleVisible] = useState<boolean>(true);
   const zoomRef = useRef<ReactZoomPanPinchContentRef | null>(null);
   const containerRef = useRef<HTMLDivElement | null>(null);
   const titleVisTimeout = useTimeout();
   const wait = useWait();

   useEffect(sizeToFull, []);

   useEffect(() => {
      if (titleVisible === true && minScale.current)
         wait(200).then(() => zoomRef.current?.centerView(minScale.current ?? 0, 300, "easeInOutCubic"));
   }, [titleVisible]);

   useWindowListener("resize", sizeToFull);

   function sizeToFull() {
      if (!zoomRef.current) return;

      const scale = calcMinScale();

      if (!scale) return;

      if (!minScale.current) {
         minScale.current = scale;
      }
   }

   function calcMinScale() {
      //get the tree element
      const tree = document.getElementsByClassName("origin_family_tree")[0];

      if (!tree || !containerRef.current) return null;

      //get the height and width of the page
      const { height: containerHeight, width: containerWidth } = getInnerSize(containerRef.current);

      //get the tree height and width (regardless of scale)
      const { height: treeHeight, width: treeWidth } = getInnerSize(tree);

      if (!treeWidth || !treeHeight) return null;

      const scaleY = containerHeight / treeHeight;
      const scaleX = containerWidth / treeWidth;
      const scale = Math.min(scaleX, scaleY);

      return scale;
   }

   function handleTitleMove(scale: number) {
      if (scale === minScale.current) titleVisTimeout.set(() => setTitleVisible(true), 50);
      else if (minScale.current !== null) titleVisTimeout.set(() => setTitleVisible(false), 50);
   }

   function centerOnMember(id: string) {
      const elm = document.getElementById(id);
      if (!elm || !zoomRef.current) return;
      zoomRef.current.zoomToElement(elm);
   }

   return (
      <OriginContext.Provider value={{ members: temp, centerOnMember }}>
         <PageWrapper className="page origin_tree">
            <motion.div
               animate={titleVisible ? "visible" : "hidden"}
               initial="visible"
               variants={{
                  visible: {
                     height: "auto",
                     overflow: "hidden",
                  },
                  hidden: {
                     overflow: "hidden",
                     height: "0",
                  },
               }}
            >
               <Title>העץ המשפחתי</Title>
            </motion.div>
            <div
               className={clsx("tree_main_container", { full: !titleVisible })}
               ref={(ref) => ((containerRef.current = ref), sizeToFull())}
            >
               <TransformWrapper
                  minScale={minScale.current ?? undefined}
                  centerOnInit
                  ref={zoomRef}
                  doubleClick={{
                     disabled: true,
                  }}
                  limitToBounds
                  onWheel={(r) => handleTitleMove(r.state.scale)}
               >
                  <TransformComponent>
                     <FamilyTree className="origin_family_tree" />
                  </TransformComponent>
               </TransformWrapper>
            </div>
         </PageWrapper>
      </OriginContext.Provider>
   );
};

export default OriginTree;
