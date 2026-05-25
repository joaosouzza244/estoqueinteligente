const express = require("express");
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

const SECRET = "estoque_inteligente";

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

app.get("/me", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      mensagem: "Token não enviado",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);

    res.json(decoded);
  } catch {
    res.status(401).json({
      mensagem: "Token inválido",
    });
  }
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
        codigo,
        categoria,
        estoque,
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

    res.json({
      messagem: "produto criado com sucesso",
      id: this.lastID,
    });
  });
});

app.get("/produtos", (req, res) => {
  db.all(
    `SELECT * FROM produtos`,
    [],
    (err, produtos) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(produtos);
    }
  );
});

app.get("/produtos/:id", (req, res) => {
  const { id } = req.params;

  db.get(
    `SELECT * FROM produtos WHERE id = ?`,
    [id],
    (err, produto) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(produto);
    }
  );
});

app.put("/produtos/:id", (req, res) => {
  const { id } = req.params;

  const {
    nome,
    codigo,
    categoria,
    preco,
    estoque,
  } = req.body;

  db.run(
    `
    UPDATE produtos
    SET
      nome = ?,
      codigo = ?,
      categoria = ?,
      preco = ?,
      estoque = ?
    WHERE id = ?
    `,
    [
      nome,
      codigo,
      categoria,
      preco,
      estoque,
      id,
    ],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensagem: "Produto atualizado",
      });
    }
  );
});

app.delete("/produtos/:id", (req, res) => {
  const { id } = req.params;

  db.run(
    `DELETE FROM produtos WHERE id = ?`,
    [id],
    function (err) {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        mensagem: "Produto deletado",
      });
    }
  );
});

db.run(`
CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT,
  senha TEXT,
  nivel TEXT
)
`);

db.run(`
CREATE TABLE IF NOT EXISTS produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  codigo TEXT,
  categoria TEXT,
  preco REAL,
  estoque INTEGER,
  validade TEXT,
  lote TEXT,
  foto TEXT
)
`);

db.run(`
CREATE TABLE IF NOT EXISTS vendas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  produto_id INTEGER,
  quantidade INTEGER,
  valor REAL,
  data TEXT
)
`);