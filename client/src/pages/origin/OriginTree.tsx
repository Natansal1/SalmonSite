import React, { useEffect, useRef } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { TransformWrapper, TransformComponent, ReactZoomPanPinchContentRef } from "react-zoom-pan-pinch";
import FamilyTree from "../../components/FamilyTree/FamilyTree";
import { FamilyMember } from "../../common/types/ServerTypes/FamilyMember";

import "../../styles/pages/origin.scss";

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

const OriginTree: React.FC = () => {
   const zoomRef = useRef<ReactZoomPanPinchContentRef | null>(null);
   const containerRef = useRef<HTMLDivElement>(null);

   function sizeToFull() {
      const tree = document.getElementsByClassName("origin_family_tree")[0];
      if (!tree || !containerRef.current || !zoomRef.current) return;
      const { height: containerHeight, width: containerWidth } = containerRef.current.getBoundingClientRect();
      const { height: treeHeight, width: treeWidth } = tree.getBoundingClientRect();

      const scaleY = containerHeight / treeHeight;
      const scaleX = containerWidth / treeWidth;

      const scale = Math.min(scaleX, scaleY);
      console.log('scale: ', scale);
      zoomRef.current.centerView(scale);
   }

   useEffect(sizeToFull, []);

   return (
      <PageWrapper
         className="page origin_tree"
         ref={containerRef}
      >
         <TransformWrapper
            initialScale={1}
            minScale={1}
            centerOnInit
            ref={zoomRef}
         >
            <TransformComponent>
               <FamilyTree
                  members={temp}
                  className="origin_family_tree"
               />
            </TransformComponent>
         </TransformWrapper>
      </PageWrapper>
   );
};

export default OriginTree;
