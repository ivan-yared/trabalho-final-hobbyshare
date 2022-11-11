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
    }
}