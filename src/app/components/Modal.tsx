import React, { ReactNode } from "react";
import { Button, Modal } from "keep-react";

type MyModalProps = {
  showInfoModal: boolean;
  onClickInfoModal: () => void;
  children: ReactNode;
};

const MyModal: React.FC<MyModalProps> = ({
  showInfoModal,
  onClickInfoModal,
  children,
}) => {
  return (
    <Modal show={showInfoModal} size="sm">
      <Modal.Body className="py-4 mb-4">{children}</Modal.Body>
    </Modal>
  );
};

export default MyModal;
