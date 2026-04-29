import { Bus, Car, Bike, Train, Footprints } from "lucide-react";
import { CommuteMode } from "@/lib/recommendation";

const ICON_SIZE = "w-6 h-6";

const COMMUTE_ICONS: Record<CommuteMode, React.ReactNode> = {
  Bus:   <Bus   className={ICON_SIZE} />,
  Car:   <Car   className={ICON_SIZE} />,
  Bike:  <Bike  className={ICON_SIZE} />,
  Train: <Train className={ICON_SIZE} />,
  Walk:  <Footprints className={ICON_SIZE} />,
};

/**
 * Returns a Lucide icon for a given commute mode.
 */
export function getCommuteModeIcon(mode: CommuteMode): React.ReactNode {
  return COMMUTE_ICONS[mode] ?? COMMUTE_ICONS.Bus;
}

const SMALL_ICON_SIZE = "w-3 h-3";

const SMALL_COMMUTE_ICONS: Record<CommuteMode, React.ReactNode> = {
  Bus:   <Bus   className={SMALL_ICON_SIZE} />,
  Car:   <Car   className={SMALL_ICON_SIZE} />,
  Bike:  <Bike  className={SMALL_ICON_SIZE} />,
  Train: <Train className={SMALL_ICON_SIZE} />,
  Walk:  <Footprints className={SMALL_ICON_SIZE} />,
};

/**
 * Returns a small Lucide icon for a given commute mode (used in compact badges).
 */
export function getSmallCommuteModeIcon(mode: CommuteMode): React.ReactNode {
  return SMALL_COMMUTE_ICONS[mode] ?? SMALL_COMMUTE_ICONS.Bus;
}
