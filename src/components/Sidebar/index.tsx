import { MdDashboard } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  PackageOpen,
  Settings,
  Users,
  LogOut,
  PackageSearch,
  Binary,
} from "lucide-react";

import Item from "./MenuItem";
import useAuth from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";

interface ItemProps {
  key: string;
  label: string;
  to: string;
  icon: React.ComponentType;
  type?: string;
  onClick?: () => void;
  className?: string;
}

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const { signOut } = useAuth();
  const { t } = useTranslation();

  // Grupos de navegação
  const warehouseItems = [
    { label: t('sidebar.dashboard'), to: "/", icon: MdDashboard },
    { label: t('sidebar.stock'), to: "/stock", icon: PackageOpen },
    { label: t('sidebar.entries'), to: "/entradas", icon: FaArrowRight },
    { label: t('sidebar.exits'), to: "/saidas", icon: FaArrowLeft },
  ];

  const configItems = [
    { label: t('sidebar.products'), to: "/produtos", icon: PackageSearch },
    { label: t('sidebar.category'), to: "/categoria", icon: Binary },
    { label: t('sidebar.clients'), to: "/clientes", icon: Users },
    { label: t('sidebar.configs'), to: "/config", icon: Settings },
  ];

  return (
      <aside className="max-h-full w-72 flex flex-col bg-white shadow-lg rounded-2xl p-4 transition-all duration-200 hover:shadow-xl">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img className="w-36" src="/assets/img/logo-cuanza.svg" alt="Logo" />
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

          {/* Espaçador para empurrar o logout para baixo */}
          <div className="flex-grow"></div>

          {/* Logout no rodapé */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            <Item
                key="logout"
                label="Logout"
                to="/sign-in"
                icon={LogOut}
                type="button"
                onClick={signOut}
            />
          </div>
        </nav>
      </aside>
  );
};

export default Sidebar;