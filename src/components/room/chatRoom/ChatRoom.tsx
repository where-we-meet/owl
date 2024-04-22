'use client';
import { ChatMessage } from './ChatMessage';
import { InputBox } from './InputBox';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';

export const ChatRoom = ({ roomId }: { roomId: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>룸 채팅방</ModalHeader>
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
    </>
  );
};
