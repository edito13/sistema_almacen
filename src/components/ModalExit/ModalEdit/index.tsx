import React from "react";
import { toast } from "react-toastify";
import { Save, XCircle } from "lucide-react";
import { Divider, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import Api from "@/services/api";
import useModal from "@/hooks/useModal";
import schema from "@/schemas/exitSchema";
import type { ExitFormData } from "@/types/schemas";

import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Form from "@/components/CustomForm";

interface ModalEditExitProps {
  item: Exit;
  onSave: () => void;
}

// Este componente foi revisado para corrigir problemas de sobreposição e estilo
const ModalEditExit: React.FC<ModalEditExitProps> = ({ item, onSave }) => {
  const form = useForm<ExitFormData>({
    mode: "all",
    defaultValues: {
      equipment_id: item.equipment_id,
      quantity: item.quantity,
      concept: item.concept,
      exit_date: item.exit_date,
      responsible: item.responsible,
    },
    resolver: zodResolver(schema),
  });

  const { handleClose } = useModal("editExit");

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
    try {
      const response = await Api.exit.updateExit(data, item.id);
      if (response?.error) throw response.message;

      toast.success("Saída editada com sucesso.");
    } catch (message) {
      toast.error(message as string);
    } finally {
      setTimeout(() => onSave(), 1000);
    }
  };

  return (
    <Modal.Root name="editExit">
      <Modal.Title Icon={Save}>Editar Saída</Modal.Title>
      <Modal.Content>
        <Form form={form} onSubmit={handleSubmit}>
          <Input
            label="Equipamento"
            control={form.control}
            name="equipment_id"
            select
            size={6}
            required
            type="number"
            options={equipments || []}
            placeholder="Selecione o equipamento"
          />

          <Input
            label="Quantidade"
            control={form.control}
            name="quantity"
            type="number"
            required
            size={6}
            placeholder="Digite a quantidade"
          />

          <Input
            label="Conceito"
            control={form.control}
            name="concept"
            select
            required
            size={6}
            options={[
              { value: "Empréstimo", label: "Empréstimo" },
              { value: "Venda", label: "Venda" },
              { value: "Doação", label: "Doação" },
              { value: "Roubo", label: "Roubo" },
              { value: "Uso interno", label: "Uso interno" },
            ]}
            placeholder="Selecione um conceito"
          />

          <Input
            label="Data de Saída"
            control={form.control}
            name="exit_date"
            type="date"
            required
            size={6}
          />

          <Input
            label="Responsável"
            control={form.control}
            name="responsible"
            required
            size={12}
            placeholder="Digite o nome do responsável"
          />

          <Grid size={12}>
            <Divider />
            <div className="mt-2 bg-gray-50 flex justify-center sm:justify-end space-x-3">
              <button
                onClick={handleClose}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition duration-200"
              >
                <XCircle size={16} className="mr-1" />
                Cancelar
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
                Confirmar
              </button>
            </div>
          </Grid>
        </Form>
      </Modal.Content>
    </Modal.Root>
  );
};
export default ModalEditExit;
