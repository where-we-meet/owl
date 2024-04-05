import { getAddress, getSearchPlace } from '@/api/place/placeData';
import { useQuery } from '@tanstack/react-query';

export const useGetRoadAddress = (location: { lat: number; lng: number }, isDrag: boolean) => {
  const { data, isPending } = useQuery({
    queryKey: ['room', location],
    queryFn: async () => await getAddress(location),
    enabled: !!location && !isDrag
  });
  return { data, isPending };
};

export const useGetSearchPlace = (searchKeyword: string) => {
  const { data, isPending } = useQuery({
    queryKey: ['room', searchKeyword],
    queryFn: async () => await getSearchPlace(searchKeyword),
    select: (data) => data.documents,
    enabled: !!searchKeyword
  });
  return { data, isPending };
};
