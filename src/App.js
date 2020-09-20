import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Inventory from "./components/inventory/Inventory";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import Signup from "./components/user/Signup";
import ProductPage from "./components/product/ProductPage";
import Cart from "./components/product/Cart";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import PageNotFound from "./components/utils/PageNotPage";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { authMiddleWare } from "./components/utils/auth";

const App = () => {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!products.length) {
      setLoading(true);
      axios
        .get("/products")
        .then((response) => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (localStorage.getItem("AuthToken") !== null) {
      authMiddleWare(history);
      const authToken = localStorage.getItem("AuthToken");
      axios.defaults.headers.common = { Authorization: `${authToken}` };
      axios
        .get("/user")
        .then((response) => {
          setAdmin({
            admin: response.data.userCredentials.admin,
          });
        })
        .catch((error) => {
          if (error.response.status === 403) {
          }
          console.log(error);
        });
    }
  }, [history, products]);

  const handleDrawerOpen = () => {
    setOpen(true);
    console.log(open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const cartHandler = (product) => {
    setCart([...cart, product]);
    console.log(cart);
  };

  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Navbar admin={admin} handleDrawerOpen={handleDrawerOpen} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Homepage {...props} products={products} loading={loading} />
            )}
          />
          <ProtectedRoute
            path="/inventory"
            admin={admin}
            component={Inventory}
            products={products}
          />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/signup" component={Signup} />
          <Route
            path="/product/:slug"
            render={(props) => (
              <ProductPage
                {...props}
                products={products}
                cartHandler={cartHandler}
              />
            )}
          />
          <Route
            path="/cart"
            render={(props) => (
              <Cart
                {...props}
                cart={cart}
                open={open}
                //handleDrawerClose={handleDrawerClose}
              />
            )}
          />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
