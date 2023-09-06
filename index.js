const fileActions = require("./file_handler.js");
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 80;

app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set('trust proxy', true);
app.set("views", path.join(__dirname, "./view"));

let myData = JSON.parse(fileActions.read('my_data.json'))

app.get("/", (req, res) => {
  let params = {
    title: "Home",
    name: myData.name,
    desc: myData.desc,
    imgUri: myData.img
  };
  res.status(200).render("index.pug", params);
});

app.get("/home", (req, res) => {
  let params = {
    title: "Home",
    name: myData.name,
    desc: myData.desc,
    imgUri: myData.img
  };
  res.status(200).render("index.pug", params);
});

app.get("/contact", (req, res) => {
  res.status(200).render("contact.pug", { title: "Contact Me" });
});

app.get("/latest", (req, res) => {
  res.status(200).render("latest.pug", { title: "Latest" });
});

app.get("/me", (req, res) => {
  let params = {
    title: myData.name,
    name: myData.name,
    desc: myData.desc,
    imgUri: myData.img
  };
  res.status(200).render("details.pug", params);
});

app.post("/thanks", (req, res) => {
  let outputToWrite = {
    "ip": req.ip,
    "headers": req.rawHeaders,
    "body": req.body
  }
  fileActions.append('output.txt', JSON.stringify(outputToWrite) + ",\n")
  res.status(200).render("thanks.pug", { title: "Thanks" });
});

app.use(function (req, res) {
  let params = {
    title: "PAGE NOT FOUND",
    errcode: 404,
    error: "This page is not available",
  };
  res.status(404).render("error.pug", params);
});

app.use(function (req, res) {
  let params = {
    title: "SERVER ERROR",
    errcode: 500,
    error: "Internal server error",
  };
  res.status(500).render("error.pug", params);
});

app.listen(port, () => {
  console.log(`Go to 'localhost:${port}' in browser`);
});
