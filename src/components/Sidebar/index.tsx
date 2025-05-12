import { Button } from "@mui/material";
import { MdDashboard } from "react-icons/md";
import { PackageOpen, Settings } from "lucide-react";
import { FaArrowLeft, FaArrowRight, FaSignOutAlt } from "react-icons/fa";

import Item from "./MenuItem";
import useAuth from "@/hooks/useAuth";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const { signOut } = useAuth();

  const items = [
    { label: "Dashboard", to: "/", icon: MdDashboard },
    { label: "Stock Geral", to: "/stock", icon: PackageOpen },
    { label: "Entradas", to: "/entradas", icon: FaArrowRight },
    { label: "Saídas", to: "/saidas", icon: FaArrowLeft },
    { label: "Configurações", to: "/config", icon: Settings },
  ];

  return (
    <aside className="w-72 flex flex-col gap-4 items-center bg-white shadow-lg rounded-2xl p-6">
      <img className="w-48 mb-4" src="/assets/img/logo-ct-dark.png" />
      <nav className="space-y-2 w-full text-center">
        <span className="text-xs mb-6">
          <b>GERENCIAMENTO DE ARMAZÉM</b>
        </span>
        {items.map((item) => (
          <Item key={item.to} {...item} />
        ))}
      </nav>
      <div className="mt-auto flex justify-center">
        <Button
          variant="text"
          onClick={() => signOut()}
          startIcon={<FaSignOutAlt size={20} />}
        >
          Terminar sessão
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
