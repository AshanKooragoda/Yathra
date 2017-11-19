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
    connection.query("select username from teacher natural join teacher_user",
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
    connection.query("select username from teacher natural join teacher_user",
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
  });
};

const getSubTeachers = (subject) => {        // query every teacher who teachers the given subject
  return new Promise((resolve, reject) => {
    connection.query("select username from teacher natural join teacher_user where subject=?",
      [subject.name],
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
  });
};


module.exports = {
  getSubjects, getTeachers, getSubTeachers
};
