const express = require("express");


const PORT = 3000;


const app = express();


app.set("views", "./views");
app.set("view engine", "pug");


app.get("/", (req, res) => {
  res.render("index", {
    pageTitle: "Inventorization | Index",
    title: "Index"
  });
});


app.get("/profile/", (req, res) => {
  res.render("profile", {
    pageTitle: "Inventorization | Profile",
    title: "Profile"
  });
});


app.listen(PORT, () => {
  console.log(`App listening on port ${ PORT }`);
});
