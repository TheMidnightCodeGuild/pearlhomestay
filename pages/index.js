import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
// import Home2 from "./components/Home2";
import About from "./components/About";
import Amenities from "./components/Amenities";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Gallery from "./components/Gallery";
import Destinations from "./components/Destinations";
import Testimonial from "./components/Testimonial";
const index = () => {
  return (
    <>
      <Loader /> 
      <Navbar />
      {/* <Home2 /> */}
      <Home />
      <About />
      <Gallery />
      <Amenities />
      <Destinations />
      <Testimonial />
      <Contact />
      <Footer />
    </>
  );
};

export default index;
