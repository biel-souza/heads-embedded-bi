"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Formik, FormikProps } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { RegisterForm } from "@/components/RegisterForm";
import AdminContainer from "@/components/AdminContainer";
import { HeaderTitle } from "@/components/HeaderTitle";
import { SelectInput } from "@/components/SelectInput";
import { SaveButton } from "@/components/SaveButton";
import { RadioInput } from "@/components/RadioInput";
import type { CompanyType } from "@/types/companies.type";
import { InputText } from "@/components/InputText";
import api from "@/utils/api";

interface ValuesType {
  user: string;
  password: string;
  name: string;
  active: string;
  type: string;
  company: string;
}

const RegisterUser = () => {
  const formikRef = useRef<FormikProps<ValuesType> | null>(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    user: Yup.string().required("O usuário é obrigatório"),
    password: Yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("A senha é obrigatória"),
    active: Yup.string().required("Ativo é obrigatório"),
    name: Yup.string().required("Nome é obrigatório"),
    type: Yup.string().required("Tipo é obrigatório"),
  });

  const handleSubmit = (values: ValuesType) => {
    console.log(values);
  };

  const getCompanies = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/companies", { params: {} });

      if (data?.data) {
        setCompanies(
          data.data.map((company: CompanyType) => ({
            value: company.id,
            label: company.description,
          }))
        );
      }
    } catch (error) {
      toast.error("Erro ao buscar empresas");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  return (
    <AdminContainer loading={loading}>
      <HeaderTitle title="Cadastrar Usuário">
        <SaveButton action={() => formikRef.current?.submitForm()} />
      </HeaderTitle>
      <Formik
        innerRef={formikRef}
        initialValues={{ user: "", password: "", name: "", active: "", type: "", company: "" }}
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
                name="name"
                placeholder="Nome"
                error={errors.name}
                value={values.name}
                label="Nome"
                onChange={handleChange}
              />
            </div>
            <div className="container-input">
              <InputText
                type="text"
                name="user"
                placeholder="Usuário"
                error={errors.user}
                value={values.user}
                label="Usuário"
                onChange={handleChange}
              />
            </div>
            <div className="container-input">
              <InputText
                type="text"
                name="password"
                placeholder="Senha"
                error={errors.password}
                value={values.password}
                label="Senha"
                onChange={handleChange}
              />
            </div>
            <div className="container-input">
              <SelectInput
                label="Empresa"
                name="company"
                onChange={handleChange}
                error={errors.company}
                value={values.company}
                values={companies}
              />
            </div>
            <div className="container-input">
              <SelectInput
                label="Tipo"
                name="type"
                onChange={handleChange}
                error={errors.type}
                value={values.type}
                values={[
                  { label: "Normal", value: "default" },
                  { label: "Admin", value: "admin" },
                ]}
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

export default RegisterUser;
