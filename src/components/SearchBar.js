import React from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";

const SearchBar = ({ searchHandler, filterHandler }) => {
  return (
    <div className="searchBar">
      <FormGroup column>
        <div>Filter Inventory</div>
        <input
          type="text"
          onChange={searchHandler}
          placeholder="Search..."
        ></input>
      </FormGroup>

      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              onChange={filterHandler}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name="trending"
            />
          }
          label="Trending"
        ></FormControlLabel>
        <FormControlLabel
          control={
            <Checkbox
              onChange={filterHandler}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name="tops"
            />
          }
          label="Tops"
        ></FormControlLabel>
        <FormControlLabel
          control={
            <Checkbox
              onChange={filterHandler}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name="bottoms"
            />
          }
          label="Bottoms"
        ></FormControlLabel>
        <FormControlLabel
          control={
            <Checkbox
              onChange={filterHandler}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name="harley"
            />
          }
          label="Harley"
        ></FormControlLabel>
        <FormControlLabel
          control={
            <Checkbox
              onChange={filterHandler}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name="accessories"
            />
          }
          label="Accessories"
        ></FormControlLabel>
      </FormGroup>
    </div>
  );
};

export default SearchBar;
