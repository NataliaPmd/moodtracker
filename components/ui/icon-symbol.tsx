import type { Icon, IconWeight } from 'phosphor-react-native';

export function IconSymbol({
  icon: PhosphorIcon,
  size = 24,
  color,
  weight = 'regular',
}: {
  icon: Icon;
  size?: number;
  color: string;
  weight?: IconWeight;
}) {
  return <PhosphorIcon size={size} color={color} weight={weight} />;
}
