/**
 * ============================================================================
 * AI ASSISTANT TAB - PREMIUM AI HEALTH COMPANION
 * ============================================================================
 * AI Health Assistant with chat interface, quick actions, symptom checker,
 * health Q&A, personalized suggestions, voice input, medical encyclopedia,
 * emergency assistance, wellness coach, and smart notifications.
 * ============================================================================
 */

import React, { useState, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = {
  primary: '#1565C0',
  primaryLight: '#42A5F5',
  primaryDark: '#0D47A1',
  accent: '#FF6B35',
  green: '#00A651',
  red: '#E74C3C',
  purple: '#7B1FA2',
  orange: '#FF9800',
  teal: '#00897B',
  white: '#FFFFFF',
  background: '#F0F4F8',
  textPrimary: '#1A1A2E',
  textSecondary: '#4A4A6A',
  textTertiary: '#8888A8',
  textMuted: '#AAAACC',
  border: '#E0E4EA',
  divider: '#EBEBF5',
  aiBubble: '#E3F2FD',
  userBubble: '#1565C0',
  shadow: 'rgba(21, 101, 192, 0.12)',
};

/* ==================== HEADER ==================== */
const AssistantHeader = React.memo(() => {
  return (
    <LinearGradient colors={['#0D47A1', '#1565C0', '#1976D2']} style={styles.header}>
      <SafeAreaView>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.headerAvatarContainer}>
              <View style={styles.headerAvatar}>
                <Ionicons name="sparkles" size={22} color="#FFD700" />
              </View>
              <View style={styles.headerOnlineDot} />
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>Apollo AI Assistant</Text>
              <View style={styles.headerStatusRow}>
                <View style={styles.headerStatusDot} />
                <Text style={styles.headerSubtitle}>Online - Ready to help</Text>
              </View>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerActionButton}>
              <Ionicons name="call" size={20} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerActionButton}>
              <Ionicons name="ellipsis-vertical" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
});

/* ==================== WELCOME BANNER ==================== */
const WelcomeBanner = React.memo(() => {
  return (
    <View style={styles.welcomeBanner}>
      <View style={styles.welcomeCard}>
        <LinearGradient colors={['#E3F2FD', '#BBDEFB']} style={styles.welcomeGradient}>
          <View style={styles.welcomeIconContainer}>
            <Ionicons name="medical" size={36} color={COLORS.primary} />
          </View>
          <Text style={styles.welcomeTitle}>Hello, Ganpati! 👋</Text>
          <Text style={styles.welcomeDesc}>I'm your AI Health Assistant powered by Apollo 24|7. I can help you with health queries, symptom analysis, medication info, and wellness tips.</Text>
          <View style={styles.welcomeCapabilities}>
            {['Symptom Analysis', 'Medicine Info', 'Diet Plans', 'Lab Reports'].map((cap) => (
              <View key={cap} style={styles.welcomeCapBadge}>
                <Ionicons name="checkmark-circle" size={14} color={COLORS.primary} />
                <Text style={styles.welcomeCapText}>{cap}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>
      </View>
    </View>
  );
});

/* ==================== QUICK ACTIONS ==================== */
const QuickActions = React.memo(() => {
  const actions = useMemo(() => [
    { id: '1', label: 'Symptom\nChecker', icon: 'body', color: '#E74C3C', bgColor: '#FFEBEE' },
    { id: '2', label: 'Medicine\nInfo', icon: 'medical', color: '#2196F3', bgColor: '#E3F2FD' },
    { id: '3', label: 'Diet\nPlanner', icon: 'nutrition', color: '#4CAF50', bgColor: '#E8F5E9' },
    { id: '4', label: 'Lab Report\nAnalysis', icon: 'document-text', color: '#9C27B0', bgColor: '#F3E5F5' },
    { id: '5', label: 'Mental\nWellness', icon: 'happy', color: '#FF9800', bgColor: '#FFF3E0' },
    { id: '6', label: 'Emergency\nHelp', icon: 'alert-circle', color: '#F44336', bgColor: '#FFEBEE' },
    { id: '7', label: 'Exercise\nGuide', icon: 'fitness', color: '#00BCD4', bgColor: '#E0F7FA' },
    { id: '8', label: 'Sleep\nCoach', icon: 'moon', color: '#3F51B5', bgColor: '#E8EAF6' },
  ], []);

  return (
    <View style={styles.quickActionsSection}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsGrid}>
        {actions.map((action) => (
          <TouchableOpacity key={action.id} style={[styles.quickActionCard, { backgroundColor: action.bgColor }]} activeOpacity={0.7}>
            <View style={[styles.quickActionIconBg, { backgroundColor: action.color + '20' }]}>
              <Ionicons name={action.icon} size={24} color={action.color} />
            </View>
            <Text style={styles.quickActionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});

/* ==================== CHAT MESSAGES ==================== */
const ChatMessages = React.memo(() => {
  const messages = useMemo(() => [
    { id: '1', type: 'ai', text: 'Good morning, Ganpati! Based on your recent health data, I have a few observations to share with you.', time: '9:00 AM', avatar: 'sparkles' },
    { id: '2', type: 'ai', text: 'Your blood pressure has been stable this week at 120/80 mmHg. Great job maintaining it! Keep up with your current medication schedule.', time: '9:00 AM', avatar: 'sparkles' },
    { id: '3', type: 'user', text: 'Thanks! I have been feeling some mild headaches in the afternoon. Should I be concerned?', time: '9:05 AM' },
    { id: '4', type: 'ai', text: 'Afternoon headaches can have several causes. Let me ask you a few questions:\n\n1. How much water are you drinking daily?\n2. Are you getting enough sleep (7-8 hours)?\n3. How long have you been experiencing these headaches?\n4. Is the pain on one side or both sides?\n\nBased on your profile, mild dehydration or screen-related strain could be likely causes. However, since you are on Amlodipine, we should monitor this closely.', time: '9:06 AM', avatar: 'sparkles' },
    { id: '5', type: 'user', text: 'I drink about 4-5 glasses of water. Sleep is around 6 hours. Headaches started about a week ago, both sides.', time: '9:10 AM' },
    { id: '6', type: 'ai', text: 'Thank you for the details. Here are my recommendations:\n\n💧 **Hydration**: Increase to 8-10 glasses daily. Dehydration is a common headache trigger.\n\n😴 **Sleep**: Try to get 7-8 hours. Your sleep analysis shows an average of 6.2 hours this week.\n\n💊 **Medication**: Continue Amlodipine as prescribed. The headaches don\'t appear to be blood pressure related.\n\n⚠️ **Action Items**:\n• Set water reminders every 2 hours\n• Reduce screen time 1 hour before bed\n• If headaches persist beyond 2 weeks, book a consultation\n\nWould you like me to set up these reminders for you?', time: '9:12 AM', avatar: 'sparkles' },
  ], []);

  return (
    <View style={styles.chatSection}>
      <View style={styles.chatSectionHeader}>
        <Text style={styles.sectionTitle}>Recent Conversation</Text>
        <TouchableOpacity><Text style={styles.sectionViewAll}>View All</Text></TouchableOpacity>
      </View>
      <View style={styles.chatContainer}>
        {messages.map((msg) => (
          <View key={msg.id} style={[styles.messageRow, msg.type === 'user' && styles.messageRowUser]}>
            {msg.type === 'ai' && (
              <View style={styles.aiAvatarSmall}>
                <Ionicons name={msg.avatar} size={16} color={COLORS.primary} />
              </View>
            )}
            <View style={[styles.messageBubble, msg.type === 'user' ? styles.userBubble : styles.aiBubbleStyle]}>
              <Text style={[styles.messageText, msg.type === 'user' && styles.userMessageText]}>{msg.text}</Text>
              <Text style={[styles.messageTime, msg.type === 'user' && styles.userMessageTime]}>{msg.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
});

/* ==================== SYMPTOM CHECKER ==================== */
const SymptomChecker = React.memo(() => {
  const commonSymptoms = useMemo(() => [
    { id: '1', name: 'Headache', icon: 'head-outline', color: '#E74C3C' },
    { id: '2', name: 'Fever', icon: 'thermometer', color: '#FF9800' },
    { id: '3', name: 'Fatigue', icon: 'battery-dead', color: '#9C27B0' },
    { id: '4', name: 'Cough', icon: 'cloud', color: '#2196F3' },
    { id: '5', name: 'Body Pain', icon: 'body', color: '#F44336' },
    { id: '6', name: 'Nausea', icon: 'alert-circle', color: '#4CAF50' },
    { id: '7', name: 'Dizziness', icon: 'sync', color: '#FF5722' },
    { id: '8', name: 'Chest Pain', icon: 'heart', color: '#E91E63' },
    { id: '9', name: 'Breathlessness', icon: 'cloud', color: '#00BCD4' },
    { id: '10', name: 'Stomach Ache', icon: 'alert', color: '#795548' },
  ], []);

  return (
    <View style={styles.symptomSection}>
      <Text style={styles.sectionTitle}>Symptom Checker</Text>
      <View style={styles.symptomCard}>
        <Text style={styles.symptomCardTitle}>Select your symptoms for AI analysis</Text>
        <Text style={styles.symptomCardDesc}>Our AI will analyze your symptoms and provide preliminary guidance. This is not a substitute for professional medical advice.</Text>
        <View style={styles.symptomGrid}>
          {commonSymptoms.map((symptom) => (
            <TouchableOpacity key={symptom.id} style={styles.symptomChip} activeOpacity={0.7}>
              <Ionicons name={symptom.icon || 'ellipse'} size={16} color={symptom.color} />
              <Text style={styles.symptomChipText}>{symptom.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.symptomAnalyzeButton}>
          <Ionicons name="search" size={18} color={COLORS.white} />
          <Text style={styles.symptomAnalyzeText}>Analyze Symptoms</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

/* ==================== HEALTH Q&A ==================== */
const HealthQA = React.memo(() => {
  const faqs = useMemo(() => [
    { id: '1', question: 'What foods help lower blood pressure?', answer: 'Foods rich in potassium (bananas, spinach), low-sodium foods, whole grains, berries, and fish with omega-3 fatty acids can help manage blood pressure naturally.', category: 'Diet' },
    { id: '2', question: 'How does Metformin work for diabetes?', answer: 'Metformin reduces glucose production in the liver and improves insulin sensitivity. It is the most commonly prescribed first-line medication for type 2 diabetes.', category: 'Medicine' },
    { id: '3', question: 'When should I get a full body checkup?', answer: 'Adults over 30 should get annual comprehensive health checkups. Those with chronic conditions or family history of diseases should consider more frequent screenings.', category: 'Preventive' },
    { id: '4', question: 'How to improve sleep quality?', answer: 'Maintain a consistent schedule, avoid screens 1hr before bed, keep the room cool and dark, limit caffeine after 2 PM, and practice relaxation techniques.', category: 'Wellness' },
    { id: '5', question: 'What are normal blood sugar levels?', answer: 'Fasting: 70-100 mg/dL, Post-meal (2hrs): below 140 mg/dL, HbA1c: below 5.7%. Values above these ranges may indicate prediabetes or diabetes.', category: 'Vitals' },
  ], []);

  const [expandedId, setExpandedId] = useState(null);

  return (
    <View style={styles.qaSection}>
      <View style={styles.qaSectionHeader}>
        <Text style={styles.sectionTitle}>Health Q&A</Text>
        <TouchableOpacity><Text style={styles.sectionViewAll}>Ask More</Text></TouchableOpacity>
      </View>
      {faqs.map((faq) => (
        <TouchableOpacity key={faq.id} style={styles.qaCard} onPress={() => setExpandedId(expandedId === faq.id ? null : faq.id)} activeOpacity={0.7}>
          <View style={styles.qaCardTop}>
            <View style={styles.qaIconBg}>
              <Ionicons name="help-circle" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.qaCardInfo}>
              <Text style={styles.qaQuestion}>{faq.question}</Text>
              <View style={styles.qaCategoryBadge}>
                <Text style={styles.qaCategoryText}>{faq.category}</Text>
              </View>
            </View>
            <Ionicons name={expandedId === faq.id ? 'chevron-up' : 'chevron-down'} size={20} color={COLORS.textTertiary} />
          </View>
          {expandedId === faq.id && (
            <View style={styles.qaAnswer}>
              <View style={styles.qaAnswerDivider} />
              <View style={styles.qaAnswerContent}>
                <Ionicons name="sparkles" size={16} color={COLORS.primary} />
                <Text style={styles.qaAnswerText}>{faq.answer}</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
});

/* ==================== SUGGESTED QUESTIONS ==================== */
const SuggestedQuestions = React.memo(() => {
  const suggestions = useMemo(() => [
    { id: '1', text: 'What are the side effects of Atorvastatin?', icon: 'medical', color: '#E74C3C' },
    { id: '2', text: 'Can I exercise with high blood pressure?', icon: 'fitness', color: '#2196F3' },
    { id: '3', text: 'Best diet plan for managing diabetes', icon: 'nutrition', color: '#4CAF50' },
    { id: '4', text: 'How to reduce cholesterol naturally?', icon: 'heart', color: '#FF9800' },
    { id: '5', text: 'What vaccines do I need at my age?', icon: 'shield', color: '#9C27B0' },
    { id: '6', text: 'Signs I should see a doctor immediately', icon: 'alert-circle', color: '#F44336' },
  ], []);

  return (
    <View style={styles.suggestionsSection}>
      <Text style={styles.sectionTitle}>Suggested Questions</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionsScrollContent}>
        {suggestions.map((suggestion) => (
          <TouchableOpacity key={suggestion.id} style={styles.suggestionCard} activeOpacity={0.7}>
            <View style={[styles.suggestionIconBg, { backgroundColor: suggestion.color + '15' }]}>
              <Ionicons name={suggestion.icon} size={20} color={suggestion.color} />
            </View>
            <Text style={styles.suggestionText}>{suggestion.text}</Text>
            <Ionicons name="arrow-forward-circle" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
});

/* ==================== MEDICAL ENCYCLOPEDIA ==================== */
const MedicalEncyclopedia = React.memo(() => {
  const topics = useMemo(() => [
    { id: '1', title: 'Hypertension', subtitle: 'Understanding blood pressure', icon: 'heart', color: '#E74C3C', articles: 24 },
    { id: '2', title: 'Type 2 Diabetes', subtitle: 'Management & lifestyle', icon: 'water', color: '#2196F3', articles: 32 },
    { id: '3', title: 'Cholesterol', subtitle: 'Good vs bad cholesterol', icon: 'analytics', color: '#FF9800', articles: 18 },
    { id: '4', title: 'Mental Health', subtitle: 'Anxiety, stress & depression', icon: 'happy', color: '#9C27B0', articles: 28 },
    { id: '5', title: 'Nutrition', subtitle: 'Balanced diet essentials', icon: 'nutrition', color: '#4CAF50', articles: 45 },
    { id: '6', title: 'Sleep Health', subtitle: 'Better sleep habits', icon: 'moon', color: '#3F51B5', articles: 15 },
  ], []);

  return (
    <View style={styles.encyclopediaSection}>
      <View style={styles.encyclopediaSectionHeader}>
        <Text style={styles.sectionTitle}>Medical Encyclopedia</Text>
        <TouchableOpacity><Text style={styles.sectionViewAll}>Browse All</Text></TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.encyclopediaScrollContent}>
        {topics.map((topic) => (
          <TouchableOpacity key={topic.id} style={styles.encyclopediaCard} activeOpacity={0.7}>
            <View style={[styles.encyclopediaIconBg, { backgroundColor: topic.color + '15' }]}>
              <Ionicons name={topic.icon} size={28} color={topic.color} />
            </View>
            <Text style={styles.encyclopediaTitle}>{topic.title}</Text>
            <Text style={styles.encyclopediaSubtitle}>{topic.subtitle}</Text>
            <View style={styles.encyclopediaArticlesBadge}>
              <Ionicons name="document-text" size={12} color={COLORS.textTertiary} />
              <Text style={styles.encyclopediaArticlesText}>{topic.articles} articles</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
});

/* ==================== WELLNESS COACH ==================== */
const WellnessCoach = React.memo(() => {
  const dailyTips = useMemo(() => [
    { id: '1', title: 'Morning Routine', tip: 'Start your day with a glass of warm water with lemon. It aids digestion and boosts metabolism.', icon: 'sunny', color: '#FF9800', time: 'Morning' },
    { id: '2', title: 'Midday Movement', tip: 'Take a 10-minute walk after lunch to improve digestion and maintain energy levels through the afternoon.', icon: 'walk', color: '#4CAF50', time: 'Afternoon' },
    { id: '3', title: 'Mindful Breathing', tip: 'Practice 4-7-8 breathing technique: Inhale 4 sec, hold 7 sec, exhale 8 sec. Do this 3 times when stressed.', icon: 'leaf', color: '#00BCD4', time: 'Anytime' },
    { id: '4', title: 'Evening Wind Down', tip: 'Dim lights 1 hour before bed. Read a physical book instead of using screens. Keep bedroom at 18-20°C.', icon: 'moon', color: '#3F51B5', time: 'Evening' },
  ], []);

  return (
    <View style={styles.wellnessSection}>
      <Text style={styles.sectionTitle}>Daily Wellness Tips</Text>
      {dailyTips.map((tip) => (
        <View key={tip.id} style={styles.wellnessCard}>
          <View style={[styles.wellnessTimeBadge, { backgroundColor: tip.color + '15' }]}>
            <Ionicons name={tip.icon} size={16} color={tip.color} />
            <Text style={[styles.wellnessTimeText, { color: tip.color }]}>{tip.time}</Text>
          </View>
          <Text style={styles.wellnessTipTitle}>{tip.title}</Text>
          <Text style={styles.wellnessTipText}>{tip.tip}</Text>
        </View>
      ))}
    </View>
  );
});

/* ==================== EMERGENCY SECTION ==================== */
const EmergencySection = React.memo(() => {
  return (
    <View style={styles.emergencySection}>
      <View style={styles.emergencyCard}>
        <LinearGradient colors={['#B71C1C', '#D32F2F']} style={styles.emergencyGradient}>
          <View style={styles.emergencyTop}>
            <View style={styles.emergencyIconContainer}>
              <Ionicons name="alert-circle" size={32} color={COLORS.white} />
            </View>
            <View style={styles.emergencyInfo}>
              <Text style={styles.emergencyTitle}>Emergency Assistance</Text>
              <Text style={styles.emergencyDesc}>For medical emergencies, call immediately. Our AI can guide you through first aid steps while help is on the way.</Text>
            </View>
          </View>
          <View style={styles.emergencyButtons}>
            <TouchableOpacity style={styles.emergencyCallButton}>
              <Ionicons name="call" size={20} color="#D32F2F" />
              <Text style={styles.emergencyCallText}>Call 108</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.emergencyFirstAidButton}>
              <Ionicons name="medkit" size={20} color={COLORS.white} />
              <Text style={styles.emergencyFirstAidText}>First Aid Guide</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
});

/* ==================== AI CAPABILITIES ==================== */
const AICapabilities = React.memo(() => {
  return (
    <View style={styles.capabilitiesSection}>
      <Text style={styles.sectionTitle}>What I Can Help With</Text>
      <View style={styles.capabilitiesCard}>
        <LinearGradient colors={['#0D47A1', '#1565C0']} style={styles.capabilitiesGradient}>
          {[
            { title: 'Symptom Analysis', desc: 'Describe your symptoms and get AI-powered preliminary assessment', icon: 'search', color: '#69F0AE' },
            { title: 'Medication Guide', desc: 'Get detailed information about medicines, dosages, and interactions', icon: 'medical', color: '#4DA6FF' },
            { title: 'Lab Report Interpretation', desc: 'Upload lab reports and understand what your results mean', icon: 'document-text', color: '#FFD93D' },
            { title: 'Diet & Nutrition Plans', desc: 'Personalized meal plans based on your health profile', icon: 'nutrition', color: '#FF8A65' },
            { title: 'Mental Health Support', desc: 'Guided meditation, breathing exercises, and stress management', icon: 'happy', color: '#CE93D8' },
            { title: 'Doctor Recommendations', desc: 'Find the right specialist based on your symptoms and needs', icon: 'person', color: '#80DEEA' },
          ].map((item) => (
            <View key={item.title} style={styles.capabilityItem}>
              <View style={styles.capabilityIconBg}>
                <Ionicons name={item.icon} size={20} color={item.color} />
              </View>
              <View style={styles.capabilityInfo}>
                <Text style={styles.capabilityTitle}>{item.title}</Text>
                <Text style={styles.capabilityDesc}>{item.desc}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.4)" />
            </View>
          ))}
        </LinearGradient>
      </View>
    </View>
  );
});

/* ==================== CHAT INPUT BAR ==================== */
const ChatInputBar = React.memo(() => {
  const [message, setMessage] = useState('');

  return (
    <View style={styles.chatInputContainer}>
      <View style={styles.chatInputBar}>
        <TouchableOpacity style={styles.chatAttachButton}>
          <Ionicons name="attach" size={22} color={COLORS.textTertiary} />
        </TouchableOpacity>
        <TextInput
          style={styles.chatInput}
          placeholder="Ask anything about your health..."
          placeholderTextColor={COLORS.textMuted}
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={500}
        />
        <TouchableOpacity style={styles.chatVoiceButton}>
          <Ionicons name="mic" size={22} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.chatSendButton, message.trim() && styles.chatSendButtonActive]}>
          <Ionicons name="send" size={18} color={message.trim() ? COLORS.white : COLORS.textMuted} />
        </TouchableOpacity>
      </View>
      <Text style={styles.chatDisclaimer}>AI responses are for informational purposes only. Always consult a doctor for medical decisions.</Text>
    </View>
  );
});

/* ==================== FOOTER ==================== */
const AssistantFooter = React.memo(() => {
  return (
    <View style={styles.footer}>
      <View style={styles.footerDivider} />
      <Text style={styles.footerBrand}>Apollo 24|7 AI Assistant</Text>
      <Text style={styles.footerDesc}>Your AI-powered health companion</Text>
      <View style={styles.footerBadges}>
        <View style={styles.footerBadge}><Ionicons name="sparkles" size={14} color={COLORS.primary} /><Text style={styles.footerBadgeText}>AI Powered</Text></View>
        <View style={styles.footerBadge}><Ionicons name="lock-closed" size={14} color={COLORS.green} /><Text style={styles.footerBadgeText}>HIPAA Compliant</Text></View>
        <View style={styles.footerBadge}><Ionicons name="shield-checkmark" size={14} color={COLORS.purple} /><Text style={styles.footerBadgeText}>Doctor Verified</Text></View>
      </View>
    </View>
  );
});

/* ==================== MAIN COMPONENT ==================== */
export default function HealthAssistant() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />
      <AssistantHeader />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} bounces={true} contentContainerStyle={styles.scrollContent}>
        <WelcomeBanner />
        <QuickActions />
        <ChatMessages />
        <SuggestedQuestions />
        <SymptomChecker />
        <HealthQA />
        <MedicalEncyclopedia />
        <WellnessCoach />
        <AICapabilities />
        <EmergencySection />
        <AssistantFooter />
        <View style={{ height: 80 }} />
      </ScrollView>
      <ChatInputBar />
    </View>
  );
}

/* ==================== STYLES ==================== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 20 },
  header: { paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight || 0 },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  headerAvatarContainer: { position: 'relative', marginRight: 12 },
  headerAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
  headerOnlineDot: { position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: 6, backgroundColor: '#4CAF50', borderWidth: 2, borderColor: '#0D47A1' },
  headerInfo: { flex: 1 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.white },
  headerStatusRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  headerStatusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#69F0AE' },
  headerSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.7)' },
  headerActions: { flexDirection: 'row', gap: 12 },
  headerActionButton: { padding: 8 },
  welcomeBanner: { paddingHorizontal: 20, marginTop: 16 },
  welcomeCard: { borderRadius: 20, overflow: 'hidden' },
  welcomeGradient: { padding: 24, alignItems: 'center' },
  welcomeIconContainer: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(21,101,192,0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  welcomeTitle: { fontSize: 20, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 8 },
  welcomeDesc: { fontSize: 13, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 20, marginBottom: 16 },
  welcomeCapabilities: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 },
  welcomeCapBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(21,101,192,0.08)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 4 },
  welcomeCapText: { fontSize: 12, fontWeight: '600', color: COLORS.primary },
  quickActionsSection: { marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, paddingHorizontal: 20, marginBottom: 16 },
  quickActionsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 10 },
  quickActionCard: { width: (SCREEN_WIDTH - 50) / 4, borderRadius: 14, padding: 12, alignItems: 'center' },
  quickActionIconBg: { width: 42, height: 42, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  quickActionLabel: { fontSize: 10, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center', lineHeight: 14 },
  chatSection: { marginTop: 24 },
  chatSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  sectionViewAll: { fontSize: 14, fontWeight: '600', color: COLORS.primary },
  chatContainer: { paddingHorizontal: 16 },
  messageRow: { flexDirection: 'row', marginBottom: 12, alignItems: 'flex-end' },
  messageRowUser: { justifyContent: 'flex-end' },
  aiAvatarSmall: { width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.aiBubble, justifyContent: 'center', alignItems: 'center', marginRight: 8, marginBottom: 4 },
  messageBubble: { maxWidth: '78%', borderRadius: 16, padding: 14 },
  aiBubbleStyle: { backgroundColor: COLORS.white, borderBottomLeftRadius: 4, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 6, elevation: 2 },
  userBubble: { backgroundColor: COLORS.userBubble, borderBottomRightRadius: 4 },
  messageText: { fontSize: 13, color: COLORS.textPrimary, lineHeight: 20 },
  userMessageText: { color: COLORS.white },
  messageTime: { fontSize: 10, color: COLORS.textMuted, marginTop: 6, alignSelf: 'flex-end' },
  userMessageTime: { color: 'rgba(255,255,255,0.6)' },
  suggestionsSection: { marginTop: 24 },
  suggestionsScrollContent: { paddingHorizontal: 20, gap: 12 },
  suggestionCard: { width: 200, backgroundColor: COLORS.white, borderRadius: 14, padding: 14, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 3 },
  suggestionIconBg: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  suggestionText: { fontSize: 12, fontWeight: '500', color: COLORS.textPrimary, lineHeight: 18, marginBottom: 8, flex: 1 },
  symptomSection: { marginTop: 28 },
  symptomCard: { backgroundColor: COLORS.white, marginHorizontal: 20, borderRadius: 18, padding: 20, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 12, elevation: 4 },
  symptomCardTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 6 },
  symptomCardDesc: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 18, marginBottom: 16 },
  symptomGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  symptomChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F7FA', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, gap: 6, borderWidth: 1, borderColor: COLORS.border },
  symptomChipText: { fontSize: 12, fontWeight: '500', color: COLORS.textPrimary },
  symptomAnalyzeButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary, borderRadius: 12, paddingVertical: 14, gap: 8 },
  symptomAnalyzeText: { fontSize: 15, fontWeight: '700', color: COLORS.white },
  qaSection: { marginTop: 28 },
  qaSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  qaCard: { backgroundColor: COLORS.white, marginHorizontal: 20, marginBottom: 10, borderRadius: 14, padding: 14, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 6, elevation: 2 },
  qaCardTop: { flexDirection: 'row', alignItems: 'center' },
  qaIconBg: { width: 36, height: 36, borderRadius: 10, backgroundColor: COLORS.aiBubble, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  qaCardInfo: { flex: 1 },
  qaQuestion: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 4 },
  qaCategoryBadge: { backgroundColor: COLORS.primary + '10', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, alignSelf: 'flex-start' },
  qaCategoryText: { fontSize: 10, fontWeight: '600', color: COLORS.primary },
  qaAnswer: { marginTop: 12 },
  qaAnswerDivider: { height: 1, backgroundColor: COLORS.divider, marginBottom: 12 },
  qaAnswerContent: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  qaAnswerText: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 20, flex: 1 },
  encyclopediaSection: { marginTop: 28 },
  encyclopediaSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  encyclopediaScrollContent: { paddingHorizontal: 20, gap: 12 },
  encyclopediaCard: { width: 150, backgroundColor: COLORS.white, borderRadius: 16, padding: 16, alignItems: 'center', shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 12, elevation: 4 },
  encyclopediaIconBg: { width: 52, height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  encyclopediaTitle: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 4 },
  encyclopediaSubtitle: { fontSize: 11, color: COLORS.textTertiary, textAlign: 'center', marginBottom: 8 },
  encyclopediaArticlesBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  encyclopediaArticlesText: { fontSize: 10, color: COLORS.textTertiary },
  wellnessSection: { marginTop: 28 },
  wellnessCard: { backgroundColor: COLORS.white, marginHorizontal: 20, marginBottom: 10, borderRadius: 14, padding: 16, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 6, elevation: 2 },
  wellnessTimeBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, gap: 4, alignSelf: 'flex-start', marginBottom: 8 },
  wellnessTimeText: { fontSize: 11, fontWeight: '600' },
  wellnessTipTitle: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 4 },
  wellnessTipText: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 18 },
  emergencySection: { marginTop: 28, paddingHorizontal: 20 },
  emergencyCard: { borderRadius: 20, overflow: 'hidden' },
  emergencyGradient: { padding: 24 },
  emergencyTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  emergencyIconContainer: { width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  emergencyInfo: { flex: 1 },
  emergencyTitle: { fontSize: 18, fontWeight: '700', color: COLORS.white, marginBottom: 4 },
  emergencyDesc: { fontSize: 12, color: 'rgba(255,255,255,0.8)', lineHeight: 18 },
  emergencyButtons: { flexDirection: 'row', gap: 12 },
  emergencyCallButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.white, borderRadius: 12, paddingVertical: 12, gap: 6 },
  emergencyCallText: { fontSize: 14, fontWeight: '700', color: '#D32F2F' },
  emergencyFirstAidButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, paddingVertical: 12, gap: 6 },
  emergencyFirstAidText: { fontSize: 14, fontWeight: '700', color: COLORS.white },
  capabilitiesSection: { marginTop: 28, paddingHorizontal: 20 },
  capabilitiesCard: { borderRadius: 20, overflow: 'hidden', marginTop: 16 },
  capabilitiesGradient: { padding: 20 },
  capabilityItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 12 },
  capabilityIconBg: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  capabilityInfo: { flex: 1 },
  capabilityTitle: { fontSize: 14, fontWeight: '600', color: COLORS.white, marginBottom: 2 },
  capabilityDesc: { fontSize: 11, color: 'rgba(255,255,255,0.6)', lineHeight: 16 },
  chatInputContainer: { backgroundColor: COLORS.white, borderTopWidth: 1, borderTopColor: COLORS.border, paddingHorizontal: 16, paddingVertical: 10 },
  chatInputBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F7FA', borderRadius: 24, paddingHorizontal: 8, paddingVertical: 6, gap: 4 },
  chatAttachButton: { padding: 8 },
  chatInput: { flex: 1, fontSize: 14, color: COLORS.textPrimary, paddingVertical: 6, paddingHorizontal: 8, maxHeight: 80 },
  chatVoiceButton: { padding: 8 },
  chatSendButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#E0E0E8', justifyContent: 'center', alignItems: 'center' },
  chatSendButtonActive: { backgroundColor: COLORS.primary },
  chatDisclaimer: { fontSize: 9, color: COLORS.textMuted, textAlign: 'center', marginTop: 6 },
  footer: { alignItems: 'center', paddingVertical: 32, marginTop: 20 },
  footerDivider: { width: 60, height: 3, backgroundColor: COLORS.primary, borderRadius: 2, marginBottom: 16 },
  footerBrand: { fontSize: 16, fontWeight: '700', color: COLORS.primary },
  footerDesc: { fontSize: 12, color: COLORS.textTertiary, marginTop: 4 },
  footerBadges: { flexDirection: 'row', gap: 12, marginTop: 12 },
  footerBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  footerBadgeText: { fontSize: 10, color: COLORS.textTertiary, fontWeight: '500' },
});
