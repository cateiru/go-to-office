"use client";

import { useIndexedDBStore } from "use-indexeddb";
import { History } from "../utils/indexeddb";
import React from "react";
import { calcDistance } from "../utils/geolocation";
import { useAtomValue } from "jotai";
import { countAtom, officePositionAtom } from "../utils/atom";

export interface CalcHistory extends History {
  distance: number;
}

interface Returns {
  histories: CalcHistory[];
  loading: boolean;
}

export const useHistory = (): Returns => {
  const { getAll } = useIndexedDBStore<History>("history");
  const [histories, setHistories] = React.useState<CalcHistory[]>([]);
  const [loading, setLoading] = React.useState(false);
  const officePosition = useAtomValue(officePositionAtom);
  const count = useAtomValue(countAtom);

  React.useEffect(() => {
    if (!officePosition) return;

    (async () => {
      setLoading(true);
      const histories = await getAll();

      const calcHistories = histories.map((history) => {
        // オフィスとの距離を計算する
        const distance = calcDistance(
          {
            latitude: officePosition.latitude,
            longitude: officePosition.longitude,
          },
          {
            latitude: history.latitude,
            longitude: history.longitude,
          }
        );
        return { ...history, distance: Math.floor(distance) };
      });

      // 履歴を新しい順に並び替える
      setHistories(calcHistories.reverse());
      setLoading(false);
    })();
  }, [officePosition, count]);

  return { histories, loading };
};
