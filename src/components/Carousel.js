import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as ProductCarousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { Typography, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  progess: {
    position: "relative",
    left: "40%",
    top: "35%",
  },
}));

const Carousel = ({ products, loading }) => {
  const classes = useStyles();

  return (
    <>
      {loading ? (
        <CircularProgress className={classes.progess} size={"30%"} />
      ) : (
        <ProductCarousel
          showArrows={true}
          autoPlay={true}
          infiniteLoop={true}
          useKeyboardArrows={true}
          centerMode={true}
          swipeable={true}
          showThumbs={false}
        >
          {products
            .filter((product) => product.filterTags.carousel)
            .map((product) => (
              <div key={product.id}>
                <Link to={"/product/" + product.slug}>
                  <Typography className="legend">
                    {product.title} ${product.price}
                  </Typography>
                  <img src={product.imageUrl} alt={product.title}></img>
                </Link>
              </div>
            ))}
        </ProductCarousel>
      )}
    </>
  );
};

export default Carousel;
