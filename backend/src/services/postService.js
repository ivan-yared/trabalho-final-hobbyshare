const db = require("../db")

module.exports = {
    getPost: () =>{
        return new Promise((aceito, rejeitado)=>{
            db.query("SELECT u.id, name, photo, email, title, body, path_imagem, path_video, created FROM hobbyshare.users u INNER JOIN hobbyshare.posts p ON p.user = u.id ORDER BY created DESC", (error, results)=>{
                if(error){
                    rejeitado(error)
                    return
                }
                aceito(results)
            })
        })
    },

    getPostByID: (id) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM hobbyshare.posts WHERE user = ?', [id], (error, results) => {
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

    insertPost: (title, body, pathImage, pathVideo, email) => {
        return new Promise((aceito, rejeitado) => {

            db.query('INSERT INTO `hobbyshare`.`posts` (title, body, path_imagem, path_video, user) SELECT ?, ?, ?, ?, id FROM `hobbyshare`.`users` WHERE email = ?', 
                [title, body, pathImage, pathVideo, email], 
                (error, results) => {
                    if (error){
                        rejeitado(error)
                        return
                    }
                    aceito(results.insertPost)
                })
        })
    },

    updatePost: (id, title, body, pathImage, pathVideo) => {
        return new Promise((aceito, rejeitado) => {

            db.query('UPDATE `hobbyshare`.`posts` SET title = ?, body = ?, path_imagem = ?, path_video = ?, WHERE id = ?', 
                [title, body, pathImage, pathVideo, id], 
                (error, results) => {
                    if (error){
                        rejeitado(error)
                        return
                    }
                    aceito(results.insertPost)
                })
        })
    },

    deletePost: (id) =>{
        return new Promise((aceito, rejeitado)=>{
            db.query("DELETE FROM `hobbyshare`.`posts` WHERE id = ?", [id], (error, results)=>{
                if(error){
                    rejeitado(error)
                    return
                }
                aceito(results)
            })
        })
    }
}