import { useState } from "react";

export default function Login({ onLogin }) {
  const [modoCadastro, setModoCadastro] = useState(false);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function cadastrar(e) {
    e.preventDefault();

    localStorage.setItem("email", email);
    localStorage.setItem("senha", senha);

    alert("Conta criada com sucesso!");
    setModoCadastro(false);
  }

  function entrar(e) {
    e.preventDefault();

    const emailSalvo = localStorage.getItem("email");
    const senhaSalva = localStorage.getItem("senha");

    if (email === emailSalvo && senha === senhaSalva) {
      localStorage.setItem("logado", "true");
      onLogin();
    } else {
      alert("Email ou senha inválidos");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={modoCadastro ? cadastrar : entrar}
        className="bg-slate-800 p-8 rounded-2xl w-96"
      >
        <h1 className="text-white text-3xl mb-6 font-bold">
          Estoque Inteligente
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded bg-slate-700 text-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full mb-4 p-3 rounded bg-slate-700 text-white"
          onChange={(e) => setSenha(e.target.value)}
        />

        <button className="w-full bg-blue-600 p-3 rounded text-white mb-4">
          {modoCadastro ? "Cadastrar" : "Entrar"}
        </button>

        <p
          className="text-white text-center cursor-pointer"
          onClick={() => setModoCadastro(!modoCadastro)}
        >
          {modoCadastro
            ? "Já tem conta? Entrar"
            : "Criar nova conta"}
        </p>
      </form>
    </div>
  );
}