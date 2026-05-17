import mysql from 'mysql2/promise'
import express from 'express'
import path from 'path'
import multer from 'multer'
import { fileURLToPath } from 'url'

import sequelize from './models/database.js'
import TartarugaController from './controllers/tartarugaController.js'
import authController from './controllers/authController.js'
import session from 'express-session'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, 'public/uploads')
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }

})

const upload = multer({ storage })

app.get('/', TartarugaController.listar)

app.get('/cadastro', TartarugaController.cadastro)

app.post(
  '/salvar',
  upload.single('imagem'),
  TartarugaController.salvar
)

app.post('/excluir/:id', TartarugaController.excluir)

async function criarBanco() {

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
  })

  await connection.query(`
    CREATE DATABASE IF NOT EXISTS SistemaCadastroTartaruga
  `)

  console.log('Banco criado ou já existente')
}

await criarBanco()

sequelize.sync()
  .then(() => {

    app.listen(8080, () => {
      console.log('Servidor rodando em http://localhost:8080')
    })

  })
  .catch(err => {
    console.log(err)
  })

  app.use(session({
  secret: 'tartarugas',
  resave: false,
  saveUninitialized: false
}))
// 
app.get('/login', authController.loginPage)

app.post('/login', authController.login)

app.get('/editar/:id', TartarugaController.editarPage)

app.post('/atualizar/:id', TartarugaController.atualizar)
// 
app.get(
  '/cadastro-usuario',
  authController.cadastroPage
)

app.post(
  '/cadastro-usuario',
  authController.cadastrar
)