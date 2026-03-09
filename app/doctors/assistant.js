import React, { memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { DoctorsTheme, ASSISTANT_CHIPS } from '../components/doctors/DoctorsTheme';

// Ask Apollo Header
const AssistantHeader = memo(() => {
  const router = useRouter();
  return (
    <View style={headerStyles.container}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={headerStyles.backButton}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Ionicons name="arrow-back" size={22} color={DoctorsTheme.colors.textPrimary} />
      </TouchableOpacity>
      <Text style={headerStyles.title}>Ask Apollo</Text>
    </View>
  );
});
AssistantHeader.displayName = 'AssistantHeader';

const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: DoctorsTheme.colors.white,
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: DoctorsTheme.colors.border,
  },
  backButton: {
    padding: 4,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
  },
});

// Discovery Banner
const DiscoveryBanner = memo(() => (
  <View style={discoveryStyles.container}>
    <Text style={discoveryStyles.text}>Discover Ask Apollo</Text>
    <TouchableOpacity style={discoveryStyles.tourButton} accessibilityRole="button">
      <Text style={discoveryStyles.tourText}>Take a tour</Text>
      <Ionicons name="chevron-forward" size={14} color={DoctorsTheme.colors.apolloOrange} />
    </TouchableOpacity>
  </View>
));
DiscoveryBanner.displayName = 'DiscoveryBanner';

const discoveryStyles = StyleSheet.create({
  container: {
    backgroundColor: DoctorsTheme.colors.cardBg,
    marginHorizontal: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
  },
  tourButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  tourText: {
    fontSize: 14,
    fontWeight: '600',
    color: DoctorsTheme.colors.apolloOrange,
  },
});

// Greeting Section
const GreetingSection = memo(() => (
  <View style={greetingStyles.container}>
    <Text style={greetingStyles.hello}>Hello 👋</Text>
    <Text style={greetingStyles.subtitle}>We can help you with topics like...</Text>
  </View>
));
GreetingSection.displayName = 'GreetingSection';

const greetingStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 16,
  },
  hello: {
    fontSize: 26,
    fontWeight: '800',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: DoctorsTheme.colors.textSecondary,
  },
});

// Suggestion Chips
const SuggestionChips = memo(() => {
  const chipsPerRow = [
    ASSISTANT_CHIPS.slice(0, 2),
    ASSISTANT_CHIPS.slice(2, 4),
    ASSISTANT_CHIPS.slice(4, 5),
  ];

  return (
    <View style={chipStyles.container}>
      {chipsPerRow.map((row, rowIndex) => (
        <View key={rowIndex} style={chipStyles.row}>
          {row.map((chip) => (
            <TouchableOpacity
              key={chip}
              style={chipStyles.chip}
              accessibilityRole="button"
              accessibilityLabel={chip}
            >
              <Text style={chipStyles.chipText}>{chip}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
});
SuggestionChips.displayName = 'SuggestionChips';

const chipStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    gap: 10,
  },
  chip: {
    backgroundColor: DoctorsTheme.colors.white,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
  },
  chipText: {
    fontSize: 14,
    color: DoctorsTheme.colors.textPrimary,
    fontWeight: '500',
  },
});

// Try Asking Section
const TryAskingSection = memo(() => (
  <View style={tryStyles.container}>
    <Text style={tryStyles.label}>Try asking about...</Text>
    <View style={tryStyles.card}>
      <Text style={tryStyles.cardText}>How do I start a quick consultation via bottom navigation?</Text>
    </View>
  </View>
));
TryAskingSection.displayName = 'TryAskingSection';

const tryStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 'auto',
    paddingBottom: 8,
  },
  label: {
    fontSize: 14,
    color: DoctorsTheme.colors.textSecondary,
    marginBottom: 8,
  },
  card: {
    backgroundColor: DoctorsTheme.colors.cardBg,
    borderRadius: 12,
    padding: 16,
  },
  cardText: {
    fontSize: 15,
    fontWeight: '600',
    color: DoctorsTheme.colors.textPrimary,
    lineHeight: 22,
  },
});

// Chat Input Bar
const ChatInputBar = memo(() => (
  <View style={inputStyles.container}>
    <TouchableOpacity style={inputStyles.plusButton} accessibilityRole="button" accessibilityLabel="Add attachment">
      <Ionicons name="add" size={26} color={DoctorsTheme.colors.textSecondary} />
    </TouchableOpacity>
    <TextInput
      style={inputStyles.input}
      placeholder="Or Just Ask Apollo..."
      placeholderTextColor={DoctorsTheme.colors.textTertiary}
      accessibilityLabel="Ask Apollo chat input"
    />
    <TouchableOpacity style={inputStyles.micButton} accessibilityRole="button" accessibilityLabel="Voice input">
      <Ionicons name="mic" size={22} color={DoctorsTheme.colors.white} />
    </TouchableOpacity>
  </View>
));
ChatInputBar.displayName = 'ChatInputBar';

const inputStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: DoctorsTheme.colors.border,
    backgroundColor: DoctorsTheme.colors.white,
    gap: 8,
  },
  plusButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: DoctorsTheme.colors.textPrimary,
    backgroundColor: DoctorsTheme.colors.cardBg,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 44,
  },
  micButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: DoctorsTheme.colors.apolloOrange,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Main Assistant Screen
export default function DoctorAssistant() {
  return (
    <View style={styles.container}>
      <AssistantHeader />
      <DiscoveryBanner />

      <View style={styles.content}>
        <GreetingSection />
        <SuggestionChips />
        <View style={styles.spacer} />
        <TryAskingSection />
      </View>

      <ChatInputBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DoctorsTheme.colors.white,
  },
  content: {
    flex: 1,
    paddingBottom: 8,
  },
  spacer: {
    flex: 1,
  },
});
