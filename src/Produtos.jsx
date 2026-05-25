import { useEffect, useState } from "react";
import api from "../services/api";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    api.get("/produtos").then((res) => {
      setProdutos(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Produtos</h1>

      {produtos.map((produto) => (
        <div key={produto.id}>
          <h3>{produto.nome}</h3>
          <p>Quantidade: {produto.quantidade}</p>
        </div>
      ))}
    </div>
  );
}