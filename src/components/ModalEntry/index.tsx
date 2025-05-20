import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Save, XCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

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
  onSave: (data: any) => void;
}

// Este componente foi revisado para corrigir problemas de sobreposição e estilo
const ModalEntry: React.FC<ModalEntryProps> = ({ onSave }) => {
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
  const { watch } = form;

  const equipments = dataEquipments?.map((equipment) => ({
    value: equipment.id,
    label: equipment.name,
  }));

  const handleSubmit: SubmitHandler<EntryFormData> = async (data) => {
    alert("Dados Salvos");
    console.log("Dados Salvos: ", data);
    console.log(typeof data.equipment_id);

    try {
      const response = await Api.entry.createEntry(data);
      if (response?.error) throw response.message;

      console.log("Resposta da API: ", response);

      toast.success("Entrada feita com sucesso!");
    } catch (message) {
      toast.error(message as string);
    }
  };

  return (
    <Modal.Root name="entry">
      <Modal.Title Icon={Save}>Nova Entrada</Modal.Title>
      <Modal.Content>
        <Form form={form} onSubmit={handleSubmit}>
          <Input
            label="Equipamento"
            control={form.control}
            name="equipment_id"
            select
            size={6}
            required
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
            size={4}
            placeholder="Digite o fornecedor"
          />

          <Input
            label="Detalhes"
            control={form.control}
            name="details"
            required
            size={4}
            placeholder="Digite os detalhes"
          />

          <Input
            label="Quantidade Mínima"
            control={form.control}
            name="minimum_quantity"
            type="number"
            required
            size={4}
            placeholder="Digite a quantidade mínima"
          />

          <Input
            label="Conceito"
            control={form.control}
            name="concept"
            select
            required
            size={4}
            options={[
              { value: "Nova Compra", label: "Nova Compra" },
              { value: "Doação", label: "Doação" },
            ]}
            placeholder="Selecione um conceito"
          />

          <Input
            label="Data de Entrada"
            control={form.control}
            name="entry_date"
            type="date"
            required
            size={4}
          />

          <Input
            label="Responsável"
            control={form.control}
            name="responsible"
            required
            size={4}
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
export default ModalEntry;
