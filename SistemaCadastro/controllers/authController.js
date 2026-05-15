import bcrypt from 'bcrypt'
import Usuario from '../models/Usuario.js'

const authController = {

  loginPage(req, res) {
    res.render('login')
  },

  async login(req, res) {

    const { email, senha } = req.body

    const usuario = await Usuario.findOne({
      where: { email }
    })

    if (!usuario) {
      return res.send('Usuário não encontrado')
    }

    const senhaCorreta = await bcrypt.compare(
      senha,
      usuario.senha
    )

    if (!senhaCorreta) {
      return res.send('Senha incorreta')
    }

    req.session.usuario = usuario.id

    res.redirect('/')
  }

}

export default authController