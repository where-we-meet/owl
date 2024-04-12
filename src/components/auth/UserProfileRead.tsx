'use client';

import { Button, Image, ModalHeader, ModalBody, useDisclosure } from '@nextui-org/react';
import { GrCaretNext } from 'react-icons/gr';
import { IoClose } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { useQueryUser } from '@/hooks/useQueryUser';
import { getUserProfileData } from '@/api/profile';
import { useQuery } from '@tanstack/react-query';

export type UserProfileData = { name: string; profile_url: string | null };

const UserProfileRead = ({ toggleEditMode }: { toggleEditMode: () => void }) => {
  const { onClose } = useDisclosure();
  const [userProfileURL, setUserProfileURL] = useState<string | null>('');

  const { data: user } = useQueryUser();

  /**
   * 실험실
   */
  //state for recent profile data (from supabase DB)
  const [data, setData] = useState<UserProfileData>({
    name: '',
    profile_url: ''
  });

  // useEffect for take recent data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserProfileData(user.id);
        setData({ name: data.name, profile_url: data.profile_url });
      } catch (error) {
        console.error('Error fetching user profile data:', error);
      }
    };
    fetchData();
  });

  const handleClose = () => {
    toggleEditMode();
    onClose();
  };

  return (
    <>
      <Button isIconOnly onPress={handleClose}>
        <IoClose />
      </Button>
      <ModalHeader className="flex flex-col gap-1">계정 정보</ModalHeader>
      <ModalBody>
        <Image width={100} alt="profile_image" src={`${data.profile_url}`} />
        <div>
          <p>닉네임</p>
          <div>
            <p>{data.name}</p>
            <Button onPress={toggleEditMode}>
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
