import { useCallback, useEffect, useState } from 'react';
import { EmotionEntry } from '../types';
import { deleteEntry, getAllEntries, getEntry, saveEntry } from './use-emotion-storage';

interface UseEmotionsReturn {
  entries: EmotionEntry[];
  loading: boolean;
  refresh: () => Promise<void>;
  save: (entry: EmotionEntry) => Promise<void>;
  remove: (date: string) => Promise<void>;
  getByDate: (date: string) => Promise<EmotionEntry | null>;
}

export function useEmotions(): UseEmotionsReturn {
  const [entries, setEntries] = useState<EmotionEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setEntries(await getAllEntries());
  }, []);

  useEffect(() => {
    getAllEntries()
      .then(setEntries)
      .finally(() => setLoading(false));
  }, []);

  const save = useCallback(async (entry: EmotionEntry) => {
    await saveEntry(entry);
    setEntries(await getAllEntries());
  }, []);

  const remove = useCallback(async (date: string) => {
    await deleteEntry(date);
    setEntries(await getAllEntries());
  }, []);

  const getByDate = useCallback((date: string) => getEntry(date), []);

  return { entries, loading, refresh, save, remove, getByDate };
}
