import React, { useRef } from "react";
import { ExtNode } from "relatives-tree/lib/types";
import { FamilyMember } from "../../common/types/ServerTypes/FamilyMember";
import { Avatar } from "@mui/material";
import { formatDate, } from "../../common/functions";
import clsx from "clsx";
import { useOriginContext } from "../../pages/origin/OriginTree";
import { useNavigate } from "react-router-dom";
interface FamilyTreeNodeProps {
   node: ExtNode & { member: FamilyMember };
}

export const TREE_NODE_SIZE = {
   height: 175,
   width: 150,
};

const FamilyTreeNode: React.FC<FamilyTreeNodeProps> = (props) => {
   const {
      node: { member, top, left, id },
   } = props;
   const { centerOnMember } = useOriginContext();

   const { firstName, lastName, media, DOB, DOD, gender, hasPage } = member;
   const navigate = useNavigate();
   const elm = useRef<HTMLDivElement>(null);

   const initials = firstName[0] + lastName[0];
   const dates = DOD ? `${formatDate(DOB).date} - ${formatDate(DOD).date}` : `${formatDate(DOB).date}`;
   const fullName = `${firstName} ${lastName}`;

   function handleClick() {
      if (hasPage) navigate(`/origin/${id}`)
   }

   return (
      <div
         className={clsx("family_tree_node", { node_page: hasPage })}
         style={{
            ...TREE_NODE_SIZE,
            position: "absolute",
            transform: `translate(${left * (TREE_NODE_SIZE.width / 2)}px, ${top * (TREE_NODE_SIZE.height / 2)}px)`,
            padding: `${TREE_NODE_SIZE.height / 5}px ${TREE_NODE_SIZE.width / 5}px`,
         }}
         onDoubleClick={(e) => (e.stopPropagation(), centerOnMember(elm.current))}
         ref={elm}
      >
         <button className="node_inner" onClick={handleClick}>
            <Avatar
               src={media?.src}
               alt={initials}
               className={clsx("node_avatar", gender)}
            />
            <div className="node_content" style={{ fontSize: TREE_NODE_SIZE.width / 10 }}>
               <span className="name">{fullName}</span>
               <span className="dates">{dates}</span>
            </div>
         </button>
      </div>
   );
};

export default FamilyTreeNode;
