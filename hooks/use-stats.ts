import { useMemo } from 'react';
import { EmotionEntry } from '../types';
import { MOODS } from '../constants/moods';

export interface MoodStat {
  mood: string;
  count: number;
  color: string;
  percentage: number;
}

export interface Stats {
  total: number;
  streak: number;
  thisMonth: number;
  topMood: string | null;
  moodStats: MoodStat[];
}

function computeStreak(dateSet: Set<string>): number {
  const cursor = new Date();
  const today = cursor.toISOString().split('T')[0];

  // If today hasn't been logged yet, try from yesterday
  if (!dateSet.has(today)) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (true) {
    const d = cursor.toISOString().split('T')[0];
    if (!dateSet.has(d)) break;
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function useStats(entries: EmotionEntry[]): Stats {
  return useMemo(() => {
    const total = entries.length;
    if (total === 0) {
      const moodStats = MOODS.map((m) => ({ mood: m.id, count: 0, color: m.chartColor, percentage: 0 }));
      return { total: 0, streak: 0, thisMonth: 0, topMood: null, moodStats };
    }

    const dateSet = new Set(entries.map((e) => e.date));
    const streak = computeStreak(dateSet);

    const now = new Date();
    const monthPrefix = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`;
    const thisMonth = entries.filter((e) => e.date.startsWith(monthPrefix)).length;

    const counts: Record<string, number> = {};
    for (const { mood } of entries) {
      counts[mood] = (counts[mood] ?? 0) + 1;
    }

    const topMood = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

    const moodStats: MoodStat[] = MOODS
      .map((m) => ({
        mood: m.id,
        count: counts[m.id] ?? 0,
        color: m.chartColor,
        percentage: counts[m.id] ? Math.round(((counts[m.id] ?? 0) / total) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    return { total, streak, thisMonth, topMood, moodStats };
  }, [entries]);
}
