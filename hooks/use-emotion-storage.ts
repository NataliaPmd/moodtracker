import AsyncStorage from '@react-native-async-storage/async-storage';
import { EmotionEntry } from '../types';

const STORAGE_KEY = 'emotion_entries';

type EntriesMap = Record<string, EmotionEntry>;

async function readAll(): Promise<EntriesMap> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

async function writeAll(entries: EntriesMap): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export async function getEntry(date: string): Promise<EmotionEntry | null> {
  const entries = await readAll();
  return entries[date] ?? null;
}

export async function saveEntry(entry: EmotionEntry): Promise<void> {
  const entries = await readAll();
  entries[entry.date] = entry;
  await writeAll(entries);
}

export async function deleteEntry(date: string): Promise<void> {
  const entries = await readAll();
  delete entries[date];
  await writeAll(entries);
}

export async function getAllEntries(): Promise<EmotionEntry[]> {
  const entries = await readAll();
  return Object.values(entries).sort((a, b) => b.date.localeCompare(a.date));
}
