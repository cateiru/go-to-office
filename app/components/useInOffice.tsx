"use client";

import React from "react";
import { History } from "../utils/indexeddb";
import { getCurrentPosition } from "../utils/geolocation";
import { useIndexedDBStore } from "use-indexeddb";

export type Returns = {
  inOffice: boolean;
  loading: boolean;
  handleInOffice: () => Promise<void>;
};

export const useInOffice = (): Returns => {
  const [inOffice, setInOffice] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { add } = useIndexedDBStore<History>("history");

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
    setLoading(true);
    const position = await getCurrentPosition();

    const column: History = {
      timestamp: new Date().getTime(),
      type: "in_office",

      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    await add(column);

    setInOffice(true);
    setLoading(false);
  };

  return { inOffice, loading, handleInOffice };
};
