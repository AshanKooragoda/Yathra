var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var UserController = require('./controllers/user.controller');

var app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server working....");
});

app.post("/get_user", (req, res) => {
  UserController.getUser(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.listen(3000, () => {
  console.log("Server is up on 3000");
});



