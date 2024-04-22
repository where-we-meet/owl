import { Image, Link } from '@nextui-org/react';
import Calender from '../calender/Calender';
import StartLocationBox from '../place/StartLocationBox';
import RoomHeader from '../header/RoomHeader';
import UserList from './user/UserList';
import MyRooms from './MyRooms';
import UserProfile from '@/components/header/profile/UserProfileButton';
import LinkShare from '../share/LinkShare';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <>
      <nav className={styles.channel}>
        <Link href="/" title="홈페이지로 가자올">
          <Image src="/images/logo.png" />
        </Link>
        <MyRooms />
        <div className={styles.profile}>
          <UserProfile />
        </div>
      </nav>
      <div className={styles.room}>
        <Link className={styles.brand} color="foreground" href="/">
          OWL-LiNK
        </Link>
        <RoomHeader />
        <Calender />
        <StartLocationBox />
        <LinkShare />
        <UserList />
      </div>
    </>
  );
};

export default Sidebar;
