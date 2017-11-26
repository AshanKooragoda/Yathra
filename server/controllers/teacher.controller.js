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
      "from teacher_user natural join user natural join sub_tea join subject using(s_no) where subject.name=?",
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


module.exports = {
  getSubjects, getSubTeachers, getTeachers, getTeacherDetails
};
