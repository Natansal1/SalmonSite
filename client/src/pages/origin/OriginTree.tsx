import React, { createContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import axios from "axios";
import { TransformWrapper, TransformComponent, ReactZoomPanPinchContentRef } from "react-zoom-pan-pinch";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { IconButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { createContextHook } from "@hilma/tools";

import { FamilyMember } from "../../common/types/ServerTypes/FamilyMember";
import { useTimeout, useWait, useWindowListener } from "../../common/hooks";
import { getInnerSize } from "../../common/functions";
import { queryKeys } from "../../common/enums";

import { TREE_NODE_SIZE } from "../../components/FamilyTree/FamilyTreeNode";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import FamilyTree from "../../components/FamilyTree/FamilyTree";
import Title from "../../components/Title";

import "../../styles/pages/origin.scss";

export type OriginContextValue = {
   members: FamilyMember[] | undefined;
   centerOnMember: (elm: HTMLElement | null) => void;
};

const OriginContext = createContext<OriginContextValue | null>(null);
OriginContext.displayName = "originContext";
export const useOriginContext = createContextHook(OriginContext);

const OriginTree: React.FC = () => {
   const minScale = useRef<number | null>(null);
   const [titleVisible, setTitleVisible] = useState<boolean>(true);
   const zoomRef = useRef<ReactZoomPanPinchContentRef | null>(null);
   const containerRef = useRef<HTMLDivElement>(null);
   const titleVisTimeout = useTimeout();
   const wait = useWait();

   const { data: members, status } = useQuery({
      queryFn: async () => (await axios.get<FamilyMember[]>("/api/family-member")).data,
      queryKey: [queryKeys.ORIGIN_MEMBERS],
   });

   useEffect(sizeToFull, [members]);

   useEffect(() => {
      if (titleVisible === true && minScale.current)
         wait(200).then(
            () => (
               zoomRef.current?.zoomToElement(zoomRef.current.instance.contentComponent ?? "div"),
               zoomRef.current?.centerView(minScale.current ?? 0, 300, "easeInOutCubic")
            ),
         );
   }, [titleVisible]);

   useWindowListener("resize", sizeToFull);

   function sizeToFull() {
      const scale = calcMinScale();

      if (!scale) return;

      if (!minScale.current && status == "success") {
         minScale.current = scale;
      }
      wait(200).then(() => {
         zoomRef.current?.zoomToElement(zoomRef.current.instance.contentComponent ?? "div");
         zoomRef.current?.centerView(scale, 300, "easeInOutCubic");
      });
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

      //-(height / 2) to height to simulate padding
      const scaleY =
         (containerHeight - TREE_NODE_SIZE.height / 2) / treeHeight -
         (((containerHeight - TREE_NODE_SIZE.height / 2) / treeHeight) % 0.01);
      const scaleX = containerWidth / treeWidth - ((containerWidth / treeWidth) % 0.01);
      return Math.min(scaleX, scaleY);
   }

   function handleTitleMove(scale: number) {
      if (scale === minScale.current) titleVisTimeout.set(() => setTitleVisible(true), 50);
      else if (minScale.current !== null) titleVisTimeout.set(() => setTitleVisible(false), 50);
   }

   function centerOnMember(elm: HTMLElement | null) {
      if (!elm || !zoomRef.current) return;
      zoomRef.current.zoomToElement(elm);
      setTitleVisible(false);
   }

   function fullScreen() {
      if (zoomRef.current && minScale.current) {
         zoomRef.current.centerView(minScale.current);
         setTitleVisible(true);
      }
   }

   return (
      <OriginContext.Provider value={{ members, centerOnMember }}>
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
               ref={containerRef}
               onDoubleClick={fullScreen}
            >
               <TransformWrapper
                  initialScale={minScale.current ?? 0.5}
                  minScale={minScale.current ?? undefined}
                  ref={zoomRef}
                  limitToBounds
                  centerOnInit
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
