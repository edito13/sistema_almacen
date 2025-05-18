import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import { Mail, Lock, User, Loader } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Api from "@/services/api";
import useAuth from "@/hooks/useAuth";
import Input from "@/components/Input";
import LanguageSelector from "@/components/LanguageSelector";
import schema from "@/schemas/registerSchema";
import type { RegisterFormData } from "@/types/schemas";

const SignUp: React.FC = () => {
  const { t } = useTranslation();
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

      toast.success(t("register.success"));
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
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 z-0" />

        {/* Language selector no topo */}
        <div className="absolute top-4 right-4 z-10">
          <LanguageSelector />
        </div>

        {/* Conteúdo principal */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-white text-4xl font-bold leading-tight drop-shadow-md">
              {t("register.title")}
            </h1>
            <h2 className="text-white text-2xl mt-2 drop-shadow-md">
              {t("register.subTitle")}
            </h2>
          </div>

          {/* Card de cadastro */}
          <div className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden p-10">
            {/* Cabeçalho */}
            <div>
              <h3 className="text-orange-500 text-2xl font-bold">
                {t("register.create")}
              </h3>
              <p className="text-sm">
                {t("register.have_account")}{" "}
                <Link className="text-orange-500 font-bold" to="/sign-in">
                  {t("register.login")}
                </Link>
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-5">
              <Input
                  type="text"
                  placeholder={t("register.name")}
                  icon={<User size={18} />}
                  register={register}
                  name="name"
                  error={errors.name?.message}
              />

              <Input
                  type="email"
                  placeholder={t("register.email")}
                  icon={<Mail size={18} />}
                  register={register}
                  name="email"
                  error={errors.email?.message}
              />

              <Input
                  type="password"
                  placeholder={t("register.password")}
                  icon={<Lock size={18} />}
                  register={register}
                  name="password"
                  error={errors.password?.message}
              />

              <Input
                  type="password"
                  placeholder={t("register.confirm_password")}
                  icon={<Lock size={18} />}
                  register={register}
                  name="confirmPassword"
                  error={errors.confirmPassword?.message}
              />

              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-orange-500">
                  {t("register.forgot_password")}
                </Link>
              </div>

              <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-500 text-white font-semibold uppercase py-3 rounded-lg hover:bg-orange-600 transition flex items-center justify-center disabled:bg-orange-400"
              >
                {isSubmitting ? (
                    <>
                      <Loader className="animate-spin mr-2" size={18} />
                      {t("register.loading")}
                    </>
                ) : (
                    t("register.submit")
                )}
              </button>

              <ToastContainer position="bottom-right" />
            </form>
          </div>
        </div>

        {/* Versão do sistema */}
        <div className="mt-4 text-white text-sm drop-shadow-md">
          {t("register.version", "Versão 1.0.0")}
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 left-4 text-white text-sm z-10 drop-shadow-md">
          © {currentYear} – {t("register.rights", "Todos os direitos reservados")}
        </div>
      </div>
  );
};

export default SignUp;
