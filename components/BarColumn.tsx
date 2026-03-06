import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/theme';
import { MoodStat } from '../hooks/use-stats';

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

const styles = StyleSheet.create({
  column: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  bar: {
    width: 28,
    borderRadius: 8,
  },
  label: {
    fontSize: 10,
    color: Colors.barLabel,
    fontFamily: 'PatrickHand_400Regular',
    textAlign: 'center',
  },
});
