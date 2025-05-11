import React, { useState } from "react";
import { Plus, Search, Calendar, ChevronDown } from "lucide-react";

interface SaidaItem {
  id: number;
  produto: string;
  conceito: string;
  quantidade: number;
  responsavelEntrega: string;
  responsavelRecebimento: string;
  destino: string;
  dataSaida: string;
  dataEntrega: string;
}

const Saidas: React.FC = () => {
  // Estados dos filtros
  const [filtroProduto, setFiltroProduto] = useState("");
  const [responsavelEntrega, setResponsavelEntrega] = useState("");
  const [responsavelRecebimento, setResponsavelRecebimento] = useState("");
  const [destino, setDestino] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  // Dados fictícios
  const data: SaidaItem[] = [
    { id: 1, produto: "Monitor Dell 24\"", conceito: "Envio para filial", quantidade: 2, responsavelEntrega: "João Silva", responsavelRecebimento: "Ana Costa", destino: "Filial SP", dataSaida: "2025-05-10", dataEntrega: "2025-05-12" },
    { id: 2, produto: "Teclado Logitech", conceito: "Atendimento cliente", quantidade: 3, responsavelEntrega: "Maria Souza", responsavelRecebimento: "Pedro Ramos", destino: "Cliente XYZ", dataSaida: "2025-05-11", dataEntrega: "2025-05-13" },
    // ... mais itens
  ];

  // Filtragem básica
  const filtrados = data.filter(item =>
      item.produto.toLowerCase().includes(filtroProduto.toLowerCase()) &&
      (responsavelEntrega === "" || item.responsavelEntrega.toLowerCase().includes(responsavelEntrega.toLowerCase())) &&
      (responsavelRecebimento === "" || item.responsavelRecebimento.toLowerCase().includes(responsavelRecebimento.toLowerCase())) &&
      (destino === "" || item.destino.toLowerCase().includes(destino.toLowerCase()))
  );

  // Paginação
  const itensPorPagina = 5;
  const [paginaAtual, setPaginaAtual] = useState(1);
  const totalPaginas = Math.ceil(filtrados.length / itensPorPagina);
  const paginados = filtrados.slice((paginaAtual - 1) * itensPorPagina, paginaAtual * itensPorPagina);

  const handlePage = (page: number) => setPaginaAtual(Math.min(Math.max(page, 1), totalPaginas));

  return (
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-lg p-6 shadow-md mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Saídas do Almoxarifado</h1>
            <button className="bg-white text-orange-500 px-4 py-2 rounded-md shadow-sm flex items-center space-x-2 hover:bg-orange-50 transition">
              <Plus size={18} />
              <span className="font-medium">Nova Saída</span>
            </button>
          </div>

          {/* Filtros */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
              <input
                  type="text"
                  placeholder="Nome do produto"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={filtroProduto}
                  onChange={e => setFiltroProduto(e.target.value)}
              />
              <input
                  type="text"
                  placeholder="Responsável de Entrega"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={responsavelEntrega}
                  onChange={e => setResponsavelEntrega(e.target.value)}
              />
              <input
                  type="text"
                  placeholder="Responsável de Recebimento"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={responsavelRecebimento}
                  onChange={e => setResponsavelRecebimento(e.target.value)}
              />
              <input
                  type="text"
                  placeholder="Destino"
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={destino}
                  onChange={e => setDestino(e.target.value)}
              />
              <div className="relative">
                <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={dataInicio}
                    onChange={e => setDataInicio(e.target.value)}
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <div className="relative">
                <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={dataFim}
                    onChange={e => setDataFim(e.target.value)}
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div className="mt-4 flex justify-start">
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium flex items-center transition duration-200">
                <Search size={18} className="mr-2" />
                Buscar
              </button>
            </div>
          </div>

          {/* Tabela */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRODUTO</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CONCEITO</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QUANTIDADE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATA DE SAÍDA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATA DE ENTREGA</th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {paginados.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.produto}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.conceito}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantidade}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.dataSaida}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.dataEntrega}</td>
                  </tr>
              ))}
              </tbody>
            </table>

            {/* Paginação */}
            <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">{(paginaAtual - 1) * itensPorPagina + 1}</span> a <span className="font-medium">{Math.min(paginaAtual * itensPorPagina, filtrados.length)}</span> de <span className="font-medium">{filtrados.length}</span> resultados
              </p>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Paginação">
                <button onClick={() => handlePage(paginaAtual - 1)} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <ChevronDown className="h-5 w-5 rotate-90" aria-hidden="true" />
                </button>
                {Array.from({ length: totalPaginas }, (_, i) => (
                    <button key={i} onClick={() => handlePage(i + 1)} className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${paginaAtual === i + 1 ? 'bg-orange-50 text-orange-500' : 'bg-white text-gray-500'} hover:bg-gray-50`}>{i + 1}</button>
                ))}
                <button onClick={() => handlePage(paginaAtual + 1)} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <ChevronDown className="h-5 w-5 -rotate-90" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Saidas;