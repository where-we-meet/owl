import type { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useRoomUserDataStore } from '@/store/userProfileStore';
import { IoIosClose, IoIosLink } from 'react-icons/io';
import { MdOutlineUploadFile } from 'react-icons/md';
import { AiOutlinePicture } from 'react-icons/ai';
import { byteCalculator } from '@/utils/profile/byteCalculator';
import { deleteProfileImage, uploadImage } from '@/api/profile';
import styles from './ImageUploadModal.module.css';

const MAX_FILE_SIZE_BYTE = 2097152; //2MB

export const ImageUploadModal = ({
  handleToggleModal,
  setUserProfileURL,
  userId
}: {
  handleToggleModal: () => void;
  setUserProfileURL: Dispatch<SetStateAction<string | null>>;
  userId: string;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>('');
  const [url, setUrl] = useState('');

  const { uploadedProfileURL, setUploadedProfileURL } = useRoomUserDataStore();

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

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files !== null && files !== undefined) {
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
      // 이전에 업로드하고 저장하지 않은 프로필이 있다면 삭제
      await deleteProfileImage({ userId, fileURL: uploadedProfileURL });
      const profile_url = await uploadImage({ file, setFile, userId });
      handleToggleModal();
      if (profile_url) {
        setUserProfileURL(profile_url);
        setUploadedProfileURL(profile_url);
      } else {
        alert(`문제가 발생하였습니다`);
      }
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
      // 이전에 업로드하고 저장하지 않은 프로필이 있다면 삭제
      await deleteProfileImage({ userId, fileURL: uploadedProfileURL });
      setUserProfileURL(url);
      setUploadedProfileURL(url);
      handleToggleModal();
    } else {
      alert('유효하지 않은 URL 형식입니다. URL 파일의 형식을 확인해주세요.');
      setUrl('');
    }
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [file]);

  return (
    <div className={styles.background} onClick={handleToggleModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <form className={styles.file_form}>
          <input
            className={styles.upload_name}
            value={file === null ? '첨부파일' : file.name}
            placeholder="첨부파일"
            disabled
          />
          <input
            id="file"
            className={styles.file_input}
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleChangeFile}
          />
        </form>
        <div className={styles.upload_file_container}>
          {file === null ? (
            <label className={styles.file_label} htmlFor="file">
              <AiOutlinePicture style={{ scale: '1.8' }} />내 폴더에서 사진 찾기
            </label>
          ) : (
            preview && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <img src={preview as string} className={styles.preview_image} alt="profile-preview" />
                <label className={styles.change_file_label} htmlFor="file">
                  다른 사진 찾기
                </label>
              </div>
            )
          )}
        </div>
        <button className={styles.file_upload_btn} disabled={file === null} onClick={handleUploadImage}>
          <MdOutlineUploadFile />
          선택한 사진 업로드하기
        </button>
        <div className={styles.dividing_line}>또는</div>
        <form className={styles.url_form}>
          <input
            className={styles.url_input}
            type="url"
            placeholder="Paste link to an image..."
            onChange={handleChangeURL}
            value={url}
          />
          <button className={styles.url_upload_btn} onClick={handleUploadURL}>
            <IoIosLink />
            링크 첨부하기
          </button>
        </form>
        <IoIosClose className={styles.close_btn} onClick={handleToggleModal} />
      </div>
    </div>
  );
};
