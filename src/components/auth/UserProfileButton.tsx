import { Button } from '@nextui-org/react';
import { PiUserSquareDuotone } from 'react-icons/pi';

const UserProfile = async () => {
  return (
    <div className="flex gap-4 items-center">
      <Button isIconOnly aria-label="User Profile Setting">
        <PiUserSquareDuotone />
      </Button>
    </div>
  );
};

export default UserProfile;
