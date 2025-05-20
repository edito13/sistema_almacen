import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import {useTranslation} from "react-i18next";

import Api from "@/services/api";
import useAuth from "@/hooks/useAuth";
import Input from "@/components/InputBase";
import schema from "@/schemas/loginSchema";
import type { LoginFormData } from "@/types/schemas";
import LanguageSelector from "@/components/LanguageSelector.tsx";

const SignIn: React.FC = () => {
  const {t} = useTranslation();

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

  const onSubmit: SubmitHandler<LoginFormData> = async (payload) => {
    try {
      const data = await Api.auth.login(payload);

      if (data.error) throw data.message;

      signIn(data);
      navigate("/");
    } catch (message) {
      toast.error(message as string);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: "url('/assets/img/bg_talta.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Language selector no topo */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageSelector />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-white text-4xl font-bold leading-tight drop-shadow-md">
            {t('login.title')}
          </h1>
          <h2 className="text-white text-2xl mt-2 drop-shadow-md">
            {t('login.subTitle')}
          </h2>
        </div>

        {/* Card de login */}
        <div className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden p-10">
          {/* Cabeçalho */}
          <div>
            <h3 className="text-orange-500 text-2xl font-bold">
              {t('login.accessAcc')}
            </h3>
            <p className="text-sm">
              {t('login.no_account')}{" "}
              <Link className="text-orange-500" to="/sign-up">
                {t('login.go_to_register')}
              </Link>
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
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

            {/* Link "Esqueceu a senha" */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-orange-500 font-bold">
                {t('login.forgot_password')}
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
                    {t('login.loading')} {/* "Processando..." */}
                  </>
              ) : (
                  t('login.submit') /* "Entrar" */
              )}
            </button>

            <ToastContainer />
          </form>
        </div>
      </div>

      {/* Versão do sistema */}
      <div className="mt-4 text-white text-sm drop-shadow-md"> {t('login.version')}</div>

      {/* Footer */}
      <div className="absolute bottom-4 left-4 text-white text-sm z-10 drop-shadow-md">
        © {currentYear} -  {t('login.rights')}
      </div>
    </div>
  );
};

export default SignIn;
