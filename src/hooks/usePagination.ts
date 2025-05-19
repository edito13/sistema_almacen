import { useState } from "react";

interface UsePaginationProps<T> {
  itensPorPagina: number;
  filtrados: T[];
}

const usePagination = <T>({
  itensPorPagina,
  filtrados,
}: UsePaginationProps<T>) => {
  const [paginaAtual, setPaginaAtual] = useState(1);
  const totalPaginas = Math.ceil(filtrados.length / itensPorPagina);
  const paginados = filtrados.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  const handlePage = (page: number) => {
    setPaginaAtual(Math.min(Math.max(page, 1), totalPaginas));
  };

  return {
    paginados,
    handlePage,
    paginaAtual,
    totalPaginas,
  };
};

export default usePagination;
