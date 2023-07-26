import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/home-page/Home";
import Header from "./components/Header/Header";
import Pictures from "./pages/pictures-page/Pictures";
import Stories from "./pages/Stories";

const App: React.FC = () => {
   //prettier-ignore
   return (
      <>
         <Header />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="pictures" element={<Pictures />}/>
            <Route path="stories" element={<Stories />}/>      
            <Route path="*" element={<NotFoundPage />}/>
         </Routes>
      </>
   );
};

export default App;
