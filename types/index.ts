export type Mood = 'great' | 'good' | 'neutral' | 'bad' | 'awful';

export interface EmotionEntry {
  id: string;
  date: string; // ISO 8601
  mood: Mood;
  note?: string;
  emotions: string[];
}
