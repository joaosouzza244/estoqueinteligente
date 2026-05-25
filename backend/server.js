const express = require("express");
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Estoque Inteligente funcionando");
});

app.post("/register", async (req, res) => {

  const { nome, email, senha } = req.body;

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  db.run(
    `INSERT INTO usuarios (nome, email, senha)
     VALUES (?, ?, ?)`,
    [nome, email, senhaCriptografada],
    function (err) {

      if (err) {
        return res.status(500).json({
          erro: "Usuário já existe"
        });
      }

      res.json({
        mensagem: "Usuário criado com sucesso"
      });

    }
  );

});

app.post("/login", (req, res) => {

  const { email, senha } = req.body;

  db.get(
    `SELECT * FROM usuarios WHERE email = ?`,
    [email],
    async (err, usuario) => {

      if (!usuario) {
        return res.status(401).json({
          erro: "Usuário não encontrado"
        });
      }

      const senhaCorreta = await bcrypt.compare(
        senha,
        usuario.senha
      );

      if (!senhaCorreta) {
        return res.status(401).json({
          erro: "Senha inválida"
        });
      }

      const token = jwt.sign(
        {
          id: usuario.id
        },
        "segredo",
        {
          expiresIn: "7d"
        }
      );

      res.json({
        token,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        }
      });

    }
  );

});

app.listen(3000, () => {
  console.log("Servidor rodando");
});

app.post("/produtos", (req, res) => {
  const { nome, quantidade, preco } = req.body;

  db.run(
    `INSERT INTO produtos (nome, quantidade, preco)
     VALUES (?, ?, ?)`,
    [nome, quantidade, preco],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        id: this.lastID,
        nome,
        quantidade,
        preco,
      });
    }
  );
});

app.get("/produtos", (req, res) => {
  db.all("SELECT * FROM produtos", [], (err, rows) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(rows);
  });
});