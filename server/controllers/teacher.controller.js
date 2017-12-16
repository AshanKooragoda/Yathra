const {connection} = require('../db.connection');

const getSubjects = () => {        // query every subject from the database
  return new Promise((resolve, reject) => {
    connection.query("select s_no, name from subject",
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
  });
};

const getTeachers = () => {        // query every teacher
  return new Promise((resolve, reject) => {
    connection.query("select username, user.name as fullname from teacher_user natural join user",
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
  });
};

const getSubTeachers = (data) => {        // query every teacher who teaches the given subject
  return new Promise((resolve, reject) => {
    connection.query("select distinct username, user.name as fullname " +
      "from teacher_user natural join user natural join sub_tea join subject using(s_no) where subject.s_no=?",
      [data.subject],
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
  });
};

const getTeacherDetails = (data) => {        // query every teacher who teaches the given subject
  return new Promise((resolve, reject) => {
    connection.query("select username, t_id, user.name as fullname, contact, address from " +
      "user natural join teacher_user natural join teacher where username=?",
      [data.username],
      (err, res1) => {
        if (err) {
          reject(err);
        }
        connection.query("select s_no, subject.name, instrument from teacher_user natural join sub_tea natural join subject where username=?",
          [data.username],
          (err, res2) => {
            if (err) {
              reject(err);
            }
            resolve([res1, res2]);
          });                       // not complete ( not fetching data about classes )
      });
  });
};

const addSubject = (data) => {        // add subject to the given t_id using subject name (first query the s_no using subject name)
  return new Promise((resolve, reject) => {
    connection.query("select s_no from subject where name=?", [data.subject],
      (err, res1) => {
        if (err) {
          reject(err);
        }else {
          connection.query("insert into sub_tea values(?,?)", [res1[0].s_no, data.t_id],
            (err, res2) => {
              if (err) {
                if (err.errno === 1062) {
                  res2 = {reply: "duplicate"};
                }
              }else {
                res2 = {reply: "success"};
              }
              resolve(res2);
            });
        }
      });
  });
};

const addNewSubject = (data) => {         // add new subject and register the given teacher with that subject
  return new Promise((resolve, reject) => {
    connection.query("select s_no from subject where name=?", [data.name],
      (err, res) => {
        if (err) {
          res = {reply: "error"};
        }else if (res.length == 0) {
          connection.query("start transaction", (err, res1) => {
              if(err) {
                res = {reply: "error"};
              }else {
                connection.query("select s_no from subject order by 1 desc limit 1", (err, res2) => {
                  if (err) {
                    res = {reply: "error"};
                  }
                  let s_no = '';
                  if (res2.length) {
                    s_no = ("000" + (parseInt(res2[0].s_no)+1)).slice(-4);
                  } else {
                    s_no = "0001";
                  }
                  connection.query("insert into subject values(?,?,?)", [s_no, data.name, data.instrument],
                    (err, res3) => {
                      if (err) {
                        res = {reply: "error"};
                      }else {
                        connection.query("insert into sub_tea values(?,?)", [s_no, data.t_id],
                          (err, res4) => {
                            if (err) {
                              res = {reply: "error"};
                            }else {
                              connection.query("commit", (err, res5) => {
                                if (err) {
                                  res = {reply: "error"};
                                }else {
                                  res = {reply: "success"};
                                }
                                resolve(res);
                              });
                            }
                        });
                      }
                    });
                });
              }
            });
        }else {
          res = {reply: "duplicate"};
          resolve(res);
        }
      });
  });
}

const removeSubject = (data) => {
  return new Promise((resolve, reject) => {
    connection.query("select c_no from teach natural join class_sub where t_id=? and s_no=?", [data.t_id, data.s_no],
      (err, res) => {             // double check  above query when data inserted
        if (err) {
          resolve({reply: "error"});
        }else {
          if (res.length) {
            resolve({reply: "used"});
          }else {
            connection.query("delete from sub_tea where t_id=? and s_no=?", [data.t_id, data.s_no],
              (err, res) => {
                if (err) {
                  resole({reply: "error"});
                }else {
                  resolve({reply: "success"});
                }
              });
          }
        }
      });
  });
}


module.exports = {
  getSubjects, getSubTeachers, getTeachers, getTeacherDetails, addSubject, addNewSubject, removeSubject
};
