import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
// import Loader from "./components/Loader";
const index = () => {
  return (
    <>
      {/* <Loader /> */}
      <Navbar />
      <Home />
      <About />
    </>
  );
};

export default index;
