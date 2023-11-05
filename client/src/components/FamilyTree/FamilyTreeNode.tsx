import React from "react";
import { ExtNode } from "relatives-tree/lib/types";
import { FamilyMember } from "../../common/types/ServerTypes/FamilyMember";
import { Avatar, Button, Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import { MySwitch, formatDate, retSwitch } from "../../common/functions";
import { MediaType } from "../../common/types";
import clsx from "clsx";
import { useOriginContext } from "../../pages/origin/OriginTree";
interface FamilyTreeNodeProps {
   node: ExtNode & { member: FamilyMember };
}

export const TREE_NODE_SIZE = {
   height: 700,
   width: 600,
};

const FamilyTreeNode: React.FC<FamilyTreeNodeProps> = (props) => {
   const {
      node: { member, top, left, id },
   } = props;
   const { centerOnMember } = useOriginContext();

   const { firstName, lastName, media, DOB, DOD, gender, hasPage } = member;

   const initials = firstName[0] + lastName[0];
   const dates = DOD ? `${formatDate(DOB).date} - ${formatDate(DOD).date}` : `${formatDate(DOB).date}`;
   const fullName = `${firstName} ${lastName}`;

   return (
      <div
         className="family_tree_node"
         style={{
            ...TREE_NODE_SIZE,
            position: "absolute",
            transform: `translate(${left * (TREE_NODE_SIZE.width / 2)}px, ${top * (TREE_NODE_SIZE.height / 2)}px)`,
            padding: `${TREE_NODE_SIZE.height / 5}px ${TREE_NODE_SIZE.width / 5}px`,
         }}
         id={id}
         onDoubleClick={(e) => (e.stopPropagation(), centerOnMember(id))}
      >
         <Card className={clsx("tn_content", { clickable: hasPage }, gender)}>
            <CardHeader
               avatar={
                  <Avatar
                     src={media?.src}
                     alt={initials}
                  >
                     {initials}
                  </Avatar>
               }
               title={fullName}
               subheader={dates}
            />
            {media ? (
               <CardMedia
                  component={media.type === MediaType.VIDEO ? "video" : "img"}
                  image={media.src}
                  alt={initials}
               />
            ) : (
               <CardContent>
                  <h1>{fullName}</h1>
               </CardContent>
            )}
         </Card>
      </div>
   );
};

export default FamilyTreeNode;
