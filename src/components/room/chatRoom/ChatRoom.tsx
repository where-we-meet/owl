'use client';
import { ChatMessage } from './ChatMessage';
import { InputBox } from './InputBox';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Tooltip } from '@nextui-org/react';
import { IoChatbubblesSharp } from 'react-icons/io5';
import styles from './ChatRoom.module.css';

export const ChatRoom = ({ roomId }: { roomId: string }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleModalControl = () => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  return (
    <div className={styles.chatroom_modal}>
      <Tooltip color="secondary" content="버튼을 눌러 대화를 나눠보세요">
        <Button color="primary" startContent={<IoChatbubblesSharp size="2rem" />} onPress={handleModalControl}>
          대화하기
        </Button>
      </Tooltip>
      <Modal
        closeButton
        size="xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={false}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className={styles.modal_header}>룸 채팅방</ModalHeader>
              <ModalBody>
                <main>
                  <ChatMessage roomId={roomId} />
                  <div>
                    <InputBox roomId={roomId} />
                  </div>
                </main>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
