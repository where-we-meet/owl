'use client';

import { useEffect, useState } from 'react';
import { Button, Image, ModalHeader, ModalBody, Avatar } from '@nextui-org/react';
import { getUserProfileData } from '@/api/profile';
import { useQueryUser } from '@/hooks/useQueryUser';
import { GrFormNext } from 'react-icons/gr';
import { IoClose } from 'react-icons/io5';

import styles from './UserProfileRead.module.css';
import { UserProfileData } from './UserProfileButton';
import { useRoomUserDataStore } from '@/store/userProfileStore';
import DeleteAccountButton from '@/components/auth/DeleteAccountButton';

const UserProfileRead = ({
  toggleEditMode,
  handleClose,
  isOpen
}: {
  toggleEditMode: () => void;
  handleClose: () => void;
  isOpen: boolean;
}) => {
  const user = useQueryUser();
  const { setCurrentProfileURL, setUploadedProfileURL } = useRoomUserDataStore();
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
        setCurrentProfileURL(data.profile_url);
        setUploadedProfileURL('');
      } catch (error) {
        console.error('Error fetching user profile data:', error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('popstate', handleClose);
    } else {
      window.removeEventListener('popstate', handleClose);
    }
    return () => {
      window.removeEventListener('popstate', handleClose);
    };
  }, [isOpen]);
  return (
    <>
      <Button className={styles.close_btn} isIconOnly onPress={handleClose}>
        <IoClose />
      </Button>
      <ModalHeader className="flex flex-col gap-1 text-center">
        <h1 className={styles.header_title}>계정 정보</h1>
      </ModalHeader>
      <ModalBody className={styles.modal_body}>
        <Avatar className={styles.profile} showFallback alt="profile_image" src={`${data.profile_url}`} />
        <div className={styles.info_container}>
          <div className={styles.name_container}>
            <p>닉네임</p>
            <div className={styles.user_edit_container}>
              <p>{data.name}</p>
              <Button onPress={toggleEditMode} className={styles.edit_button}>
                <GrFormNext className={styles.next_icon} />
              </Button>
            </div>
          </div>
          <div className={styles.login_info_container}>
            <p>로그인정보</p>
            <div className={styles.sns_image_container}>
              {user.app_metadata.providers.map((SNS: string, index: number) => (
                <Image
                  className={styles.sns_image}
                  key={index}
                  src={`/images/${SNS}.svg`}
                  alt={SNS}
                  width={34}
                  height={31}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.logout_button}>
          <DeleteAccountButton />
        </div>
      </ModalBody>
    </>
  );
};

export default UserProfileRead;
