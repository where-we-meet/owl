'use client';

import { Button, Modal, ModalContent, useDisclosure } from '@nextui-org/react';
import { PiUserSquareDuotone } from 'react-icons/pi';
import { useEffect, useState } from 'react';
import { useQueryUser } from '@/hooks/useQueryUser';
import { getUserProfileData } from '@/api/profile';
import { useQuery } from '@tanstack/react-query';
import UserProfileUpdate from './UserProfileUpdate';
import UserProfileRead from './UserProfileRead';

const UserProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editMode, setEditMode] = useState(false);

  const [userName, setUserName] = useState('');
  const [userProfileURL, setUserProfileURL] = useState<string | null>('');

  const user = useQueryUser();
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

  const handleOpen = () => {
    onOpen();
  };

  const handleClose = () => {
    setEditMode(false);
    onClose();
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <>
      <div className="flex gap-4 items-center">
        <Button isIconOnly onPress={handleOpen} aria-label="User Profile Setting">
          <PiUserSquareDuotone />
        </Button>
      </div>
      {data && (
        <Modal backdrop="blur" isOpen={isOpen} onClose={handleClose} hideCloseButton>
          <ModalContent>
            {editMode ? (
              <UserProfileUpdate toggleEditMode={toggleEditMode} />
            ) : (
              <UserProfileRead toggleEditMode={toggleEditMode} />
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default UserProfile;
