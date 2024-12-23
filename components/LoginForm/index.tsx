import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import logo from "@/images/logo-login.jpeg";
import { useState } from "react";

import { Form, Input, InputContainer, Label, LoginContainer, Logo, Title, Button } from "./style";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <LoginContainer>
      <Logo src={logo.src} />
      <Title>INFORME SEUS DADOS</Title>
      <Form>
        <InputContainer>
          <Label>Email:</Label>
          <Input type="text" name="email" placeholder="Email" />
        </InputContainer>
        <InputContainer>
          <Label>Senha:</Label>
          <Input
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
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
        </InputContainer>
        <Button type="submit">ENTRAR</Button>
      </Form>
    </LoginContainer>
  );
};

export default LoginForm;
