import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import { useEffect, useState } from "react";
import MobileView from "./views/mobileView";
import DesktopView from "./views/desktopView";
import { Toaster } from "react-hot-toast";

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // cleanup function to remove this useEffect when the component is removed
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={windowWidth < 768 ? <MobileView /> : <DesktopView />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
      {/* This is how we actually initialise the react hot toast */}
      <Toaster />
    </>
  );
}

export default App;
