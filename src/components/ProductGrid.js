import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    //flexWrap: "wrap",
    //alignContent: "space-evenly",
    //justifyContent: "space-evenly",
    //overflow: "hidden",
    backgroundImage: "linear-gradient(to right, #3aa7a1, #054946)",
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "center",
    backgroundColor: "black",
    justifyContent: "space-evenly",
    height: 430,
    width: 300,
  },
  img: {
    height: 400,
    width: 300,
  },
  productLink: {
    color: "grey",
    textDecoration: "none",
  },
  progess: {
    position: "relative",
    left: "40%",
    top: "35%",
  },
}));

const ProductGrid = ({ products, loading }) => {
  const classes = useStyles();

  const [grid, setGrid] = useState({
    filteredProducts: [],
    trending: false,
    tops: false,
    bottoms: false,
    harley: false,
    accessories: false,
  });

  const searchHandler = (event) => {
    const lowercaseInput = event.target.value.toLowerCase();
    setGrid({
      ...grid,
      filteredProducts: products.filter(
        (product) =>
          product.title.includes(lowercaseInput) ||
          product.description.includes(lowercaseInput)
      ),
    });
  };

  const filterHandler = (event) => {
    setGrid({
      ...grid,
      [event.target.name]: event.target.checked,
      filteredProducts: products.filter(
        (product) =>
          event.target.checked && product.filterTags[event.target.name]
      ),
    });
  };

  const getMappingTarget = () => {
    return !Array.isArray(grid.filteredProducts) ||
      !grid.filteredProducts.length
      ? products
      : grid.filteredProducts;
  };

  return (
    <>
      <SearchBar searchHandler={searchHandler} filterHandler={filterHandler} />

      <Grid container className={classes.root} spacing={1}>
        {getMappingTarget().map((product) => (
          <Grid item key={product.id}>
            <Paper className={classes.paper}>
              <Link
                className={classes.productLink}
                to={{
                  pathname: "/product/" + product.slug,
                  state: { id: product.id },
                }}
              >
                <img
                  className={classes.img}
                  src={product.imageUrl}
                  alt={product.title}
                ></img>
                {product.title} ${product.price}
              </Link>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductGrid;
