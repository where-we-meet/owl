import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';

const AlertModal = ({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: () => void }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">위치 권한</ModalHeader>
            <ModalBody>
              <p>현재 위치를 가져오려면 위치 권한을 승인해주세요 ~ 🦉</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                확인
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AlertModal;
