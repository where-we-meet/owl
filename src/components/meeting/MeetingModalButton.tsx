'use client';
import { Meeting } from '../meeting/Meeting';
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
    <div className={styles.meeting_modal_btn} title="참가 중인 모임 보기">
      <HiRectangleStack onClick={onOpen} size="2rem" />
      <Modal
        className={styles.modal}
        backdrop="opaque"
        size="full"
        isOpen={isOpen}
        onOpenChange={onClose}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeInOut'
              }
            },
            exit: {
              y: 200,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn'
              }
            }
          }
        }}
      >
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
