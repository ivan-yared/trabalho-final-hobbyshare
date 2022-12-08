const { hashSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const { create, getUserById, getUsers, updateUser, deleteUser, getUserByEmail } = require ("../services/authService.js");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        console.log(body)
        body.password = hashSync(body.password, 10);
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: `Database connection error`
                });
            }
            return res.status(200).json ({
                success: 1,
                data: results
            });
        });
    },

    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },

    updateUser: (req, res) => {
        const body = req.body;
        body.password = hashSync(body.password, 10);
        console.log(body);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                message: `Updated successfully`
            })
        })
    },

    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: `Record not found`
                });
            }
            return res.json({
                success: 1,
                message: `User deleted successfully`
            });
        });
    },

    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: `Email ou senha inválidos`
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                const jsontoken = sign({ result: results }, "qwe1234", {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "Login bem sucedido",
                    token: jsontoken,
                    email: body.email,
                    id: results.id,
                });
            } else {
                return res.json({
                    success: 0,
                    message: "Email ou senha inválidos",
                });
            }
        });
    }


}
