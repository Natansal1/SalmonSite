import React from "react";
import ImageViewer from "../../components/ImageViewer/ImageViewer";
import { MediaType } from "../../common/types";

import "../../styles/components/picture-group.scss";

const PictureGroups: React.FC = () => {
   return (
      <div className="page page_scroll">
         <h1 className="title">כותרת יפה</h1>
         <div className="picture_groups_container">
            <div className="picture_group">
               <h2 className="picture_group_title">כוכתרת 2</h2>
               <ImageViewer
                //   showBullets={false}
                  showThumbnails={false}
                  media={[
                     {
                        src: "https://assets.editorial.aetnd.com/uploads/2009/10/dinosaurs-gettyimages-1330203143.jpg?width=768",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                     {
                        src: "https://media.cnn.com/api/v1/images/stellar/prod/230314153048-02-dinosaur-record-long-neck.jpg?c=4x3",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                     {
                        src: "https://images.fineartamerica.com/images-medium-large-5/a-pair-of-carnotaurus-dinosaurs-hunting-kurt-miller.jpg",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                     {
                        src: "https://www.nawpic.com/media/2020/dinosaur-nawpic-26-260x534.jpg",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                     {
                        src: "https://cst.brightspotcdn.com/dims4/default/e1215f1/2147483647/strip/false/crop/1280x713+0+0/resize/1280x713!/quality/90/?url=https%3A%2F%2Fcdn.vox-cdn.com%2Fthumbor%2FijINmgCi2JI6Hjzz5DUw31Dhho0%3D%2F0x0%3A1280x713%2F1280x713%2Ffilters%3Afocal%281129x484%3A1130x485%29%2Fcdn.vox-cdn.com%2Fuploads%2Fchorus_asset%2Ffile%2F24678391%2FSpinosaurus_2021.png",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                     {
                        src: "https://assets.editorial.aetnd.com/uploads/2009/10/dinosaurs-gettyimages-1330203143.jpg?width=768",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                     {
                        src: "https://media.cnn.com/api/v1/images/stellar/prod/230314153048-02-dinosaur-record-long-neck.jpg?c=4x3",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                  ]}
               />
            </div>
            <div className="picture_group">
               <h2 className="title">כוכתרת 2</h2>
               <ImageViewer
                  // showBullets={false}
                  // showThumbnails={false}
                  media={[
                     {
                        src: "https://assets.editorial.aetnd.com/uploads/2009/10/dinosaurs-gettyimages-1330203143.jpg?width=768",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                     {
                        src: "https://media.cnn.com/api/v1/images/stellar/prod/230314153048-02-dinosaur-record-long-neck.jpg?c=4x3",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                     {
                        src: "https://images.fineartamerica.com/images-medium-large-5/a-pair-of-carnotaurus-dinosaurs-hunting-kurt-miller.jpg",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                     {
                        src: "https://www.nawpic.com/media/2020/dinosaur-nawpic-26-260x534.jpg",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                     {
                        src: "https://cst.brightspotcdn.com/dims4/default/e1215f1/2147483647/strip/false/crop/1280x713+0+0/resize/1280x713!/quality/90/?url=https%3A%2F%2Fcdn.vox-cdn.com%2Fthumbor%2FijINmgCi2JI6Hjzz5DUw31Dhho0%3D%2F0x0%3A1280x713%2F1280x713%2Ffilters%3Afocal%281129x484%3A1130x485%29%2Fcdn.vox-cdn.com%2Fuploads%2Fchorus_asset%2Ffile%2F24678391%2FSpinosaurus_2021.png",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                     {
                        src: "https://assets.editorial.aetnd.com/uploads/2009/10/dinosaurs-gettyimages-1330203143.jpg?width=768",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                     {
                        src: "https://media.cnn.com/api/v1/images/stellar/prod/230314153048-02-dinosaur-record-long-neck.jpg?c=4x3",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                  ]}
               />
            </div>
            <div className="picture_group">
               <h2 className="title">כוכתרת 2</h2>
               <ImageViewer
                  // showBullets={false}
                  // showThumbnails={false}
                  media={[
                     {
                        src: "https://assets.editorial.aetnd.com/uploads/2009/10/dinosaurs-gettyimages-1330203143.jpg?width=768",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                     {
                        src: "https://media.cnn.com/api/v1/images/stellar/prod/230314153048-02-dinosaur-record-long-neck.jpg?c=4x3",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                     {
                        src: "https://images.fineartamerica.com/images-medium-large-5/a-pair-of-carnotaurus-dinosaurs-hunting-kurt-miller.jpg",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                     {
                        src: "https://www.nawpic.com/media/2020/dinosaur-nawpic-26-260x534.jpg",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                     {
                        src: "https://cst.brightspotcdn.com/dims4/default/e1215f1/2147483647/strip/false/crop/1280x713+0+0/resize/1280x713!/quality/90/?url=https%3A%2F%2Fcdn.vox-cdn.com%2Fthumbor%2FijINmgCi2JI6Hjzz5DUw31Dhho0%3D%2F0x0%3A1280x713%2F1280x713%2Ffilters%3Afocal%281129x484%3A1130x485%29%2Fcdn.vox-cdn.com%2Fuploads%2Fchorus_asset%2Ffile%2F24678391%2FSpinosaurus_2021.png",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                     {
                        src: "https://assets.editorial.aetnd.com/uploads/2009/10/dinosaurs-gettyimages-1330203143.jpg?width=768",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                     {
                        src: "https://media.cnn.com/api/v1/images/stellar/prod/230314153048-02-dinosaur-record-long-neck.jpg?c=4x3",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                  ]}
               />
            </div>
            <div className="picture_group">
               <h2 className="title">כוכתרת 2</h2>
               <ImageViewer
                  // showBullets={false}
                  // showThumbnails={false}
                  media={[
                     {
                        src: "https://assets.editorial.aetnd.com/uploads/2009/10/dinosaurs-gettyimages-1330203143.jpg?width=768",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                     {
                        src: "https://media.cnn.com/api/v1/images/stellar/prod/230314153048-02-dinosaur-record-long-neck.jpg?c=4x3",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                     {
                        src: "https://images.fineartamerica.com/images-medium-large-5/a-pair-of-carnotaurus-dinosaurs-hunting-kurt-miller.jpg",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                     {
                        src: "https://www.nawpic.com/media/2020/dinosaur-nawpic-26-260x534.jpg",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                     {
                        src: "https://cst.brightspotcdn.com/dims4/default/e1215f1/2147483647/strip/false/crop/1280x713+0+0/resize/1280x713!/quality/90/?url=https%3A%2F%2Fcdn.vox-cdn.com%2Fthumbor%2FijINmgCi2JI6Hjzz5DUw31Dhho0%3D%2F0x0%3A1280x713%2F1280x713%2Ffilters%3Afocal%281129x484%3A1130x485%29%2Fcdn.vox-cdn.com%2Fuploads%2Fchorus_asset%2Ffile%2F24678391%2FSpinosaurus_2021.png",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                     {
                        src: "https://assets.editorial.aetnd.com/uploads/2009/10/dinosaurs-gettyimages-1330203143.jpg?width=768",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                     {
                        src: "https://media.cnn.com/api/v1/images/stellar/prod/230314153048-02-dinosaur-record-long-neck.jpg?c=4x3",
                        description: "תמונה יאיי",
                        type: MediaType.IMAGE,
                     },
                  ]}
               />
            </div>
         </div>
      </div>
   );
};

export default PictureGroups;
