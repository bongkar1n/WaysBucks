const express = require("express");

const router = express.Router();

const { register, login } = require("../controlers/auth");
const { auth } = require("../midleware/auth");
const { uploadFile } = require("../midleware/uploadFile");
const { getUsers, deleteUser } = require("../controlers/user");
const {
  addProduct,
  getProduct,
  getProducts,
  editProduct,
  deleteProduct,
} = require("../controlers/product");
const {
  addTopping,
  getTopping,
  getToppings,
  editTopping,
  deleteTopping,
  getSomeToppings,
} = require("../controlers/topping");

const {
  addTransaction,
  getDetailTransaction,
  getTransactions,
  editTransaction,
  deleteTransaction,
} = require("../controlers/transaction");
const {
  addOrderDetail,
  getOrderDetails,
  getOrderDetail,
} = require("../controlers/orderDetail");

//authentification
router.post("/login", login);
router.post("/register", register);

//user
router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);

//product
router.post("/product", auth, uploadFile("imageFile"), addProduct);
router.get("/product/:id", getProduct);
router.get("/products", getProducts);
router.patch("/product/:id", auth, editProduct);
router.delete("/product/:id", auth, deleteProduct);

//topping
router.post("/topping", auth, uploadFile("imageFile"), addTopping);
router.get("/topping/:id", getTopping);
router.get("/toppings", getToppings);
router.patch("/topping/:id", auth, editTopping);
router.delete("/topping/:id", auth, deleteTopping);
router.get("/sometoppings", auth, getSomeToppings);

//transaction
router.post("/transaction", auth, addTransaction);
router.get("/transactions", auth, getTransactions);
router.get("/transaction/:id", auth, getDetailTransaction);
router.patch("/transaction/:id", auth, editTransaction);
router.delete("/transaction/:id", auth, deleteTransaction);

//order detail
router.post("/order-detail", auth, addOrderDetail);
router.get("/order-details", auth, getOrderDetails);
router.get("/order-detail/:id", auth, getOrderDetail);

module.exports = router;
