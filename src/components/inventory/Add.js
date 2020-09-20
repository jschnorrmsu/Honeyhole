import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Card,
  CardContent,
  Divider,
  Button,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import clsx from "clsx";
import axios from "axios";
import { authMiddleWare } from "../utils/auth";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progess: {
    position: "absolute",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
}));

const Add = () => {
  const history = useHistory();
  const classes = useStyles();

  const [productState, setProductState] = useState({
    loading: false,
    dialog: false,
    errors: [],
    imageUrl: "",
    imageId: "",
    title: "",
    description: "",
    price: "",
  });

  const handleChange = (event) => {
    setProductState({
      ...productState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setProductState({ ...productState, loading: true });
    const newProduct = {
      title: productState.title,
      description: productState.description,
      price: productState.price,
    };
    axios
      .post("/products", newProduct)
      .then((response) => {
        imageHandler(response.data.id);
      })
      .catch((error) => {
        setProductState({
          ...productState,
          errors: error,
          loading: false,
        });
      });
  };

  const imageHandler = (id) => {
    authMiddleWare(history);
    const authToken = localStorage.getItem("AuthToken");
    let form_data = new FormData();
    form_data.append("productId", id);
    form_data.append("image", productState.image);
    //form_data.append("content", productState.content);
    axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .post("/products/image", form_data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then(() => {
        setProductState({
          ...productState,
          dialog: true,
          loading: false,
        });
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setProductState({
          ...productState,
          loading: false,
          imageError: "Error uploading image",
        });
        alert("Whoops something went wrong!");
      });
  };

  const imageChangeHandler = (event) => {
    setProductState({
      ...productState,
      image: event.target.files[0],
    });
  };

  const dialogHandler = () => {
    setProductState({
      dialog: false,
    });
  };

  return (
    <>
      <Container component="main" maxWidth="s">
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Dialog open={productState.dialog}>
                <DialogTitle>{"Product Uploaded"}</DialogTitle>
                <DialogActions>
                  <Button onClick={dialogHandler}>Close</Button>
                </DialogActions>
              </Dialog>
              <Grid item xs={12}>
                <Card className={clsx(classes.root, classes)}>
                  <CardContent>
                    <div>
                      <div>
                        <input
                          type="file"
                          onChange={imageChangeHandler}
                          disabled={productState.loading}
                        ></input>
                        {productState.imageError ? (
                          <div className={classes.customError}>
                            Wrong Image Format or Server Error : (
                          </div>
                        ) : (
                          false
                        )}
                      </div>
                    </div>
                    <div className={classes.progress} />
                  </CardContent>
                  <Divider />
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete="title"
                  //helperText={productState.errors}
                  error={productState.errors ? true : false}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  name="price"
                  autoComplete="price"
                  //helperText={productState.errors}
                  error={productState.errors ? true : false}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  multiline="yes"
                  name="description"
                  label="Description"
                  type="description"
                  id="description"
                  autoComplete="description"
                  //helperText={productState.errors}
                  error={productState.errors ? true : false}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
              disabled={
                productState.loading ||
                !productState.title ||
                !productState.description ||
                !productState.image ||
                !productState.price
              }
            >
              Add Item
              {productState.loading && (
                <CircularProgress size={30} className={classes.progess} />
              )}
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Add;
