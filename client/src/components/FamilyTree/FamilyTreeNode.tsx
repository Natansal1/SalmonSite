import React from "react";
import { Node, ExtNode, Gender, RelType } from "relatives-tree/lib/types";
import { FamilyMember } from "../../common/types/ServerTypes/FamilyMember";
import { Card } from "@mui/material";

interface FamilyTreeNodeProps {
   node: ExtNode & { member: FamilyMember };
}

export const TREE_NODE_SIZE = {
   height: 150,
   width: 150,
};

const FamilyTreeNode: React.FC<FamilyTreeNodeProps> = (props) => {
   const {
      node: { member, top, left, id },
   } = props;
   return (
      <div
         className="family_tree_node"
         style={{
            ...TREE_NODE_SIZE,
            position: "absolute",
            transform: `translate(${left * (TREE_NODE_SIZE.width / 2)}px, ${top * (TREE_NODE_SIZE.height / 2)}px)`,
         }}
      >
         <Card className="tn_content">{id}</Card>
      </div>
   );
};

export default FamilyTreeNode;
