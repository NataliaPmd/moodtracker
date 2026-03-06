import { useCallback, useMemo } from 'react';
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { router, useFocusEffect } from 'expo-router';
import { useEmotions } from '../../hooks/use-emotions';
import { MOOD_SQUARES } from '../../constants/moods';

const CARD_BG = require('../../assets/images/containerlightpink.png');

export default function LogScreen() {
  const { t, i18n } = useTranslation();
  const { entries, refresh } = useEmotions();

  useFocusEffect(useCallback(() => { refresh(); }, [refresh]));

  const sorted = useMemo(
    () => [...entries].sort((a, b) => b.date.localeCompare(a.date)),
    [entries]
  );

  function formatDate(dateStr: string): string {
    const today = new Date().toISOString().split('T')[0];
    const date = new Date(dateStr + 'T00:00:00');
    const monthDay = date.toLocaleDateString(i18n.language, { month: 'short', day: 'numeric' });
    if (dateStr === today) return `${t('log.today')}, ${monthDay}`;
    const weekday = date.toLocaleDateString(i18n.language, { weekday: 'long' });
    return `${weekday}, ${monthDay}`;
  }

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView contentContainerClassName="px-6 pt-5 gap-7 pb-8" showsVerticalScrollIndicator={false}>
        <View className="gap-2">
          <Text className="font-heading text-accent text-[36px]">
            {t('log.title')}
          </Text>
          <Text className="font-body text-accent text-base">
            {t('log.subtitle')}
          </Text>
        </View>

        {sorted.length === 0 ? (
          <Text className="font-body text-accent text-center text-sm mt-8">
            {t('log.empty')}
          </Text>
        ) : (
          <View className="gap-4">
            {sorted.map((entry) => (
              <TouchableOpacity
                key={entry.date}
                activeOpacity={0.8}
                onPress={() => router.push({ pathname: '/add-emotion', params: { date: entry.date } })}
              >
                <ImageBackground
                  source={CARD_BG}
                  className="rounded-[20px] overflow-hidden w-full"
                  imageStyle={{ borderRadius: 20, resizeMode: 'stretch' }}
                >
                  <View className="pt-6 px-4 pb-4 gap-1" style={{ minHeight: 110 }}>
                    <Text className="font-heading text-accent text-[22px]">
                      {formatDate(entry.date)}
                    </Text>
                    <View className="flex-1 flex-row items-center gap-3">
                      {entry.note ? (
                        <Text className="flex-1 font-body text-accent text-sm leading-[18px]" numberOfLines={4} ellipsizeMode="tail">
                          {entry.note}
                        </Text>
                      ) : (
                        <View className="flex-1" />
                      )}
                      {MOOD_SQUARES[entry.mood] ? (
                        <Image source={MOOD_SQUARES[entry.mood]} style={{ width: 28, height: 28 }} />
                      ) : null}
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
