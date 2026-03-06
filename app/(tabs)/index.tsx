import { useCallback } from 'react';
import { Image, ImageBackground, ImageSourcePropType, Pressable, ScrollView, Text, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { MoodMotivation } from '../../components/MoodMotivation';
import { useEmotions } from '../../hooks/use-emotions';
import { COLOR_TO_CIRCLE, COLOR_TO_SQUARE } from '../../constants/moods';

const SQUARE_EMPTY = require('../../assets/images/squares/squareempty.png');

function getLast7Days(): string[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });
}

export default function HomeScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { entries, refresh } = useEmotions();

  useFocusEffect(useCallback(() => { refresh(); }, [refresh]));

  const last7Days = getLast7Days();
  const entriesByDate = Object.fromEntries(entries.map((e) => [e.date, e]));
  const todayStr = new Date().toISOString().split('T')[0];
  const todayEntry = entriesByDate[todayStr];

  const weeklyTopMood = (() => {
    const counts: Record<string, number> = {};
    for (const date of last7Days) {
      const mood = entriesByDate[date]?.mood;
      if (mood) counts[mood] = (counts[mood] ?? 0) + 1;
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
  })();

  const today = new Date();
  const dateStr = today.toLocaleDateString(i18n.language, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScrollView contentContainerClassName="px-6 pt-5 gap-11 pb-6" showsVerticalScrollIndicator={false}>
        <View className="mx-2 flex-row items-start justify-between">
          <View className="flex-1 gap-1">
            <Text className="font-heading text-5xl text-accent" style={{ fontFamily: 'AmaticSC_700Bold' }}>
              {t('home.greeting')}
            </Text>
            <Text className="font-body text-lg text-accent capitalize">
              {dateStr}
            </Text>
          </View>
          <Image
            source={require('../../assets/images/happybunny.png')}
            style={{ width: 80, height: 77 }}
            resizeMode="contain"
          />
        </View>

        <Pressable onPress={() => router.push('/add-emotion')}>
          <ImageBackground
            source={require('../../assets/images/containerlightpink.png')}
            style={{ height: 150 }}
            className="justify-center items-center"
          >
            {todayEntry ? (
              <View className="flex-row items-center gap-3 px-8">
                <Image
                  source={COLOR_TO_CIRCLE[todayEntry.color] as ImageSourcePropType}
                  style={{ width: 40, height: 40 }}
                  resizeMode="contain"
                />
                <Text className="font-heading text-2xl text-accent" style={{ fontFamily: 'AmaticSC_700Bold' }}>
                  {t('home.moodToday')} {t(`addEmotion.moods.${todayEntry.mood}`)}
                </Text>
              </View>
            ) : (
              <Text className="font-heading text-2xl text-accent text-center" style={{ fontFamily: 'AmaticSC_700Bold' }}>
                {t('home.moodPrompt')}
              </Text>
            )}
          </ImageBackground>
        </Pressable>

        {/* Last 7 Days */}
        <View className="mx-2 gap-6">
          <Text className="font-heading text-[22px] text-accent" style={{ fontFamily: 'AmaticSC_700Bold' }}>
            {t('home.last7Days')}
          </Text>
          <View className="flex-row gap-4 items-center">
            {last7Days.map((date) => {
              const entry = entriesByDate[date];
              const source = entry ? (COLOR_TO_SQUARE[entry.color] ?? SQUARE_EMPTY) : SQUARE_EMPTY;
              return (
                <Pressable
                  key={date}
                  style={{ flex: 1, aspectRatio: 1 }}
                  onPress={() => router.push({ pathname: '/add-emotion', params: { date } })}
                >
                  <Image source={source} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Weekly Summary */}
        <ImageBackground
          source={require('../../assets/images/conteinerdarkpink.png')}
          style={{ height: 220 }}
          resizeMode="stretch"
          className="justify-end p-5 gap-3.5"
        >
          <Image
            source={require('../../assets/images/happybunny.png')}
            style={{ width: 74, height: 71, alignSelf: 'center' }}
            resizeMode="contain"
          />
          <Text className="font-heading text-[22px] text-accent text-center" style={{ fontFamily: 'AmaticSC_700Bold' }}>
            {t('home.weeklyTitle')}
          </Text>
          {weeklyTopMood && (
            <MoodMotivation
              mood={weeklyTopMood}
              className="font-body text-base text-accent text-center"
              style={{ lineHeight: 22 }}
            />
          )}
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}
