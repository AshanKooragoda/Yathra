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

const getUserTeacher = (user) => {       // query a specific user from the database using password and username
  return new Promise((resolve, reject) => {
    connection.query("select * from teacher_user natural join teacher", [user.username, user.password],
      (err, res) => {
        if(err){
          reject(err);
        }
        resolve(res);
      })
  });
};

const addUserTeacher = (user) => {       // add a user with teacher details filled
  return new Promise((resolve, reject) => {
    var result = {};
    connection.query("start transaction;",
      (err, res1) => {
        if (err) {
          reject(err);
        }
        connection.query("insert into user values(?, ?, ?);", [user.username, user.name, user.password],
          (err, res2) => {
            if (err) {
              reject(err);
            }
            nextTeacherId().then( (t_id) => {
              connection.query("insert into teacher values(?, ?, ?, ?);", [t_id, user.name, user.contact, user.address],
                (err, res3) => {
                  if (err) {
                    reject(err);
                  }
                  connection.query("insert into teacher_user values(?, ?);", [user.username ,t_id],
                    (err, res4) => {
                      if (err) {
                        reject(err);
                      }
                      connection.query("commit;",
                        (err, res5) => {
                          if (err) {
                            reject(err);
                          }
                          resolve([res1, res2, res3, res4, res5, t_id]);
                        })
                    });
                });
            });
          });
      });
  });
};

const addUser = (user) => {       // query a specific user from the database using password and username
  return new Promise((resolve, reject) => {
    connection.query("insert into user values(?, ?, ?);", [user.username, user.name, user.password],
      (err, res) => {
        if(err){
          reject(err);
        }
        resolve(res);
      })
  });
};

const nextTeacherId = () => {       // generate next teacher id
  return new Promise((resolve, reject) => {
    connection.query("select t_id from teacher order by 1 desc limit 1", (err, result) => {
      if (err) {
        reject(err);
      }
      if (result.length) {
        resolve(("000" + (parseInt(result[0].t_id)+1)).slice(-4));
      } else {
        ;
        resolve("C001");
      }
    });
  });
};




module.exports = {
  getUser, getUsers, getAdmins, getTeachers, getUserDetail, getUserTeacher, addUserTeacher, addUser
};
