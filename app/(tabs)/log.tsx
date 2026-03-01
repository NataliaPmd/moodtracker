import { StyleSheet, Text, View } from 'react-native';

export default function LogScreen() {
  return (
    <View style={styles.container}>
      <Text>Log</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
