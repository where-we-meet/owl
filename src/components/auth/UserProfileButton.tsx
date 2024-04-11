'use client';

import { Button, Image, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@nextui-org/react';
import { PiUserSquareDuotone } from 'react-icons/pi';
import { GrCaretNext } from 'react-icons/gr';
import { IoClose, IoChevronBack } from 'react-icons/io5';
import { ChangeEvent, useEffect, useState } from 'react';
import { changeUserProfile, updateUserName } from '@/api/supabaseCSR/supabase';
import { ImageUploadModal } from '../my-owl/profile/editable/modal/Modal';
import { useQueryUser } from '@/hooks/useQueryUser';
import { getUserProfileData } from '@/api/profile';

export type UserInfo = {
  authSNS: Array<string>;
  userInfo: {
    userId: string;
    name: string;
    profileURL: string | null;
  };
};

const UserProfile = () => {
  const [data, setData] = useState<UserInfo | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editMode, setEditMode] = useState(false);
  const MAX_NAME_LENGTH = 16;
  const { data: user } = useQueryUser();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserProfileData(user);
      setData(data);
    };
    fetchData();
  }, []);

  if (!data) return null;

  const { authSNS, userInfo } = data;

  const [userName, setUserName] = useState(userInfo.name);
  const [userProfileURL, setUserProfileURL] = useState(userInfo.profileURL);
  const [toggleModal, setToggleModal] = useState(false);
  const handleToggleModal = () => {
    setToggleModal((prev) => !prev);
  };
  const handleChangeUserName = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setUserName(name);
  };

  const handleEditDone = () => {
    if (userName.length < 1) {
      alert('닉네임은 최소 1글자 이상으로 지어주세요.');
    } else if (userName.length > 16) {
      alert('닉네임은 최대 16글자 이하로 지어주세요.');
    } else {
      updateUserName(userInfo.userId, userName);
      if (userProfileURL !== null) {
        changeUserProfile({ userId: userInfo.userId, profile_url: userProfileURL });
      }
      setEditMode(false);
    }
  };

  const handleOpen = () => {
    onOpen();
  };

  const handleClose = () => {
    setUserName(userInfo.name);
    setUserProfileURL(userInfo.profileURL);
    setEditMode(false);
    onClose();
  };

  const handleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const handleEditExit = () => {
    setUserName(userInfo.name);
    setUserProfileURL(userInfo.profileURL);
    setEditMode(false);
  };

  return (
    <>
      <div className="flex gap-4 items-center">
        <Button isIconOnly onPress={handleOpen} aria-label="User Profile Setting">
          <PiUserSquareDuotone />
        </Button>
      </div>
      <Modal backdrop="blur" isOpen={isOpen} onClose={handleClose} hideCloseButton>
        <ModalContent>
          {editMode ? (
            <>
              <Button isIconOnly onPress={handleEditExit}>
                <IoChevronBack />
              </Button>
              <ModalHeader className="flex flex-col gap-1">프로필 수정</ModalHeader>
              <ModalBody>
                <div>
                  <Image width={100} alt="profile_image" src={`${userProfileURL}`} />
                  <Button isIconOnly onPress={handleToggleModal}>
                    <Image src="/images/edit_mode.svg" alt="edit mode" width={24} height={21} />
                  </Button>
                </div>
                <div>
                  <div>
                    <span>
                      <p>닉네임을 입력해주세요</p>
                      <p>
                        {userName.length}/{MAX_NAME_LENGTH}
                      </p>
                    </span>
                    <input type="text" onChange={handleChangeUserName} value={userName} />
                  </div>
                </div>
                <div>
                  <Button onPress={handleEditDone}>저장</Button>
                </div>
                {toggleModal && (
                  <ImageUploadModal handleToggleModal={handleToggleModal} setUserProfileURL={setUserProfileURL} />
                )}
              </ModalBody>
            </>
          ) : (
            <>
              <Button isIconOnly onPress={handleClose}>
                <IoClose />
              </Button>
              <ModalHeader className="flex flex-col gap-1">계정 정보</ModalHeader>
              <ModalBody>
                <Image width={100} alt="profile_image" src={`${userProfileURL}`} />
                <div>
                  <p>닉네임</p>
                  <div>
                    <p>{userName}</p>
                    <Button onPress={handleEditMode}>
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
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserProfile;
