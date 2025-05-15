import { MdDashboard } from "react-icons/md";
import { FaArrowLeft, FaArrowRight, FaSignOutAlt } from "react-icons/fa";
import {
  PackageOpen,
  Settings,
  Code,
  Layers,
  Grid,
  Users,
  LogOut,
  PackageSearch,
  Binary,
} from "lucide-react";

import Item from "./MenuItem";
import useAuth from "@/hooks/useAuth";

// @ts-ignore
interface ItemProps {
  key: string;
  label: string;
  to: string;
  icon: React.ComponentType;
  className?: string;
}

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const { signOut } = useAuth();

  // Grupos de navegação
  const warehouseItems = [
    { label: "Dashboard", to: "/", icon: MdDashboard },
    { label: "Stock Geral", to: "/stock", icon: PackageOpen },
    { label: "Entradas", to: "/entradas", icon: FaArrowRight },
    { label: "Saídas", to: "/saidas", icon: FaArrowLeft },
  ];

  const configItems = [
    { label: "Produtos", to: "/produtos", icon: PackageSearch },
    { label: "Código", to: "/codigo", icon: Binary },
    { label: "Família", to: "/familia", icon: Layers },
    { label: "Conjunto", to: "/conjuntos", icon: Layers },
    { label: "Áreas", to: "/areas", icon: Grid },
    { label: "Provedores/Clientes", to: "/clientes", icon: Users },
  ];

  const userManagementItems = [
    { label: "Configurações", to: "/config", icon: Settings },
    {
      label: "Logout",
      to: "/sign-in",
      type: "button",
      icon: LogOut,
      onClick: signOut,
    },
  ];

  return (
    <aside className="max-h-full w-72 flex flex-col bg-white shadow-lg rounded-2xl p-4 transition-all duration-200 hover:shadow-xl">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img className="w-36" src="/assets/img/logo-ct-dark.png" alt="Logo" />
      </div>

      {/* Navegação com scroll interno */}
      <nav className="flex flex-col flex-1 h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {/* Gerenciamento de Armazém */}
        <span className="block w-full text-center text-xs font-semibold uppercase text-gray-500 px-2 mb-2">
          Gerenciamento de Armazém
        </span>
        <div className="space-y-1 px-2 mb-4">
          {warehouseItems.map((item) => (
            <Item
              key={item.to}
              label={item.label}
              to={item.to}
              icon={item.icon}
            />
          ))}
        </div>

        <hr className="border-t border-gray-200 mb-4" />

        {/* Configurações */}
        <span className="block w-full text-center text-xs font-semibold uppercase text-gray-500 px-2 mb-2">
          Configurações
        </span>
        <div className="space-y-1 px-2 mb-4">
          {configItems.map((item) => (
            <Item
              key={item.to}
              label={item.label}
              to={item.to}
              icon={item.icon}
            />
          ))}
        </div>

        <hr className="border-t border-gray-200 mb-4" />

        {/* Gerenciamento de Usuários */}
        <span className="block w-full text-center text-xs font-semibold uppercase text-gray-500 px-2 mb-2">
          Gerenciamento de Usuários
        </span>
        <div className="space-y-1 px-2 mb-4">
          {userManagementItems.map((item) => (
            <Item
              key={item.to}
              label={item.label}
              to={item.to}
              icon={item.icon}
              {...(item.type === "button" && {
                type: "button",
                onClick: item.onClick,
              })}
            />
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
