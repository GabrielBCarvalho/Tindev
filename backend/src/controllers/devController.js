const axios = require('axios')
const Dev = require('../models/dev')

module.exports = {
    async store(req, res){
        const { username } = req.body

        const userExists = await Dev.findOne({ user: username })

        if(userExists){
            return res.json(userExists)
        }
        
        const response = await axios.get(`https://api.github.com/users/${username}`)

        const { name, bio, avatar_url: avatar } = response.data

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar 
        })

        return res.json(dev)
    },

    async index(req, res){
        const { user } = req.headers
        const loggedUser = await Dev.findById(user)

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },      // id não igual ao do usuário
                { _id: { $nin: loggedUser.likes } },    // ids que não deu like
                { _id: { $nin: loggedUser.dislikes } }  // ids que não deu dislike
            ]
        })

        return res.json(users)
    }
}