const connection = require('../db.js');

module.exports = {
    upload: (data, callback) => {
        connection.query(`UPDATE users SET photo = ? WHERE id = ?`, [
            data.photo,
            data.user
        ], (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        })
    },
}