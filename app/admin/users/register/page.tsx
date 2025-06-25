"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Formik, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/Modal";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { TextAreaInput } from "@/components/TextAreaInput";
import type { CompanyType } from "@/types/companies.type";
import { RegisterForm } from "@/components/RegisterForm";
import AdminContainer from "@/components/AdminContainer";
import { ActionButton } from "@/components/ActionButton";
import { HeaderTitle } from "@/components/HeaderTitle";
import { SelectInput } from "@/components/SelectInput";
import { SaveButton } from "@/components/SaveButton";
import { RadioInput } from "@/components/RadioInput";
import type { PanelType } from "@/types/panels.type";
import { BackButton } from "@/components/BackButton";
import { InputText } from "@/components/InputText";
import api from "@/utils/api";
import "@/styles/table.css";

interface ValuesType {
  user: string;
  password: string;
  name: string;
  active: string;
  type: string;
  company_id: string;
}

interface PanelListType {
  filter: string;
  panel_name?: string;
  panel_id: number | string;
}

interface ValueType {
  label: string;
  value: number | string;
}

const RegisterUser = () => {
  const formikRef = useRef<FormikProps<ValuesType> | null>(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [panels, setPanels] = useState<PanelListType[]>([]);
  const [panelsValue, setPanelsValue] = useState<ValueType[]>([]);
  const [companyValue, setCompanyValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object({
    user: Yup.string().required("O usuário é obrigatório"),
    password: Yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("A senha é obrigatória"),
    active: Yup.string().required("Ativo é obrigatório"),
    name: Yup.string().required("Nome é obrigatório"),
    type: Yup.string().required("Tipo é obrigatório"),
  });

  const handleSubmit = async (values: ValuesType) => {
    setLoading(true);
    try {
      await api.post("/users", { ...values, panels });

      toast.success("Salvo com sucesso!");
      router.push("/admin/users");
    } catch (error) {
      toast.error("Erro ao salvar");
    }
    setLoading(false);
  };

  const handleSubmitPanel = (values: PanelListType) => {
    const valuesPanel = panels;

    valuesPanel.push({
      filter: values.filter,
      panel_id: values.panel_id,
      panel_name: panelsValue.filter((value) => value.value == values.panel_id)[0].label,
    });

    setPanels(valuesPanel);

    setOpenModal(false);
  };

  const getPanelByCompany = useCallback(async () => {
    if (companyValue) {
      setLoading(true);
      try {
        const { data } = await api.get("/panels", { params: { where: { company_id: companyValue } } });

        if (data?.data) {
          setPanelsValue(data.data.map((panel: PanelType) => ({ value: panel.id, label: panel.description })));
        }
      } catch (error) {
        toast.error("Erro ao buscar painéis!");
      }
      setLoading(false);
    }
  }, [companyValue]);

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
    getPanelByCompany();
  }, [getPanelByCompany]);

  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  return (
    <AdminContainer loading={loading}>
      <HeaderTitle title="Cadastrar Usuário">
        <BackButton route="/admin/users" />
        <SaveButton action={() => formikRef.current?.submitForm()} />
      </HeaderTitle>
      <Formik
        innerRef={formikRef}
        initialValues={{ user: "", password: "", name: "", active: "", type: "", company_id: "" }}
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
                name="company_id"
                onChange={(e) => {
                  handleChange(e);
                  setCompanyValue(e.target.value as string);
                }}
                error={errors.company_id}
                value={values.company_id}
                values={companies}
              />
            </div>
            <div className="container-input">
              <SelectInput
                label="Tipo"
                name="type"
                onChange={(e) => {
                  handleChange(e);
                  setTypeValue(e.target.value as string);
                }}
                error={errors.type}
                value={values.type}
                values={[
                  { label: "Normal", value: "default" },
                  { label: "Admin", value: "admin" },
                  { label: "Gestor", value: "manager" },
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
      {companyValue && typeValue == "default" && (
        <div className="container-multiple-values">
          <h1>PAINÉIS</h1>

          <div className="button-container">
            <ActionButton
              title="NOVO ACESSO"
              Icon={FaPlus}
              background="white"
              color="gray"
              action={() => setOpenModal(true)}
            />
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Painel</th>
                  <th>Filtro</th>
                </tr>
              </thead>
              <tbody>
                {panels.map((panel) => (
                  <tr key={panel.panel_id}>
                    <td>{panel.panel_id}</td>
                    <td>{panel.panel_name}</td>
                    <td>{panel.filter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Modal isOpen={openModal} closeModal={() => setOpenModal(false)}>
        <Formik
          initialValues={{ panel_id: "", filter: "" }}
          onSubmit={(values) => {
            handleSubmitPanel(values);
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <RegisterForm onSubmit={handleSubmit}>
              <div className="container-input">
                <SelectInput
                  label="Painél"
                  name="panel_id"
                  onChange={handleChange}
                  value={values.panel_id}
                  values={panelsValue}
                />
              </div>
              <div className="container-input">
                <TextAreaInput label="Filtros" name="filter" onChange={handleChange} value={values.filter} />
              </div>
              <div className="modal-action-button">
                <ActionButton
                  action={() => handleSubmit()}
                  background="gray"
                  Icon={FaPlus}
                  color="white"
                  title="ADICIONAR"
                />
              </div>
            </RegisterForm>
          )}
        </Formik>
      </Modal>
    </AdminContainer>
  );
};

export default RegisterUser;
