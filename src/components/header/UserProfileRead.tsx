'use client';

import { useEffect, useState } from 'react';
import { Button, Image, ModalHeader, ModalBody } from '@nextui-org/react';
import { getUserProfileData } from '@/api/profile';
import { useQueryUser } from '@/hooks/useQueryUser';
import { GrFormNext } from 'react-icons/gr';
import { IoClose } from 'react-icons/io5';

import styles from './UserProfileRead.module.css';
import Logout from '../auth/LogoutButton';

export type UserProfileData = { name: string; profile_url: string | null };

const UserProfileRead = ({ toggleEditMode, handleClose }: { toggleEditMode: () => void; handleClose: () => void }) => {
  const user = useQueryUser();

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
  }, []);

  return (
    <>
      <Button className={styles.close_btn} isIconOnly onPress={handleClose}>
        <IoClose />
      </Button>
      <ModalHeader className="flex flex-col gap-1 text-center">
        <h1 className={styles.header_title}>계정 정보</h1>
      </ModalHeader>
      <ModalBody className={styles.modal_body}>
        <Image className={styles.profile} alt="profile_image" src={`${data.profile_url}`} />
        <div>
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
          <Logout />
        </div>
      </ModalBody>
    </>
  );
};

export default UserProfileRead;
