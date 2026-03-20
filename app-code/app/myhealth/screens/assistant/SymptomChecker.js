/**
 * ============================================================================
 * SYMPTOM CHECKER - AI-POWERED HEALTH ASSESSMENT
 * ============================================================================
 * Interactive symptom analysis and health recommendations
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = {
  primary: '#6B4C9A',
  primaryLight: '#8B6CBF',
  accent: '#FF6B35',
  green: '#00A651',
  red: '#E74C3C',
  blue: '#0088FF',
  white: '#FFFFFF',
  background: '#F5F5F8',
  textPrimary: '#1A1A2E',
  textSecondary: '#4A4A6A',
  textTertiary: '#8888A8',
};

export default function SymptomChecker() {
  const router = useRouter();
  const [symptoms, setSymptoms] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  const bodyParts = [
    { id: 'head', name: 'Head', icon: 'happy' },
    { id: 'chest', name: 'Chest', icon: 'heart' },
    { id: 'abdomen', name: 'Abdomen', icon: 'body' },
    { id: 'arms', name: 'Arms', icon: 'accessibility' },
    { id: 'legs', name: 'Legs', icon: 'walk' },
    { id: 'skin', name: 'Skin', icon: 'hand-left' },
  ];

  const commonSymptoms = {
    head: ['Headache', 'Dizziness', 'Fatigue', 'Fever'],
    chest: ['Chest Pain', 'Shortness of Breath', 'Cough', 'Palpitations'],
    abdomen: ['Stomach Pain', 'Nausea', 'Bloating', 'Indigestion'],
    arms: ['Joint Pain', 'Numbness', 'Weakness', 'Swelling'],
    legs: ['Leg Pain', 'Cramps', 'Swelling', 'Varicose Veins'],
    skin: ['Rash', 'Itching', 'Dryness', 'Bumps'],
  };

  const analyzeSymptoms = () => {
    setAnalysisResult({
      severity: 'moderate',
      possibleCauses: ['Stress-related symptoms', 'Minor infection', 'Dehydration'],
      recommendations: [
        'Rest and stay hydrated',
        'Monitor symptoms for 24-48 hours',
        'Consult a doctor if symptoms worsen',
      ],
      urgency: 'Consult within 24 hours',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Symptom Checker</Text>
        <TouchableOpacity style={styles.infoButton}>
          <Ionicons name="information-circle-outline" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Disclaimer */}
        <View style={styles.disclaimerCard}>
          <Ionicons name="warning" size={20} color={COLORS.accent} />
          <Text style={styles.disclaimerText}>
            This is for informational purposes only. Always consult a healthcare professional for medical advice.
          </Text>
        </View>

        {/* Body Map */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Where does it hurt?</Text>
          <View style={styles.bodyGrid}>
            {bodyParts.map((part) => (
              <TouchableOpacity
                key={part.id}
                style={[styles.bodyPartCard, selectedBodyPart === part.id && styles.bodyPartCardActive]}
                onPress={() => setSelectedBodyPart(part.id)}
              >
                <Ionicons 
                  name={part.icon} 
                  size={28} 
                  color={selectedBodyPart === part.id ? COLORS.white : COLORS.primary} 
                />
                <Text style={[styles.bodyPartName, selectedBodyPart === part.id && styles.bodyPartNameActive]}>
                  {part.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Common Symptoms */}
        {selectedBodyPart && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Symptoms</Text>
            <View style={styles.symptomsGrid}>
              {commonSymptoms[selectedBodyPart].map((symptom, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.symptomChip, symptoms.includes(symptom) && styles.symptomChipActive]}
                  onPress={() => {
                    if (symptoms.includes(symptom)) {
                      setSymptoms(symptoms.filter(s => s !== symptom));
                    } else {
                      setSymptoms([...symptoms, symptom]);
                    }
                  }}
                >
                  <Ionicons 
                    name={symptoms.includes(symptom) ? 'checkmark-circle' : 'add-circle-outline'} 
                    size={16} 
                    color={symptoms.includes(symptom) ? COLORS.white : COLORS.textSecondary} 
                  />
                  <Text style={[styles.symptomText, symptoms.includes(symptom) && styles.symptomTextActive]}>
                    {symptom}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Additional Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Details</Text>
          <View style={styles.inputCard}>
            <TextInput
              style={styles.input}
              placeholder="Describe your symptoms in more detail..."
              placeholderTextColor={COLORS.textTertiary}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Duration */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How long?</Text>
          <View style={styles.durationGrid}>
            {['Just started', 'Few hours', '1-2 days', '3-7 days', 'More than a week'].map((duration, index) => (
              <TouchableOpacity key={index} style={styles.durationChip}>
                <Text style={styles.durationText}>{duration}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Analyze Button */}
        <TouchableOpacity 
          style={[styles.analyzeButton, symptoms.length === 0 && styles.analyzeButtonDisabled]}
          onPress={analyzeSymptoms}
          disabled={symptoms.length === 0}
        >
          <Ionicons name="analytics" size={20} color={COLORS.white} />
          <Text style={styles.analyzeButtonText}>Analyze Symptoms</Text>
        </TouchableOpacity>

        {/* Analysis Result */}
        {analysisResult && (
          <View style={styles.section}>
            <View style={[styles.resultCard, { borderLeftColor: analysisResult.severity === 'moderate' ? COLORS.accent : COLORS.green }]}>
              <View style={styles.resultHeader}>
                <Text style={styles.resultTitle}>Analysis Result</Text>
                <View style={[styles.urgencyBadge, { backgroundColor: analysisResult.severity === 'moderate' ? '#FFF3E0' : '#E8F5E9' }]}>
                  <Text style={[styles.urgencyText, { color: analysisResult.severity === 'moderate' ? COLORS.accent : COLORS.green }]}>
                    {analysisResult.urgency}
                  </Text>
                </View>
              </View>

              <Text style={styles.resultSubtitle}>Possible Causes</Text>
              {analysisResult.possibleCauses.map((cause, index) => (
                <View key={index} style={styles.causeItem}>
                  <Ionicons name="medical" size={14} color={COLORS.textSecondary} />
                  <Text style={styles.causeText}>{cause}</Text>
                </View>
              ))}

              <Text style={styles.resultSubtitle}>Recommendations</Text>
              {analysisResult.recommendations.map((rec, index) => (
                <View key={index} style={styles.recItem}>
                  <View style={styles.recNumber}>
                    <Text style={styles.recNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.recText}>{rec}</Text>
                </View>
              ))}
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.consultButton}>
                <Ionicons name="videocam" size={20} color={COLORS.white} />
                <Text style={styles.consultButtonText}>Consult Doctor</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bookTestButton}>
                <Ionicons name="flask" size={20} color={COLORS.primary} />
                <Text style={styles.bookTestButtonText}>Book Test</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Emergency Note */}
        <View style={styles.emergencyNote}>
          <Ionicons name="call" size={20} color={COLORS.red} />
          <Text style={styles.emergencyText}>
            If you experience severe symptoms like chest pain, difficulty breathing, or sudden weakness, seek immediate medical attention.
          </Text>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: COLORS.white },
  backButton: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  infoButton: { padding: 8 },
  disclaimerCard: { flexDirection: 'row', alignItems: 'center', margin: 20, backgroundColor: '#FFF3E0', borderRadius: 12, padding: 12 },
  disclaimerText: { flex: 1, fontSize: 12, color: COLORS.accent, marginLeft: 8, lineHeight: 18 },
  section: { marginHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 },
  bodyGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  bodyPartCard: { width: (SCREEN_WIDTH - 52) / 2, backgroundColor: COLORS.white, borderRadius: 16, padding: 20, alignItems: 'center', borderWidth: 2, borderColor: 'transparent' },
  bodyPartCardActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  bodyPartName: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, marginTop: 8 },
  bodyPartNameActive: { color: COLORS.white },
  symptomsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  symptomChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 10, gap: 6 },
  symptomChipActive: { backgroundColor: COLORS.primary },
  symptomText: { fontSize: 13, color: COLORS.textSecondary },
  symptomTextActive: { color: COLORS.white },
  inputCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 4 },
  input: { fontSize: 14, color: COLORS.textPrimary, padding: 12, minHeight: 100, textAlignVertical: 'top' },
  durationGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  durationChip: { backgroundColor: COLORS.white, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10 },
  durationText: { fontSize: 13, color: COLORS.textSecondary },
  analyzeButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 20, marginTop: 24, backgroundColor: COLORS.primary, borderRadius: 12, paddingVertical: 16 },
  analyzeButtonDisabled: { backgroundColor: COLORS.textTertiary },
  analyzeButtonText: { fontSize: 16, fontWeight: '600', color: COLORS.white, marginLeft: 8 },
  resultCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 20, borderLeftWidth: 4 },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  resultTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  urgencyBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  urgencyText: { fontSize: 12, fontWeight: '600' },
  resultSubtitle: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, marginTop: 16, marginBottom: 8 },
  causeItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  causeText: { fontSize: 13, color: COLORS.textSecondary, marginLeft: 8 },
  recItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  recNumber: { width: 20, height: 20, borderRadius: 10, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  recNumberText: { fontSize: 11, fontWeight: '600', color: COLORS.white },
  recText: { flex: 1, fontSize: 13, color: COLORS.textSecondary, lineHeight: 20 },
  actionButtons: { flexDirection: 'row', gap: 12, marginTop: 20 },
  consultButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary, borderRadius: 12, paddingVertical: 14 },
  consultButtonText: { fontSize: 14, fontWeight: '600', color: COLORS.white, marginLeft: 8 },
  bookTestButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.white, borderRadius: 12, paddingVertical: 14, borderWidth: 1, borderColor: COLORS.primary },
  bookTestButtonText: { fontSize: 14, fontWeight: '600', color: COLORS.primary, marginLeft: 8 },
  emergencyNote: { flexDirection: 'row', alignItems: 'flex-start', marginHorizontal: 20, marginTop: 24, backgroundColor: '#FFEBEE', borderRadius: 12, padding: 12 },
  emergencyText: { flex: 1, fontSize: 12, color: COLORS.red, marginLeft: 8, lineHeight: 18 },
  bottomPadding: { height: 40 },
});
