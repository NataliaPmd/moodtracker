export type MoodId = 'sad' | 'tired' | 'angry' | 'happy' | 'motivated' | 'calm';

export interface EmotionEntry {
  date: string;
  mood: MoodId;
  color: string;
  note?: string;
}
