import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { useRef, type FormEvent } from 'react';

const DeleteAccountButton = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const preventSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    return;
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return (
    <>
      <form onSubmit={preventSubmit} action={'/auth/delete'} method="post" ref={formRef}>
        <button type="button" onClick={onOpen}>
          회원 탈퇴
        </button>
      </form>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">정말 탈퇴하실 건가요?</ModalHeader>
              <ModalBody>
                <p>계정 정보는 올빼미가 가지고 멀리 날라가요~🦉</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  아니요.
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  할래요.
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteAccountButton;
