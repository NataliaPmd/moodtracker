import "../global.css";
import "../i18n";

import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { AmaticSC_400Regular, AmaticSC_700Bold } from "@expo-google-fonts/amatic-sc";
import { PatrickHand_400Regular } from "@expo-google-fonts/patrick-hand";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { useTranslation } from "react-i18next";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useFirstLaunch } from "@/hooks/use-first-launch";
import { Colors, Fonts } from "@/constants/theme";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { t } = useTranslation();
  const [fontsLoaded] = useFonts({
    AmaticSC_400Regular,
    AmaticSC_700Bold,
    PatrickHand_400Regular,
  });
  const { isFirstLaunch } = useFirstLaunch();

  const isReady = fontsLoaded && isFirstLaunch !== null;

  useEffect(() => {
    if (!isReady) return;
    SplashScreen.hideAsync();
    if (isFirstLaunch) {
      router.replace("/welcome");
    }
  }, [isReady, isFirstLaunch, router]);

  if (!isReady) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen
          name="add-emotion"
          options={{
            presentation: "modal",
            title: t("addEmotion.screenTitle"),
            headerStyle: { backgroundColor: Colors.primary },
            headerTitleStyle: { fontFamily: Fonts.heading, fontSize: 36 },
            headerTintColor: Colors.accent,
            headerShadowVisible: false,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
