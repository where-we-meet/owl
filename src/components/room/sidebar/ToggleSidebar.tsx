import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import styles from './ToggleSidebar.module.css';

const ToggleSidebar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <>
      <button className={styles.toggle_button} onClick={toggleSidebar}>
        <MdOutlineArrowBackIosNew />
      </button>
    </>
  );
};

export default ToggleSidebar;
