import { useCallback } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { MoodMotivation } from '../../components/MoodMotivation';
import { useEmotions } from '../../hooks/use-emotions';
import { useStats, MoodStat } from '../../hooks/use-stats';

const CONTAINER_LIGHT = require('../../assets/images/containerlightpink.png');
const CONTAINER_SQUARE = require('../../assets/images/containersquare.PNG');
const BUNNY = require('../../assets/images/happybunny.png');

const MAX_BAR_HEIGHT = 80;

export default function StatsScreen() {
  const { t } = useTranslation();
  const { entries, refresh } = useEmotions();
  const stats = useStats(entries);

  useFocusEffect(useCallback(() => { refresh(); }, [refresh]));

  const maxCount = Math.max(stats.moodStats[0]?.count ?? 0, 1);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <Text className="font-heading text-accent" style={styles.title}>
          {t('stats.title')}
        </Text>

        {/* Vertical bar chart — always visible */}
        <ImageBackground source={CONTAINER_LIGHT} style={styles.barCard} resizeMode="stretch">
          <View style={styles.barsRow}>
            {stats.moodStats.map((stat) => (
              <BarColumn
                key={stat.mood}
                stat={stat}
                label={t(`addEmotion.moods.${stat.mood}`)}
                maxCount={maxCount}
              />
            ))}
          </View>
        </ImageBackground>

        {stats.total === 0 ? (
          <ImageBackground source={CONTAINER_LIGHT} style={styles.emptyCard} resizeMode="stretch">
            <Image source={BUNNY} style={styles.bunny} resizeMode="contain" />
            <Text className="font-body text-accent text-center" style={styles.topMoodText}>
              {t('stats.noEntries')}
            </Text>
          </ImageBackground>
        ) : (
          <>
            {/* Streak + Total entries */}
            <View style={styles.cardsRow}>
              <ImageBackground source={CONTAINER_SQUARE} style={styles.squareCard} resizeMode="stretch">
                <Text className="font-heading text-accent" style={styles.statNumber}>
                  {stats.streak}
                </Text>
                <Text className="font-body text-accent" style={styles.statLabel}>
                  {t('stats.streak')}
                </Text>
              </ImageBackground>
              <ImageBackground source={CONTAINER_SQUARE} style={styles.squareCard} resizeMode="stretch">
                <Text className="font-heading text-accent" style={styles.statNumber}>
                  {stats.total}
                </Text>
                <Text className="font-body text-accent" style={styles.statLabel}>
                  {t('stats.total')}
                </Text>
              </ImageBackground>
            </View>

            {/* Top mood summary */}
            {stats.topMood && (
              <ImageBackground source={CONTAINER_LIGHT} style={styles.topMoodCard} resizeMode="stretch">
                <Image source={BUNNY} style={styles.bunny} resizeMode="contain" />
                <Text className="font-body text-accent text-center" style={styles.topMoodText}>
                  {t('stats.topMoodText', {
                    mood: t(`addEmotion.moods.${stats.topMood}`),
                    percentage: stats.moodStats.find((s) => s.mood === stats.topMood)?.percentage ?? 0,
                  })}
                </Text>
                <MoodMotivation
                  mood={stats.topMood}
                  className="font-body text-accent text-center"
                  style={styles.motivationText}
                />
              </ImageBackground>
            )}
          </>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

function BarColumn({ stat, label, maxCount }: { stat: MoodStat; label: string; maxCount: number }) {
  const barHeight = Math.max(6, Math.round((stat.count / maxCount) * MAX_BAR_HEIGHT));
  return (
    <View style={styles.barColumn}>
      <View style={[styles.bar, { height: barHeight, backgroundColor: stat.color }]} />
      <Text style={styles.barLabel} numberOfLines={1}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
    gap: 28,
  },
  title: {
    fontSize: 36,
  },
  bunny: {
    width: 70,
    height: 67,
  },
  // Bar chart card
  barCard: {
    height: 220,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 110,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  bar: {
    width: 28,
    borderRadius: 8,
  },
  barLabel: {
    fontSize: 10,
    color: '#7a7a7a',
    fontFamily: 'PatrickHand_400Regular',
    textAlign: 'center',
  },
  // Square stat cards
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  squareCard: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  statNumber: {
    fontSize: 40,
    lineHeight: 44,
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  // Top mood + empty state cards
  topMoodCard: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 20,
  },
  emptyCard: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 20,
  },
  topMoodText: {
    fontSize: 14,
    lineHeight: 20,
  },
  motivationText: {
    fontSize: 13,
    lineHeight: 19,
    opacity: 0.8,
  },
});
