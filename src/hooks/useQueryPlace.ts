import { getAddress, getSearchPlace } from '@/api/place/placeData';
import type { Place, SearchOptionData } from '@/types/place.types';
import { useQuery } from '@tanstack/react-query';

export const useQueryAddress = (location: { lat: number; lng: number }, isDrag: boolean) => {
  const { data, isPending } = useQuery({
    queryKey: ['address', location],
    queryFn: async () => await getAddress(location),
    enabled: !!location.lat && !!location.lng && !isDrag,
    gcTime: 300_000
  });
  return { data, isPending };
};

export const useQuerySearchPlace = (searchKeyword: string) => {
  const { data, isPending } = useQuery({
    queryKey: ['search-keywoard', searchKeyword],
    queryFn: async () => await getSearchPlace(searchKeyword, null),
    enabled: !!searchKeyword,
    gcTime: 300_000
  });
  return { data, isPending };
};

export const useQuerySearchCategory = (searchOption: SearchOptionData) => {
  const { data, isPending } = useQuery<Place[]>({
    queryKey: ['search-category', searchOption],
    queryFn: async () => await getSearchPlace('', searchOption),
    enabled: !!searchOption?.query,
    gcTime: 300_000
  });
  return { data, isPending };
};
