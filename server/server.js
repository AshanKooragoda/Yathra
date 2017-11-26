var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
// var cookieParser = require('cookie-parser');
// var session = require('express-session');

var UserController = require('./controllers/user.controller');
var TeacherController = require('./controllers/teacher.controller');

var app = express();

app.use(bodyParser.json());
app.use(cors());
// app.use(cookieParser());
// app.use(session({secret: "Shh, its a secret!"}));

// app.get('/', function(req, res){                // for development use. to test cookies
//   if(req.session.page_views){
//     req.session.page_views++;
//     res.send("You visited this page " + req.session.page_views + " times");
//   } else {
//     req.session.page_views = 1;
//     res.send("Welcome to this page for the first time!");
//   }
// });

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

app.post("/update_user", (req, res) => {   //  update user without password
  UserController.updateUser(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post("/update_user_password", (req, res) => {   //  update user with password
  UserController.updateUserPassword(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post("/update_teacher", (req, res) => {   //  update teacher without password
  UserController.updateTeacher(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post("/update_teacher_password", (req, res) => {   //  update teacher with password
  UserController.updateTeacherPassword(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post("/check_username", (req, res) => {   //  update teacher with password
  UserController.checkUsername(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.post("/check_password", (req, res) => {   //  update teacher with password
  UserController.checkPassword(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});


//------------------------------teacher entity--------------------------------------------------------------------------
app.get("/get_subjects", (req, res) => {       //  get all subjects
  TeacherController.getSubjects(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

app.get("/get_all_teachers", (req, res) => {           // get all teachers
  TeacherController.getTeachers().then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  })
});

app.post("/get_sub_teachers", (req, res) => {        // get teachers who teaches the given subject
  TeacherController.getSubTeachers(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  })
});

app.post("/get_teacher_details", (req, res) => {        // get details and subjects of a specific teacher to 2d array
  TeacherController.getTeacherDetails(req.body).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  })
});


app.listen(3000, () => {
  console.log("Server is up on 3000");
});



