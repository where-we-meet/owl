'use client';
import { Meeting } from '../my-owl/meeting/Meeting';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from '@nextui-org/react';

export const MeetingButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button onClick={onOpen} isIconOnly className="border-transparent">
        <GiHamburgerMenu />
      </Button>
      <Modal backdrop="blur" size="3xl" isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalBody>
            <Meeting />
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </div>
  );
};
