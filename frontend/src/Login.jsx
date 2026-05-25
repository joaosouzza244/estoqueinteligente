import { useState } from "react";
import axios from "axios";

export default function Login() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function entrar() {

    const resposta = await axios.post(
      "http://localhost:3000/login",
      {
        email,
        senha
      }
    );

    localStorage.setItem(
      "token",
      resposta.data.token
    );

    alert("Login feito");

  }

  return (
    <div>

      <h1>Login</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        onChange={(e) => setSenha(e.target.value)}
      />

      <button onClick={entrar}>
        Entrar
      </button>

    </div>
  );

}