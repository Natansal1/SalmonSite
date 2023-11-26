import clsx from "clsx";
import React from "react";
import { TREE_NODE_SIZE } from "./FamilyTreeNode";
import { ExtNode } from "relatives-tree/lib/types";
import { Avatar } from "@mui/material";

interface LoadingNodeProps {
   node: ExtNode;
}

const LoadingNode: React.FC<LoadingNodeProps> = (props) => {
   const {
      node: { left, top },
   } = props;
   return (
      <div
         className={clsx("family_tree_node")}
         style={{
            ...TREE_NODE_SIZE,
            position: "absolute",
            transform: `translate(${left * (TREE_NODE_SIZE.width / 2)}px, ${top * (TREE_NODE_SIZE.height / 2)}px)`,
            padding: `${TREE_NODE_SIZE.height / 5}px ${TREE_NODE_SIZE.width / 5}px`,
         }}
      >
         <button className="node_inner">
            <Avatar className={clsx("node_avatar", "node_twinkle")} />
         </button>
      </div>
   );
};

export default LoadingNode;
