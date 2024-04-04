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
