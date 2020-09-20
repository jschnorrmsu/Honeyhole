import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Button,
  makeStyles,
  Card,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import Footer from "../Footer";

const useStyles = makeStyles(() => ({
  productImage: {
    height: 400,
    width: 300,
  },
}));

const ProductPage = ({ products, cartHandler }) => {
  const classes = useStyles();
  const history = useHistory();
  let id = history.location.state.id;
  const [dialog, setDialog] = useState(false);

  const dialogHandler = () => {
    setDialog(false);
  };

  return (
    <>
      <div>
        <Dialog open={dialog}>
          <DialogTitle>{"Added to cart!"}</DialogTitle>
          <DialogActions>
            <Button onClick={dialogHandler}>Close</Button>
          </DialogActions>
        </Dialog>
        {products
          .filter((product) => product.id === id)
          .map((product) => (
            <Grid
              container
              direction="column"
              alignItems="center"
              spacing={3}
              key={product.id}
            >
              <Grid item>
                <Card className={classes.productImage}>
                  <img
                    src={product.imageUrl}
                    className={classes.productImage}
                    alt={product.title}
                  />
                </Card>
              </Grid>
              <Grid item>
                <Typography variant="h6">
                  {product.title} ${product.price}
                </Typography>
              </Grid>
              <Grid item>
                <Typography>{product.description}</Typography>
              </Grid>
              <Grid>
                <Button
                  variant="outlined"
                  onClick={() => {
                    cartHandler(product);
                    setDialog(true);
                  }}
                >
                  <AddShoppingCart />
                </Button>
              </Grid>
            </Grid>
          ))}
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
