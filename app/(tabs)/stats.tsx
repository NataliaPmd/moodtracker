import { useCallback } from 'react';
import { Image, ImageBackground, ScrollView, Text, View } from 'react-native';
import { styles } from './stats.styles';
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

