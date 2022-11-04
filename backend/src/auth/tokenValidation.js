const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            verify(token, "qwe1234", (err, decoded) => {
                if (err){
                    res.json({
                        sucess: 0,
                        message: "Token inválido"
                    });
                } else {
                    next();
                }
            })
        } else {
            res.json({
                success: 0,
                message: "Acesso negado"
            })
        }
    }
}