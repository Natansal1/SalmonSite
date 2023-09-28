import React, { useMemo } from "react";
import ReactFamilyTree from "react-family-tree";
import { Node, ExtNode, Gender, RelType } from "relatives-tree/lib/types";
import { FamilyMember } from "../../common/types/ServerTypes/FamilyMember";
import FamilyTreeNode, { TREE_NODE_SIZE } from "./FamilyTreeNode";

import "../../styles/components/family-tree.scss";
import clsx from "clsx";
import { useOriginContext } from "../../pages/origin/OriginTree";

interface FamilyTreeProps {
   className?: string;
}

const FamilyTree: React.FC<FamilyTreeProps> = (props) => {
   const { className } = props;
   const { members } = useOriginContext();

   const nodes = useMemo<({ member: FamilyMember } & Node)[]>(() => {
      return members.map((member, _i, arr) => {
         const { _id, parents, gender, partner } = member;

         //build children
         const children = arr
            .filter((val) => val.parents?.father === _id || val.parents?.mother === _id)
            .map((val) => ({ id: val._id, type: "blood" as RelType }));

         //build parents
         const parentsArr = [];
         if (parents?.father) parentsArr.push({ id: parents.father, type: "blood" as RelType });
         if (parents?.mother) parentsArr.push({ id: parents.mother, type: "blood" as RelType });

         //build siblings
         const siblings = arr
            .filter((val) => val.parents?.father === parents?.father || val.parents?.mother === parents?.mother)
            .map((val) => ({ id: val._id, type: "blood" as RelType }));

         //build spouses
         const spouses = partner ? [{ id: partner, type: "married" as RelType }] : [];

         return {
            id: _id,
            children,
            gender: gender as Gender,
            parents: parentsArr,
            siblings,
            spouses,
            member,
         };
      });
   }, [members]);

   if (!members.length) return null;

   return (
      <ReactFamilyTree
         className={clsx(className, "family_tree")}
         nodes={nodes}
         rootId={members.find((val) => !val.parents)?._id ?? members[0]._id}
         renderNode={(node) => (
            <FamilyTreeNode
               node={node as ExtNode & { member: FamilyMember }}
               key={node.id}
            />
         )}
         {...TREE_NODE_SIZE}
      />
   );
};

export default FamilyTree;
