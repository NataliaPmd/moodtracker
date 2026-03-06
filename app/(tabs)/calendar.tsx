import { memo, useCallback, useMemo } from 'react';
import { Image, ImageSourcePropType, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useStyles } from './calendar.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { router, useFocusEffect } from 'expo-router';
import { useEmotions } from '../../hooks/use-emotions';
import { MOOD_SQUARES } from '../../constants/moods';
import { MoodId } from '../../types';

const YEAR = new Date().getFullYear();
const TODAY = new Date().toISOString().split('T')[0];
const EMPTY_SQUARE = require('../../assets/images/squares/squareempty.png') as ImageSourcePropType;

function daysInMonth(month: number): number {
  return new Date(YEAR, month, 0).getDate();
}

const DayCell = memo(function DayCell({ mood, dateStr, cellSize }: { mood: MoodId | undefined; dateStr: string; cellSize: number }) {
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
    const map: Record<string, MoodId> = {};
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
