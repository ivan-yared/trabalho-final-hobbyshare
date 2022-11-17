const connection = require('../db.js');

module.exports = {
    upload: (data, callback) => {
        connection.query(`INSERT INTO users (photo) VALUES (?)`)
    }
}