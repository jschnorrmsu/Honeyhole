import React, { useState } from "react";
import {
  makeStyles,
  useTheme,
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { ChevronLeft, ChevronRight, Inbox, Mail } from "@material-ui/icons";

const useStyles = makeStyles(() => ({}));

const Cart = ({ cart, handleDrawerClose, open }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [drawer, setDrawer] = useState(false);
  console.log("cart thinks drawer should be: " + drawer);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton
          onClick={() => {
            setDrawer(false);
          }}
        >
          {theme.direction === "rtl" ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <Inbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <Inbox /> : <Mail />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Cart;
