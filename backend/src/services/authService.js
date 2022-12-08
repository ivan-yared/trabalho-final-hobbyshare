const connection = require('../db.js');

module.exports = {
    create: (data, callback) => {
        connection.query(`INSERT INTO users (name, photo, email, password) VALUES (?, ?, ?, ?)`, [
            data.name,
            data.photo,
            data.email,
            data.password
        ], (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        })
    },
    getUsers: callback => {
        connection.query(`SELECT id, name, photo, email FROM users`, 
        [],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        })
    },
    getUserById: (id, callback) => {
        connection.query(`SELECT id, name, photo, email FROM users WHERE id = ?`,
        [id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results[0]);
        })
    },
    updateUser: (data, callback) => {
        connection.query(`UPDATE users SET name = ?, photo = ?, email = ?, password = ? WHERE id = ?`, [
            data.name,
            data.photo,
            data.email,
            data.password,
            data.id
        ], (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results[0]);
        })
    },
    deleteUser: (data, callback) => {
        connection.query(`DELETE FROM users WHERE id = ?`, 
        [data.id],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results[0]);
        })
    },
    getUserByEmail: (email, callback) => {
        connection.query(`SELECT * FROM hobbyshare.users WHERE email = ?`,
        [email],
        (error, results, fields) => {
            if (error) {
                return callback(error);
            }
            if (results.length === 0) {
                return callback(new Error("Usuário não existe"))
            }
            console.log(results[0]);
            return callback(null, results[0]);
        })
    },
}