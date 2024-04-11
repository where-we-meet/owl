import { Button } from '@nextui-org/react';

const UserProfile = async () => {
  return (
    <div className="flex gap-4 items-center">
      <Button isIconOnly color="danger" aria-label="Like"></Button>
      <Button isIconOnly color="warning" variant="faded" aria-label="Take a photo"></Button>
    </div>
  );
};

export default UserProfile;
