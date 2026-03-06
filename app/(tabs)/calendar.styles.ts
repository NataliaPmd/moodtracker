import { StyleSheet, useWindowDimensions } from 'react-native';

const PADDING = 24;
const CELL_GAP = 4;

export function useStyles() {
  const { width } = useWindowDimensions();
  const cellSize = Math.floor((width - PADDING * 2 - CELL_GAP * 11) / 12);
  const styles = StyleSheet.create({
    flex: { flex: 1 },
    content: {
      paddingTop: 20,
      paddingHorizontal: PADDING,
      paddingBottom: 32,
      gap: 20,
    },
    header: { gap: 8 },
    title: { fontSize: 36 },
    subtitle: { fontSize: 16 },
    grid: { gap: CELL_GAP },
    row: { flexDirection: 'row', gap: CELL_GAP },
    cell: { width: cellSize, height: cellSize },
    monthLetter: {
      width: cellSize,
      fontSize: 13,
      fontWeight: '700',
      textAlign: 'center',
    },
  });
  return { cellSize, styles };
}
