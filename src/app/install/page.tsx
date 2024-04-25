import InstallAppButton from '@/components/InstallAppButton';
import styles from './page.module.css';

const InstallPage = () => {
  return (
    <main className={`${styles.main} `}>
      <div className={styles.copy_container}>
        <h1 className={styles.service_name}>OWL-LiNK</h1>
        <div>
          <p className={styles.middle_copy}>
            <span className={styles.highlight}>
              약속 시간과 장소를 고민하는 시간을 줄여줄 수 있는 <br /> 약속 확정 서비스,
            </span>{' '}
            owl-link입니다.
          </p>
        </div>

        <span className={styles.install_owllink}>
          <img src="images/real_logo_with_text.png" alt="OWL-LiNK logo" width={100} />
          <InstallAppButton />
        </span>
        <p className={styles.main_text}> 이제 앱으로 편하게 이용하세요!</p>
        <span className={styles.install_description_container}>
          <p className={styles.install_description}>
            [앱 설치하기] 버튼을 누르면 아래와 같이 다운로드 확인 창이 뜹니다.
          </p>
          <img className={styles.install_img} src="images/install_app.png" alt="install" width={300} />
        </span>
      </div>
    </main>
  );
};

export default InstallPage;
