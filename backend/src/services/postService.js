const db = require("../db")

module.exports = {
    getPost: () =>{
        return new Promise((aceito, rejeitado)=>{
            db.query("SELECT * FROM `hobbyshare`.`posts`", (error, results)=>{
                if(error){
                    rejeitado(error)
                    return
                }
                aceito(results)
            })
        })
    },

    getSinglePost: (id) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM `hobbyshare`.`posts` WHERE id = ?', [id], (error, results) => {
                if (error){
                    rejeitado(error)
                    return
                }
                
                if(results.length > 0){
                    aceito(results[0])
                }else{
                    aceito[false]
                }
            })
        })
    },

    insertPost: (title, body, pathImage, pathVideo, created, user) => {
        return new Promise((aceito, rejeitado) => {

            db.query('INSERT INTO `hobbyshare`.`posts` (title, body, path_imagem, path_video, created, user) VALUES (?, ?, ?, ?, ?, ?)', 
                [title, body, pathImage, pathVideo, created, user], 
                (error, results) => {
                    if (error){
                        rejeitado(error)
                        return
                    }
                    aceito(results.insertPost)
                })
        })
    }
}