import { MouseEvent, useState } from 'react';
import styles from './Modal.module.css';
import { createClient } from '@/utils/supabase/client';
import { getCurrentUserData, changeUserProfile, uploadImage } from '@/api/supabase';

const MAX_FILE_SIZE_BYTE = 2097152; //2MB

export const ImageUploadModal = ({ handleToggleModal }: { handleToggleModal: () => void }) => {
  const [fileSizeExceed, setFileSizeExceed] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  //util
  const byteCalculator = (byte: number) => {
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

  //파일 용량 제한 로직
  const handleFileMaxSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files !== null) {
      const size = files[0].size;
      const file = files[0];
      if (size > MAX_FILE_SIZE_BYTE) {
        alert(
          `선택하신 파일의 용량은 ${byteCalculator(size)}입니다. ${byteCalculator(
            MAX_FILE_SIZE_BYTE
          )} 이하의 파일을 골라주세요.`
        );
        setFileSizeExceed(true);
      } else {
        setFileSizeExceed(false);
        setFile(file);
      }
    } else {
      console.log('no data');
    }
  };

  //유저 아이디 조회 로직
  const getUserId = async () => {
    const { user } = await getCurrentUserData();
    const userId = user.id;

    return userId;
  };

  //유저 이미지 변경 전체 핸들러
  const handleUploadImage = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (file) {
      const profile_url = await uploadImage(file, setFile);
      const userId = await getUserId();
      handleToggleModal();
      if (userId && profile_url) {
        await changeUserProfile({ userId, profile_url });
      } else {
        alert(`문제가 발생하였습니다`);
      }
    }
  };

  return (
    <div className={styles.background} onClick={handleToggleModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <form>
          <input type="file" accept="image/jpeg,image/png,image/jpg" onChange={handleFileMaxSize} />
          <button disabled={fileSizeExceed} onClick={handleUploadImage}>
            사진 업로드하기
          </button>
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
