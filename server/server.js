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

//------------------------------user entity-----------------------------------------------------------------------------
app.post("/get_user", (req, res) => {   //  get specific user according to username and password
  UserController.getUser(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post("/get_user_detail", (req, res) => {   //  get specific user according to username ( not include password, include user type)
  UserController.getUserDetail(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.get("/get_users", (req, res) => {   //  get every user (admins and teachers)
  UserController.getUsers().then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.get("/get_admins", (req, res) => {   // get every user who are admins
  UserController.getAdmins().then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.get("/get_teachers", (req, res) => {   // get every user who are teachers
  UserController.getTeachers().then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post("/get_user_teacher", (req, res) => {   //  get specific user according to username and password
  UserController.getUserTeacher(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post("/add_user_teacher", (req, res) => {   //  add new teacher as an user;
  UserController.addUserTeacher(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post("/add_user", (req, res) => {   //  add an new user
  UserController.addUser(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});



app.listen(3000, () => {
  console.log("Server is up on 3000");
});



