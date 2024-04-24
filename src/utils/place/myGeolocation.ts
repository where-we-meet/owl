export type GeolocationResult = {
  lat: number | null;
  lng: number | null;
  status: boolean;
  errorMessage: string | null;
};

export const myGeolocation = (): Promise<GeolocationResult> => {
  return new Promise<GeolocationResult>((resolve, reject) => {
    const result: GeolocationResult = {
      lat: null,
      lng: null,
      status: true,
      errorMessage: null
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          result.lat = position.coords.latitude;
          result.lng = position.coords.longitude;
          result.status = false;
          resolve(result);
        },
        (err) => {
          result.errorMessage = err.message;
          result.status = false;
          resolve(result);
        }
      );
    } else {
      result.errorMessage = 'geolocation을 사용할수 없어요..';
      result.status = false;
      reject(result);
    }
  });
};
