import React, { memo, useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  DoctorsTheme,
  SURGERY_HEART_PROCEDURES,
  SURGERY_GYNEC_PROCEDURES,
  SURGERY_GASTRO_PROCEDURES,
  SURGERY_CONDITIONS,
  COMMON_PROCEDURES,
  OUR_SPECIALITIES,
  WHY_CHOOSE_STATS,
  TIPS_BEFORE_SURGERY,
  SURGERY_TABS,
} from '../components/doctors/DoctorsTheme';
import StickyHeader from '../components/doctors/StickyHeader';
import SearchBarAnimated from '../components/doctors/SearchBarAnimated';
import FloatingAskApollo from '../components/doctors/FloatingAskApollo';
import GoToTopButton from '../components/doctors/GoToTopButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Animated Hero Text
const HERO_WORDS = ['Expert Surgeons', 'World-Class Hospitals', 'Advanced Technology'];

const SurgeryHero = memo(() => {
  const [wordIndex, setWordIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setWordIndex((prev) => (prev + 1) % HERO_WORDS.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [fadeAnim]);

  return (
    <View style={heroStyles.container}>
      <View style={heroStyles.textWrap}>
        <Text style={heroStyles.title}>Surgical Care journey{'\n'}led by </Text>
        <Animated.Text style={[heroStyles.animatedWord, { opacity: fadeAnim }]}>
          {HERO_WORDS[wordIndex]}
        </Animated.Text>
      </View>
      <Text style={heroStyles.illustration}>👨‍⚕️</Text>
    </View>
  );
});
SurgeryHero.displayName = 'SurgeryHero';

const heroStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: DoctorsTheme.colors.headerPeach,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 90,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    lineHeight: 24,
  },
  animatedWord: {
    fontSize: 17,
    fontWeight: '800',
    color: DoctorsTheme.colors.apolloOrange,
  },
  illustration: {
    fontSize: 50,
    marginLeft: 8,
  },
});

// Procedure Tabs and Cards
const ProceduresBySpeciality = memo(() => {
  const [activeTab, setActiveTab] = useState('heart');

  const getProcedures = () => {
    switch (activeTab) {
      case 'heart': return SURGERY_HEART_PROCEDURES;
      case 'gynec': return SURGERY_GYNEC_PROCEDURES;
      case 'gastro': return SURGERY_GASTRO_PROCEDURES;
      default: return SURGERY_HEART_PROCEDURES;
    }
  };

  const procedures = getProcedures();
  const rows = [];
  for (let i = 0; i < procedures.length; i += 2) {
    rows.push(procedures.slice(i, i + 2));
  }

  return (
    <View style={procStyles.container}>
      <View style={procStyles.header}>
        <Text style={procStyles.sectionTitle}>Find Procedure by Specialities</Text>
        <TouchableOpacity accessibilityRole="button">
          <Text style={procStyles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={procStyles.tabRow}>
        {SURGERY_TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[procStyles.tab, activeTab === tab.id && procStyles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === tab.id }}
          >
            <Text style={[procStyles.tabText, activeTab === tab.id && procStyles.activeTabText]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={procStyles.row}>
          {row.map((item) => (
            <TouchableOpacity key={item.id} style={procStyles.card} accessibilityRole="button">
              <Text style={procStyles.cardIcon}>{item.icon}</Text>
              <Text style={procStyles.cardName} numberOfLines={2}>{item.name}</Text>
            </TouchableOpacity>
          ))}
          {row.length < 2 && <View style={procStyles.card} />}
        </View>
      ))}
    </View>
  );
});
ProceduresBySpeciality.displayName = 'ProceduresBySpeciality';

const procStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    flex: 1,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
    color: DoctorsTheme.colors.teal,
  },
  tabRow: {
    marginBottom: 14,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 4,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: DoctorsTheme.colors.textPrimary,
  },
  tabText: {
    fontSize: 14,
    color: DoctorsTheme.colors.textSecondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: DoctorsTheme.colors.textPrimary,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  card: {
    flex: 1,
    backgroundColor: DoctorsTheme.colors.cardBg,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 52,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardName: {
    fontSize: 13,
    fontWeight: '600',
    color: DoctorsTheme.colors.textPrimary,
    flex: 1,
    lineHeight: 17,
  },
});

// Consult Surgeon by Conditions
const SurgeonConditions = memo(() => {
  const rows = [];
  for (let i = 0; i < SURGERY_CONDITIONS.length; i += 2) {
    rows.push(SURGERY_CONDITIONS.slice(i, i + 2));
  }

  return (
    <View style={condStyles.container}>
      <Text style={condStyles.sectionTitle}>Consult Surgeon by Conditions</Text>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={condStyles.row}>
          {row.map((item) => (
            <TouchableOpacity key={item.id} style={condStyles.card} accessibilityRole="button">
              <Text style={condStyles.cardIcon}>{item.icon}</Text>
              <Text style={condStyles.cardName} numberOfLines={2}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
});
SurgeonConditions.displayName = 'SurgeonConditions';

const condStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  card: {
    flex: 1,
    backgroundColor: DoctorsTheme.colors.cardBg,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 52,
  },
  cardIcon: {
    fontSize: 22,
  },
  cardName: {
    fontSize: 13,
    fontWeight: '600',
    color: DoctorsTheme.colors.textPrimary,
    flex: 1,
    lineHeight: 17,
  },
});

// Common Procedures Grid
const CommonProcedures = memo(() => {
  const rows = [];
  for (let i = 0; i < COMMON_PROCEDURES.length; i += 4) {
    rows.push(COMMON_PROCEDURES.slice(i, i + 4));
  }

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.sectionTitle}>Common Procedures</Text>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={commonStyles.row}>
          {row.map((item) => (
            <TouchableOpacity key={item.id} style={commonStyles.item} accessibilityRole="button">
              <View style={commonStyles.iconContainer}>
                <Text style={commonStyles.icon}>{item.icon}</Text>
              </View>
              <Text style={commonStyles.label} numberOfLines={2}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
});
CommonProcedures.displayName = 'CommonProcedures';

const commonStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    maxWidth: '25%',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: DoctorsTheme.colors.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    fontSize: 26,
  },
  label: {
    fontSize: 11,
    color: DoctorsTheme.colors.textPrimary,
    textAlign: 'center',
    lineHeight: 14,
    fontWeight: '500',
  },
});

// Our Specialities
const OurSpecialities = memo(() => {
  const rows = [];
  for (let i = 0; i < OUR_SPECIALITIES.length; i += 3) {
    rows.push(OUR_SPECIALITIES.slice(i, i + 3));
  }

  return (
    <View style={specStyles.container}>
      <View style={specStyles.header}>
        <Text style={specStyles.sectionTitle}>Our Specialities</Text>
        <TouchableOpacity accessibilityRole="button">
          <Text style={specStyles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={specStyles.row}>
          {row.map((item) => (
            <TouchableOpacity key={item.id} style={specStyles.item} accessibilityRole="button">
              <Text style={specStyles.label}>{item.name}</Text>
              <View style={[specStyles.iconContainer, { backgroundColor: item.color }]}>
                <Text style={specStyles.icon}>{item.icon}</Text>
              </View>
            </TouchableOpacity>
          ))}
          {row.length < 3 && Array.from({ length: 3 - row.length }).map((_, i) => (
            <View key={`empty-${i}`} style={specStyles.item} />
          ))}
        </View>
      ))}
    </View>
  );
});
OurSpecialities.displayName = 'OurSpecialities';

const specStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
    color: DoctorsTheme.colors.teal,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    maxWidth: '33%',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: DoctorsTheme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: 6,
    lineHeight: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 28,
  },
});

// Tips Before Surgery
const TipsBeforeSurgery = memo(() => (
  <View style={tipsStyles.container}>
    <Text style={tipsStyles.sectionTitle}>Tips before Surgery Planning</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 16 }}>
      {TIPS_BEFORE_SURGERY.map((tip) => (
        <View key={tip.id} style={[tipsStyles.card, { backgroundColor: tip.color }]}>
          <Text style={tipsStyles.cardIcon}>📋</Text>
          <Text style={tipsStyles.cardTitle}>{tip.title}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
));
TipsBeforeSurgery.displayName = 'TipsBeforeSurgery';

const tipsStyles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  card: {
    width: SCREEN_WIDTH * 0.42,
    borderRadius: 14,
    padding: 16,
    marginLeft: 16,
    minHeight: 140,
  },
  cardIcon: {
    fontSize: 28,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    lineHeight: 20,
  },
});

// Why Choose Apollo
const WhyChooseApollo = memo(() => (
  <View style={whyStyles.container}>
    <View style={whyStyles.divider}>
      <View style={whyStyles.line} />
      <Text style={whyStyles.dividerText}>WHY CHOOSE APOLLO</Text>
      <View style={whyStyles.line} />
    </View>
    <View style={whyStyles.statsRow}>
      {WHY_CHOOSE_STATS.map((stat) => (
        <View key={stat.id} style={whyStyles.statItem}>
          <Text style={whyStyles.statNumber}>{stat.number}</Text>
          <Text style={whyStyles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  </View>
));
WhyChooseApollo.displayName = 'WhyChooseApollo';

const whyStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: DoctorsTheme.colors.border,
  },
  dividerText: {
    fontSize: 12,
    fontWeight: '700',
    color: DoctorsTheme.colors.textSecondary,
    marginHorizontal: 12,
    letterSpacing: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: DoctorsTheme.colors.teal,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: DoctorsTheme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 14,
  },
});

// Unsure CTA
const UnsureCTA = memo(() => (
  <View style={unsureStyles.container}>
    <View style={{ flex: 1 }}>
      <Text style={unsureStyles.title}>Unsure What to do?</Text>
      <Text style={unsureStyles.subtitle}>Our surgery advisor is{'\n'}just a click away</Text>
      <TouchableOpacity style={unsureStyles.button} accessibilityRole="button">
        <Ionicons name="call" size={16} color={DoctorsTheme.colors.white} />
        <Text style={unsureStyles.buttonText}>Request a call back</Text>
      </TouchableOpacity>
    </View>
    <Text style={unsureStyles.illustration}>👩‍💻</Text>
  </View>
));
UnsureCTA.displayName = 'UnsureCTA';

const unsureStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: '#E8F5F5',
    borderRadius: 14,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: DoctorsTheme.colors.textSecondary,
    lineHeight: 18,
    marginBottom: 14,
  },
  button: {
    backgroundColor: DoctorsTheme.colors.teal,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 6,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: DoctorsTheme.colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  illustration: {
    fontSize: 50,
    marginLeft: 10,
  },
});

// Main Surgery Screen
export default function Surgery() {
  const scrollRef = useRef(null);
  const [showGoToTop, setShowGoToTop] = useState(false);

  const handleScroll = useCallback((event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowGoToTop(offsetY > 500);
  }, []);

  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  return (
    <View style={styles.container}>
      <StickyHeader backgroundColor={DoctorsTheme.colors.headerPeach} />

      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <SearchBarAnimated placeholder="Search" borderColor={DoctorsTheme.colors.border} />

        <SurgeryHero />

        <ProceduresBySpeciality />

        <SurgeonConditions />

        <CommonProcedures />

        <OurSpecialities />

        <TipsBeforeSurgery />

        <WhyChooseApollo />

        <UnsureCTA />

        <View style={{ height: 40 }} />
      </ScrollView>

      <FloatingAskApollo />
      <GoToTopButton visible={showGoToTop} onPress={scrollToTop} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DoctorsTheme.colors.white,
  },
  scrollView: {
    flex: 1,
  },
});
