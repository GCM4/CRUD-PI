import Tartaruga from '../models/Tartaruga.js'

const TartarugaController = {

  async listar(req, res) {

    const tartarugas = await Tartaruga.findAll({
      order: [['id', 'DESC']]
    })

    res.render('index', { tartarugas })
  },


  cadastro(req, res) {
    res.render('cadastro')
  },


  async salvar(req, res) {

    const {
      identificacao,
      especie,
      local,
      situacao,
      observacoes
    } = req.body

    let imagem = ''

    if (req.file) {
      imagem = req.file.filename
    }

    await Tartaruga.create({
      identificacao,
      especie,
      local,
      situacao,
      observacoes,
      imagem
    })

    res.redirect('/')
  },


  async excluir(req, res) {

    const { id } = req.params

    await Tartaruga.destroy({
      where: { id }
    })

    res.redirect('/')
  }

}

export default TartarugaController

const TartarugaController = {

  async listar(req, res) {

  },

  cadastro(req, res) {

  },

  async salvar(req, res) {

  },

  async excluir(req, res) {

  },

  async editarPage(req, res) {

    const { id } = req.params

    const tartaruga = await Tartaruga.findByPk(id)

    res.render('editar', { tartaruga })
  },

  async atualizar(req, res) {

    const { id } = req.params

    await Tartaruga.update(req.body, {
      where: { id }
    })

    res.redirect('/')
  }

}