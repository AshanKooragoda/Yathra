const {connection} = require('../db.connection');

const getUser = (user) => {
  return new Promise((resolve, reject) => {
    connection.query("select * from user where username=? and password=?",
      [user.username, user.password],
      (err, res) => {
        if(err){
          reject(err);
        }
        resolve(res);
      })
  });
};


module.exports = {
  getUser
};
