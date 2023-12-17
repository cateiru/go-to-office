export interface Position {
  latitude: number;
  longitude: number;
}

// 位置情報取得API `getCurrentPosition` を Promise 化する
export const getCurrentPosition = async () => {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error)
    );
  });
};

// ヒュベニの近似式を使用して2地点の緯度経度から相対距離を求める
// ref. https://komoriss.com/calculate-distance-between-two-points-from-latitude-and-longitude/
// Based on https://gist.github.com/hirohitokato/03e98332b10a9ff211e2d9b8d9c3d4fe
export const calcDistance = (current: Position, target: Position) => {
  // 先に計算しておいた定数
  const e2 = 0.00669437999019758; // WGS84における「離心率e」の2乗
  const Rx = 6378137.0; // WGS84における「赤道半径Rx」
  const mNumber = 6335439.32729246; // WGS84における「子午線曲率半径M」の分子(Rx(1-e^2))

  const deg2rad = (deg: number) => (deg * Math.PI) / 180.0;

  const rad_lat1 = deg2rad(current.latitude);
  const rad_lon1 = deg2rad(current.longitude);
  const rad_lat2 = deg2rad(target.latitude);
  const rad_lon2 = deg2rad(target.longitude);

  const dp = rad_lon1 - rad_lon2; // 2点の緯度差
  const dr = rad_lat1 - rad_lat2; // 2点の経度差
  const p = (rad_lon1 + rad_lon2) / 2.0; // 2点の平均緯度

  const w = Math.sqrt(1.0 - e2 * Math.pow(Math.sin(p), 2));
  const m = mNumber / Math.pow(w, 3); // 子午線曲率半径
  const n = Rx / w; // 卯酉(ぼうゆう)線曲率半径

  // 2点間の距離(単位m)
  const d = Math.sqrt(Math.pow(m * dp, 2) + Math.pow(n * Math.cos(p) * dr, 2));

  return d;
};
