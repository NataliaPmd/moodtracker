import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

interface Props {
  mood: string;
  style?: object;
  className?: string;
}

export function MoodMotivation({ mood, style, className }: Props) {
  const { t } = useTranslation();
  return (
    <Text className={className} style={style}>
      {t(`motivation.${mood}`)}
    </Text>
  );
}
