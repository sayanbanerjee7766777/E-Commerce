const express = require("express");
const cors = require("cors");
// const mongoose = require('mongoose');
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No User Found" });
    }
  } else {
    res.send({ result: "No User Found" });
  }
});

app.post("/add-product", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No products found" });
  }
});

app.delete("/products/:id", async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/products/:id", async (req, res) => {
  const result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No products found" });
  }
});

app.put("/products/:id", async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  )
  res.send(result)
});
app.listen(5000);

// app.get('/', (req, res) => {
//     res.send('Welcome')
// })
// const connectDb = async ()=>{
//     mongoose.connect('mongodb://localhost:27017/e-comm')
//     const productSchema = new mongoose.Schema({})
//     const product = mongoose.model('products', productSchema)
//     const data = await product.find()
//     console.warn(data)
// }
// connectDb()

// app.listen(5000)
