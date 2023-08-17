import clsx from "clsx";
import React from "react";
import ImageCard from "./ImageCard";

interface CardsLineupProps {
   images: {
      id: string | number;
      src: string;
      alt?: string;
      text: string;
      subtext?: string;
   }[];
   onClick: (id: string | number) => void;
   className?: string;
}

const CardsLineup: React.FC<CardsLineupProps> = (props) => {
   const { images, onClick, className } = props;
   return (
      <div className={clsx("cards_lineup", className)}>
         {images.map((image, index) => (
            <ImageCard
               {...image}
               onClick={() => onClick(image.id)}
               key={image.id.toString() + index.toString()}
            />
         ))}
      </div>
   );
};

export default CardsLineup;
