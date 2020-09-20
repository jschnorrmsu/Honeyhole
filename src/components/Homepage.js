import React from "react";
import Carousel from "./Carousel";
import ProductGrid from "./ProductGrid";
import Footer from "./Footer.js";

const Homepage = ({ products, loading }) => {
  return (
    <>
      <Carousel products={products} loading={loading} />
      <ProductGrid products={products} loading={loading} />
      <Footer />
    </>
  );
};

export default Homepage;
