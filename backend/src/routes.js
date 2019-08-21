const express = require('express')
const DevController = require('./controllers/devController')
const LikeController = require('./controllers/likeController')
const DislikeController = require('./controllers/dislikeController')

const routes = express.Router()

routes.post('/devs', DevController.store)
routes.get('/devs', DevController.index)

routes.post('/devs/:devId/likes', LikeController.store)
routes.post('/devs/:devId/dislikes', DislikeController.store)

module.exports = routes