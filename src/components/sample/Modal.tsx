import React, { FC } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  background: red;
  
  color: #fff;
`;

interface ModalProps{
  children: React.ReactNode;  // Allows any React node as children. 
}

const Modal:FC<ModalProps> = ({ children }) => {
  return <ModalContainer>{children}</ModalContainer>;
};

export default Modal;
