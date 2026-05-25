import Login from "./Login";
import React, { useState, useEffect } from "react";
import API_URL from "./api";

export default function App() {
  const [logado, setLogado] = useState(
    localStorage.getItem("logado") === "true"
  );

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    setLogado(true);
  }
}, []);

  const [pagina, setPagina] = useState("dashboard");

  const [produtos, setProdutos] = useState([]);
  const [nomeProduto, setNomeProduto] = useState("");
  const [precoProduto, setPrecoProduto] = useState("");

  const [vendas, setVendas] = useState([]);

  function adicionarProduto() {
    if (!nomeProduto || !precoProduto) return;

    const novoProduto = {
      nome: nomeProduto,
      preco: precoProduto,
    };

    setProdutos([...produtos, novoProduto]);

    setNomeProduto("");
    setPrecoProduto("");
  }

  useEffect(() => {
  fetch(`${API_URL}/produtos`)
    .then((res) => res.json())
    .then((data) => {
      setProdutos(data);
    });
}, []);


  function venderProduto(produto) {
    setVendas([...vendas, produto]);
  }

  if (!logado) {
    return <Login onLogin={() => setLogado(true)} />;
    localStorage.setItem("token", data.token);
    
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h1 className="text-3xl font-bold mb-10">
          Estoque Inteligente
        </h1>

        <ul className="space-y-5">
          <li
            className="cursor-pointer"
            onClick={() => setPagina("dashboard")}
          >
            Dashboard
          </li>

          <li
            className="cursor-pointer"
            onClick={() => setPagina("produtos")}
          >
            Produtos
          </li>

          <li
            className="cursor-pointer"
            onClick={() => setPagina("vendas")}
          >
            Vendas
          </li>

          <li
            className="cursor-pointer"
            onClick={() => setPagina("relatorios")}
          >
            Relatórios
          </li>

          <li
            className="cursor-pointer"
            onClick={() => setPagina("config")}
          >
            Configurações
          </li>
        </ul>
      </aside>

      <main className="flex-1 bg-slate-950 text-white p-10">
        {pagina === "dashboard" && (
          <div>
            <h1 className="text-5xl font-bold mb-10">
              Dashboard
            </h1>

            <div className="grid grid-cols-3 gap-6">
              <div className="bg-slate-800 p-6 rounded-2xl">
                <p>Produtos</p>
                <h2 className="text-4xl font-bold">
                  {produtos.length}
                </h2>
              </div>

              <div className="bg-slate-800 p-6 rounded-2xl">
                <p>Vendas</p>
                <h2 className="text-4xl font-bold">
                  {vendas.length}
                </h2>
              </div>

              <div className="bg-slate-800 p-6 rounded-2xl">
                <p>Faturamento</p>
                <h2 className="text-4xl font-bold">
                  R$
                  {vendas.reduce(
                    (total, venda) =>
                      total + Number(venda.preco),
                    0
                  )}
                </h2>
              </div>
            </div>
          </div>
        )}

        {pagina === "produtos" && (
          <div>
            <h1 className="text-4xl font-bold mb-8">
              Produtos
            </h1>

            <div className="bg-slate-800 p-6 rounded-2xl mb-8">
              <input
                type="text"
                placeholder="Nome do produto"
                className="w-full p-3 mb-4 rounded bg-slate-700"
                value={nomeProduto}
                onChange={(e) =>
                  setNomeProduto(e.target.value)
                }
              />

              <input
                type="number"
                placeholder="Preço"
                className="w-full p-3 mb-4 rounded bg-slate-700"
                value={precoProduto}
                onChange={(e) =>
                  setPrecoProduto(e.target.value)
                }
              />

              <button
                onClick={adicionarProduto}
                className="bg-blue-600 p-3 rounded"
              >
                Adicionar Produto
              </button>
            </div>

            <div className="space-y-4">
              {produtos.map((produto, index) => (
                <div
                  key={index}
                  className="bg-slate-800 p-5 rounded-2xl flex justify-between items-center"
                >
                  <div>
                    <h2 className="text-2xl">
                      {produto.nome}
                    </h2>

                    <p>R$ {produto.preco}</p>
                  </div>

                  <button
                    onClick={() =>
                      venderProduto(produto)
                    }
                    className="bg-green-600 p-3 rounded"
                  >
                    Vender
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {pagina === "vendas" && (
          <div>
            <h1 className="text-4xl font-bold mb-8">
              Vendas
            </h1>

            <div className="space-y-4">
              {vendas.map((venda, index) => (
                <div
                  key={index}
                  className="bg-slate-800 p-5 rounded-2xl"
                >
                  <h2 className="text-2xl">
                    {venda.nome}
                  </h2>

                  <p>R$ {venda.preco}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {pagina === "relatorios" && (
          <div>
            <h1 className="text-4xl font-bold mb-8">
              Relatórios
            </h1>

            <div className="bg-slate-800 p-6 rounded-2xl">
              <p>Total Produtos: {produtos.length}</p>

              <p>Total Vendas: {vendas.length}</p>

              <p>
                Faturamento:
                R$
                {vendas.reduce(
                  (total, venda) =>
                    total + Number(venda.preco),
                  0
                )}
              </p>
            </div>
          </div>
        )}

        {pagina === "config" && (
          <div>
            <h1 className="text-4xl font-bold mb-8">
              Configurações
            </h1>

            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="bg-red-600 p-3 rounded"
            >
              Sair
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
