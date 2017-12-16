const {connection} = require('../db.connection');

const getTeacherNames = () => {        // get names and t_id of all teachers
  return new Promise((resolve, reject) => {
      connection.query("select t_id, user.name from teacher natural join (teacher_user natural join user)",
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
  });
};

const getClassList = (data) => {        // get names and t_id of all teachers
  return new Promise((resolve, reject) => {
    var q = "select c_no, start_date, day, start_time, end_time, subject.name as subject, user.name as teacher, h_no, " +
      "teach.fee as tea_salary, class.fee as class_fee, s_no, t_id from " +
      "subject join( class_sub join ( class_hall join ( class join ( teach join ( teacher join ( user join teacher_user using(username) " +
      ") using(t_id)) using(t_id) ) using(c_no) ) using(c_no) ) using(c_no) ) using(s_no)";
    if (data.t_id === 'All' && data.day === 'All') {
      connection.query( q,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        });
    }else if(data.t_id === 'All') {
      q += "where day=?";
      connection.query( q, [data.day],
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        });
    }else if(data.day === 'All') {
      q += "where teacher.t_id=?";
      connection.query( q, [data.t_id],
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        });
    }else {
      q += "where day=? and teacher.t_id=?";
      connection.query( q, [data.day, data.t_id],
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        });
    }
  });
};


module.exports = {
  getTeacherNames, getClassList
};
