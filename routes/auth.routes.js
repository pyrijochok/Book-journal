const authController = require('../controllers/auth.controller')

async function authRoutes(fastify, options) {
  fastify.post('/login', authController.Login)
  fastify.post('/register', authController.Register)
}

module.exports = authRoutes
