import { atomWithStorage } from "jotai/utils";
import { Position } from "./geolocation";
import { atom } from "jotai";

interface OfficePosition extends Position {}

export const officePositionAtom = atomWithStorage<OfficePosition | null>(
  "office_position",
  null
);

// 履歴更新などに使用している
export const updateAtom = atom<boolean>(false);

export const consecutiveDaysCountAtom = atomWithStorage<number>(
  "consecutive_days_count",
  0
);
