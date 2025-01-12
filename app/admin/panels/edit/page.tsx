"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Formik, FormikProps } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { TextAreaInput } from "@/components/TextAreaInput";
import AdminContainer from "@/components/AdminContainer";
import { RegisterForm } from "@/components/RegisterForm";
import { SelectInput } from "@/components/SelectInput";
import { HeaderTitle } from "@/components/HeaderTitle";
import type { CompanyType } from "@/types/companies.type";
import { SaveButton } from "@/components/SaveButton";
import { InputText } from "@/components/InputText";
import api from "@/utils/api";
import { BackButton } from "@/components/BackButton";

interface ValuesType {
  description: string;
  group_id: string;
  report_id: string;
  order: string;
  status: string;
  filter: string;
  company_id?: number | string;
}

const EditPanels = () => {
  const formikRef = useRef<FormikProps<ValuesType> | null>(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  const validationSchema = Yup.object({
    description: Yup.string().required("Descrição é obrigatório"),
    company_id: Yup.number().required("Empresa é obrigatório"),
    order: Yup.number().required("Ordem é obrigatório"),
    group_id: Yup.string().required("Group ID é obrigatório"),
    report_id: Yup.string().required("Report ID é obrigatório"),
    status: Yup.string().required("Status é obrigatório"),
  });

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

  const handleSubmit = async (values: ValuesType) => {
    setLoading(true);
    try {
      await api.patch(`/panels/${id}`, values);

      router.push("/admin/panels");
      toast.success("Salvo com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar!");
    }
    setLoading(false);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/panels/${id}`);

        formikRef.current?.setValues(data);
      } catch (error) {
        router.push("/admin/panels");
        toast.error("Erro ao buscar painél!");
      }
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <AdminContainer loading={loading}>
      <HeaderTitle title="Editar Painel">
        <BackButton route="/admin/panels" />
        <SaveButton action={() => formikRef.current?.submitForm()} />
      </HeaderTitle>
      <Formik
        innerRef={formikRef}
        initialValues={{
          description: "",
          group_id: "",
          report_id: "",
          order: "",
          status: "",
          filter: "",
          company_id: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <RegisterForm onSubmit={handleSubmit}>
            <div className="container-input">
              <SelectInput
                label="Empresa"
                name="company_id"
                onChange={handleChange}
                error={errors.company_id}
                value={values.company_id}
                values={companies}
              />
            </div>
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
                name="group_id"
                placeholder="Group ID"
                error={errors.group_id}
                value={values.group_id}
                label="Group ID"
                onChange={handleChange}
              />
            </div>
            <div className="container-input">
              <InputText
                type="text"
                name="report_id"
                placeholder="Report ID"
                error={errors.report_id}
                value={values.report_id}
                label="Report ID"
                onChange={handleChange}
              />
            </div>
            <div className="container-input">
              <InputText
                type="number"
                name="order"
                placeholder="Ordem"
                error={errors.order}
                value={values.order}
                label="Ordem"
                onChange={handleChange}
              />
            </div>
            <div className="container-input">
              <SelectInput
                label="Status"
                name="status"
                onChange={handleChange}
                error={errors.status}
                value={values.status}
                values={[
                  { label: "Finalizado", value: "finished" },
                  { label: "Desenvolvimento", value: "development" },
                ]}
              />
            </div>
            <div className="container-input">
              <TextAreaInput
                label="Filtros"
                name="filter"
                onChange={handleChange}
                error={errors.filter}
                value={values.filter}
              />
            </div>
          </RegisterForm>
        )}
      </Formik>
    </AdminContainer>
  );
};

export default EditPanels;
