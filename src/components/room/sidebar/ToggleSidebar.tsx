import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import styles from './ToggleSidebar.module.css';

const ToggleSidebar = () => {
  return (
    <>
      <button className={styles.toggle_button}>
        <MdOutlineArrowBackIosNew />
      </button>
    </>
  );
};

export default ToggleSidebar;
