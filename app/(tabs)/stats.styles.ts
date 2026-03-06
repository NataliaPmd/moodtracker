import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
    gap: 28,
  },
  title: {
    fontSize: 36,
  },
  bunny: {
    width: 70,
    height: 67,
  },
  // Bar chart card
  barCard: {
    height: 220,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 110,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  bar: {
    width: 28,
    borderRadius: 8,
  },
  barLabel: {
    fontSize: 10,
    color: '#7a7a7a',
    fontFamily: 'PatrickHand_400Regular',
    textAlign: 'center',
  },
  // Square stat cards
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  squareCard: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  statNumber: {
    fontSize: 40,
    lineHeight: 44,
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  // Top mood + empty state cards
  topMoodCard: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 20,
  },
  emptyCard: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 20,
  },
  topMoodText: {
    fontSize: 14,
    lineHeight: 20,
  },
  motivationText: {
    fontSize: 13,
    lineHeight: 19,
    opacity: 0.8,
  },
});
