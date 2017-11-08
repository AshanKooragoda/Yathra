const {connection} = require('../db.connection');

const getUser = (user) => {       // query a specific user from the database using password and username
  return new Promise((resolve, reject) => {
    connection.query("select * from user left outer join teacher_user using(username) where username=? and password=?",
      [user.username, user.password],
      (err, res) => {
        if(err){
          reject(err);
        }
        resolve(res);
      })
  });
};

const getUserDetail = (user) => {       // query a specific user from the database using username (not include password, include t_id)
  return new Promise((resolve, reject) => {
    connection.query("select username, name, t_id from user left outer join teacher_user using(username) where username=?",
      [user.username],
      (err, res) => {
        if(err){
          reject(err);
        }
        resolve(res);
      })
  });
};

const getUsers = () => {        // query every user from the database
  return new Promise((resolve, reject) => {
    connection.query("select * from user",
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
  });
};

const getTeachers = () => {       // query every user from the database who are teachers
  return new Promise((resolve, reject) => {
    connection.query("select * from user natural join teacher_user",
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
  });
};

const getAdmins = () => {      // query every user from the database who are admins
  return new Promise((resolve, reject) => {
    connection.query("select * from user where username not in (select username from teacher_user)",
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
  });
};


module.exports = {
  getUser, getUsers, getAdmins, getTeachers, getUserDetail
};
