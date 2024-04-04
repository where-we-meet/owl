import { MouseEvent, useState } from 'react';
import { changeUserProfile, uploadImage } from '@/api/supabaseCSR/supabase';
import { byteCalculator } from '@/utils/my-owl/profile/modal/byteCalculator';
import { getUserId } from '@/utils/my-owl/getUserId';

import styles from './Modal.module.css';

const MAX_FILE_SIZE_BYTE = 2097152; //2MB

export const ImageUploadModal = ({ handleToggleModal }: { handleToggleModal: () => void }) => {
  const [fileSizeExceed, setFileSizeExceed] = useState(false);
  const [file, setFile] = useState<File | null>(null);

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
