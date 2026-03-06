import { ImageSourcePropType } from 'react-native';
import { MoodId } from '../types';

type MoodData = {
  id: MoodId;
  labelKey: string;
  color: string;       // stored in EmotionEntry.color; matches circle/square images
  chartColor: string;  // softer variant used for Stats bar chart backgrounds
  square: ImageSourcePropType;
  circle: ImageSourcePropType;
};

export const MOODS: MoodData[] = [
  {
    id: 'sad',
    labelKey: 'addEmotion.moods.sad',
    color: '#9E9E9E',
    chartColor: '#dcd3db',
    square: require('../assets/images/squares/grey-square.PNG') as ImageSourcePropType,
    circle: require('../assets/images/circles/grey-circle.PNG') as ImageSourcePropType,
  },
  {
    id: 'tired',
    labelKey: 'addEmotion.moods.tired',
    color: '#90CAF9',
    chartColor: '#d6dffe',
    square: require('../assets/images/squares/blue-square.PNG') as ImageSourcePropType,
    circle: require('../assets/images/circles/blue-circle.PNG') as ImageSourcePropType,
  },
  {
    id: 'angry',
    labelKey: 'addEmotion.moods.angry',
    color: '#FFAB76',
    chartColor: '#ffc79d',
    square: require('../assets/images/squares/orange-square.PNG') as ImageSourcePropType,
    circle: require('../assets/images/circles/orange-circle.PNG') as ImageSourcePropType,
  },
  {
    id: 'happy',
    labelKey: 'addEmotion.moods.happy',
    color: '#F9A8D4',
    chartColor: '#F4CADA',
    square: require('../assets/images/squares/pink-square.PNG') as ImageSourcePropType,
    circle: require('../assets/images/circles/pink-circle.PNG') as ImageSourcePropType,
  },
  {
    id: 'motivated',
    labelKey: 'addEmotion.moods.motivated',
    color: '#86EFAC',
    chartColor: '#dce0bd',
    square: require('../assets/images/squares/green-square.PNG') as ImageSourcePropType,
    circle: require('../assets/images/circles/green-circle.PNG') as ImageSourcePropType,
  },
  {
    id: 'calm',
    labelKey: 'addEmotion.moods.calm',
    color: '#C4B5FD',
    chartColor: '#caa4c1',
    square: require('../assets/images/squares/purple-square.PNG') as ImageSourcePropType,
    circle: require('../assets/images/circles/purple-circle.PNG') as ImageSourcePropType,
  },
];

export const MOOD_BY_ID = Object.fromEntries(MOODS.map((m) => [m.id, m])) as Record<MoodId, MoodData>;
export const MOOD_SQUARES = Object.fromEntries(MOODS.map((m) => [m.id, m.square])) as Record<MoodId, ImageSourcePropType>;
export const MOOD_CIRCLES = Object.fromEntries(MOODS.map((m) => [m.id, m.circle])) as Record<MoodId, ImageSourcePropType>;
export const COLOR_TO_SQUARE = Object.fromEntries(MOODS.map((m) => [m.color, m.square])) as Record<string, ImageSourcePropType>;
export const COLOR_TO_CIRCLE = Object.fromEntries(MOODS.map((m) => [m.color, m.circle])) as Record<string, ImageSourcePropType>;
