import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Save, XCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import {useTranslation} from "react-i18next";

import Api from "@/services/api";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import useModal from "@/hooks/useModal";
import schema from "@/schemas/entrySchema";
import type { EntryFormData } from "@/types/schemas";
import Form from "../CustomForm";
import { Divider, Grid } from "@mui/material";
import { toast } from "react-toastify";

interface ModalEntryProps {
  onSave: () => void;
}

// Este componente foi revisado para corrigir problemas de sobreposição e estilo
const ModalEntry: React.FC<ModalEntryProps> = ({ onSave }) => {
  const {t} = useTranslation();

  const form = useForm<EntryFormData>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const { handleClose } = useModal("entry");

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

  const handleSubmit: SubmitHandler<EntryFormData> = async (data) => {
    try {
      const response = await Api.entry.createEntry(data);
      if (response?.error) throw response.message;

      console.log("Resposta da API: ", response);

      toast.success(t('entryModal.success'));
    } catch (message) {
      toast.error(message as string);
    } finally {
      setTimeout(() => onSave(), 1000);
    }
  };

  return (
    <Modal.Root name="entry">
      <Modal.Title Icon={Save}>{t('entryModal.title')}</Modal.Title>
      <Modal.Content>
        <Form form={form} onSubmit={handleSubmit}>
          <Input
            label={t('entryModal.equip')}
            control={form.control}
            name="equipment_id"
            select
            size={6}
            required
            options={equipments || []}
            placeholder={t('entryModal.select_equip')}
          />

          <Input
            label={t('entryModal.ammount')}
            control={form.control}
            name="quantity"
            type="number"
            required
            size={6}
            placeholder={t('entryModal.type_ammount')}
          />

          <Input
            label={t('entryModal.supplier')}
            control={form.control}
            name="supplier"
            required
            size={4}
            placeholder={t('entryModal.type_supplier')}
          />

          <Input
            label={t('entryModal.details')}
            control={form.control}
            name="details"
            required
            size={4}
            placeholder={t('entryModal.type_details')}
          />

          <Input
            label={t('entryModal.minAmmount')}
            control={form.control}
            name="minimum_quantity"
            type="number"
            required
            size={4}
            placeholder={t('entryModal.type_minAmmount')}
          />

          <Input
            label={t('entryModal.concept')}
            control={form.control}
            name="concept"
            select
            required
            size={4}
            options={[
              { value: "Nova Compra", label: "Nova Compra" },
              { value: "Doação", label: "Doação" },
            ]}
            placeholder={t('entryModal.select_concept')}
          />

          <Input
            label={t('entryModal.entry_date')}
            control={form.control}
            name="entry_date"
            type="date"
            required
            size={4}
          />

          <Input
            label={t('entryModal.responsible')}
            control={form.control}
            name="responsible"
            required
            size={4}
            placeholder={t('entryModal.type_responsible')}
          />

          <Grid size={12}>
            <Divider />
            <div className="mt-2 bg-gray-50 flex justify-center sm:justify-end space-x-3">
              <button
                onClick={handleClose}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition duration-200"
              >
                <XCircle size={16} className="mr-1" />
                {t('entryModal.cancelBtn')}
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
                {t('entryModal.confirmBtn')}
              </button>
            </div>
          </Grid>
        </Form>
      </Modal.Content>
    </Modal.Root>
  );
};
export default ModalEntry;
