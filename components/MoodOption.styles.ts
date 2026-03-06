import { StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

export const styles = StyleSheet.create({
  container: {
    width: 90,
    alignItems: 'center',
    gap: 6,
  },
  circleContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 2.5,
    borderColor: 'transparent',
  },
  circleSelected: {
    borderColor: Colors.accent,
  },
  circleImage: {
    width: '100%',
    height: '100%',
  },
  labelSelected: { fontWeight: '700' },
});
