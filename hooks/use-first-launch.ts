import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const FIRST_LAUNCH_KEY = "hasSeenWelcome";

export function useFirstLaunch() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(FIRST_LAUNCH_KEY).then((value) => {
      setIsFirstLaunch(value === null);
    });
  }, []);

  async function markWelcomeSeen() {
    await AsyncStorage.setItem(FIRST_LAUNCH_KEY, "true");
  }

  return { isFirstLaunch, markWelcomeSeen };
}
