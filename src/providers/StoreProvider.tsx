'use client';

import { type ReactNode, useRef, useEffect } from 'react';
import { type StoreApi } from 'zustand';
import { type ImageState, useImageStore } from '@/store/useStore';

interface StoreProviderProps {
  children: ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<StoreApi<ImageState>>(useImageStore);
  
  if (!storeRef.current) {
    storeRef.current = useImageStore;
  }

  useEffect(() => {
    const store = storeRef.current;
    if (store) {
      const unsubscribe = useImageStore.subscribe((state) => {
        store.setState(state);
      });
      return unsubscribe;
    }
  }, []);

  return children;
} 