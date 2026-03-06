import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './MoodOption.styles';

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
