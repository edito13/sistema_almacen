import React, { useState, useEffect } from "react";
import { X, Check, XCircle, LogOut } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Api from "@/services/api";

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    backdropFilter: "blur(3px)",
  },
  content: {
    border: "none",
    boxShadow:
      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
};

// Interface de Props para o novo modal
interface NovaSaidaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void; // A função onSave receberá os dados da saída
}

// Componente NovaSaidaModal
const NovaSaidaModal: React.FC<NovaSaidaModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  // Estados para os campos do formulário de saída
  const [produto, setProduto] = useState("");
  const [conceitoSaida, setConceitoSaida] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [destino, setDestino] = useState("");
  const [dataSaida, setDataSaida] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [responsavelEntrega, setResponsavelEntrega] = useState("");
  const [responsavelRecebe, setResponsavelRecebe] = useState("");
  const [usuario] = useState("Admin"); // Valor fixo como na imagem

  const { data: dataEquipments } = useQuery({
    queryKey: ["equipments"],
    queryFn: Api.equipment.getEquipments,
  });

  // Verificar preenchimento para habilitar botão de confirmação
  const isFormValid =
    produto &&
    conceitoSaida &&
    quantidade &&
    destino &&
    dataSaida &&
    dataEntrega &&
    responsavelEntrega &&
    responsavelRecebe;

  // Dados de exemplo para os selects (ajustar conforme necessário)
  const produtos = dataEquipments?.map((equipment) => equipment.name);
  const conceitos = [
    "Uso Interno",
    "Transferência",
    "Devolução",
    "Venda",
    "Empréstimo",
  ]; // Conceitos de Saída
  const responsaveis = [
    "Carlos Silva",
    "Maria Santos",
    "João Oliveira",
    "Ana Costa",
    "Pedro Almeida",
  ];

  // Efeito para limpar o formulário ao fechar e definir data padrão ao abrir
  useEffect(() => {
    if (!isOpen) {
      setProduto("");
      setConceitoSaida("");
      setQuantidade("");
      setDestino("");
      setDataSaida("");
      setDataEntrega("");
      setResponsavelEntrega("");
      setResponsavelRecebe("");
    } else {
      // Definir data atual como padrão para ambas as datas quando abrir o modal
      const today = new Date().toISOString().split("T")[0];
      setDataSaida(today);
      setDataEntrega(today); // Pode ajustar a lógica se a data de entrega não deve ser hoje por padrão
    }
  }, [isOpen]);

  // Função para lidar com o envio do formulário
  const handleSubmit = () => {
    if (isFormValid) {
      onSave({
        produto,
        conceitoSaida,
        quantidade: Number(quantidade),
        destino,
        dataSaida,
        dataEntrega,
        responsavelEntrega,
        responsavelRecebe,
        usuario, // Inclui o usuário que registrou
      });
      onClose(); // Fecha o modal após salvar
    }
  };

  // Função auxiliar para renderizar campos de seleção (Select)
  const renderSelect = (label, value, onChange, options, required = true) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm"
      >
        <option value="">Selecionar</option> {/* Placeholder ajustado */}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  // Função auxiliar para renderizar campos de entrada (Input)
  const renderInput = (
    label,
    type,
    value,
    onChange,
    placeholder,
    required = true,
    min = null,
    step = null,
    readOnly = false
  ) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 shadow-sm ${
          readOnly ? "bg-gray-100 text-gray-600 cursor-not-allowed" : "bg-white"
        }`}
        placeholder={placeholder}
        min={min}
        step={step}
        readOnly={readOnly}
      />
    </div>
  );

  // Não renderiza nada se o modal não estiver aberto
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto"
      style={modalStyles.overlay}
      onClick={onClose}
    >
      {" "}
      {/* Fecha ao clicar fora */}
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden"
        style={{ ...modalStyles.content, maxHeight: "calc(100vh - 40px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {" "}
        {/* Evita fechar ao clicar dentro */}
        {/* Cabeçalho (ajustado para "Nova Saída") */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-4 flex justify-between items-center">
          {" "}
          {/* Cor do gradiente ajustada ligeiramente para combinar com a imagem */}
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span className="bg-white text-orange-500 p-1 rounded-full">
              <LogOut size={18} /> {/* Ícone apropriado para saída */}
            </span>
            Nova Saída
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-orange-600 rounded-full p-1 transition duration-200" // Hover ligeiramente mais escuro
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>
        {/* Conteúdo do Formulário */}
        <div
          className="p-6 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 160px)" }}
        >
          {" "}
          {/* Aumentado padding para p-6 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
            {" "}
            {/* Ajustado gap */}
            {/* Coluna 1 */}
            <div className="space-y-4">
              {renderSelect(
                "Produtos do Armazém",
                produto,
                (e) => setProduto(e.target.value),
                produtos
              )}
              {renderInput(
                "Destino",
                "text",
                destino,
                (e) => setDestino(e.target.value),
                "Local ou pessoa de destino"
              )}
              {renderSelect(
                "Responsável pela entrega",
                responsavelEntrega,
                (e) => setResponsavelEntrega(e.target.value),
                responsaveis
              )}
            </div>
            {/* Coluna 2 */}
            <div className="space-y-4">
              {renderSelect(
                "Conceito de Saída",
                conceitoSaida,
                (e) => setConceitoSaida(e.target.value),
                conceitos
              )}
              {renderInput(
                "Data de saída",
                "date",
                dataSaida,
                (e) => setDataSaida(e.target.value),
                "dd/mm/aaaa"
              )}
              {renderSelect(
                "Responsável pelo recebimento",
                responsavelRecebe,
                (e) => setResponsavelRecebe(e.target.value),
                responsaveis
              )}
            </div>
            {/* Coluna 3 */}
            <div className="space-y-4">
              {renderInput(
                "Quantidade",
                "number",
                quantidade,
                (e) => setQuantidade(e.target.value),
                "0",
                true,
                "1"
              )}
              {renderInput(
                "Data de entrega",
                "date",
                dataEntrega,
                (e) => setDataEntrega(e.target.value),
                "dd/mm/aaaa"
              )}
              {renderInput(
                "Registrado por usuário",
                "text",
                usuario,
                () => {},
                "",
                false,
                null,
                null,
                true
              )}{" "}
              {/* Campo read-only */}
            </div>
          </div>
          {/* Mensagem de campos obrigatórios (opcional, pode remover se não quiser) */}
          {/* <div className="mt-6 p-3 bg-orange-50 border border-orange-100 rounded text-sm text-orange-800">
                        <p>Por favor, preencha todos os campos obrigatórios marcados com <span className="text-red-500">*</span></p>
                    </div> */}
        </div>
        {/* Rodapé com Botões */}
        <div className="p-4 bg-gray-50 border-t flex justify-end space-x-3">
          {" "}
          {/* Botões alinhados à direita */}
          <button
            onClick={onClose}
            className="flex items-center justify-center px-4 py-2 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-200 bg-gray-100 transition duration-200 font-medium" // Estilo do botão Cancelar ajustado
          >
            <XCircle size={16} className="mr-1.5" />
            CANCELAR
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`flex items-center justify-center px-6 py-2 rounded-md font-medium transition duration-200 ${
              isFormValid
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`} // Estilo do botão Aceitar/Confirmar
          >
            <Check size={16} className="mr-1.5" /> {/* Ícone Check */}
            ACEPTAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default NovaSaidaModal;
