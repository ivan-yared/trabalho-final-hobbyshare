const postService = require("../services/postService.js")

module.exports = {
    getPost: async (req, res)=> {
        let json = {result:[]}

        let postagens = await postService.getPost()

        for (let p in postagens){
            json.result.push({
                id: postagens[p].id,
                title: postagens[p].title,
                body: postagens[p].body,
                pathImage: postagens[p].pathImage,
                pathVideo: postagens[p].pathVideo,
                created: postagens[p].created,
                user: postagens[p].user
            })
        }
        res.json(json)
    },

    getPostById: async(req, res) => {
        let json = {error: "", result:{}}

        let id = req.param.id
        let postagem = await postService.getPostById(id)

        if (postagem){
            json.result = postagem
        }

        res.json(json)
    },

    insertPost: async(req, res) => {
        let json = {error: "", result:{}}

        let title = req.body.title
        let body = req.body.body
        let pathImage = req.body.pathImage
        let pathVideo = req.body.pathVideo
        let email = req.body.email

        if (title && body && email){
            let idPostagem = await postService.insertPost(title, body, pathImage, pathVideo, email)
            json.result = {
                id: idPostagem,
                title,
                body,
                pathImage,
                pathVideo,
                email
            }
        }else{
            json.error = 'campos não enviados.'
        }
        res.json(json)
    },

    updatePost: async(req, res) => {
        let json = {error: "", result:{}}

        let id = req.body.id
        let title = req.body.title
        let body = req.body.body
        let pathImage = req.body.pathImage
        let pathVideo = req.body.pathVideo
        let created = req.body.created
        let user = req.body.user

        if (id && title && body && user){
            await postService.updatePost(title, body, pathImage, pathVideo)
            json.result = {
                id,
                title,
                body,
                pathImage,
                pathVideo,
                created,
                user
            }
        }else{
            json.error = 'campos não enviados.'
        }
        res.json(json)
    },

    deletePost: async(req, res) => {
        let json = {error:'', result:{}}

        await postService.deletePost(req.params.id)

        res.json(json)
    }
}