import React from "react";
import { Save, XCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import {useTranslation} from "react-i18next";

import Api from "@/services/api";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import useModal from "@/hooks/useModal";
import schema from "@/schemas/exitSchema";
import type { ExitFormData } from "@/types/schemas";
import Form from "../CustomForm";
import { Divider, Grid } from "@mui/material";
import { toast } from "react-toastify";

interface ModalExitProps {
  onSave: () => void;
}

// Este componente foi revisado para corrigir problemas de sobreposição e estilo
const ModalExit: React.FC<ModalExitProps> = ({ onSave }) => {
  const {t} = useTranslation();

  const form = useForm<ExitFormData>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const { handleClose } = useModal("exit");

  const { data: dataEquipments } = useQuery({
    queryKey: ["equipments"],
    queryFn: Api.equipment.getEquipments,
  });

  // Verificar preenchimento para habilitar botão
  const isFormValid = form.formState.isValid;

  const equipments = dataEquipments?.map((equipment) => ({
    value: equipment.id,
    label: equipment.name,
  }));

  const handleSubmit: SubmitHandler<ExitFormData> = async (data) => {
    alert(t('exitModal.data_saved'));
    console.log("Dados Salvos: ", data);
    console.log(typeof data.equipment_id);

    try {
      const response = await Api.exit.createExit(data);
      if (response?.error) throw response.message;

      console.log("Resposta da API: ", response);

      // Exibir mensagem de sucesso
      toast.success(t('exitModal.success'));
    } catch (message) {
      toast.error(message as string);
    } finally {
      setTimeout(() => onSave(), 1000);
    }
  };

  return (
    <Modal.Root name="exit">
      <Modal.Title Icon={Save}>{t('exitModal.title')}</Modal.Title>
      <Modal.Content>
        <Form form={form} onSubmit={handleSubmit}>
          <Input
            label={t('exitModal.equip')}
            control={form.control}
            name="equipment_id"
            select
            size={6}
            required
            options={equipments || []}
            placeholder={t('exitModal.select_equip')}
          />

          <Input
            label={t('exitModal.ammount')}
            control={form.control}
            name="quantity"
            type="number"
            required
            size={6}
            placeholder={t('exitModal.type_ammount')}
          />

          <Input
            label={t('exitModal.concept')}
            control={form.control}
            name="concept"
            select
            required
            size={6}
            options={[
              { value: "Nova Compra", label: "Nova Compra" },
              { value: "Doação", label: "Doação" },
            ]}
            placeholder={t('exitModal.concept')}
          />

          <Input
            label={t('exitModal.exit_date')}
            control={form.control}
            name="exit_date"
            type="date"
            required
            size={6}
          />

          <Input
            label={t('exitModal.responsible')}
            control={form.control}
            name="responsible"
            required
            size={12}
            placeholder={t('exitModal.type_responsible')}
          />

          <Grid size={12}>
            <Divider />
            <div className="mt-2 bg-gray-50 flex justify-center sm:justify-end space-x-3">
              <button
                onClick={handleClose}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition duration-200"
              >
                <XCircle size={16} className="mr-1" />
                {t('exitModal.cancelBtn')}
              </button>
              <button
                type="submit"
                disabled={!isFormValid}
                className={`flex items-center justify-center px-6 py-2 rounded font-medium transition duration-200 ${
                  isFormValid
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Save size={16} className="mr-1" />
                {t('exitModal.confirmBtn')}
              </button>
            </div>
          </Grid>
        </Form>
      </Modal.Content>
    </Modal.Root>
  );
};
export default ModalExit;
