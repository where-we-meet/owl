import { getAddress } from '@/api/place/placeData';
import { useQuery } from '@tanstack/react-query';

export const useGetRoadAddress = (center: { lat: number; lng: number }) => {
  const { data, isPending } = useQuery({
    queryKey: ['room', center],
    queryFn: async () => await getAddress(center),

    enabled: !!center
  });
  return { data, isPending };
};
