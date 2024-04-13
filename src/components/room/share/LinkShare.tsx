'use client';
import { useParams } from 'next/navigation';
import KakaoTalkShare from './KakaoShare';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react';

const LinkShare = () => {
  const { id: roomId } = useParams();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const shareLink = `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${roomId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      alert('복사 성공!');
    } catch (error) {
      alert('복사 실패!');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="transparent">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">공유하기</ModalHeader>
              <ModalBody>
                <Input type="text" defaultValue={shareLink} disabled />
                <button onClick={handleCopy}>복사</button>
                <div>
                  <a href={`mailto:?subject=${shareLink}`}>메일로 공유</a>
                  <KakaoTalkShare link={shareLink} />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>Action</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Button onPress={onOpen}>공유하기</Button>
    </>
  );
};

export default LinkShare;
