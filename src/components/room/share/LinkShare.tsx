'use client';
import { useParams } from 'next/navigation';
import KakaoTalkShare from './KakaoShare';
import {
  Button,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react';
import { FaShareAlt } from 'react-icons/fa';
import styles from './LinkShare.module.css';

const LinkShare = () => {
  const { id: roomId } = useParams();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const shareLink = `${process.env.NEXT_PUBLIC_SITE_URL}/room/${roomId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      alert(`\n${shareLink}\n\n복사 성공!`);
    } catch (error) {
      alert('복사 실패!');
    }
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="transparent" placement="top-center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">공유하기</ModalHeader>
          <ModalBody>
            <Input type="text" defaultValue={shareLink} isReadOnly />
          </ModalBody>
          <ModalFooter>
            <Button as={Link} href={`mailto:?subject=${shareLink}`}>
              메일로 공유
            </Button>
            <KakaoTalkShare link={shareLink} />
            <Button onPress={handleCopy}>복사</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className={styles.button_container}>
        <Button className={styles.button} isIconOnly onPress={onOpen} variant="light" size="lg">
          <p className={styles.share}>공유하기</p> <FaShareAlt />
        </Button>
      </div>
    </>
  );
};

export default LinkShare;
