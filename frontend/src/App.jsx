import {
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
} from "lucide-react";

function App() {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#111827] border-r border-gray-800 p-6">
        
        <h1 className="text-3xl font-bold mb-10">
          Estoque Inteligente
        </h1>

        <nav className="space-y-4">
          
          <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-[#1e293b]">
            <Package />
            Produtos
          </button>

          <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-[#1e293b]">
            <ShoppingCart />
            Vendas
          </button>

          <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-[#1e293b]">
            <BarChart3 />
            Relatórios
          </button>

          <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-[#1e293b]">
            <Settings />
            Configurações
          </button>

        </nav>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-10">

        <h2 className="text-4xl font-bold mb-8">
          Dashboard
        </h2>

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-[#1e293b] p-6 rounded-2xl">
            <h3 className="text-gray-400">
              Produtos
            </h3>

            <p className="text-4xl font-bold mt-3">
              120
            </p>
          </div>

          <div className="bg-[#1e293b] p-6 rounded-2xl">
            <h3 className="text-gray-400">
              Vendas Hoje
            </h3>

            <p className="text-4xl font-bold mt-3">
              35
            </p>
          </div>

          <div className="bg-[#1e293b] p-6 rounded-2xl">
            <h3 className="text-gray-400">
              Estoque Baixo
            </h3>

            <p className="text-4xl font-bold mt-3 text-red-400">
              8
            </p>
          </div>

        </div>

      </main>
    </div>
  );
}

export default App;