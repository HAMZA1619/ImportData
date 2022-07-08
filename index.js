const express = require("express");
var multer = require('multer');
var upload = multer();
const mongoose = require("mongoose");

const { create } = require("./ImportData-controller");

require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_DB, { useNewUrlParser: true })
  .then((e) => {
    console.log("db conneted");
  })
  .catch((e) => console.log(e));
app.use(upload.single()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', function (req, res) {
  res.send('Welcome');
});

app.use("/bots/import_data", create);

app.listen(process.env.PORT, () =>
  console.log(`server running in ${process.env.PORT} `)
);
