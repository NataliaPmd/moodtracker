import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../constants/theme';

export const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 23,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    gap: 16,
    width: '100%',
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  diarySection: { gap: 10, width: '100%' },
  diaryCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    height: 180,
  },
  textInput: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.accent,
    lineHeight: 22,
  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    color: Colors.placeholder,
  },
  saveButton: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    height: 61,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
  },
  saveButtonText: { fontSize: 24 },
});
