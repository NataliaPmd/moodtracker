import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function CalendarScreen() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text>{t('tabs.calendar')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
