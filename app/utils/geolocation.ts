// 位置情報取得API `getCurrentPosition` を Promise 化する
export const getCurrentPosition = async () => {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error)
    );
  });
};
