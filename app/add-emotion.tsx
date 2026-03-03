import { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { XIcon, HeartIcon } from 'phosphor-react-native';
import { saveEntry } from '../hooks/use-emotion-storage';
import { IconSymbol } from '../components/ui/icon-symbol';

const MOODS = [
  {
    id: 'sad',
    labelKey: 'addEmotion.moods.sad',
    image: require('../assets/images/circles/grey-circle.PNG') as ImageSourcePropType,
    color: '#9E9E9E',
  },
  {
    id: 'tired',
    labelKey: 'addEmotion.moods.tired',
    image: require('../assets/images/circles/blue-circle.PNG') as ImageSourcePropType,
    color: '#90CAF9',
  },
  {
    id: 'angry',
    labelKey: 'addEmotion.moods.angry',
    image: require('../assets/images/circles/orange-circle.PNG') as ImageSourcePropType,
    color: '#FFAB76',
  },
  {
    id: 'happy',
    labelKey: 'addEmotion.moods.happy',
    image: require('../assets/images/circles/pink-circle.PNG') as ImageSourcePropType,
    color: '#F9A8D4',
  },
  {
    id: 'motivated',
    labelKey: 'addEmotion.moods.motivated',
    image: require('../assets/images/circles/green-circle.PNG') as ImageSourcePropType,
    color: '#86EFAC',
  },
  {
    id: 'calm',
    labelKey: 'addEmotion.moods.calm',
    image: require('../assets/images/circles/purple-circle.PNG') as ImageSourcePropType,
    color: '#C4B5FD',
  },
] as const;

type MoodId = (typeof MOODS)[number]['id'];

const MAX_CHARS = 300;
const ACCENT = '#88566C';

export default function AddEmotionScreen() {
  const { t } = useTranslation();
  const [selectedMood, setSelectedMood] = useState<MoodId>('happy');
  const [note, setNote] = useState('');

  async function handleSave() {
    const mood = MOODS.find((m) => m.id === selectedMood)!;
    await saveEntry({
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      color: mood.color,
      note: note.trim() || undefined,
    });
    router.back();
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.flex} className="bg-primary">
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="flex-row items-start justify-between w-full">
            <View style={styles.titleSection}>
              <Text className="font-heading text-accent" style={styles.screenTitle}>
                {t('addEmotion.screenTitle')}
              </Text>
              <Text className="font-body text-accent text-base">
                {t('addEmotion.screenSubtitle')}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.closeButton}
              hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
            >
              <IconSymbol icon={XIcon} size={24} color={ACCENT} />
            </TouchableOpacity>
          </View>

          {/* Mood Selection Card */}
          <View style={styles.card}>
            <Text className="font-heading text-accent text-2xl text-center">
              {t('addEmotion.pickMood')}
            </Text>
            <View style={styles.moodRow}>
              {MOODS.slice(0, 3).map((mood) => (
                <MoodOption
                  key={mood.id}
                  image={mood.image}
                  label={t(mood.labelKey)}
                  isSelected={selectedMood === mood.id}
                  onPress={() => setSelectedMood(mood.id)}
                />
              ))}
            </View>
            <View style={styles.moodRow}>
              {MOODS.slice(3, 6).map((mood) => (
                <MoodOption
                  key={mood.id}
                  image={mood.image}
                  label={t(mood.labelKey)}
                  isSelected={selectedMood === mood.id}
                  onPress={() => setSelectedMood(mood.id)}
                />
              ))}
            </View>
          </View>

          {/* Diary Section */}
          <View style={styles.diarySection}>
            <Text className="font-heading text-accent text-2xl">
              {t('addEmotion.notesTitle')}
            </Text>
            <View style={styles.diaryCard}>
              <TextInput
                style={styles.textInput}
                placeholder={t('addEmotion.notesPlaceholder')}
                placeholderTextColor="#c4a0b2"
                multiline
                maxLength={MAX_CHARS}
                value={note}
                onChangeText={setNote}
                textAlignVertical="top"
              />
            </View>
            <Text style={styles.charCount} className="font-body">
              {note.length} / {MAX_CHARS}
            </Text>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.8}>
            <IconSymbol icon={HeartIcon} size={20} color={ACCENT} />
            <Text className="font-heading text-accent" style={styles.saveButtonText}>
              {t('addEmotion.saveButton')}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

function MoodOption({
  image,
  label,
  isSelected,
  onPress,
}: {
  image: ImageSourcePropType;
  label: string;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.moodOption} activeOpacity={0.7}>
      <View style={[styles.circleContainer, isSelected && styles.circleSelected]}>
        <Image source={image} style={styles.circleImage} />
      </View>
      <Text
        className="font-body text-accent text-sm text-center"
        style={isSelected ? styles.moodLabelSelected : undefined}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 23,
  },
  titleSection: { flex: 1, gap: 4 },
  screenTitle: { fontSize: 36 },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    gap: 16,
    width: '100%',
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  moodOption: {
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
    borderColor: ACCENT,
  },
  circleImage: {
    width: '100%',
    height: '100%',
  },
  moodLabelSelected: { fontWeight: '700' },
  diarySection: { gap: 10, width: '100%' },
  diaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    height: 180,
  },
  textInput: {
    flex: 1,
    fontFamily: 'PatrickHand_400Regular',
    fontSize: 14,
    color: ACCENT,
    lineHeight: 22,
  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    color: '#c4a0b2',
  },
  saveButton: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    height: 61,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
  },
  saveButtonText: { fontSize: 24 },
});
