import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, AppBar, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Add from "./Add";
import View from "./View";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: "linear-gradient(to right, #3aa7a1, #054946)",
  },
}));

const Inventory = ({ products }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs"
        >
          <LinkTab label="Inventory" href="/inventory/view" {...a11yProps(0)} />
          <LinkTab label="Add Item" href="/inventory/add" {...a11yProps(1)} />
          <LinkTab label="Page Three?" href="/spam" {...a11yProps(2)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <View products={products} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Add products={products} />
      </TabPanel>

      <TabPanel value={value} index={2}>
        I can add more tools to this page if you want more stuff!
      </TabPanel>
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default Inventory;
