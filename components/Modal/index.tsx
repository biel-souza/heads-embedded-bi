import { ReactNode } from "react";
import { CloseButton, ModalContent, Overlay } from "./style";

interface Props {
  isOpen: boolean;
  children: ReactNode;
  closeModal: () => void;
}

export const Modal = ({ isOpen, children, closeModal }: Props) => {
  return (
    <>
      {isOpen && (
        <Overlay>
          <ModalContent>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            {children}
          </ModalContent>
        </Overlay>
      )}
    </>
  );
};
