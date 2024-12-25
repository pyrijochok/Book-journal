const Entry = require('../models/entry.model')
const User = require('../models/user.model')

async function Login(request, reply) {
  const { nick, password } = request.body

  const user = await User.findOne({ nick: nick, password: password })

  if (user) {
    reply.send({
      success: true,
      message: 'Login successful',
      user: user
    })
  } else {
    reply
      .code(401)
      .send({ success: false, message: 'Invalid email or password' })
  }
}

async function Register(request, reply) {
  const { nick, email, password } = request.body

  try {
    const user = new User({
      nick: nick,
      password: password,
      email: email
    })
    const result = await user.save()
    reply.send({ result: result })
  } catch (error) {
    reply.status(500).send(error)
  }
}

module.exports = {
  Login,
  Register
}
