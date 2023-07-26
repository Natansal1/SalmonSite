import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/home-page/Home";
import Header from "./components/Header/Header";
import ImageViewer from "./components/ImageViewer/ImageViewer";

const PREFIX_URL = "https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/";

const App: React.FC = () => {
   //prettier-ignore
   return (
      <>
         <Header />
         <Routes>
            <Route path="home" element={<Home />} />
            
            <Route path="*" element={<NotFoundPage />}/>
         </Routes>
      </>
   );
};

export default App;
