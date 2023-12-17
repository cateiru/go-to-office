import { atomWithStorage } from "jotai/utils";
import { Position } from "./geolocation";

interface OfficePosition extends Position {}

export const officePositionAtom = atomWithStorage<OfficePosition | null>(
  "office_position",
  null
);

export const countAtom = atomWithStorage<number>("count", 0);
