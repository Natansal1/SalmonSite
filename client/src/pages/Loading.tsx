import React, { useEffect, useState } from "react";
import { useTimeout } from "../common/hooks";
import { DEFAULT_LOCATION_DELAY } from "../contexts/PageLocationContextProvider";
import PageWrapper from "../components/PageWrapper/PageWrapper";

const Loading: React.FC = () => {
   const [show, setShow] = useState<boolean>(false);
   const timeout = useTimeout();

   useEffect(() => {
      timeout.set(() => setShow(true), DEFAULT_LOCATION_DELAY);
   }, []);

   return <PageWrapper className="page">{show && "Loading"}</PageWrapper>;
};

export default Loading;
