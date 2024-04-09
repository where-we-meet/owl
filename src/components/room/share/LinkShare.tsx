'use client';
import { useState } from 'react';
import styles from './LinkShare.module.css';
import KakaoTalkShare from './KakaoShare';

const LinkShare = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.origin);
      alert('복사 성공!');
    } catch (error) {
      alert('복사 실패!');
    }
  };

  return (
    <div className={styles.share}>
      {isOpen && (
        <div className={styles.modal_background}>
          <section className={styles.modal}>
            <input type="text" defaultValue={window.origin}></input>
            <button onClick={handleCopy}>복사</button>
            <a href={`mailto:?subject=${window.origin}`}>메일로 공유</a>
            <KakaoTalkShare />
          </section>
        </div>
      )}
      <button onClick={toggleModal}>Share</button>
      <button onClick={handleCopy}>Copy</button>
    </div>
  );
};

export default LinkShare;
