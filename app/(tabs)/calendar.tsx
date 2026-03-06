import { memo, useCallback, useMemo } from 'react';
import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { router, useFocusEffect } from 'expo-router';
import { useEmotions } from '../../hooks/use-emotions';

const YEAR = new Date().getFullYear();
const TODAY = new Date().toISOString().split('T')[0];

const MOOD_SQUARES: Record<string, ImageSourcePropType> = {
  sad: require('../../assets/images/squares/grey-square.PNG'),
  tired: require('../../assets/images/squares/blue-square.PNG'),
  angry: require('../../assets/images/squares/orange-square.PNG'),
  happy: require('../../assets/images/squares/pink-square.PNG'),
  motivated: require('../../assets/images/squares/green-square.PNG'),
  calm: require('../../assets/images/squares/purple-square.PNG'),
};

const EMPTY_SQUARE = require('../../assets/images/squares/squareempty.png') as ImageSourcePropType;

function daysInMonth(month: number): number {
  return new Date(YEAR, month, 0).getDate();
}

const DayCell = memo(function DayCell({ mood, dateStr, cellSize }: { mood: string | undefined; dateStr: string; cellSize: number }) {
  const isFuture = dateStr > TODAY;
  return (
    <TouchableOpacity
      onPress={() => !isFuture && router.push({ pathname: '/add-emotion', params: { date: dateStr } })}
      activeOpacity={isFuture ? 1 : 0.7}
      style={isFuture ? { opacity: 0.3 } : undefined}
    >
      <Image
        source={mood ? (MOOD_SQUARES[mood] ?? EMPTY_SQUARE) : EMPTY_SQUARE}
        style={{ width: cellSize, height: cellSize }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
});

export default function CalendarScreen() {
  const { t, i18n } = useTranslation();
  const { entries, refresh } = useEmotions();
  const { cellSize, styles } = useStyles();

  useFocusEffect(useCallback(() => { refresh(); }, []));

  const entriesMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const entry of entries) map[entry.date] = entry.mood;
    return map;
  }, [entries]);

  const monthLetters = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) =>
        new Date(YEAR, i, 1).toLocaleString(i18n.language, { month: 'narrow' })
      ),
    [i18n.language]
  );

  return (
    <SafeAreaView style={styles.flex} className="bg-white">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text className="font-heading text-accent" style={styles.title}>
            {t('calendar.screenTitle', { year: YEAR })}
          </Text>
          <Text className="font-body text-accent" style={styles.subtitle}>
            {t('calendar.subtitle')}
          </Text>
        </View>

        <View style={styles.grid}>
          <View style={styles.row}>
            {monthLetters.map((letter, i) => (
              <Text key={i} className="font-body text-accent" style={styles.monthLetter}>
                {letter}
              </Text>
            ))}
          </View>

          {Array.from({ length: 31 }, (_, dayIdx) => {
            const day = dayIdx + 1;
            return (
              <View key={day} style={styles.row}>
                {Array.from({ length: 12 }, (_, monthIdx) => {
                  const month = monthIdx + 1;
                  if (day > daysInMonth(month)) {
                    return <View key={monthIdx} style={styles.cell} />;
                  }
                  const dateStr = `${YEAR}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  return <DayCell key={monthIdx} mood={entriesMap[dateStr]} dateStr={dateStr} cellSize={cellSize} />;
                })}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const PADDING = 24;
const CELL_GAP = 4;

function useStyles() {
  const { width } = useWindowDimensions();
  const cellSize = Math.floor((width - PADDING * 2 - CELL_GAP * 11) / 12);
  const styles = StyleSheet.create({
    flex: { flex: 1 },
    content: {
      paddingTop: 20,
      paddingHorizontal: PADDING,
      paddingBottom: 32,
      gap: 20,
    },
    header: { gap: 8 },
    title: { fontSize: 36 },
    subtitle: { fontSize: 16 },
    grid: { gap: CELL_GAP },
    row: { flexDirection: 'row', gap: CELL_GAP },
    cell: { width: cellSize, height: cellSize },
    monthLetter: {
      width: cellSize,
      fontSize: 13,
      fontWeight: '700',
      textAlign: 'center',
    },
  });
  return { cellSize, styles };
}
