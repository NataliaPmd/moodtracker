import { useVideoPlayer, VideoView } from "expo-video";
import { useRouter } from "expo-router";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import { useFirstLaunch } from "@/hooks/use-first-launch";

const videoSource = require("../assets/animations/intro.MP4");

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { markWelcomeSeen } = useFirstLaunch();
  const { t } = useTranslation();

  const player = useVideoPlayer(videoSource, (p) => {
    p.loop = true;
    p.play();
  });

  async function handleContinue() {
    await markWelcomeSeen();
    router.replace("/(tabs)");
  }

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        nativeControls={false}
      />
      <View style={[styles.buttonContainer, { paddingBottom: insets.bottom + 32 }]}>
        <Pressable
          onPress={handleContinue}
          style={({ pressed }) => [pressed && styles.buttonPressed]}
        >
          <ImageBackground
            source={require("../assets/images/button.png")}
            style={styles.button}
            resizeMode="contain"
          >
            <Text style={styles.buttonText}>{t('welcome.cta')}</Text>
          </ImageBackground>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  buttonContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    width: 300,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontFamily: "AmaticSC_700Bold",
    fontSize: 28,
    color: "#88566C",
  },
});
