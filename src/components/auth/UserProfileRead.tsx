'use client';

import { Button, Image, ModalHeader, ModalBody, useDisclosure } from '@nextui-org/react';
import { GrCaretNext } from 'react-icons/gr';
import { IoClose } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { useQueryUser } from '@/hooks/useQueryUser';
import { getUserProfileData } from '@/api/profile';
import { useQuery } from '@tanstack/react-query';

export type UserInfo = {
  name: string;
  profile_url: string | null;
};

const UserProfileRead = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editMode, setEditMode] = useState(false);
  const [userName, setUserName] = useState('');
  const [userProfileURL, setUserProfileURL] = useState<string | null>('');

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

  const handleClose = () => {
    setEditMode(false);
    onClose();
  };

  const handleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  return (
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
            <p>{data?.name}</p>
            <Button onPress={handleEditMode}>
              <GrCaretNext />
            </Button>
          </div>
        </div>
        <div>
          <p>로그인정보</p>
          <div>
            {user.app_metadata.providers.map((SNS: string, index: number) => (
              <img key={index} src={`/images/${SNS}.svg`} alt={SNS} width={34} height={31} />
            ))}
          </div>
        </div>
        <div>
          <Button>로그아웃</Button>
        </div>
      </ModalBody>
    </>
  );
};

export default UserProfileRead;
