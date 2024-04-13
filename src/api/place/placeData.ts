import { SearchOptionData } from '@/types/place.types';
import axios from 'axios';

const placeApi = axios.create({
  baseURL: 'https://dapi.kakao.com/v2/local',
  headers: { Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}` }
});

export const getAddress = async (center: { lat: number; lng: number }) => {
  const { lng, lat } = center;
  const { data } = await placeApi.get('/geo/coord2address', {
    params: {
      x: lng,
      y: lat
    }
  });
  return data.documents[0];
};

export const getSearchPlace = async (searchKeyword: string, searchOption: SearchOptionData) => {
  const { data } = await placeApi.get('/search/keyword', {
    params: {
      query: searchKeyword,
      ...searchOption
    }
  });
  return data.documents;
};
