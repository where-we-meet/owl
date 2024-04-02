import axios from 'axios';

const addressClient = axios.create({
  baseURL: 'https://dapi.kakao.com/v2/local/geo/coord2address',
  headers: { Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}` }
});

export const getAddress = async (center: { lat: number; lng: number }) => {
  const { lng, lat } = center;
  const { data } = await addressClient.get('', {
    params: {
      x: lng,
      y: lat
    }
  });
  return data.documents[0];
};
