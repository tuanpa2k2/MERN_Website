import { Modal } from "antd";
import React from "react";
import "./ModalComponent.scss";

const ModalComponent = ({ title = "Modal", isOpen = false, width = 200, children, ...rests }) => {
  return (
    <Modal title={title} open={isOpen} {...rests} width={width}>
      {children}
    </Modal>
  );
};

export default ModalComponent;
