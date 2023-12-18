"use client";

import React from "react";
import { History } from "../utils/indexeddb";
import { calcDistance, getCurrentPosition } from "../utils/geolocation";
import { useIndexedDBStore } from "use-indexeddb";
import { useAtomValue, useSetAtom } from "jotai";
import { updateAtom, officePositionAtom } from "../utils/atom";

export type Returns = {
  inOffice: boolean;
  handleInOffice: () => Promise<number>;
};

export const useInOffice = (): Returns => {
  const [inOffice, setInOffice] = React.useState(false);
  const { add } = useIndexedDBStore<History>("history");
  const setUpdate = useSetAtom(updateAtom);
  const officePosition = useAtomValue(officePositionAtom);

  React.useEffect(() => {
    // 出社ダイアログは3秒で消える
    if (inOffice) {
      const interval = setInterval(() => {
        setInOffice(false);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [inOffice]);

  const handleInOffice = async () => {
    if (officePosition === null) {
      throw new Error("オフィスが設定されていません");
    }

    const position = await getCurrentPosition();

    // オフィスからの距離を求めて、300m以上離れていたらエラー
    const distance = calcDistance(
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      {
        latitude: officePosition.latitude,
        longitude: officePosition.longitude,
      }
    );
    if (distance > 300) {
      throw new Error(`オフィスから遠すぎます (${Math.floor(distance)}m)`);
    }

    const column: History = {
      timestamp: new Date().getTime(),
      type: "in_office",

      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    await add(column);
    setUpdate((v) => !v);

    setInOffice(true);

    return distance;
  };

  return { inOffice, handleInOffice };
};
