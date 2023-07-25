import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/home-page/Home";
import Header from "./components/Header/Header";

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
