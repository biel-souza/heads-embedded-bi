import styled, { keyframes } from "styled-components";

export const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(214, 214, 214, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const floatAnimation = keyframes`
  0%, 100% {
    transform: scale(1) translateY(0);
  }
  50% {
    transform: scale(1.1) translateY(-10px);
  }
`;

export const LoaderImage = styled.img`
  max-width: 250px;
  width: 70%;
  height: auto;
  animation: ${floatAnimation} 2s ease-in-out infinite;
`;
