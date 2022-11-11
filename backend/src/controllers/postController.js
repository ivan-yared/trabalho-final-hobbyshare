const postService = require("../services/postService.js")

module.exports = {
    getPost: async (req, res)=> {
        let json = {error: "", result:[]}

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
    }
}