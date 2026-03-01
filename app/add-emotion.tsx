import { StyleSheet, Text, View } from 'react-native';

export default function AddEmotionScreen() {
  return (
    <View style={styles.container}>
      <Text>Add Emotion</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
