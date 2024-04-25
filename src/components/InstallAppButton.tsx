'use client';
import { Button } from '@nextui-org/react';
import { useEffect } from 'react';

import styles from './InstallAppButton.module.css';
import { LuDownload } from 'react-icons/lu';

const InstallAppButton = () => {
  let deferredPrompt: any;

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      deferredPrompt = event;
    });
  }, []);

  const installApp = () => {
    if (!deferredPrompt) {
      alert('이미 앱이 설치되어 있거나 앱을 설치할 수 없는 환경입니다');
      return;
    }

    deferredPrompt.prompt();
  };

  return (
    <>
      <Button className={styles.install_button} onPress={installApp} endContent={<LuDownload />}>
        앱 설치하기
      </Button>
    </>
  );
};

export default InstallAppButton;
