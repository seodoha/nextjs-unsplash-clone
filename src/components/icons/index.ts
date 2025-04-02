import { lazy } from 'react';

const IconClose = lazy(() => import('./IconClose'));
const IconHeart = lazy(() => import('./IconHeart'));

export const IconMap = {
  IconClose,
  IconHeart
} as const;

export type IconMapTypes = keyof typeof IconMap;
