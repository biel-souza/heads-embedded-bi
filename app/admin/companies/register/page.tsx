"use client";

import { Formik, FormikProps } from "formik";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as Yup from "yup";

import AdminContainer from "@/components/AdminContainer";
import { HeaderTitle } from "@/components/HeaderTitle";
import { SaveButton } from "@/components/SaveButton";
import { RegisterForm } from "@/components/RegisterForm";
import { InputText } from "@/components/InputText";
import { RadioInput } from "@/components/RadioInput";
import api from "@/utils/api";

interface ValuesType {
  description: string;
  pbi_user: string;
  pbi_password: string;
  pbi_client_id: string;
  active: string;
}

const RegisterCompanies = () => {
  const formikRef = useRef<FormikProps<ValuesType> | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object({
    description: Yup.string().required("Descrição é obrigatório"),
    pbi_user: Yup.string().required("Usuário é obrigatório"),
    active: Yup.string().required("Ativo é obrigatório"),
    pbi_password: Yup.string().required("Senha é obrigatório"),
    pbi_client_id: Yup.string().required("Client ID é obrigatório"),
  });

  const handleSubmit = async (values: ValuesType) => {
    setLoading(true);
    try {
      await api.post("/companies", values);

      router.push("/admin/companies");
      toast.success("Cadastrado com sucesso!");
    } catch (error) {
      toast.error("Erro ao cadastrar empresa!");
    }
    setLoading(false);
  };

  return (
    <AdminContainer loading={loading}>
      <HeaderTitle title="Cadastrar Empresa">
        <SaveButton action={() => formikRef.current?.submitForm()} />
      </HeaderTitle>
      <Formik
        innerRef={formikRef}
        initialValues={{ description: "", pbi_user: "", pbi_password: "", pbi_client_id: "", active: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <RegisterForm onSubmit={handleSubmit}>
            <div className="container-input">
              <InputText
                type="text"
                name="description"
                placeholder="Descrição"
                error={errors.description}
                value={values.description}
                label="Descrição"
                onChange={handleChange}
              />
            </div>
            <div className="container-input">
              <InputText
                type="text"
                name="pbi_user"
                placeholder="PBI Usuário"
                error={errors.pbi_user}
                value={values.pbi_user}
                label="PBI Usuário"
                onChange={handleChange}
              />
            </div>
            <div className="container-input">
              <InputText
                type="text"
                name="pbi_password"
                placeholder="PBI Senha"
                error={errors.pbi_password}
                value={values.pbi_password}
                label="PBI Senha"
                onChange={handleChange}
              />
            </div>
            <div className="container-input">
              <InputText
                type="text"
                name="pbi_client_id"
                placeholder="PBI Client ID"
                error={errors.pbi_client_id}
                value={values.pbi_client_id}
                label="PBI Client ID"
                onChange={handleChange}
              />
            </div>
            <div className="container-input">
              <RadioInput
                name="active"
                onChange={handleChange}
                error={errors.active}
                label="Ativo"
                value={values.active}
                values={[
                  { label: "Sim", value: true },
                  { label: "Não", value: false },
                ]}
              />
            </div>
          </RegisterForm>
        )}
      </Formik>
    </AdminContainer>
  );
};

export default RegisterCompanies;
