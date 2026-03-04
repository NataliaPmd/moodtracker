import { Image, ImageBackground, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { useEmotions } from '../../hooks/use-emotions';

const MOOD_SQUARES: Record<string, ImageSourcePropType> = {
  sad: require('../../assets/images/squares/grey-square.PNG'),
  tired: require('../../assets/images/squares/blue-square.PNG'),
  angry: require('../../assets/images/squares/orange-square.PNG'),
  happy: require('../../assets/images/squares/pink-square.PNG'),
  motivated: require('../../assets/images/squares/green-square.PNG'),
  calm: require('../../assets/images/squares/purple-square.PNG'),
};

const CARD_BG = require('../../assets/images/containerlightpink.png');

export default function LogScreen() {
  const { t, i18n } = useTranslation();
  const { entries, refresh } = useEmotions();

  useFocusEffect(useCallback(() => { refresh(); }, []));

  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));

  function formatDate(dateStr: string): string {
    const today = new Date().toISOString().split('T')[0];
    const date = new Date(dateStr + 'T00:00:00');
    const monthDay = date.toLocaleDateString(i18n.language, { month: 'short', day: 'numeric' });
    if (dateStr === today) return `${t('log.today')}, ${monthDay}`;
    const weekday = date.toLocaleDateString(i18n.language, { weekday: 'long' });
    return `${weekday}, ${monthDay}`;
  }

  return (
    <SafeAreaView style={styles.flex} className="bg-primary">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text className="font-heading text-accent" style={styles.title}>
            {t('log.title')}
          </Text>
          <Text className="font-body text-accent" style={styles.subtitle}>
            {t('log.subtitle')}
          </Text>
        </View>

        {sorted.length === 0 ? (
          <Text className="font-body text-accent text-center" style={styles.empty}>
            {t('log.empty')}
          </Text>
        ) : (
          <View style={styles.list}>
            {sorted.map((entry) => (
              <TouchableOpacity
                key={entry.date}
                activeOpacity={0.8}
                onPress={() => router.push({ pathname: '/add-emotion', params: { date: entry.date } })}
              >
                <ImageBackground
                  source={CARD_BG}
                  style={styles.card}
                  imageStyle={styles.cardImage}
                >
                  <View style={styles.cardInner}>
                    <Text className="font-heading text-accent" style={styles.entryDate}>
                      {formatDate(entry.date)}
                    </Text>
                    <View style={styles.cardBody}>
                      {entry.note ? (
                        <View style={styles.flex}>
                          <Text className="font-body text-accent" style={styles.entryNote} numberOfLines={4} ellipsizeMode="tail">
                            {entry.note}
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.flex} />
                      )}
                      {MOOD_SQUARES[entry.mood] ? (
                        <Image source={MOOD_SQUARES[entry.mood]} style={styles.moodSquare} />
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

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 28,
  },
  header: { gap: 8 },
  title: { fontSize: 36 },
  subtitle: { fontSize: 16 },
  empty: { fontSize: 14, marginTop: 32 },
  list: { gap: 16 },
  card: { borderRadius: 20, overflow: 'hidden', width: '100%' },
  cardImage: { borderRadius: 20, resizeMode: 'stretch' },
  cardInner: {
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: 'column',
    gap: 4,
    minHeight: 110,
  },
  cardBody: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  entryDate: { fontSize: 22 },
  entryNote: { flex: 1, fontSize: 14, lineHeight: 18 },
  moodSquare: { width: 28, height: 28 },
});
