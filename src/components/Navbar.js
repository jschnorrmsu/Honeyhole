import React from "react";
import { NavLink } from "react-router-dom";
import * as Logo from "../assets/logo-green-cropped.png";
import {
  Instagram,
  ShoppingCart,
  AccountCircle,
  Settings,
} from "@material-ui/icons";
import { Grid, makeStyles, IconButton } from "@material-ui/core";
import Cart from "./product/Cart";

const useStyles = makeStyles(() => ({
  logo: {
    height: "5em",
    width: "5em",
  },
  icon: {
    color: "black",
  },
}));

const Navbar = ({ admin, handleDrawerOpen }) => {
  const classes = useStyles();
  const activeStyle = { color: "white", fontWeight: "bold" };

  return (
    <Grid container wrap="nowrap" justify="space-evenly" alignItems="center">
      <Grid>
        <NavLink exact to="/">
          {<img src={Logo} className={classes.logo} alt={""} />}
        </NavLink>
      </Grid>
      <Grid>
        <a href="https://www.instagram.com/honeyholevintage/?hl=en">
          <Instagram className={classes.icon} />
        </a>
      </Grid>
      <Grid>
        {admin && (
          <NavLink to="/inventory" activeStyle={activeStyle}>
            <Settings className={classes.icon} />
          </NavLink>
        )}
      </Grid>
      <Grid>
        <NavLink to="/profile" activeStyle={activeStyle}>
          <AccountCircle />
        </NavLink>
      </Grid>
      <Grid>
        <IconButton
          className={classes.icon}
          onClick={() => {
            handleDrawerOpen();
          }}
        >
          <ShoppingCart />
        </IconButton>

        <Cart />
      </Grid>
    </Grid>
  );
};

export default Navbar;
