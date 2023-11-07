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

   function deepestChild() {
      const roots = members.filter((val) => !val.parents || (!val.parents.father && !val.parents.mother));
      return (roots
         .map((root) => recursiveChildrenDepth(root._id))
         .reduce((prev, curr) => (prev[1] > curr[1] ? prev : curr), [null as FamilyMember | null, 0]) ?? [
         members[0],
         0,
      ])[0]!._id;
   }

   function recursiveChildrenDepth(parentId: string, depth: number = 0): [FamilyMember | null, number] {
      let parent: FamilyMember | null = null;
      const children: FamilyMember[] = [];
      for (let i = 0; i < members.length; i++) {
         if (members[i]._id === parentId) parent = members[i];
         else if (members[i].parents?.father === parentId || members[i].parents?.mother === parentId)
            children.push(members[i]);
      }
      if (parent === null) throw new Error("No member found with given ID");

      //exit cond - if there are no children
      if (children.length === 0) return [parent, depth];

      const deepest = children
         .map((child) => recursiveChildrenDepth(child._id, depth + 1))
         .reduce(
            (prev, curr) => (prev[0] !== null ? (prev[1] < curr[1] ? curr : prev) : curr),
            [null as null | FamilyMember, depth],
         );

      return deepest;
   }

   const deepestId = useMemo(deepestChild, []);

   if (!members.length) return null;

   return (
      <ReactFamilyTree
         className={clsx(className, "family_tree")}
         nodes={nodes}
         rootId={deepestId}
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
