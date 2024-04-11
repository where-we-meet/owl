'use client';

import { Button, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@nextui-org/react';
import { PiUserSquareDuotone } from 'react-icons/pi';

const UserProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };
  return (
    <>
      <div className="flex gap-4 items-center">
        <Button isIconOnly onPress={handleOpen} aria-label="User Profile Setting">
          <PiUserSquareDuotone />
        </Button>
      </div>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">계정 정보</ModalHeader>
            <ModalBody>
              <p>프로필사진</p>
              <div>
                <p>닉네임</p>
                <div>
                  <p>유저닉네임</p>
                  <p>유저 프로필 수정 이동 버튼</p>
                </div>
              </div>
              <div>
                <p>로그인정보</p>
                <div>
                  <p>로그인 소셜 이름</p>
                  <p>로그인 소셜 아이콘</p>
                </div>
              </div>
              <div>
                <p>로그아웃버튼</p>
              </div>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserProfile;
