import IconClose from './IconClose';
import IconHeart from './IconHeart';

export const IconMap = {
  IconClose,
  IconHeart
} as const

export type IconMapTypes = keyof typeof IconMap;
