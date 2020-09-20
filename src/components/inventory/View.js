import React, { useState } from "react";
import PropTypes from "prop-types";
import { authMiddleWare } from "../utils/auth";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {
  TextField,
  Divider,
  Button,
  Card,
  FormControlLabel,
  FormGroup,
  Checkbox,
  IconButton,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import {
  CheckBox,
  CheckBoxOutlineBlank,
  VerticalAlignTopOutlined,
  VerticalAlignTop,
  Delete,
} from "@material-ui/icons";
import InventorySearchBar from "./InventorySearchBar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  searchBar: {
    backgroundImage: "linear-gradient(to right, #3aa7a1, #054946)",
  },
  inventoryImage: {
    height: 400,
    width: 300,
  },
  submitButton: {
    //backgroundColor: "blue",
    //color: "white",
  },
  deleteButton: {
    color: "red",
    height: 50,
    width: 50,
  },
  inventoryProductCard: {
    padding: "1rem",
  },
}));

const View = ({ products }) => {
  const history = useHistory();
  const classes = useStyles();

  const [productState, setProductState] = useState({
    loading: false,
    filteredProducts: [],
  });

  const [tags, setTags] = useState({});

  const submitHandler = (id) => {
    authMiddleWare(history);
    let productId = id;
    let edit = {
      description: productState.description,
      title: productState.title,
      price: productState.price,
      filterTags: tags,
    };
    const authToken = localStorage.getItem("AuthToken");
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    setProductState({
      loading: true,
    });
    axios({ method: "put", url: `/products/${productId}`, data: edit })
      .then(() => {
        //window.location.reload();
        setProductState({
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        setProductState({
          loading: false,
        });
      });
  };

  const deleteHandler = (id) => {
    let productId = id;
    authMiddleWare(history);
    const authToken = localStorage.getItem("AuthToken");
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    setProductState({
      loading: true,
    });
    axios
      .delete(`/products/${productId}`)
      .then(() => {
        setProductState({
          loading: false,
        });
        window.location.reload();
        history.push("/inventory");
      })
      .catch((err) => {
        console.log(err);
        setProductState({
          loading: false,
        });
      });
  };

  const searchHandler = (event) => {
    const lowercaseInput = event.target.value.toLowerCase();
    setProductState({
      ...productState,
      filteredProducts: products.filter(
        (product) =>
          product.title.includes(lowercaseInput) ||
          product.description.includes(lowercaseInput) ||
          product.price.includes(event.target.value)
      ),
    });
  };

  const filterHandler = (event) => {
    setProductState({
      ...productState,
      [event.target.name]: event.target.checked,
      filteredProducts: products.filter(
        (product) =>
          event.target.checked && product.filterTags[event.target.name]
      ),
    });
  };

  const filterTagHandler = (event) => {
    setTags({ ...tags, [event.target.name]: event.target.checked });
  };

  const changeHandler = (event) => {
    setProductState({
      ...productState,
      [event.target.name]: event.target.value,
    });
  };

  const getMappingTarget = () => {
    return !Array.isArray(productState.filteredProducts) ||
      !productState.filteredProducts.length
      ? products
      : productState.filteredProducts;
  };

  return (
    <div>
      <div className={classes.searchBar}>
        <InventorySearchBar
          filterHandler={filterHandler}
          searchHandler={searchHandler}
        />
      </div>
      <Divider />
      <br />
      <div>
        {getMappingTarget().map((product) => {
          return (
            <div key={product.id}>
              <Grid container justify="space-evenly">
                <Card className={classes.inventoryProductCard}>
                  <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    spacing={1}
                  >
                    <Grid item>
                      <IconButton
                        onClick={() => {
                          deleteHandler(product.id);
                        }}
                        className={classes.deleteButton}
                      >
                        <Delete />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className={classes.inventoryImage}
                      ></img>
                    </Grid>
                    <Grid item>
                      <FormGroup column>
                        <Divider />
                        <Typography>Edit Filter Tags</Typography>
                        <Divider />
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked={product.filterTags.trending}
                              onChange={filterTagHandler}
                              icon={<CheckBoxOutlineBlank />}
                              checkedIcon={<CheckBox />}
                              name="trending"
                            />
                          }
                          label="Trending"
                        ></FormControlLabel>
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked={product.filterTags.tops}
                              onChange={filterTagHandler}
                              icon={<CheckBoxOutlineBlank />}
                              checkedIcon={<CheckBox />}
                              name="tops"
                            />
                          }
                          label="Tops"
                        ></FormControlLabel>
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked={product.filterTags.bottoms}
                              onChange={filterTagHandler}
                              icon={<CheckBoxOutlineBlank />}
                              checkedIcon={<CheckBox />}
                              name="bottoms"
                            />
                          }
                          label="Bottoms"
                        ></FormControlLabel>
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked={product.filterTags.harley}
                              onChange={filterTagHandler}
                              icon={<CheckBoxOutlineBlank />}
                              checkedIcon={<CheckBox />}
                              name="harley"
                            />
                          }
                          label="Harley"
                        ></FormControlLabel>
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked={product.filterTags.accessories}
                              onChange={filterTagHandler}
                              icon={<CheckBoxOutlineBlank />}
                              checkedIcon={<CheckBox />}
                              name="accessories"
                            />
                          }
                          label="Accessories"
                        ></FormControlLabel>
                        <FormControlLabel
                          control={
                            <Checkbox
                              defaultChecked={product.filterTags.carousel}
                              on
                              onChange={filterTagHandler}
                              icon={<VerticalAlignTopOutlined />}
                              checkedIcon={<VerticalAlignTop />}
                              name="carousel"
                            />
                          }
                          label="Carousel ?"
                        ></FormControlLabel>
                        <Divider />
                      </FormGroup>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item xs={5}>
                      <TextField
                        label="Price"
                        fullWidth
                        defaultValue={product.price}
                        margin="dense"
                        name="price"
                        variant="outlined"
                        onClick={changeHandler}
                        onChange={changeHandler}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        label="Title"
                        fullWidth
                        defaultValue={product.title}
                        margin="dense"
                        name="title"
                        variant="outlined"
                        onClick={changeHandler}
                        onChange={changeHandler}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        label="Description"
                        fullWidth
                        multiline
                        defaultValue={product.description}
                        margin="dense"
                        name="description"
                        variant="outlined"
                        onClick={changeHandler}
                        onChange={changeHandler}
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={
                          productState.loading
                          //!productState.price ||
                          //!productState.title ||
                          //!productState.description
                          // !tags.trending ||
                          // !tags.tops ||
                          // !tags.bottoms ||
                          // !tags.harley ||
                          // !tags.accessories ||
                          // !tags.carousel
                        }
                        className={classes.submitButton}
                        onClick={() => {
                          submitHandler(product.id);
                        }}
                      >
                        Submit Changes
                        {productState.loading && (
                          <CircularProgress
                            size={30}
                            className={classes.progess}
                          />
                        )}
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};

View.propTypes = {
  products: PropTypes.array.isRequired,
};

export default View;
