/**
 * ============================================================================
 * MY MEDS TAB - PREMIUM MEDICATION MANAGEMENT
 * ============================================================================
 * Your Medications page with user profile, survey, medication list, add meds,
 * reminders, drug interactions, refill tracking, pharmacy finder, pill
 * identifier, medication history, family meds, dosage calculator, side effects
 * tracker, and help section.
 * ============================================================================
 */

import React, { useState, useCallback, useMemo } from 'react';
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
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = {
  primary: '#E74C3C',
  primaryLight: '#FF6B6B',
  primaryDark: '#C0392B',
  accent: '#FF6B35',
  green: '#27AE60',
  blue: '#2980B9',
  purple: '#8E44AD',
  orange: '#F39C12',
  teal: '#1ABC9C',
  white: '#FFFFFF',
  background: '#F5F5F8',
  textPrimary: '#1A1A2E',
  textSecondary: '#4A4A6A',
  textTertiary: '#8888A8',
  textMuted: '#AAAACC',
  border: '#E8E8F0',
  divider: '#EBEBF5',
  shadow: 'rgba(231, 76, 60, 0.12)',
};

/* ==================== HEADER ==================== */
const MedsHeader = React.memo(() => {
  return (
    <View style={styles.header}>
      <SafeAreaView>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.headerBackButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Medications</Text>
          <View style={{ width: 32 }} />
        </View>
      </SafeAreaView>
    </View>
  );
});

/* ==================== USER PROFILE BAR ==================== */
const UserProfileBar = React.memo(() => {
  return (
    <View style={styles.userProfileBar}>
      <View style={styles.userProfileLeft}>
        <View style={styles.userAvatar}>
          <Ionicons name="person" size={20} color={COLORS.primary} />
        </View>
        <View>
          <Text style={styles.userProfileLabel}>SHOWING MEDICINES OF</Text>
          <Text style={styles.userProfileName}>Ganpati Raj</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.changeUserButton}>
        <Text style={styles.changeUserText}>CHANGE USER</Text>
        <Ionicons name="chevron-down" size={16} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
});

/* ==================== SURVEY SECTION ==================== */
const SurveySection = React.memo(() => {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <View style={styles.surveySection}>
      <Text style={styles.surveyQuestion}>Would you like medicine reminders to help you stay on track?</Text>
      <TouchableOpacity
        style={[styles.surveyOption, selectedOption === 'yes' && styles.surveyOptionSelected]}
        onPress={() => setSelectedOption('yes')}
        activeOpacity={0.7}
      >
        <Ionicons name="thumbs-up" size={22} color={selectedOption === 'yes' ? COLORS.green : COLORS.textTertiary} />
        <Text style={[styles.surveyOptionText, selectedOption === 'yes' && styles.surveyOptionTextSelected]}>Yes, that would be great</Text>
        <View style={[styles.surveyRadio, selectedOption === 'yes' && styles.surveyRadioSelected]} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.surveyOption, selectedOption === 'no' && styles.surveyOptionSelected]}
        onPress={() => setSelectedOption('no')}
        activeOpacity={0.7}
      >
        <Ionicons name="thumbs-down" size={22} color={selectedOption === 'no' ? COLORS.primary : COLORS.textTertiary} />
        <Text style={[styles.surveyOptionText, selectedOption === 'no' && styles.surveyOptionTextSelected]}>No, I wouldn't need it</Text>
        <View style={[styles.surveyRadio, selectedOption === 'no' && styles.surveyRadioSelected]} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.submitButton, !selectedOption && styles.submitButtonDisabled]} disabled={!selectedOption}>
        <Text style={[styles.submitButtonText, !selectedOption && styles.submitButtonTextDisabled]}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
});

/* ==================== ADD MEDICINES BANNER ==================== */
const AddMedicinesBanner = React.memo(() => {
  return (
    <View style={styles.addMedsBannerContainer}>
      <View style={styles.addMedsBanner}>
        <View style={styles.addMedsBannerIllustration}>
          <Ionicons name="medkit" size={56} color={COLORS.accent} />
        </View>
        <Text style={styles.addMedsBannerTitle}>Add your medicines to get insights</Text>
        <Text style={styles.addMedsBannerDesc}>Add medicines to view insights, side effects, interactions, and expert recommendations.</Text>
        <TouchableOpacity style={styles.addMedsButton}>
          <Ionicons name="add" size={22} color={COLORS.white} />
          <Text style={styles.addMedsButtonText}>Add Medicines</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

/* ==================== CURRENT MEDICATIONS ==================== */
const CurrentMedications = React.memo(() => {
  const medications = useMemo(() => [
    { id: '1', name: 'Amlodipine 5mg', type: 'Tablet', frequency: 'Once daily', time: 'Morning', doctor: 'Dr. Priya Sharma', color: '#E74C3C', status: 'Active', remaining: 12, refillDate: 'Mar 20', category: 'Blood Pressure' },
    { id: '2', name: 'Metformin 500mg', type: 'Tablet', frequency: 'Twice daily', time: 'Morning & Evening', doctor: 'Dr. Rahul Verma', color: '#2980B9', status: 'Active', remaining: 8, refillDate: 'Mar 15', category: 'Diabetes' },
    { id: '3', name: 'Atorvastatin 10mg', type: 'Tablet', frequency: 'Once daily', time: 'Night', doctor: 'Dr. Priya Sharma', color: '#8E44AD', status: 'Active', remaining: 20, refillDate: 'Mar 28', category: 'Cholesterol' },
    { id: '4', name: 'Vitamin D3 60000 IU', type: 'Capsule', frequency: 'Once weekly', time: 'Sunday', doctor: 'Dr. Anita Singh', color: '#F39C12', status: 'Active', remaining: 3, refillDate: 'Mar 30', category: 'Supplement' },
    { id: '5', name: 'Omeprazole 20mg', type: 'Capsule', frequency: 'Once daily', time: 'Before breakfast', doctor: 'Dr. Rahul Verma', color: '#1ABC9C', status: 'Paused', remaining: 15, refillDate: 'Apr 5', category: 'Acid Reflux' },
  ], []);

  return (
    <View style={styles.currentMedsSection}>
      <View style={styles.currentMedsSectionHeader}>
        <Text style={styles.sectionTitle}>Current Medications</Text>
        <TouchableOpacity><Text style={styles.sectionViewAll}>See All</Text></TouchableOpacity>
      </View>
      {medications.map((med) => (
        <TouchableOpacity key={med.id} style={styles.medCard} activeOpacity={0.7}>
          <View style={styles.medCardLeft}>
            <View style={[styles.medIconBg, { backgroundColor: med.color + '15' }]}>
              <Ionicons name="medical" size={22} color={med.color} />
            </View>
          </View>
          <View style={styles.medCardCenter}>
            <View style={styles.medCardNameRow}>
              <Text style={styles.medName}>{med.name}</Text>
              <View style={[styles.medStatusBadge, { backgroundColor: med.status === 'Active' ? '#E8F5E9' : '#FFF3E0' }]}>
                <Text style={[styles.medStatusText, { color: med.status === 'Active' ? '#2E7D32' : '#E65100' }]}>{med.status}</Text>
              </View>
            </View>
            <Text style={styles.medType}>{med.type} - {med.category}</Text>
            <View style={styles.medDetailsRow}>
              <Ionicons name="time" size={12} color={COLORS.textTertiary} />
              <Text style={styles.medDetailText}>{med.frequency} - {med.time}</Text>
            </View>
            <View style={styles.medDetailsRow}>
              <Ionicons name="person" size={12} color={COLORS.textTertiary} />
              <Text style={styles.medDetailText}>{med.doctor}</Text>
            </View>
            <View style={styles.medBottomRow}>
              <View style={styles.medRemainingBadge}>
                <Ionicons name="cube" size={12} color={med.remaining <= 5 ? COLORS.primary : COLORS.green} />
                <Text style={[styles.medRemainingText, { color: med.remaining <= 5 ? COLORS.primary : COLORS.green }]}>{med.remaining} left</Text>
              </View>
              <Text style={styles.medRefillDate}>Refill by {med.refillDate}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.medMoreButton}>
            <Ionicons name="ellipsis-vertical" size={18} color={COLORS.textTertiary} />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );
});

/* ==================== MEDICATION REMINDERS ==================== */
const MedicationReminders = React.memo(() => {
  const reminders = useMemo(() => [
    { id: '1', time: '8:00 AM', label: 'Morning Dose', meds: ['Amlodipine 5mg', 'Metformin 500mg', 'Omeprazole 20mg'], status: 'completed', icon: 'sunny' },
    { id: '2', time: '1:00 PM', label: 'Afternoon Dose', meds: ['Vitamin B12'], status: 'upcoming', icon: 'partly-sunny' },
    { id: '3', time: '8:00 PM', label: 'Evening Dose', meds: ['Metformin 500mg'], status: 'upcoming', icon: 'moon' },
    { id: '4', time: '10:00 PM', label: 'Night Dose', meds: ['Atorvastatin 10mg'], status: 'upcoming', icon: 'moon' },
  ], []);

  return (
    <View style={styles.remindersSection}>
      <View style={styles.remindersSectionHeader}>
        <Text style={styles.sectionTitle}>Today's Schedule</Text>
        <TouchableOpacity style={styles.reminderSettingsButton}>
          <Ionicons name="settings" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      {reminders.map((reminder) => (
        <View key={reminder.id} style={[styles.reminderCard, reminder.status === 'completed' && styles.reminderCardCompleted]}>
          <View style={styles.reminderTimeContainer}>
            <Ionicons name={reminder.icon} size={18} color={reminder.status === 'completed' ? COLORS.green : COLORS.accent} />
            <Text style={styles.reminderTime}>{reminder.time}</Text>
          </View>
          <View style={styles.reminderContent}>
            <Text style={styles.reminderLabel}>{reminder.label}</Text>
            {reminder.meds.map((med, idx) => (
              <View key={idx} style={styles.reminderMedRow}>
                <Ionicons name={reminder.status === 'completed' ? 'checkmark-circle' : 'ellipse-outline'} size={16} color={reminder.status === 'completed' ? COLORS.green : COLORS.textTertiary} />
                <Text style={[styles.reminderMedText, reminder.status === 'completed' && styles.reminderMedCompleted]}>{med}</Text>
              </View>
            ))}
          </View>
          {reminder.status === 'upcoming' && (
            <TouchableOpacity style={styles.reminderTakeButton}>
              <Text style={styles.reminderTakeText}>Take</Text>
            </TouchableOpacity>
          )}
          {reminder.status === 'completed' && (
            <View style={styles.reminderDoneBadge}>
              <Ionicons name="checkmark-circle" size={24} color={COLORS.green} />
            </View>
          )}
        </View>
      ))}
    </View>
  );
});

/* ==================== DRUG INTERACTIONS CHECKER ==================== */
const DrugInteractions = React.memo(() => {
  return (
    <View style={styles.interactionsSection}>
      <View style={styles.interactionsCard}>
        <LinearGradient colors={['#FFF3E0', '#FFE0B2']} style={styles.interactionsGradient}>
          <View style={styles.interactionsHeader}>
            <View style={styles.interactionsIconBg}>
              <Ionicons name="warning" size={28} color="#E65100" />
            </View>
            <View style={styles.interactionsInfo}>
              <Text style={styles.interactionsTitle}>Drug Interaction Checker</Text>
              <Text style={styles.interactionsDesc}>Check if your medications have any harmful interactions with each other or with food items.</Text>
            </View>
          </View>
          <View style={styles.interactionsList}>
            {[
              { pair: 'Amlodipine + Grapefruit', severity: 'Moderate', desc: 'Grapefruit may increase the blood levels of amlodipine', color: '#FF9800' },
              { pair: 'Metformin + Alcohol', severity: 'Severe', desc: 'Alcohol increases the risk of lactic acidosis with metformin', color: '#F44336' },
              { pair: 'Atorvastatin + Grapefruit', severity: 'Moderate', desc: 'Grapefruit juice can raise statin levels in your blood', color: '#FF9800' },
            ].map((interaction, idx) => (
              <View key={idx} style={styles.interactionItem}>
                <View style={[styles.interactionSeverityDot, { backgroundColor: interaction.color }]} />
                <View style={styles.interactionItemInfo}>
                  <Text style={styles.interactionPair}>{interaction.pair}</Text>
                  <Text style={styles.interactionDesc}>{interaction.desc}</Text>
                </View>
                <View style={[styles.interactionSeverityBadge, { backgroundColor: interaction.color + '20' }]}>
                  <Text style={[styles.interactionSeverityText, { color: interaction.color }]}>{interaction.severity}</Text>
                </View>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.checkInteractionsButton}>
            <Ionicons name="search" size={18} color="#E65100" />
            <Text style={styles.checkInteractionsText}>Check All Interactions</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
});

/* ==================== REFILL TRACKER ==================== */
const RefillTracker = React.memo(() => {
  const refills = useMemo(() => [
    { id: '1', name: 'Metformin 500mg', daysLeft: 4, urgency: 'urgent', pharmacy: 'Apollo Pharmacy, Sector 18', price: 125 },
    { id: '2', name: 'Amlodipine 5mg', daysLeft: 11, urgency: 'soon', pharmacy: 'Apollo Pharmacy, Sector 18', price: 85 },
    { id: '3', name: 'Vitamin D3', daysLeft: 21, urgency: 'ok', pharmacy: 'MedPlus, Noida', price: 210 },
    { id: '4', name: 'Atorvastatin 10mg', daysLeft: 19, urgency: 'ok', pharmacy: 'Apollo Pharmacy, Sector 18', price: 165 },
  ], []);

  const getUrgencyColor = (urgency) => {
    if (urgency === 'urgent') return '#F44336';
    if (urgency === 'soon') return '#FF9800';
    return '#4CAF50';
  };

  return (
    <View style={styles.refillSection}>
      <View style={styles.refillSectionHeader}>
        <Text style={styles.sectionTitle}>Refill Tracker</Text>
        <TouchableOpacity><Text style={styles.sectionViewAll}>Order All</Text></TouchableOpacity>
      </View>
      {refills.map((refill) => (
        <View key={refill.id} style={styles.refillCard}>
          <View style={[styles.refillUrgencyBar, { backgroundColor: getUrgencyColor(refill.urgency) }]} />
          <View style={styles.refillCardContent}>
            <View style={styles.refillCardTop}>
              <Text style={styles.refillName}>{refill.name}</Text>
              <Text style={[styles.refillDaysLeft, { color: getUrgencyColor(refill.urgency) }]}>{refill.daysLeft} days left</Text>
            </View>
            <Text style={styles.refillPharmacy}>{refill.pharmacy}</Text>
            <View style={styles.refillCardBottom}>
              <Text style={styles.refillPrice}>&#8377;{refill.price}</Text>
              <TouchableOpacity style={[styles.refillOrderButton, { backgroundColor: getUrgencyColor(refill.urgency) }]}>
                <Text style={styles.refillOrderText}>Reorder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
});

/* ==================== PILL IDENTIFIER ==================== */
const PillIdentifier = React.memo(() => {
  return (
    <View style={styles.pillIdSection}>
      <View style={styles.pillIdCard}>
        <LinearGradient colors={['#1A237E', '#283593']} style={styles.pillIdGradient}>
          <View style={styles.pillIdContent}>
            <View style={styles.pillIdIconContainer}>
              <Ionicons name="camera" size={36} color={COLORS.white} />
            </View>
            <Text style={styles.pillIdTitle}>Smart Pill Identifier</Text>
            <Text style={styles.pillIdDesc}>Take a photo of any pill or medicine to instantly identify it. Get detailed information including name, dosage, uses, and side effects.</Text>
            <View style={styles.pillIdFeatures}>
              {['Instant pill identification', 'Barcode & QR scanning', 'Medicine information lookup', 'Drug alternatives finder'].map((feature) => (
                <View key={feature} style={styles.pillIdFeatureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#69F0AE" />
                  <Text style={styles.pillIdFeatureText}>{feature}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.pillIdButton}>
              <Ionicons name="scan" size={20} color="#1A237E" />
              <Text style={styles.pillIdButtonText}>Scan Medicine</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
});

/* ==================== MEDICATION ADHERENCE ==================== */
const MedicationAdherence = React.memo(() => {
  const weekDays = useMemo(() => [
    { day: 'Mon', taken: 3, total: 3, date: '3' },
    { day: 'Tue', taken: 3, total: 3, date: '4' },
    { day: 'Wed', taken: 2, total: 3, date: '5' },
    { day: 'Thu', taken: 3, total: 3, date: '6' },
    { day: 'Fri', taken: 1, total: 3, date: '7' },
    { day: 'Sat', taken: 3, total: 3, date: '8' },
    { day: 'Sun', taken: 0, total: 3, date: '9' },
  ], []);

  return (
    <View style={styles.adherenceSection}>
      <Text style={styles.sectionTitle}>Medication Adherence</Text>
      <View style={styles.adherenceCard}>
        <LinearGradient colors={['#E8F5E9', '#C8E6C9']} style={styles.adherenceGradient}>
          <View style={styles.adherenceScoreRow}>
            <View style={styles.adherenceScoreCircle}>
              <Text style={styles.adherenceScoreValue}>87%</Text>
              <Text style={styles.adherenceScoreLabel}>This Week</Text>
            </View>
            <View style={styles.adherenceStats}>
              <View style={styles.adherenceStat}>
                <Text style={styles.adherenceStatValue}>18</Text>
                <Text style={styles.adherenceStatLabel}>Taken</Text>
              </View>
              <View style={styles.adherenceStat}>
                <Text style={[styles.adherenceStatValue, { color: COLORS.primary }]}>3</Text>
                <Text style={styles.adherenceStatLabel}>Missed</Text>
              </View>
              <View style={styles.adherenceStat}>
                <Text style={[styles.adherenceStatValue, { color: COLORS.orange }]}>0</Text>
                <Text style={styles.adherenceStatLabel}>Skipped</Text>
              </View>
            </View>
          </View>
          <View style={styles.adherenceWeekRow}>
            {weekDays.map((day) => (
              <View key={day.day} style={styles.adherenceDayColumn}>
                <View style={[styles.adherenceDayBar, { height: Math.max((day.taken / day.total) * 40, 4), backgroundColor: day.taken === day.total ? '#2E7D32' : day.taken > 0 ? '#FF9800' : '#E0E0E0' }]} />
                <Text style={styles.adherenceDayLabel}>{day.day}</Text>
                <Text style={styles.adherenceDayDate}>{day.date}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>
      </View>
    </View>
  );
});

/* ==================== PHARMACY FINDER ==================== */
const PharmacyFinder = React.memo(() => {
  const pharmacies = useMemo(() => [
    { id: '1', name: 'Apollo Pharmacy', address: 'Sector 18, Noida', distance: '0.8 km', rating: 4.5, timing: '24/7', delivery: true, color: '#E74C3C' },
    { id: '2', name: 'MedPlus', address: 'Sector 22, Noida', distance: '1.2 km', rating: 4.3, timing: '8 AM - 11 PM', delivery: true, color: '#2196F3' },
    { id: '3', name: 'Netmeds Store', address: 'Sector 15, Noida', distance: '2.1 km', rating: 4.1, timing: '9 AM - 10 PM', delivery: false, color: '#4CAF50' },
  ], []);

  return (
    <View style={styles.pharmacySection}>
      <View style={styles.pharmacySectionHeader}>
        <Text style={styles.sectionTitle}>Nearby Pharmacies</Text>
        <TouchableOpacity><Text style={styles.sectionViewAll}>View Map</Text></TouchableOpacity>
      </View>
      {pharmacies.map((pharmacy) => (
        <TouchableOpacity key={pharmacy.id} style={styles.pharmacyCard} activeOpacity={0.7}>
          <View style={[styles.pharmacyIconBg, { backgroundColor: pharmacy.color + '15' }]}>
            <Ionicons name="medical" size={24} color={pharmacy.color} />
          </View>
          <View style={styles.pharmacyInfo}>
            <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
            <Text style={styles.pharmacyAddress}>{pharmacy.address}</Text>
            <View style={styles.pharmacyMetaRow}>
              <View style={styles.pharmacyMeta}><Ionicons name="location" size={12} color={COLORS.textTertiary} /><Text style={styles.pharmacyMetaText}>{pharmacy.distance}</Text></View>
              <View style={styles.pharmacyMeta}><Ionicons name="star" size={12} color="#FFD700" /><Text style={styles.pharmacyMetaText}>{pharmacy.rating}</Text></View>
              <View style={styles.pharmacyMeta}><Ionicons name="time" size={12} color={COLORS.textTertiary} /><Text style={styles.pharmacyMetaText}>{pharmacy.timing}</Text></View>
            </View>
          </View>
          {pharmacy.delivery && (
            <View style={styles.pharmacyDeliveryBadge}>
              <Ionicons name="bicycle" size={14} color={COLORS.green} />
              <Text style={styles.pharmacyDeliveryText}>Delivery</Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
});

/* ==================== SIDE EFFECTS TRACKER ==================== */
const SideEffectsTracker = React.memo(() => {
  const sideEffects = useMemo(() => [
    { id: '1', symptom: 'Mild Dizziness', medicine: 'Amlodipine 5mg', severity: 'Mild', date: 'Mar 7', icon: 'flash', color: '#FF9800' },
    { id: '2', symptom: 'Stomach Upset', medicine: 'Metformin 500mg', severity: 'Moderate', date: 'Mar 5', icon: 'alert-circle', color: '#F44336' },
    { id: '3', symptom: 'Muscle Pain', medicine: 'Atorvastatin 10mg', severity: 'Mild', date: 'Mar 3', icon: 'body', color: '#FF9800' },
  ], []);

  return (
    <View style={styles.sideEffectsSection}>
      <View style={styles.sideEffectsSectionHeader}>
        <Text style={styles.sectionTitle}>Side Effects Log</Text>
        <TouchableOpacity style={styles.logSideEffectButton}>
          <Ionicons name="add-circle" size={22} color={COLORS.primary} />
          <Text style={styles.logSideEffectText}>Log New</Text>
        </TouchableOpacity>
      </View>
      {sideEffects.map((effect) => (
        <View key={effect.id} style={styles.sideEffectCard}>
          <View style={[styles.sideEffectIconBg, { backgroundColor: effect.color + '15' }]}>
            <Ionicons name={effect.icon} size={20} color={effect.color} />
          </View>
          <View style={styles.sideEffectInfo}>
            <Text style={styles.sideEffectSymptom}>{effect.symptom}</Text>
            <Text style={styles.sideEffectMedicine}>From: {effect.medicine}</Text>
            <Text style={styles.sideEffectDate}>{effect.date}</Text>
          </View>
          <View style={[styles.sideEffectSeverityBadge, { backgroundColor: effect.color + '15' }]}>
            <Text style={[styles.sideEffectSeverityText, { color: effect.color }]}>{effect.severity}</Text>
          </View>
        </View>
      ))}
    </View>
  );
});

/* ==================== MEDICINE COST SAVINGS ==================== */
const CostSavings = React.memo(() => {
  return (
    <View style={styles.savingsSection}>
      <Text style={styles.sectionTitle}>Cost Savings</Text>
      <View style={styles.savingsCard}>
        <LinearGradient colors={['#1B5E20', '#2E7D32']} style={styles.savingsGradient}>
          <View style={styles.savingsTop}>
            <View style={styles.savingsAmountContainer}>
              <Text style={styles.savingsLabel}>You saved this month</Text>
              <Text style={styles.savingsAmount}>&#8377;1,245</Text>
            </View>
            <View style={styles.savingsIconContainer}>
              <Ionicons name="trending-down" size={36} color="rgba(255,255,255,0.8)" />
            </View>
          </View>
          <View style={styles.savingsBreakdown}>
            {[
              { label: 'Generic alternatives', saved: 680 },
              { label: 'Apollo discount', saved: 320 },
              { label: 'Subscription savings', saved: 245 },
            ].map((item) => (
              <View key={item.label} style={styles.savingsItem}>
                <Ionicons name="checkmark-circle" size={16} color="#69F0AE" />
                <Text style={styles.savingsItemLabel}>{item.label}</Text>
                <Text style={styles.savingsItemAmount}>&#8377;{item.saved}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.savingsExploreButton}>
            <Text style={styles.savingsExploreText}>Find More Savings</Text>
            <Ionicons name="arrow-forward" size={16} color="#1B5E20" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
});

/* ==================== FOOTER ==================== */
const MedsFooter = React.memo(() => {
  return (
    <View style={styles.footer}>
      <View style={styles.footerDivider} />
      <Text style={styles.footerBrand}>Apollo 24|7 Medications</Text>
      <Text style={styles.footerDesc}>Manage your medicines safely & smartly</Text>
      <View style={styles.footerBadges}>
        <View style={styles.footerBadge}><Ionicons name="shield-checkmark" size={14} color={COLORS.green} /><Text style={styles.footerBadgeText}>Verified Medicines</Text></View>
        <View style={styles.footerBadge}><Ionicons name="flash" size={14} color={COLORS.orange} /><Text style={styles.footerBadgeText}>Fast Delivery</Text></View>
      </View>
    </View>
  );
});

/* ==================== MAIN COMPONENT ==================== */
export default function MyMeds() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <MedsHeader />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} bounces={true} contentContainerStyle={styles.scrollContent}>
        <UserProfileBar />
        <SurveySection />
        <AddMedicinesBanner />
        <CurrentMedications />
        <MedicationReminders />
        <MedicationAdherence />
        <DrugInteractions />
        <RefillTracker />
        <PillIdentifier />
        <PharmacyFinder />
        <SideEffectsTracker />
        <CostSavings />
        <MedsFooter />
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

/* ==================== STYLES ==================== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 20 },
  header: { backgroundColor: COLORS.white, paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight || 0, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  headerContent: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16 },
  headerBackButton: { padding: 4, marginRight: 12 },
  headerTitle: { flex: 1, fontSize: 22, fontWeight: '700', color: COLORS.textPrimary },
  userProfileBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.white, paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  userProfileLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  userAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary + '15', justifyContent: 'center', alignItems: 'center' },
  userProfileLabel: { fontSize: 10, fontWeight: '600', color: COLORS.textTertiary, letterSpacing: 0.5 },
  userProfileName: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, marginTop: 2 },
  changeUserButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  changeUserText: { fontSize: 13, fontWeight: '700', color: COLORS.primary },
  surveySection: { backgroundColor: COLORS.white, marginHorizontal: 20, marginTop: 20, borderRadius: 16, padding: 20, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 12, elevation: 4 },
  surveyQuestion: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 16, lineHeight: 22 },
  surveyOption: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8FC', borderRadius: 12, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: COLORS.border, gap: 12 },
  surveyOptionSelected: { borderColor: COLORS.primary, backgroundColor: COLORS.primary + '08' },
  surveyOptionText: { flex: 1, fontSize: 14, color: COLORS.textSecondary },
  surveyOptionTextSelected: { color: COLORS.textPrimary, fontWeight: '600' },
  surveyRadio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: COLORS.border },
  surveyRadioSelected: { borderColor: COLORS.primary, backgroundColor: COLORS.primary },
  submitButton: { backgroundColor: COLORS.textPrimary, borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  submitButtonDisabled: { backgroundColor: '#E0E0E8' },
  submitButtonText: { fontSize: 15, fontWeight: '700', color: COLORS.white },
  submitButtonTextDisabled: { color: COLORS.textTertiary },
  addMedsBannerContainer: { paddingHorizontal: 20, marginTop: 20 },
  addMedsBanner: { backgroundColor: COLORS.white, borderRadius: 20, padding: 32, alignItems: 'center', shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 16, elevation: 5 },
  addMedsBannerIllustration: { marginBottom: 20 },
  addMedsBannerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, textAlign: 'center', marginBottom: 8 },
  addMedsBannerDesc: { fontSize: 13, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 20, marginBottom: 20, paddingHorizontal: 10 },
  addMedsButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.textPrimary, borderRadius: 14, paddingHorizontal: 28, paddingVertical: 14, gap: 8 },
  addMedsButtonText: { fontSize: 15, fontWeight: '700', color: COLORS.white },
  currentMedsSection: { marginTop: 28 },
  currentMedsSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, paddingHorizontal: 20 },
  sectionViewAll: { fontSize: 14, fontWeight: '600', color: COLORS.primary },
  medCard: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: COLORS.white, marginHorizontal: 20, marginBottom: 12, borderRadius: 16, padding: 16, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 3 },
  medCardLeft: { marginRight: 12 },
  medIconBg: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  medCardCenter: { flex: 1 },
  medCardNameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  medName: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary, flex: 1 },
  medStatusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, marginLeft: 8 },
  medStatusText: { fontSize: 10, fontWeight: '600' },
  medType: { fontSize: 12, color: COLORS.textTertiary, marginBottom: 6 },
  medDetailsRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 },
  medDetailText: { fontSize: 12, color: COLORS.textSecondary },
  medBottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: COLORS.divider },
  medRemainingBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  medRemainingText: { fontSize: 12, fontWeight: '600' },
  medRefillDate: { fontSize: 11, color: COLORS.textTertiary },
  medMoreButton: { padding: 4 },
  remindersSection: { marginTop: 28 },
  remindersSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  reminderSettingsButton: { padding: 4 },
  reminderCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, marginHorizontal: 20, marginBottom: 10, borderRadius: 14, padding: 14, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 6, elevation: 2 },
  reminderCardCompleted: { opacity: 0.7 },
  reminderTimeContainer: { alignItems: 'center', marginRight: 14, width: 50 },
  reminderTime: { fontSize: 11, fontWeight: '700', color: COLORS.textPrimary, marginTop: 4 },
  reminderContent: { flex: 1 },
  reminderLabel: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 6 },
  reminderMedRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 },
  reminderMedText: { fontSize: 12, color: COLORS.textSecondary },
  reminderMedCompleted: { textDecorationLine: 'line-through', color: COLORS.textTertiary },
  reminderTakeButton: { backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  reminderTakeText: { fontSize: 12, fontWeight: '700', color: COLORS.white },
  reminderDoneBadge: { padding: 4 },
  adherenceSection: { marginTop: 28 },
  adherenceCard: { marginHorizontal: 20, marginTop: 16, borderRadius: 20, overflow: 'hidden' },
  adherenceGradient: { padding: 24 },
  adherenceScoreRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  adherenceScoreCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.7)', justifyContent: 'center', alignItems: 'center', marginRight: 20, borderWidth: 3, borderColor: '#2E7D32' },
  adherenceScoreValue: { fontSize: 22, fontWeight: '800', color: '#2E7D32' },
  adherenceScoreLabel: { fontSize: 10, color: '#4A6A4A' },
  adherenceStats: { flex: 1, flexDirection: 'row', justifyContent: 'space-around' },
  adherenceStat: { alignItems: 'center' },
  adherenceStatValue: { fontSize: 20, fontWeight: '700', color: '#2E7D32' },
  adherenceStatLabel: { fontSize: 11, color: '#4A6A4A', marginTop: 2 },
  adherenceWeekRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', paddingTop: 16, borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.08)' },
  adherenceDayColumn: { alignItems: 'center' },
  adherenceDayBar: { width: 20, borderRadius: 4, marginBottom: 6 },
  adherenceDayLabel: { fontSize: 10, fontWeight: '600', color: '#4A6A4A' },
  adherenceDayDate: { fontSize: 9, color: '#8A9A8A' },
  interactionsSection: { marginTop: 28, paddingHorizontal: 20 },
  interactionsCard: { borderRadius: 20, overflow: 'hidden' },
  interactionsGradient: { padding: 24 },
  interactionsHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  interactionsIconBg: { width: 48, height: 48, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.6)', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  interactionsInfo: { flex: 1 },
  interactionsTitle: { fontSize: 17, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 4 },
  interactionsDesc: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 18 },
  interactionsList: { marginBottom: 16 },
  interactionItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 12, padding: 12, marginBottom: 8, gap: 10 },
  interactionSeverityDot: { width: 8, height: 8, borderRadius: 4 },
  interactionItemInfo: { flex: 1 },
  interactionPair: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary },
  interactionDesc: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  interactionSeverityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  interactionSeverityText: { fontSize: 10, fontWeight: '700' },
  checkInteractionsButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 12, paddingVertical: 12, gap: 8 },
  checkInteractionsText: { fontSize: 14, fontWeight: '700', color: '#E65100' },
  refillSection: { marginTop: 28 },
  refillSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  refillCard: { flexDirection: 'row', backgroundColor: COLORS.white, marginHorizontal: 20, marginBottom: 12, borderRadius: 14, overflow: 'hidden', shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 3 },
  refillUrgencyBar: { width: 4 },
  refillCardContent: { flex: 1, padding: 14 },
  refillCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  refillName: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  refillDaysLeft: { fontSize: 12, fontWeight: '700' },
  refillPharmacy: { fontSize: 11, color: COLORS.textTertiary, marginBottom: 8 },
  refillCardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  refillPrice: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  refillOrderButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  refillOrderText: { fontSize: 12, fontWeight: '700', color: COLORS.white },
  pillIdSection: { marginTop: 28, paddingHorizontal: 20 },
  pillIdCard: { borderRadius: 20, overflow: 'hidden' },
  pillIdGradient: { padding: 24 },
  pillIdContent: { alignItems: 'center' },
  pillIdIconContainer: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  pillIdTitle: { fontSize: 20, fontWeight: '700', color: COLORS.white, marginBottom: 8 },
  pillIdDesc: { fontSize: 13, color: 'rgba(255,255,255,0.8)', textAlign: 'center', lineHeight: 20, marginBottom: 16 },
  pillIdFeatures: { width: '100%', marginBottom: 20 },
  pillIdFeatureItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  pillIdFeatureText: { fontSize: 13, color: 'rgba(255,255,255,0.9)' },
  pillIdButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 14, paddingHorizontal: 28, paddingVertical: 14, gap: 8 },
  pillIdButtonText: { fontSize: 15, fontWeight: '700', color: '#1A237E' },
  pharmacySection: { marginTop: 28 },
  pharmacySectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  pharmacyCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, marginHorizontal: 20, marginBottom: 12, borderRadius: 14, padding: 14, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 6, elevation: 2 },
  pharmacyIconBg: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  pharmacyInfo: { flex: 1 },
  pharmacyName: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  pharmacyAddress: { fontSize: 12, color: COLORS.textTertiary, marginTop: 2 },
  pharmacyMetaRow: { flexDirection: 'row', gap: 12, marginTop: 6 },
  pharmacyMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  pharmacyMetaText: { fontSize: 11, color: COLORS.textSecondary },
  pharmacyDeliveryBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, gap: 4 },
  pharmacyDeliveryText: { fontSize: 10, fontWeight: '600', color: COLORS.green },
  sideEffectsSection: { marginTop: 28 },
  sideEffectsSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  logSideEffectButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  logSideEffectText: { fontSize: 13, fontWeight: '600', color: COLORS.primary },
  sideEffectCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, marginHorizontal: 20, marginBottom: 10, borderRadius: 14, padding: 14, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 6, elevation: 2 },
  sideEffectIconBg: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  sideEffectInfo: { flex: 1 },
  sideEffectSymptom: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  sideEffectMedicine: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  sideEffectDate: { fontSize: 10, color: COLORS.textMuted, marginTop: 2 },
  sideEffectSeverityBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  sideEffectSeverityText: { fontSize: 10, fontWeight: '700' },
  savingsSection: { marginTop: 28 },
  savingsCard: { marginHorizontal: 20, marginTop: 16, borderRadius: 20, overflow: 'hidden' },
  savingsGradient: { padding: 24 },
  savingsTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  savingsAmountContainer: { flex: 1 },
  savingsLabel: { fontSize: 13, color: 'rgba(255,255,255,0.7)' },
  savingsAmount: { fontSize: 32, fontWeight: '800', color: COLORS.white, marginTop: 4 },
  savingsIconContainer: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
  savingsBreakdown: { marginBottom: 20 },
  savingsItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  savingsItemLabel: { flex: 1, fontSize: 13, color: 'rgba(255,255,255,0.85)' },
  savingsItemAmount: { fontSize: 14, fontWeight: '700', color: COLORS.white },
  savingsExploreButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.white, borderRadius: 12, paddingVertical: 12, gap: 8 },
  savingsExploreText: { fontSize: 14, fontWeight: '700', color: '#1B5E20' },
  footer: { alignItems: 'center', paddingVertical: 32, marginTop: 20 },
  footerDivider: { width: 60, height: 3, backgroundColor: COLORS.primary, borderRadius: 2, marginBottom: 16 },
  footerBrand: { fontSize: 16, fontWeight: '700', color: COLORS.primary },
  footerDesc: { fontSize: 12, color: COLORS.textTertiary, marginTop: 4 },
  footerBadges: { flexDirection: 'row', gap: 16, marginTop: 12 },
  footerBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  footerBadgeText: { fontSize: 10, color: COLORS.textTertiary, fontWeight: '500' },
});
