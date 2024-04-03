import { getAddress, getSearchPlace } from '@/api/place/placeData';
import { useQuery } from '@tanstack/react-query';

export const useGetRoadAddress = (center: { lat: number; lng: number }) => {
  const { data, isPending } = useQuery({
    queryKey: ['room', center],
    queryFn: async () => await getAddress(center),
    enabled: !!center
  });
  return { data, isPending };
};

export const useGetSearchPlace = (searchKeyword: string) => {
  const { data, isPending } = useQuery({
    queryKey: ['room', searchKeyword],
    queryFn: async () => await getSearchPlace(searchKeyword)
  });
  return { data, isPending };
};
