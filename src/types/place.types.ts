export type CenterData = {
  center: {
    lat: number;
    lng: number;
  };
  errMsg?: string | null;
  isLoading: boolean;
  roadAddress: string | null;
};

export type Place = {
  [key: string]: string;
};

export type UserLocationData = {
  room_id: string;
  user_id: string;
  start_location: string;
  lat: string;
  lng: string;
};

export type Halfway = {
  lat: number | null;
  lng: number | null;
};

export type SearchOptionData = {
  query?: string | null | undefined;
  x?: string;
  y?: string;
  radius: number | null;
} | null;
