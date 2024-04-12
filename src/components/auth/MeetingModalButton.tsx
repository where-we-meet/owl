'use client';
import { Meeting } from '../my-owl/meeting/Meeting';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, useDisclosure } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

export const MeetingModalButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleMeetingRedirect = (e: MouseEvent<HTMLDivElement>) => {
    onClose();
  };

  return (
    <div>
      <Button onClick={onOpen} isIconOnly className="border-transparent">
        <GiHamburgerMenu />
      </Button>
      <Modal backdrop="blur" size="3xl" isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalBody>
            <div onClick={(e) => handleMeetingRedirect(e)}>
              <Meeting />
            </div>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </div>
  );
};
