import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { styles } from './add-emotion.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { router, useLocalSearchParams } from 'expo-router';
import { HeartIcon } from 'phosphor-react-native';
import { saveEntry, getEntry } from '../hooks/use-emotion-storage';
import { IconSymbol } from '../components/ui/icon-symbol';
import { MoodOption } from '../components/MoodOption';
import { MOODS, MOOD_BY_ID } from '../constants/moods';
import { MoodId } from '../types';
import { Colors } from '../constants/theme';

const MAX_CHARS = 300;

export default function AddEmotionScreen() {
  const { t, i18n } = useTranslation();
  const { date: dateParam } = useLocalSearchParams<{ date?: string }>();
  const entryDate = Array.isArray(dateParam) ? dateParam[0] : (dateParam ?? new Date().toISOString().split('T')[0]);

  const displayDate = new Date(entryDate + 'T00:00:00').toLocaleDateString(i18n.language, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const [selectedMood, setSelectedMood] = useState<MoodId>('happy');
  const [note, setNote] = useState('');

  useEffect(() => {
    getEntry(entryDate).then((existing) => {
      if (existing) {
        setSelectedMood(existing.mood);
        setNote(existing.note ?? '');
      }
    });
  }, [entryDate]);

  async function handleSave() {
    const mood = MOOD_BY_ID[selectedMood];
    await saveEntry({
      date: entryDate,
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
          <View style={{ gap: 2 }}>
            <Text className="font-heading text-accent text-2xl">
              {t('addEmotion.screenSubtitle')}
            </Text>
            <Text className="font-body text-accent capitalize" style={{ fontSize: 15 }}>
              {displayDate}
            </Text>
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
                  image={mood.circle}
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
                  image={mood.circle}
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
                placeholderTextColor={Colors.placeholder}
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
            <IconSymbol icon={HeartIcon} size={20} color={Colors.accent} />
            <Text className="font-heading text-accent" style={styles.saveButtonText}>
              {t('addEmotion.saveButton')}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
