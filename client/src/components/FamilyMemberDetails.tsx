import React from "react";
import { FamilyMember } from "../common/types/ServerTypes/FamilyMember";
import { FormDateInput, FormImageInput, FormProvider, FormTextInput } from "@hilma/forms";
import { useFiles } from "@hilma/fileshandler-client";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { MediaType } from "../common/types";
import axios from "axios";

interface FamilyMemberDetailsProps {
   member?: FamilyMember;
}

function getInitialValues(member?: FamilyMember) {
   if (member) {
      const { _id, media, ...rest } = member;
      return {
         ...rest,
         photo: media?.src ?? "",
      };
   }
   return {
      firstName: "",
      lastName: "",
      DOB: new Date(),
      DOD: undefined,
      photo: "",
   };
}

// const VALIDATION_SCHEMA = 

const FamilyMemberDetails: React.FC<FamilyMemberDetailsProps> = (props) => {
   const { member } = props;
   const isNew = !Boolean(member);
   const fileUploader = useFiles();

   async function handleSubmit(values: ReturnType<typeof getInitialValues>) {
      const { photo, ...rest } = values;
      const newMember: Omit<FamilyMember, "_id"> = {
         ...rest,
         media: photo
            ? {
                 src: photo,
                 type: MediaType.IMAGE,
              }
            : undefined,
      };

      if (isNew) {
         await axios.post("/api/family-member", newMember);
      } else {
         await axios.patch(`/api/family-member/${member!._id}`);
      }
   }

   return (
      <Dialog open>
         <FormProvider
            initialValues={getInitialValues(member)}
            onSubmit={handleSubmit}
         >
            <DialogTitle>{`${!isNew ? "הוספת" : "עריכת"} בן משפחה`}</DialogTitle>
            <DialogContent>
               <FormImageInput
                  filesUploader={fileUploader}
                  name="photo"
                  label="תמונת פרופיל"
                  buttonText="הוספת תמונה"
                  rounded
               />
               <FormTextInput
                  name="firstName"
                  label="שם פרטי"
               />
               <FormTextInput
                  name="lastName"
                  label="שם משפחה"
               />
               <FormDateInput
                  name="DOB"
                  label="תאריך לידה"
               />
               <FormDateInput
                  name="DOD"
                  label="תאריך פטירה"
               />
            </DialogContent>
            <DialogActions>
               <Button type="submit">שמירה</Button>
            </DialogActions>
         </FormProvider>
      </Dialog>
   );
};

export default FamilyMemberDetails;
