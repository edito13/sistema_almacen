import React from "react";
import { toast } from "react-toastify";
import { Save, XCircle } from "lucide-react";
import { Divider, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import Api from "@/services/api";
import useModal from "@/hooks/useModal";
import schema from "@/schemas/entrySchema";
import type { EntryFormData } from "@/types/schemas";

import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Form from "@/components/CustomForm";

interface ModalEditEntryProps {
  item: Entry;
  onSave: () => void;
}

// Este componente foi revisado para corrigir problemas de sobreposição e estilo
const ModalEditEntry: React.FC<ModalEditEntryProps> = ({ item, onSave }) => {
  const form = useForm<EntryFormData>({
    mode: "all",
    defaultValues: {
      equipment_id: item.equipment_id,
      quantity: item.quantity,
      supplier: item.supplier,
      details: item.details,
      concept: item.concept,
      entry_date: item.entry_date,
      responsible: item.responsible,
    },
    resolver: zodResolver(schema),
  });

  const { handleClose } = useModal("editEntry");

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
      const response = await Api.entry.updateEntry(data, item.id);
      if (response?.error) throw response.message;

      toast.success("Entrada editada com sucesso.");
    } catch (message) {
      toast.error(message as string);
    } finally {
      setTimeout(() => onSave(), 600);
    }
  };

  return (
    <Modal.Root name="editEntry">
      <Modal.Title Icon={Save}>Editar Entrada</Modal.Title>
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
            label="Fornecedor"
            control={form.control}
            name="supplier"
            required
            size={6}
            placeholder="Digite o fornecedor"
          />

          <Input
            label="Detalhes"
            control={form.control}
            name="details"
            required
            size={6}
            placeholder="Digite os detalhes"
          />

          <Input
            label="Conceito"
            control={form.control}
            name="concept"
            select
            required
            size={6}
            options={[
              { value: "Nova Compra", label: "Nova compra" },
              { value: "Doação", label: "Doação" },
              { value: "Transferência", label: "Transferência" },
              { value: "Devolução", label: "Devolução" },
            ]}
            placeholder="Selecione um conceito"
          />

          <Input
            label="Data de Entrada"
            control={form.control}
            name="entry_date"
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
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
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
export default ModalEditEntry;
