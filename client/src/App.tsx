import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header/Header";
import Pictures from "./pages/pictures-page/Pictures";
import Stories from "./pages/Stories";
import Congratulations from "./pages/Congratulations";
import PictureGroups from "./pages/pictures-page/PictureGroups";
import { usePageLocationContext } from "./contexts/PageLocationContextProvider";
import SearchResults from "./pages/SearchResults";
import Home from "./pages/home-page/Home";
import OriginTree from "./pages/origin/OriginTree";

const App: React.FC = () => {
   const { displayLocation } = usePageLocationContext();
   //prettier-ignore
   return (
      <>
         <Header />
         <Routes location={displayLocation}>
            <Route path="/" element={<Home />} />
            <Route path="pictures" element={<Pictures />} />
            <Route path="pictures/:groupId" element={<PictureGroups />}/>
            <Route path="stories" element={<Stories />}/>    
            <Route path="congrats" element={<Congratulations/>}/>        
            <Route path="origin" element={<OriginTree />}/>        
            <Route path="search-results" element={<SearchResults/>} />
            <Route path="*" element={<NotFoundPage />}/>
         </Routes>
      </>
   );
};

export default App;
