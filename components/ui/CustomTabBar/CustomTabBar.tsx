import { Image, TouchableOpacity, View } from 'react-native';
import { styles } from './CustomTabBar.styles';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BookOpenIcon, CalendarBlankIcon, ChartBarIcon, HouseIcon } from 'phosphor-react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ACCENT = '#88566C';

// Same order as the tab screens: index, log, calendar, stats
const TAB_ICONS = [HouseIcon, BookOpenIcon, CalendarBlankIcon, ChartBarIcon];

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    // overflow: 'visible' is needed so the floating button renders above the bar.
    // In RN, the default on Android is 'hidden', so this must be explicit.
    <View style={[styles.wrapper, { paddingBottom: bottom }]}>
      <View style={styles.bar}>
        {/* Left pair: Home, Log */}
        {state.routes.slice(0, 2).map((route, index) => {
          const TabIcon = TAB_ICONS[index];
          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tab}
              onPress={() => navigation.navigate(route.name)}
              activeOpacity={0.7}
            >
              <TabIcon size={26} color={ACCENT} weight={state.index === index ? 'fill' : 'regular'} />
            </TouchableOpacity>
          );
        })}

        {/* Center spacer — same width as the floating button area */}
        <View style={styles.spacer} />

        {/* Right pair: Calendar, Stats */}
        {state.routes.slice(2).map((route, index) => {
          const TabIcon = TAB_ICONS[index + 2];
          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tab}
              onPress={() => navigation.navigate(route.name)}
              activeOpacity={0.7}
            >
              <TabIcon size={26} color={ACCENT} weight={state.index === index + 2 ? 'fill' : 'regular'} />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Floating add button — positioned above the bar center */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/add-emotion')}
        activeOpacity={0.85}
      >
        <Image
          source={require('../../../assets/images/addbutton.png')}
          style={styles.addButtonImage}
        />
      </TouchableOpacity>
    </View>
  );
}
