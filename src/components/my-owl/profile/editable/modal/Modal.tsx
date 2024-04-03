import { useState } from 'react';
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

  //util?
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

  const uploadImage = async () => {
    console.log('지금부터 이미지를 업로드 해볼게?');

    if (file) {
      const { data, error } = await supabase.storage.from('images').upload(`users_profile/${file.name}`, file);
      console.log(error);
      if (error) {
        console.error('Error uploading image:', error.message);
        console.log('에러났다구?');
      } else {
        console.log('ㅋㅋ');
        console.log('Image uploaded successfully:', data);

        setFile(null);
        return `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/images/users_profile/${file.name}`;
      }
    }
  };

  const handleUploadImage = async () => {
    const profile_url = uploadImage();
    //profile_url
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
