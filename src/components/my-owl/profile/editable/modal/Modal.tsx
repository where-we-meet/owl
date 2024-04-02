import { useState } from 'react';
import styles from './Modal.module.css';

const MAX_FILE_SIZE_BYTE = 2097152; //2MB
export const ImageUploadModal = ({ handleToggleModal }: { handleToggleModal: () => void }) => {
  const [fileSizeExceed, setFileSizeExceed] = useState(false);

  //util
  const byteCalculater = (byte: number) => {
    const KB = byte / 1024;
    const MB = KB / 1024;
    const GB = MB / 1024;
    const TB = GB / 1024;

    if (TB >= 1) {
      return `${TB.toFixed(2)} TB`;
    } else if (GB >= 1) {
      return `${GB.toFixed(2)} GB`;
    } else if (MB >= 1) {
      return `${MB.toFixed(2)} MB`;
    } else if (KB >= 1) {
      return `${KB.toFixed(2)} KB`;
    } else {
      return `${byte} bytes`;
    }
  };

  //util?
  const handleFileMaxSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files !== null) {
      const size = files[0].size;
      if (size > MAX_FILE_SIZE_BYTE) {
        alert(
          `선택하신 파일의 용량은 ${byteCalculater(size)}입니다. ${byteCalculater(
            MAX_FILE_SIZE_BYTE
          )} 이하의 파일을 골라주세요.`
        );
        setFileSizeExceed(true);
      } else {
        setFileSizeExceed(false);
      }
    } else console.log('no data');
  };

  return (
    <div className={styles.background} onClick={handleToggleModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <form>
          <input type="file" accept="image/jpeg,image/png,image/jpg" onChange={handleFileMaxSize} />
          <button disabled={fileSizeExceed}>사진 업로드하기</button>
        </form>
        <p>또는</p>
        <form>
          <input type="url" placeholder="Paste link to an image..." />
          <button>링크 첨부하기</button>
        </form>
        <div className={styles.close_btn} onClick={handleToggleModal}>
          Exit
        </div>
      </div>
    </div>
  );
};
