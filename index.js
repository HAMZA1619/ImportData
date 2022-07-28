const express = require("express");
let multer = require("multer");
let upload = multer();
const mongoose = require("mongoose");
const fs = require("fs");
const { create } = require("./ImportData-controller");
const morgan = require('morgan')

require("dotenv").config();
const accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
const app = express();
mongoose
  .connect(process.env.MONGO_DB, { useNewUrlParser: true })
  .then((e) => {
    console.log("db conneted");
  })
  .catch((e) => console.log(e));
app.use(upload.single("file"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.send("Welcome");
});
app.use(morgan('combined', {stream: accessLogStream}))
app.use("/bots/import_data", create);


app.listen(process.env.PORT, () =>
  console.log(`server running in ${process.env.PORT} `)
);
