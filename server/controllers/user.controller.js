const {connection} = require('../db.connection');

const getUser = (user) => {       // query a specific user from the database using password and username
  return new Promise((resolve, reject) => {
    connection.query("select username, name, t_id from user left outer join teacher_user using(username) where " +
      "username=? and password=aes_encrypt(?,?)",
      [user.username, user.password, user.key],
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
    connection.query("select username from user",
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
    connection.query("select username from user natural join teacher_user",
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
    connection.query("select username from user where username not in (select username from teacher_user)",
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
    connection.query("select * from teacher_user natural join teacher where username=?", [user.username],
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
    connection.query("start transaction;",
      (err, res1) => {
        if (err) {
          reject(err);
        }
        connection.query("insert into user values(?, ?, aes_encrypt(?,?));", [user.username, user.name, user.password, user.key],
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

const addUser = (user) => {       // add new user to the database
  return new Promise((resolve, reject) => {
    connection.query("insert into user values(?, ?, aes_encrypt(?,?));", [user.username, user.name, user.password, user.key],
      (err, res) => {
        if(err){
          reject(err);
        }
        resolve(res);
      })
  });
};

const updateUser = (user) => {       // update username and name of a user (not a teacher)
  return new Promise((resolve, reject) => {
    connection.query("update user set username=?, name=? where username=?",
      [user.username, user.name, user.cur_username],
      (err, res) => {
        if(err){
          reject(err);
        }
        resolve(res);
      })
  });
};

const updateUserPassword = (user) => {       // update username, name and password of a user (not a teacher)
  return new Promise((resolve, reject) => {
    connection.query("update user set username=?, name=?, password=aes_encrypt(?,?) where username=?",
      [user.username, user.name, user.password, user.key, user.cur_username],
      (err, res) => {
        if(err){
          reject(err);
        }
        resolve(res);
      })
  });
};

const updateTeacher = (user) => {       // update teacher details without password
  return new Promise((resolve, reject) => {
    connection.query("start transaction;",
      (err, res1) => {
        if (err){
          reject(err);
        }
        connection.query("update user set username=?, name=? where username=?",
          [user.username, user.name, user.cur_username],
          (err, res2) => {
            if (err){
              reject(err);
            }
            connection.query("update teacher set name=?, contact=?, address=? where t_id=?;",
              [user.name, user.contact, user.address, user.cur_t_id],
              (err, res3) => {
                if (err){
                  reject(err);
                }
                connection.query("commit;",
                  (err, res4) => {
                    if (err) {
                      reject(err);
                    }
                    resolve([res1, res2, res3, res4]);
                  });
              });
          })
      });
  });
};

const updateTeacherPassword = (user) => {       // update all details of a teacher (include password)
  return new Promise((resolve, reject) => {
    connection.query("start transaction;",
      (err, res1) => {
        if (err){
          reject(err);
        }
        connection.query("update user set username=?, name=?, password=aes_encrypt(?,?) where username=?",
          [user.username, user.name, user.password, user.key, user.cur_username],
          (err, res2) => {
            if (err){
              reject(err);
            }
            connection.query("update teacher set name=?, contact=?, address=? where t_id=?",
              [user.name, user.contact, user.address, user.cur_t_id],
              (err, res3) => {
                if (err){
                  reject(err);
                }
                connection.query("commit;",
                  (err, res4) => {
                    if (err) {
                      reject(err);
                    }
                    resolve([res1, res2, res3, res4]);
                  });
              });
          })
      });
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
        resolve("C001");
      }
    });
  });
};

const checkUsername = (user) => {       // check whether given username exist in the table
  return new Promise((resolve, reject) => {
    connection.query("select case when count(username)=1 then 'true' else 'false' end as available from user where username=?",
      [user.username],
      (err, res) => {           // return 'true' if already exits, or 'false' otherwise
        if(err){
          reject(err);
        }
        resolve(res);
      })
  });
};

const checkPassword = (user) => {       // check given password for given username is matching
  return new Promise((resolve, reject) => {
    connection.query("select case when count(username)=1 then 'true' else 'false' end as matching from user where username=?" +
      " and password=aes_encrypt(?,?)",
      [user.username, user.password, user.key],
      (err, res) => {           // return 'true' if already exits, or 'false' otherwise
        if(err){
          reject(err);
        }
        resolve(res);
      })
  });
};


module.exports = {
  getUser, getUsers, getAdmins, getTeachers, getUserDetail, getUserTeacher, addUserTeacher, addUser,
  updateUser, updateUserPassword, updateTeacher, updateTeacherPassword, checkUsername, checkPassword
};
