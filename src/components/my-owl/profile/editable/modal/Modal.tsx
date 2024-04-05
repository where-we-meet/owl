import { ChangeEvent, MouseEvent, useState } from 'react';
import { changeUserProfile, uploadImage } from '@/api/supabaseCSR/supabase';
import { byteCalculator } from '@/utils/my-owl/profile/modal/byteCalculator';
import { getUserId } from '@/utils/my-owl/getUserId';

import styles from './Modal.module.css';

const MAX_FILE_SIZE_BYTE = 2097152; //2MB

export const ImageUploadModal = ({ handleToggleModal }: { handleToggleModal: () => void }) => {
  const [fileSizeExceed, setFileSizeExceed] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(true);

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

  const isValidImageUrl = async (url: string) => {
    // TODO : HTTP 요청을 보내서 응답의 Content-Type 확인하는 로직 넣기 (현재 로직은 불완전함)
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
    setIsValidUrl(await isValidImageUrl(url));
    if (!isValidUrl) {
      alert('유효하지 않은 URL 형식입니다. URL 파일의 형식을 확인해주세요.');
      setUrl('');
    }
    const userId = await getUserId();
    if (userId) changeUserProfile({ userId, profile_url: url });
    else alert('유저의 신원 확인이 불가능합니다.');
    setUrl('');
    handleToggleModal();
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
