const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.db");

db.run(`
CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  senha TEXT
)
`);

app.get("/", (req, res) => {
  res.send("API Estoque Inteligente funcionando");
});

app.post("/register", async (req, res) => {
  const { email, senha } = req.body;

  const senhaCriptografada = await bcrypt.hash(senha, 10);

  db.run(
    "INSERT INTO usuarios (email, senha) VALUES (?, ?)",
    [email, senhaCriptografada],
    function (err) {
      if (err) {
        return res.status(400).json({
          erro: "Usuário já existe",
        });
      }

      res.json({
        mensagem: "Conta criada com sucesso",
      });
    }
  );
});

app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  db.get(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    async (err, usuario) => {

      if (!usuario) {
        return res.status(401).json({
          erro: "Email ou senha inválidos",
        });
      }

      const senhaValida = await bcrypt.compare(
        senha,
        usuario.senha
      );

      if (!senhaValida) {
        return res.status(401).json({
          erro: "Email ou senha inválidos",
        });
      }

      const token = jwt.sign(
        { id: usuario.id },
        "segredo",
        { expiresIn: "7d" }
      );

      res.json({
        token,
        email: usuario.email,
      });
    }
  );
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});