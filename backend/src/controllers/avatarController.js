const { upload } = require ('../services/avatarService');

module.exports = {
    uploadAvatar: (req, res, err) => {
        const data = { photo: req.file.path, user: req.params.id }
        if(!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)){
            res.send({ msg: 'Apenas arquivos de imagem (JPG, PNG) são permitidos'})
        } else {
            upload(data, (err, results) => {
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
            })

            
        }
    }
}