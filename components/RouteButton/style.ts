import Link from "next/link";
import styled from "styled-components";

export const Button = styled(Link)`
  display: flex;
  background-color: rgb(88, 88, 88);
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  border-radius: 5px;
  svg {
    color: white;
  }
`;

export const Text = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-left: 5px;
  color: white;
`;
