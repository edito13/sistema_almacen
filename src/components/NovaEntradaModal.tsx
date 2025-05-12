import React, { useState, useEffect } from "react";
import { X, Save, XCircle } from "lucide-react";

// Estilos globais personalizados para o modal que substituem qualquer estilo Tailwind conflitante
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

interface NovaEntradaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

// Este componente foi revisado para corrigir problemas de sobreposição e estilo
const NovaEntradaModal: React.FC<NovaEntradaModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [produto, setProduto] = useState("");
  const [conceito, setConceito] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [precoUnitario, setPrecoUnitario] = useState("");
  const [moeda, setMoeda] = useState("AOA");
  const [dataEntrada, setDataEntrada] = useState("");
  const [paisFornecedor, setPaisFornecedor] = useState("");
  const [comercioFornecedor, setComercioFornecedor] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [responsavelEntrada, setResponsavelEntrada] = useState("");
  const [responsavelRecebimento, setResponsavelRecebimento] = useState("");
  const [Usuario, setUsuario] = useState("");

  // Verificar preenchimento para habilitar botão
  const isFormValid =
    produto &&
    conceito &&
    quantidade &&
    precoUnitario &&
    dataEntrada &&
    paisFornecedor &&
    comercioFornecedor &&
    localizacao &&
    responsavelEntrada &&
    responsavelRecebimento;

  const produtos = [
    'Monitor Dell 24"',
    "Teclado Logitech",
    "Mouse Logitech",
    "Notebook HP",
    "SSD Kingston",
    "Cabo HDMI",
  ];
  const conceitos = [
    "Nova compra",
    "Reposição",
    "Compra externa",
    "Doação",
    "Transferência",
  ];
  const locais = [
    "Almoxarifado Principal",
    "Almoxarifado Secundário",
    "Escritório Central",
    "Área Técnica",
  ];
  const paises = [
    "Angola",
    "Brasil",
    "Portugal",
    "EUA",
    "China",
    "África do Sul",
  ];
  const responsaveis = [
    "Carlos Silva",
    "Maria Santos",
    "João Oliveira",
    "Ana Costa",
    "Pedro Almeida",
  ];

  useEffect(() => {
    if (!isOpen) {
      setProduto("");
      setConceito("");
      setQuantidade("");
      setPrecoUnitario("");
      setMoeda("AOA");
      setDataEntrada("");
      setPaisFornecedor("");
      setComercioFornecedor("");
      setLocalizacao("");
      setResponsavelEntrada("");
      setResponsavelRecebimento("");
    } else {
      // Definir data atual como padrão quando abrir o modal
      const today = new Date().toISOString().split("T")[0];
      setDataEntrada(today);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    onSave({
      produto,
      conceito,
      quantidade: Number(quantidade),
      precoUnitario: Number(precoUnitario),
      moeda,
      dataEntrada,
      paisFornecedor,
      comercioFornecedor,
      localizacao,
      responsavelEntrada,
      responsavelRecebimento,
    });
    onClose();
  };

  // Function para criar um campo de seleção
  const renderSelect = (
    label:
      | string
      | number
      | bigint
      | boolean
      | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | Promise<
          | string
          | number
          | bigint
          | boolean
          | React.ReactPortal
          | React.ReactElement<
              unknown,
              string | React.JSXElementConstructor<any>
            >
          | Iterable<React.ReactNode>
          | null
          | undefined
        >
      | null
      | undefined,
    value: string | number | readonly string[] | undefined,
    onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined,
    options: any[],
    required = true
  ) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white shadow-sm"
      >
        <option value="">Selecionar {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  // Function para criar um campo de entrada
  const renderInput = (
    label: string,
    type: string,
    value: string | number,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    placeholder: string,
    required = true,
    min: string | number | undefined = undefined,
    step: string | number | undefined = undefined,
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
          readOnly ? "bg-gray-50" : "bg-white"
        }`}
        placeholder={placeholder}
        min={min}
        step={step}
        readOnly={readOnly}
      />
    </div>
  );
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto"
      style={modalStyles.overlay}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden"
        style={{ ...modalStyles.content, maxHeight: "calc(100vh - 40px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-300 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span className="bg-white text-orange-500 p-1 rounded-full">
              <Save size={18} />
            </span>
            Nova Entrada
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-orange-500 rounded-full p-1 transition duration-200"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Conteúdo do Formulário com barra de rolagem própria */}
        <div
          className="p-5 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 160px)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Coluna 1 */}
            <div className="space-y-4">
              {renderSelect(
                "Produto",
                produto,
                (e) => setProduto(e.target.value),
                produtos
              )}
              {renderInput(
                "Quantidade",
                "number",
                quantidade,
                (e) => setQuantidade(e.target.value),
                "0",
                true,
                "1"
              )}
              {renderSelect(
                "País do Fornecedor",
                paisFornecedor,
                (e) => setPaisFornecedor(e.target.value),
                paises
              )}
              {renderSelect(
                "Responsável pela Entrada",
                responsavelEntrada,
                (e) => setResponsavelEntrada(e.target.value),
                responsaveis
              )}
            </div>

            {/* Coluna 2 */}
            <div className="space-y-4">
              {renderSelect(
                "Conceito",
                conceito,
                (e) => setConceito(e.target.value),
                conceitos
              )}
              {renderInput(
                "Preço Unitário",
                "number",
                precoUnitario,
                (e) => setPrecoUnitario(e.target.value),
                "0,00",
                true,
                "0",
                "0.01"
              )}
              {renderInput(
                "Comércio do Fornecedor",
                "text",
                comercioFornecedor,
                (e) => setComercioFornecedor(e.target.value),
                "Nome do fornecedor"
              )}
              {renderSelect(
                "Responsável pelo Recebimento",
                responsavelRecebimento,
                (e) => setResponsavelRecebimento(e.target.value),
                responsaveis
              )}
            </div>

            {/* Coluna 3 */}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Data de Entrada <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={dataEntrada}
                  onChange={(e) => setDataEntrada(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 shadow-sm bg-white"
                />
              </div>
              {renderSelect("Moeda", moeda, (e) => setMoeda(e.target.value), [
                "AOA (Kwanza)",
                "USD (Dolar)",
                "EUR (Euro)",
              ])}
              {renderSelect(
                "Localização",
                localizacao,
                (e) => setLocalizacao(e.target.value),
                locais
              )}
              {renderInput(
                "Usuário",
                "text",
                "Admin",
                (e) => setUsuario(e.target.value),
                "",
                false,
                undefined,
                undefined,
                true
              )}
            </div>
          </div>

          {/* Informações de preenchimento */}
          <div className="mt-5 p-3 bg-orange-50 border border-orange-100 rounded text-sm text-orange-800">
            <p>
              Por favor, preencha todos os campos obrigatórios marcados com{" "}
              <span className="text-red-500">*</span>
            </p>
          </div>
        </div>

        {/* Botões */}
        <div className="p-4 bg-gray-50 border-t flex justify-center sm:justify-end space-x-3">
          <button
            onClick={onClose}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition duration-200"
          >
            <XCircle size={16} className="mr-1" />
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`flex items-center justify-center px-6 py-2 rounded font-medium transition duration-200 ${
              isFormValid
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Save size={16} className="mr-1" />
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NovaEntradaModal;
