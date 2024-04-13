import { useKakaoLoader } from 'react-kakao-maps-sdk';

export const useKakaoMap = () => {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY!,
    libraries: ['clusterer', 'services', 'drawing']
  });

  return [loading, error];
};
