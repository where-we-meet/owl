import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { uploadImage } from '@/api/supabaseCSR/supabase';
import { byteCalculator } from '@/utils/my-owl/profile/modal/byteCalculator';

import styles from './Modal.module.css';

const MAX_FILE_SIZE_BYTE = 2097152; //2MB

export const ImageUploadModal = ({
  handleToggleModal,
  setUserProfileURL
}: {
  handleToggleModal: () => void;
  setUserProfileURL: Dispatch<SetStateAction<string | null>>;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');

  /*
   * File
   */
  const isValidFileSize = (file: File) => {
    const size = file.size;
    return size <= MAX_FILE_SIZE_BYTE;
  };

  const fileChangeValidation = (file: File) => {
    return isValidFileSize(file);
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files !== null) {
      const file = files[0];
      if (fileChangeValidation(file)) setFile(file);
      else {
        alert(
          `선택하신 파일의 용량은 ${byteCalculator(file.size)}입니다. ${byteCalculator(
            MAX_FILE_SIZE_BYTE
          )} 이하의 파일을 골라주세요.`
        );
        setFile(null);
      }
    } else setFile(null);
  };

  const handleUploadImage = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (file !== null) {
      const profile_url = await uploadImage(file, setFile);
      handleToggleModal();
      profile_url ? setUserProfileURL(profile_url) : alert(`문제가 발생하였습니다`);
    } else {
      alert(`파일을 선택해주세요.`);
    }
  };

  /*
   * URL
   */
  const isValidImageUrl = (url: string) => {
    const imageExtensions = ['jpg', 'jpeg', 'png'];
    let extension = url.split('.').pop();
    if (extension) {
      if (extension.includes('?')) {
        extension = extension.split('?')[0];
      }
      if (imageExtensions.includes(extension)) {
        return true;
      }
    }
    return false;
  };

  const handleChangeURL = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUrl(e.target.value);
  };

  const handleUploadURL = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isValidImageUrl(url)) {
      setUserProfileURL(url);
      handleToggleModal();
    } else {
      alert('유효하지 않은 URL 형식입니다. URL 파일의 형식을 확인해주세요.');
      setUrl('');
    }
  };

  return (
    <div className={styles.background} onClick={handleToggleModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <form>
          <input type="file" accept="image/jpeg,image/png,image/jpg" onChange={handleChangeFile} />
          <button disabled={file === null} onClick={handleUploadImage}>
            사진 업로드하기
          </button>
        </form>
        <p>또는</p>
        <form>
          <input type="url" placeholder="Paste link to an image..." onChange={handleChangeURL} value={url} />
          <button onClick={handleUploadURL}>링크 첨부하기</button>
        </form>
        <div className={styles.close_btn} onClick={handleToggleModal}>
          Exit
        </div>
      </div>
    </div>
  );
};
