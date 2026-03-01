import { Image, ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

export default function HomeScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();

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
            <Text className="font-heading text-2xl text-accent text-center" style={{ fontFamily: 'AmaticSC_700Bold' }}>
              {t('home.moodPrompt')}
            </Text>
          </ImageBackground>
        </Pressable>

        {/* Last 7 Days */}
        <View className="mx-2 gap-6">
          <Text className="font-heading text-[22px] text-accent" style={{ fontFamily: 'AmaticSC_700Bold' }}>
            {t('home.last7Days')}
          </Text>
          <View className="flex-row gap-4 items-center">
            {Array.from({ length: 7 }).map((_, i) => (
              <Image
                key={i}
                source={require('../../assets/images/squares/squareempty.png')}
                style={{ flex: 1, aspectRatio: 1 }}
                resizeMode="cover"
              />
            ))}
          </View>
        </View>

        {/* Weekly Summary */}
        <ImageBackground
          source={require('../../assets/images/conteinerdarkpink.png')}
          style={{ height: 290 }}
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
          <Text className="font-body text-base text-accent text-center" style={{ lineHeight: 22 }}>
            {t('home.weeklyMessage')}
          </Text>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}
