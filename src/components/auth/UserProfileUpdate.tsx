'use client';

import { Button, Image, ModalHeader, ModalBody } from '@nextui-org/react';
import { IoChevronBack } from 'react-icons/io5';
import { ChangeEvent, useEffect, useState } from 'react';
import { changeUserProfile, updateUserName } from '@/api/supabaseCSR/supabase';
import { ImageUploadModal } from '../my-owl/profile/modal/Modal';
import { useQueryUser } from '@/hooks/useQueryUser';
import { getUserProfileData } from '@/api/profile';
import { useQuery } from '@tanstack/react-query';

const MAX_NAME_LENGTH = 16;

const UserProfileUpdate = ({ toggleEditMode }: { toggleEditMode: () => void }) => {
  const [userName, setUserName] = useState('');
  const [userProfileURL, setUserProfileURL] = useState<string | null>('');
  const [toggleModal, setToggleModal] = useState(false);

  const { data: user } = useQueryUser();
  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getUserProfileData(user.id)
  });

  useEffect(() => {
    if (data) {
      setUserName(data.name);
      setUserProfileURL(data.profile_url);
    }
  }, [data]);

  const handleToggleModal = () => {
    setToggleModal((prev) => !prev);
  };

  const handleChangeUserName = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setUserName(name);
  };

  const handleEditDone = async () => {
    if (userName.length < 1) {
      alert('닉네임은 최소 1글자 이상으로 지어주세요.');
    } else if (userName.length > 16) {
      alert('닉네임은 최대 16글자 이하로 지어주세요.');
    } else {
      await updateUserName(user.id, userName);
      if (userProfileURL !== null) {
        await changeUserProfile({ userId: user.id, profile_url: userProfileURL });
      }
      toggleEditMode();
    }
  };

  const handleEditExit = () => {
    toggleEditMode();
  };

  return (
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
  );
};

export default UserProfileUpdate;
