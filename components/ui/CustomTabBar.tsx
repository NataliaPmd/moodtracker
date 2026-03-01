import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BookOpenIcon, CalendarBlankIcon, ChartBarIcon, HouseIcon } from 'phosphor-react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ACCENT = '#88566C';
const BAR_BG = '#fff7fa';
const BORDER_COLOR = '#f0d4e0';
const BAR_HEIGHT = 56;
const BUTTON_SIZE = 56;
const BUTTON_OVERFLOW = 16; // how many px the button floats above the bar
const SPACER_WIDTH = BUTTON_SIZE + 24; // extra margin so adjacent icons aren't crowded

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
          source={require('../../assets/images/addbutton.png')}
          style={styles.addButtonImage}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'visible',
    backgroundColor: BAR_BG,
    borderTopWidth: 1.5,
    borderTopColor: BORDER_COLOR,
  },
  bar: {
    height: BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Wider than the button to give the adjacent icons breathing room
  spacer: {
    width: SPACER_WIDTH,
  },
  addButton: {
    position: 'absolute',
    top: -BUTTON_OVERFLOW,
    alignSelf: 'center',
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    overflow: 'hidden',
  },
  addButtonImage: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
  },
});
