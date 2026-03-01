import { useVideoPlayer, VideoView } from "expo-video";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useFirstLaunch } from "@/hooks/use-first-launch";

const videoSource = require("../assets/animations/intro.MP4");

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { markWelcomeSeen } = useFirstLaunch();

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
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonText}>Continue</Text>
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
    backgroundColor: "#fbdcea",
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 100,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontFamily: "PatrickHand_400Regular",
    fontSize: 18,
    color: "#88566C",
  },
});
