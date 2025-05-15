import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import { Mail, Lock, Loader, User } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";

import Api from "@/services/api";
import useAuth from "@/hooks/useAuth";
import Input from "@/components/Input";
import schema from "@/schemas/registerSchema";
import type { RegisterFormData } from "@/types/schemas";

const SignUp: React.FC = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (formData) => {
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      const data = await Api.auth.register(payload);
      if (data?.error) throw data.message;

      toast.success("Conta criada com sucesso.");

      signIn(data);
      navigate("/");
    } catch (message) {
      toast.error(message as string);
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
        <div className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden p-10">
          {/* Cabeçalho */}
          <div>
            <h3 className="text-orange-500 text-2xl font-bold">
              Criar uma conta
            </h3>
            <p className="text-sm">
              Já tem uma conta?{" "}
              <Link className="text-orange-500 font-bold" to="/sign-in">
                Fazer login
              </Link>
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-5">
            {/* Campo de Nome */}
            <Input
              type="text"
              placeholder="Nome do usuário"
              icon={<User size={18} />}
              register={register}
              name="name"
              error={errors.name?.message}
            />

            {/* Campo de Email */}
            <Input
              type="email"
              placeholder="Email"
              icon={<Mail size={18} />}
              register={register}
              name="email"
              error={errors.email?.message}
            />

            {/* Campo de Senha */}
            <Input
              type="password"
              placeholder="Senha"
              icon={<Lock size={18} />}
              register={register}
              name="password"
              error={errors.password?.message}
            />

            <Input
              type="password"
              placeholder="Confirmar senha"
              icon={<Lock size={18} />}
              register={register}
              name="confirmPassword"
              error={errors.confirmPassword?.message}
            />

            {/* Link "Esqueceu a senha" */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-orange-500">
                Esqueceu a senha?
              </Link>
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
                "Criar conta"
              )}
            </button>
            <ToastContainer position="bottom-right" />
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

export default SignUp;
