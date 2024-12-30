import styled from "styled-components";

interface Props {
  background: string;
  color: string;
}

export const Button = styled.button<Props>`
  display: flex;
  background-color: ${(props) => props.background};
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  border-radius: 5px;
  svg {
    color: ${(props) => props.color};
  }
  cursor: pointer;
`;

export const Text = styled.p<Props>`
  font-size: 16px;
  font-weight: bold;
  margin-left: 5px;
  color: ${(props) => props.color};
`;
