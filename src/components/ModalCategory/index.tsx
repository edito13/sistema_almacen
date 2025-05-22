import React from "react";
import { toast } from "react-toastify";
import { Save, XCircle } from "lucide-react";
import { Divider, Grid } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";

import Api from "@/services/api";
import useModal from "@/hooks/useModal";

import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Form from "@/components/CustomForm";

// Schema de validação para categoria
const categorySchema = z.object({
    name: z.string().min(1, "Nome da categoria é obrigatório"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface ModalCategoriaProps {
    onSave: () => void;
}

const ModalCategoria: React.FC<ModalCategoriaProps> = ({ onSave }) => {
    const form = useForm<CategoryFormData>({
        mode: "all",
        resolver: zodResolver(categorySchema),
    });

    const { handleClose } = useModal("category");

    // Verificar preenchimento para habilitar botão
    const isFormValid = form.formState.isValid;

    const handleSubmit: SubmitHandler<CategoryFormData> = async (data) => {
        try {
            const response = await Api.category.createCategory(data);
            if (response?.error) throw response.message;

            console.log("Resposta da API: ", response);

            toast.success("Categoria criada com sucesso!");
        } catch (message) {
            toast.error(message as string);
        } finally {
            setTimeout(() => onSave(), 1000);
        }
    };

    return (
        <Modal.Root name="category">
            <Modal.Title Icon={Save}>Nova Categoria</Modal.Title>
            <Modal.Content>
                <Form form={form} onSubmit={handleSubmit}>
                    <Input
                        label="Nome da Categoria"
                        control={form.control}
                        name="name"
                        size={12}
                        required
                        placeholder="Digite o nome da categoria"
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

export default ModalCategoria;