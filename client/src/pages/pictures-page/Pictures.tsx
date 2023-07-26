import React from "react";
import CardsLineup from "../../components/CardsLineup";

import "../../styles/pages/pictures-page.scss";

const Pictures: React.FC = () => {
   return (
      <div className="pictures_page page">
         <CardsLineup
            onClick={(id) => console.log(id)}
            images={[
               {
                  id: 1,
                  src: "https://assets.editorial.aetnd.com/uploads/2009/10/dinosaurs-gettyimages-1330203143.jpg?width=768",
                  alt: "alt",
                  text: "תמונה יאיי",
                  subtext: "וואו אין על זה",
               },
               {
                  id: 2,
                  src: "https://media.cnn.com/api/v1/images/stellar/prod/230314153048-02-dinosaur-record-long-neck.jpg?c=4x3",
                  alt: "alt",
                  text: "תמונה יאיי",
               },
               {
                  id: 3,
                  src: "https://images.fineartamerica.com/images-medium-large-5/a-pair-of-carnotaurus-dinosaurs-hunting-kurt-miller.jpg",
                  alt: "alt",
                  text: "תמונה יאיי",
                  subtext: "וואו אין על זה",
               },
               {
                  id: 4,
                  src: "https://www.nawpic.com/media/2020/dinosaur-nawpic-26-260x534.jpg",
                  alt: "alt",
                  text: "תמונה יאיי",
                  subtext: "וואו אין על זה",
               },
               {
                  id: 5,
                  src: "https://cst.brightspotcdn.com/dims4/default/e1215f1/2147483647/strip/false/crop/1280x713+0+0/resize/1280x713!/quality/90/?url=https%3A%2F%2Fcdn.vox-cdn.com%2Fthumbor%2FijINmgCi2JI6Hjzz5DUw31Dhho0%3D%2F0x0%3A1280x713%2F1280x713%2Ffilters%3Afocal%281129x484%3A1130x485%29%2Fcdn.vox-cdn.com%2Fuploads%2Fchorus_asset%2Ffile%2F24678391%2FSpinosaurus_2021.png",
                  alt: "alt",
                  text: "תמונה יאיי",
               },
            ]}
         />
      </div>
   );
};

export default Pictures;
