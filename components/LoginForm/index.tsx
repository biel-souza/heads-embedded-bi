import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import { signIn, SignInOptions } from "next-auth/react";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import { Form, LoginContainer, Logo, Title, Button } from "./style";
import logo from "@/images/logo-login.jpeg";
import { InputText } from "../InputText";
import { Container } from "../Container";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const validationSchema = Yup.object({
    user: Yup.string().required("O usuário é obrigatório"),
    password: Yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("A senha é obrigatória"),
  });

  const handleSubmit = async (values: SignInOptions) => {
    setLoading(true);
    try {
      await signIn("credentials", values);

      toast.success("Usuário logado!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao fazer login!");
    }
    setLoading(false);
  };

  return (
    <Container loading={loading}>
      <LoginContainer>
        <Logo src={logo.src} />
        <Title>INFORME SEUS DADOS</Title>
        <Formik
          initialValues={{ user: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <InputText
                type="text"
                name="user"
                placeholder="Usuário"
                error={errors.user}
                value={values.user}
                label="Usuário"
                onChange={handleChange}
              />
              <InputText
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                error={errors.password}
                name="password"
                placeholder="Senha"
                label="Senha"
                value={values.password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? "hide the password" : "display the password"}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <Button type="submit">ENTRAR</Button>
            </Form>
          )}
        </Formik>
      </LoginContainer>
    </Container>
  );
};

export default LoginForm;
