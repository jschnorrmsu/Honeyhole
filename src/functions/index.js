const functions = require("firebase-functions");
const app = require("express")();
const auth = require("./utils/auth");

const {
  getProducts,
  addProduct,
  deleteProduct,
  editProduct,
  uploadProductImage,
} = require("./api/products");

app.get("/products", getProducts);
app.post("/products", addProduct);
app.put("/inventory", editProduct);
app.post("/products/image", auth, uploadProductImage);
app.put("/products/:productId", auth, editProduct);
app.delete("/products/:productId", auth, deleteProduct);

const {
  loginUser,
  signUpUser,
  uploadProfilePic,
  getUserDetails,
  updateUserDetails,
} = require("./api/users");

// API calls with the auth param require bearer token.
app.post("/login", loginUser);
app.post("/signup", signUpUser);
app.post("/user/image", auth, uploadProfilePic);
app.get("/user", auth, getUserDetails);
app.post("/user", auth, updateUserDetails);

exports.api = functions.https.onRequest(app);
