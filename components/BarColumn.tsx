import { Text, View } from 'react-native';
import { MoodStat } from '../hooks/use-stats';
import { styles } from './BarColumn.styles';

const MAX_BAR_HEIGHT = 80;

interface Props {
  stat: MoodStat;
  label: string;
  maxCount: number;
}

export function BarColumn({ stat, label, maxCount }: Props) {
  const barHeight = Math.max(6, Math.round((stat.count / maxCount) * MAX_BAR_HEIGHT));
  return (
    <View style={styles.column}>
      <View style={[styles.bar, { height: barHeight, backgroundColor: stat.color }]} />
      <Text style={styles.label} numberOfLines={1}>{label}</Text>
    </View>
  );
}

