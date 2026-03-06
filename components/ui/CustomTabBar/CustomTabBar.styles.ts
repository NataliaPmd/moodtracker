import { StyleSheet } from 'react-native';

const BAR_BG = '#fff7fa';
const BORDER_COLOR = '#f0d4e0';
const BAR_HEIGHT = 56;
const BUTTON_SIZE = 56;
const BUTTON_OVERFLOW = 16;
const SPACER_WIDTH = BUTTON_SIZE + 24;

export const styles = StyleSheet.create({
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
