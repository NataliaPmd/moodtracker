import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function LogScreen() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text>{t('tabs.log')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
