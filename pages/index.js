import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Home2 from "./components/Home2";
import About from "./components/About";
import Amenities from "./components/Amenities";
// import Loader from "./components/Loader";
const index = () => {
  return (
    <>
      {/* <Loader /> */}
      <Navbar />
      <Home2 />
      {/* <Home /> */}
      <About />
      <Amenities />
    </>
  );
};

export default index;
