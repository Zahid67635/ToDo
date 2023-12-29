import React, { ReactNode } from "react";
import { Button, Modal } from "keep-react";

type ConfirmModalProps = {
  showInfoModal: boolean;
  onClickInfoModal: () => void;
  children: ReactNode;
};

const MyModal: React.FC<ConfirmModalProps> = ({
  showInfoModal,
  onClickInfoModal,
  children,
}) => {
  return (
    <Modal show={showInfoModal} size="sm">
      <Modal.Body className="py-4 mb-4">{children}</Modal.Body>
      <Modal.Footer>
        <div className=" flex justify-start gap-4 ">
          <Button type="outlineGray" size="sm" onClick={onClickInfoModal}>
            Cancel
          </Button>
          <Button
            type="primary"
            color="info"
            size="sm"
            onClick={onClickInfoModal}
          >
            Confirm
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;
