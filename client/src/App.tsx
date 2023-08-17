import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/home-page/Home";
import Header from "./components/Header/Header";
import Pictures from "./pages/pictures-page/Pictures";
import Stories from "./pages/Stories";
import Congratulations from "./pages/Congratulations";
import HebrewCalender from "./components/HeberewCalender/HebrewCalender";
import PictureGroups from "./pages/pictures-page/PictureGroups";

const App: React.FC = () => {
   //prettier-ignore
   return (
      <>
         <Header />
         <Routes>
            <Route path="/" element={<HebrewCalender />} />
            <Route path="pictures" element={<Pictures />} />
            <Route path="pictures/:groupId" element={<PictureGroups />}/>
            <Route path="stories" element={<Stories />}/>    
            <Route path="congrats" element={<Congratulations/>}/>        
            <Route path="*" element={<NotFoundPage />}/>
         </Routes>
      </>
   );
};

export default App;
