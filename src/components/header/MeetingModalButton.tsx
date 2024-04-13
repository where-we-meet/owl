'use client';
import { Meeting } from '../my-owl/meeting/Meeting';
import { HiRectangleStack } from 'react-icons/hi2';
import { Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react';
import { MouseEvent } from 'react';
import styles from './MeetingModalButton.module.css';

export const MeetingModalButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleMeetingRedirect = (e: MouseEvent<HTMLDivElement>) => {
    onClose();
  };

  return (
    <div>
      <HiRectangleStack onClick={onOpen} size="1.4rem" />
      <Modal backdrop="opaque" size="3xl" isOpen={isOpen} onOpenChange={onClose}>
        <ModalContent>
          <ModalBody className={styles.modalbody}>
            <div onClick={(e) => handleMeetingRedirect(e)}>
              <Meeting />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
