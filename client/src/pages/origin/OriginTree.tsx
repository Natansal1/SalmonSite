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
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { IconButton } from "@mui/material";

const temp: FamilyMember[] = [
   {
      _id: "1",
      firstName: "משה",
      lastName: "סולומון",
      DOB: new Date("1980-01-15"),
      gender: "male",
      partner: "2",
   },
   {
      _id: "2",
      firstName: "גינה",
      lastName: "סולומון",
      DOB: new Date("1982-03-20"),
      gender: "female",
      partner: "1",
   },
   {
      _id: "3",
      firstName: "אשר ישעיהו",
      lastName: "שלמון",
      DOB: new Date("1910-05-10"),
      gender: "male",
      partner: "4",
      parents: {
         mother: "2",
         father: "1",
      },
   },
   {
      _id: "4",
      firstName: "לאה",
      lastName: "שלמון",
      DOB: new Date("1915-03-07"),
      gender: "female",
      partner: "3",
      parents: {
         mother: "5",
         father: "6",
      },
   },
   {
      _id: "5",
      firstName: "אהרון",
      lastName: "ארנשטיין",
      DOB: new Date("1987-12-12"),
      gender: "male",
      partner: "6",
   },
   {
      _id: "6",
      firstName: "מלכה",
      lastName: "ארנשטיין",
      DOB: new Date("1992-07-08"),
      gender: "female",
   },
   {
      _id: "7",
      firstName: "יצחק",
      lastName: "ויס",
      DOB: new Date("1994-04-03"),
      gender: "male",
      partner: "8",
   },
   {
      _id: "8",
      firstName: "שושנה",
      lastName: "ויס",
      DOB: new Date("1994-04-03"),
      gender: "female",
      partner: "7",
   },
   {
      _id: "9",
      firstName: "יהודה",
      lastName: "הראל",
      DOB: new Date("1990-05-10"),
      gender: "male",
      parents: {
         mother: "8",
         father: "7",
      },
      partner: "10",
   },
   {
      _id: "10",
      firstName: "עליזה",
      lastName: "הראל",
      DOB: new Date("1990-05-10"),
      gender: "female",
      parents: {
         father: "11",
         mother: "12",
      },
      partner: "9",
   },
   {
      _id: "11",
      firstName: "דוד יהודה",
      lastName: "שוורץ",
      DOB: new Date("1990-05-10"),
      gender: "male",
      partner: "12",
   },
   {
      _id: "12",
      firstName: "מרים",
      lastName: "שוורץ",
      DOB: new Date("1990-05-10"),
      gender: "female",
      partner: "11",
   },
   {
      _id: "13",
      firstName: "שושנה",
      lastName: "שלמון",
      DOB: new Date("1990-05-10"),
      gender: "female",
      parents: {
         mother: "9",
         father: "10",
      },
      partner: "14",
   },
   {
      _id: "14",
      firstName: "ישראל",
      lastName: "שלמון",
      DOB: new Date("1990-05-10"),
      gender: "male",
      parents: {
         mother: "4",
         father: "3",
      },
      partner: "13",
   },
   {
      _id: "15",
      firstName: "ישעיהו אשר",
      lastName: "שלמון",
      DOB: new Date("1990-05-10"),
      gender: "male",
      parents: {
         mother: "13",
         father: "14",
      },
   },
   {
      _id: "16",
      firstName: "מיכאל",
      lastName: "שלמון",
      DOB: new Date("1990-05-10"),
      gender: "male",
      parents: {
         mother: "13",
         father: "14",
      },
   },
   {
      _id: "17",
      firstName: "עירית",
      lastName: "שלמון",
      DOB: new Date("1990-05-10"),
      gender: "female",
      parents: {
         mother: "13",
         father: "14",
      },
   },
   {
      _id: "18",
      firstName: "יוני",
      lastName: "שלמון",
      DOB: new Date("1990-05-10"),
      gender: "male",
      parents: {
         mother: "13",
         father: "14",
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

      const scaleY = containerHeight / treeHeight - ((containerHeight / treeHeight) % 0.01);
      const scaleX = containerWidth / treeWidth - ((containerWidth / treeWidth) % 0.01);
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

   function fullScreen() {
      if (zoomRef.current && minScale.current) {
         zoomRef.current.centerView(minScale.current);
         setTitleVisible(true);
      }
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
               <Title
                  lordIcon={{
                     src: "https://cdn.lordicon.com/bzrhdlij.json",
                     colors: "primary:#121331,secondary:#16c79e",
                     trigger: "hover",
                     type: 1,
                  }}
               >
                  העץ המשפחתי
               </Title>
            </motion.div>
            <div
               className={clsx("tree_main_container", { full: !titleVisible })}
               ref={(ref) => ((containerRef.current = ref), sizeToFull())}
               onDoubleClick={() => fullScreen()}
            >
               <TransformWrapper
                  initialScale={minScale.current ?? 0.5}
                  minScale={minScale.current ?? undefined}
                  centerOnInit
                  ref={zoomRef}
                  limitToBounds
                  onZoom={(r) => handleTitleMove(r.state.scale)}
                  wheel={{
                     smoothStep: 0.001,
                  }}
                  doubleClick={{
                     disabled: true,
                  }}
               >
                  <TransformComponent>
                     <FamilyTree className="origin_family_tree" />
                  </TransformComponent>
               </TransformWrapper>
            </div>
            {!titleVisible && (
               <IconButton
                  className="expand_tree_btn"
                  onClick={fullScreen}
               >
                  <FullscreenExitIcon />
               </IconButton>
            )}
         </PageWrapper>
      </OriginContext.Provider>
   );
};

export default OriginTree;
