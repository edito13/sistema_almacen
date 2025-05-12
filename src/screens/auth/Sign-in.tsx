import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import Api from "@/services/api";
import useAuth from "@/hooks/useAuth";
import schema from "@/schemas/loginSchema";
import type { LoginFormData } from "@/types/schemas";

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "editoh13@gmail.com",
      password: "123456",
    },
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmit = async (payload: LoginFormData) => {
    try {
      const data = await Api.auth.login(payload);

      if (data.error) throw new Error(data.message);

      signIn(data);
      navigate("/");
    } catch (error) {
      console.error("Erro no login:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: "url('/assets/img/bg_talta.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-white text-4xl font-bold leading-tight drop-shadow-md">
            Sistema de Gestão de Stock
          </h1>
          <h2 className="text-white text-2xl mt-2 drop-shadow-md">
            Unic Sala de TI
          </h2>
        </div>

        {/* Card de login */}
        <div className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Cabeçalho */}
          <div className="bg-orange-500 text-white text-2xl font-bold py-5 text-center">
            Login
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
            {/* Campo de Email */}
            <div className="space-y-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className={`w-full border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  {...register("email")}
                  style={{ paddingLeft: "2.5rem" }}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Campo de Senha */}
            <div className="space-y-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  placeholder="Senha"
                  className={`w-full border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  {...register("password")}
                  style={{ paddingLeft: "2.5rem" }}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Link "Esqueceu a senha" */}
            <div className="text-right">
              <a
                href="#"
                className="text-sm text-orange-600 hover:text-orange-700 hover:underline"
              >
                Esqueceu a senha?
              </a>
            </div>

            {/* Botão de Login */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 text-white font-semibold uppercase py-3 rounded-lg hover:bg-orange-600 transition flex items-center justify-center disabled:bg-orange-400"
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin mr-2" size={18} />
                  Processando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Versão do sistema */}
      <div className="mt-4 text-white text-sm drop-shadow-md">Versão 1.0.0</div>

      {/* Footer */}
      <div className="absolute bottom-4 left-4 text-white text-sm z-10 drop-shadow-md">
        © {currentYear} - Todos os direitos reservados
      </div>
    </div>
  );
};

export default SignIn;
