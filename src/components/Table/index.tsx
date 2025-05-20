import { type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import usePagination from "@/hooks/usePagination";

interface Columns<T> {
  name: string;
  accessor: (item: T) => ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Columns<T>[];
}

const Table = <T,>({ columns, data }: TableProps<T>) => {
  const itensPorPagina = 5;
  const { paginaAtual, handlePage, paginados, totalPaginas } = usePagination({
    itensPorPagina,
    filtrados: data,
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((item, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {item.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginados.map((item: T, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {columns.map((col, index) => (
                <td
                  key={index}
                  className={`px-6 py-4 whitespace-nowrap text-sm ${
                    col.name === "PRODUTO"
                      ? "font-medium text-gray-900"
                      : "text-gray-700"
                  }`}
                >
                  {col.accessor(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <p className="text-sm text-gray-700">
          Mostrando{" "}
          <span className="font-medium">
            {(paginaAtual - 1) * itensPorPagina + 1}
          </span>{" "}
          a{" "}
          <span className="font-medium">
            {Math.min(paginaAtual * itensPorPagina, data.length)}
          </span>{" "}
          de <span className="font-medium">{data.length}</span> resultados
        </p>
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Paginação"
        >
          <button
            onClick={() => handlePage(paginaAtual - 1)}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <ChevronDown className="h-5 w-5 rotate-90" aria-hidden="true" />
          </button>
          {Array.from({ length: totalPaginas }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePage(i + 1)}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                paginaAtual === i + 1
                  ? "bg-orange-50 text-orange-500"
                  : "bg-white text-gray-500"
              } hover:bg-gray-50`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePage(paginaAtual + 1)}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            <ChevronDown className="h-5 w-5 -rotate-90" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Table;
