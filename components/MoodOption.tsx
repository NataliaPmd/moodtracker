import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/theme';

interface Props {
  image: ImageSourcePropType;
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export function MoodOption({ image, label, isSelected, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.7}>
      <View style={[styles.circleContainer, isSelected && styles.circleSelected]}>
        <Image source={image} style={styles.circleImage} />
      </View>
      <Text
        className="font-body text-accent text-sm text-center"
        style={isSelected ? styles.labelSelected : undefined}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
