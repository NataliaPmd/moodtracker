import { StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

export const styles = StyleSheet.create({
  column: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  bar: {
    width: 28,
    borderRadius: 8,
  },
  label: {
    fontSize: 10,
    color: Colors.barLabel,
    fontFamily: 'PatrickHand_400Regular',
    textAlign: 'center',
  },
});
