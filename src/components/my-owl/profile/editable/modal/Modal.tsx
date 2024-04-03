import { MouseEvent, useState } from 'react';
import styles from './Modal.module.css';
import { createClient } from '@/utils/supabase/client';

const MAX_FILE_SIZE_BYTE = 2097152; //2MB

export const ImageUploadModal = ({ handleToggleModal }: { handleToggleModal: () => void }) => {
  const [fileSizeExceed, setFileSizeExceed] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const supabase = createClient();

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
          `선택하신 파일의 용량은 ${byteCalculater(size)}입니다. ${byteCalculater(
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

  //파일 이름 중복 방지용 파일 이름 생성 로직
  const getFileName = () => {
    const today = new Date();

    const year = today.getFullYear(); // 년
    const month = ('0' + (today.getMonth() + 1)).slice(-2); // 월
    const date = ('0' + today.getDate()).slice(-2); // 일
    const hours = today.getHours(); // 시
    const minutes = today.getMinutes(); // 분
    const seconds = today.getSeconds(); // 초

    return `Owl_Photo_${year}-${month}-${date}-${hours}-${minutes}-${seconds}`;
  };

  //supabase store 이미지 업로드 로직
  const uploadImage = async () => {
    const file_name = getFileName();

    if (file) {
      const { data, error } = await supabase.storage.from('images').upload(`users_profile/${file_name}`, file);
      setFile(null);
      if (error) {
        alert(`이미지 업로드에 실패하였습니다.\n 원인 : ${error.message} `);
      } else {
        alert(`이미지를 성공적으로 업로드하였습니다.`);
        handleToggleModal();
        return `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/images/users_profile/${file_name}`;
      }
    }
  };

  //유저 아이디 조회 로직
  const getUserId = async () => {
    const {
      data: { user },
      error
    } = await supabase.auth.getUser();
    if (error) {
      throw error;
    }

    return user !== null ? user.id : null;
  };

  //유저 프로필 사진 업데이트 로직
  const changeUserProfile = async ({ userId, profile_url }: { userId: string; profile_url: string }) => {
    const { data, error } = await supabase.from('users').update({ profile_url }).eq('id', userId);
    if (error) {
      alert(`문제가 발생하였습니다. ${error.message}`);
    }
  };

  //유저 이미지 변경 전체 핸들러
  const handleUploadImage = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const profile_url = await uploadImage();
    const userId = await getUserId();
    if (userId && profile_url) {
      await changeUserProfile({ userId, profile_url });
    } else {
      alert(`문제가 발생하였습니다`);
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
