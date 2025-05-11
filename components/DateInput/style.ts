import styled from "styled-components";

export const DateInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 5px;
    font-size: 16px;
    color: rgb(88, 88, 88);
  }

  input {
    padding: 0.5rem;
    border: 1px solid rgb(143, 143, 143);
    border-radius: 4px;
    font-size: 1rem;
    outline: none;
    font-weight: lighter;
    color: rgb(80, 80, 80);
  }
`;
