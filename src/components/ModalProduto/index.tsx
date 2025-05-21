import React from "react";
import { toast } from "react-toastify";
import { Save, XCircle } from "lucide-react";
import { Divider, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import Api from "@/services/api";
import useModal from "@/hooks/useModal";
import schema from "@/schemas/equipmentSchema";
import type { EquipmentFormData } from "@/types/schemas";

import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Form from "@/components/CustomForm";

interface ModalProdutoProps {
  onSave: () => void;
}

// Este componente foi revisado para corrigir problemas de sobreposição e estilo
const ModalProduto: React.FC<ModalProdutoProps> = ({ onSave }) => {
  const form = useForm<EquipmentFormData>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const { handleClose } = useModal("product");

  const { data: dataCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: Api.category.getCategories,
  });

  // Verificar preenchimento para habilitar botão
  const isFormValid = form.formState.isValid;

  const categories = dataCategories?.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleSubmit: SubmitHandler<EquipmentFormData> = async (data) => {
    try {
      const response = await Api.equipment.createEquipment(data);
      if (response?.error) throw response.message;

      console.log("Resposta da API: ", response);

      toast.success("Produto criado com sucesso!");
    } catch (message) {
      toast.error(message as string);
    } finally {
      setTimeout(() => onSave(), 1000);
    }
  };

  return (
    <Modal.Root name="product">
      <Modal.Title Icon={Save}>Novo Produto</Modal.Title>
      <Modal.Content>
        <Form form={form} onSubmit={handleSubmit}>
          <Input
            label="Nome do Produto"
            control={form.control}
            name="name"
            size={12}
            required
            placeholder="Digite o nome do produto"
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
            label="Quantidade Mínima"
            control={form.control}
            name="min_quantity"
            type="number"
            required
            size={6}
            placeholder="Digite a quantidade mínima"
          />

          <Input
            label="Tipo"
            control={form.control}
            name="type"
            required
            size={6}
            placeholder="Digite o tipo do produto"
          />

          <Input
            label="Categoria"
            control={form.control}
            name="category_id"
            select
            required
            size={6}
            type="number"
            options={categories || []}
            placeholder="Selecione a categoria"
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
export default ModalProduto;
