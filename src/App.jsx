export default function App() {
  const produtos = [
    {
      id: 1,
      nome: "Notebook Dell",
      categoria: "Eletrônicos",
      quantidade: 12,
      preco: 4500,
      status: "Em estoque",
    },
    {
      id: 2,
      nome: "Mouse Gamer",
      categoria: "Periféricos",
      quantidade: 4,
      preco: 180,
      status: "Estoque baixo",
    },
    {
      id: 3,
      nome: "Teclado Mecânico",
      categoria: "Periféricos",
      quantidade: 20,
      preco: 320,
      status: "Em estoque",
    },
  ];

  const totalProdutos = produtos.length;
  const totalItens = produtos.reduce(
    (acc, produto) => acc + produto.quantidade,
    0
  );

  const valorTotal = produtos.reduce(
    (acc, produto) => acc + produto.preco * produto.quantidade,
    0
  );

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white p-6 hidden md:flex flex-col">
        <h1 className="text-3xl font-bold mb-10">Estoque IA</h1>

        <nav className="space-y-4">
          <button className="w-full text-left bg-blue-600 hover:bg-blue-700 transition p-4 rounded-xl">
            Dashboard
          </button>

          <button className="w-full text-left hover:bg-slate-800 transition p-4 rounded-xl">
            Produtos
          </button>

          <button className="w-full text-left hover:bg-slate-800 transition p-4 rounded-xl">
            Entradas
          </button>

          <button className="w-full text-left hover:bg-slate-800 transition p-4 rounded-xl">
            Saídas
          </button>

          <button className="w-full text-left hover:bg-slate-800 transition p-4 rounded-xl">
            Relatórios
          </button>
        </nav>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-6 md:p-10">
        {/* Topo */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Estoque Inteligente
            </h1>

            <p className="text-slate-500 mt-2">
              Controle inteligente de produtos
            </p>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl shadow-lg">
            + Novo Produto
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-slate-500">Produtos</p>

            <h2 className="text-4xl font-bold mt-3 text-blue-600">
              {totalProdutos}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-slate-500">Itens em estoque</p>

            <h2 className="text-4xl font-bold mt-3 text-green-600">
              {totalItens}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-slate-500">Valor total</p>

            <h2 className="text-4xl font-bold mt-3 text-purple-600">
              R$ {valorTotal.toLocaleString("pt-BR")}
            </h2>
          </div>
        </div>

        {/* Tabela */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-2xl font-bold text-slate-800">
              Produtos cadastrados
            </h2>

            <input
              type="text"
              placeholder="Pesquisar produto..."
              className="border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left p-4">Produto</th>
                  <th className="text-left p-4">Categoria</th>
                  <th className="text-left p-4">Quantidade</th>
                  <th className="text-left p-4">Preço</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Ações</th>
                </tr>
              </thead>

              <tbody>
                {produtos.map((produto) => (
                  <tr
                    key={produto.id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="p-4 font-semibold text-slate-700">
                      {produto.nome}
                    </td>

                    <td className="p-4 text-slate-500">
                      {produto.categoria}
                    </td>

                    <td className="p-4 text-slate-700">
                      {produto.quantidade}
                    </td>

                    <td className="p-4 text-slate-700">
                      R$ {produto.preco}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          produto.quantidade <= 5
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {produto.status}
                      </span>
                    </td>

                    <td className="p-4 flex gap-2">
                      <button className="bg-yellow-400 hover:bg-yellow-500 transition px-4 py-2 rounded-lg text-sm font-semibold">
                        Editar
                      </button>

                      <button className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg text-sm font-semibold">
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
