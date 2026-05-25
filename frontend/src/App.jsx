import { useState } from "react";
import Login from "./Login";
import "./App.css";

export default function App() {
  const [logado, setLogado] = useState(
    localStorage.getItem("logado") === "true"
  );

  if (!logado) {
    return <Login onLogin={() => setLogado(true)} />;
  }

  return (
    <div className="flex">
      <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-10">
          Estoque Inteligente
        </h1>

        <ul className="space-y-6">
          <li>Produtos</li>
          <li>Vendas</li>
          <li>Relatórios</li>
          <li>Configurações</li>
        </ul>
      </aside>

      <main className="flex-1 bg-slate-950 text-white p-10">
        <h1 className="text-5xl font-bold mb-10">
          Dashboard
        </h1>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-slate-800 p-6 rounded-2xl">
            <p>Produtos</p>
            <h2 className="text-4xl font-bold">120</h2>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl">
            <p>Vendas Hoje</p>
            <h2 className="text-4xl font-bold">35</h2>
          </div>

          <div className="bg-slate-800 p-6 rounded-2xl">
            <p>Estoque Baixo</p>
            <h2 className="text-4xl font-bold text-red-400">
              8
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
}