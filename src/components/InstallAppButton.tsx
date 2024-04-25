'use client';
import { useEffect } from 'react';

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
      <button onClick={installApp}>앱 설치하기</button>
    </>
  );
};

export default InstallAppButton;
