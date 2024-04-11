'use client';

import { Button, Image, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@nextui-org/react';
import { PiUserSquareDuotone } from 'react-icons/pi';
import { GrCaretNext } from 'react-icons/gr';

export type UserInfoProps = {
  userId: string;
  name: string;
  profileURL: string | null;
};

const UserProfile = ({ userInfo, authSNS }: { userInfo: UserInfoProps; authSNS: Array<string> }) => {
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
              <Image width={100} alt="profile_image" src={`${userInfo.profileURL}`} />
              <div>
                <p>닉네임</p>
                <div>
                  <p>{userInfo.name}</p>
                  <Button isIconOnly>
                    <GrCaretNext />
                  </Button>
                </div>
              </div>
              <div>
                <p>로그인정보</p>
                <div>
                  <p>{authSNS} 로그인</p>
                  {authSNS.map((SNS, index) => (
                    <img key={index} src={`/images/${SNS}.svg`} alt={SNS} width={34} height={31} />
                  ))}
                </div>
              </div>
              <div>
                <Button>로그아웃</Button>
              </div>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserProfile;
