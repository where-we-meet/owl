import Calender from '../calender/Calender';

import StartLocationBox from '../place/StartLocationBox';
import UserList from './user/UserList';

const Sidebar = () => {
  return (
    <>
      <Calender />
      <StartLocationBox />
      <UserList />
    </>
  );
};

export default Sidebar;
