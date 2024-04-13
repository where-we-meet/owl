import { Button } from '@nextui-org/react';
import { useEffect } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

function KakaoTalkShare({ link }: { link: string }) {
  useEffect(() => {
    const kakaoScript = document.createElement('script');
    kakaoScript.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    kakaoScript.async = true;
    document.head.appendChild(kakaoScript);
  }, []);

  const shareWithKakaoTalk = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
      }

      kakao.Share.sendDefault({
        objectType: 'text',
        text: `모임 링크 바로가기`,
        link: {
          mobileWebUrl: link,
          webUrl: link
        }
      });
    }
  };

  return (
    <Button title="공유하기" onClick={shareWithKakaoTalk}>
      카카오톡으로 공유하기
    </Button>
  );
}

export default KakaoTalkShare;
