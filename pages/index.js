import React from "react";
import Head from "next/head";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

import About from "./components/About";
import Amenities from "./components/Amenities";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Gallery from "./components/Gallery";
import Destinations from "./components/Destinations";
import Testimonial from "./components/Testimonial";
import GoogleReviews from "./components/GoogleReviews";

const index = () => {
  return (
    <>
      <Head>
        <title>Pearl Home Stay - Your Perfect Getaway in Nature</title>
        <meta
          name="description"
          content="Experience luxury and tranquility at Pearl Home Stay in Ujjain. Nestled in nature, we offer comfortable rooms, scenic views and exceptional hospitality."
        />
        <meta
          name="keywords"
          content="homestay, accommodation, Pearl Home Stay, luxury stay, vacation rental, peaceful getaway"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:title"
          content="Pearl Home Stay - Your Perfect Getaway in Nature"
        />
        <meta
          property="og:description"
          content="Experience luxury and tranquility at Pearl Home Stay in Ujjain. Nestled in nature, we offer comfortable rooms, scenic views and exceptional hospitality."
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://pearlhomestayujjain.in" />
      </Head>
      <Loader />
      <Navbar />
      {/* <Home2 /> */}
      <Home />
      <About />
      <Gallery />
      <Amenities />
      <Destinations />
      <Testimonial />
      {/* <GoogleReviews /> */}
      <Contact />
      <Footer />
    </>
  );
};

export default index;
