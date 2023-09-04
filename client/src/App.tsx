import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header/Header";
import Pictures from "./pages/pictures-page/Pictures";
import Stories from "./pages/Stories";
import Congratulations from "./pages/Congratulations";
import HebrewCalender from "./components/HeberewCalender/HebrewCalender";
import PictureGroups from "./pages/pictures-page/PictureGroups";
import { usePageLocationContext } from "./contexts/PageLocationContextProvider";
import SearchResults from "./pages/SearchResults";
import FullScreenMedia from "./components/FullScreenMedia";

const App: React.FC = () => {
   const { displayLocation } = usePageLocationContext();
   //prettier-ignore
   return (
      <>
         <Header />
         <Routes location={displayLocation}>
            <Route path="/" element={<HebrewCalender />} />
            <Route path="pictures" element={<Pictures />} />
            <Route path="pictures/:groupId" element={<PictureGroups />}/>
            <Route path="stories" element={<Stories />}/>    
            <Route path="congrats" element={<Congratulations/>}/>        
            <Route path="search-results" element={<SearchResults/>} />
            <Route path="*" element={<NotFoundPage />}/>
         </Routes>
         {/* <FullScreenMedia open media={[]}/> */}
      </>
   );
};

export default App;
