import React, { memo, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SearchBarAnimated from '../components/doctors/SearchBarAnimated';
import SpecialityGrid from '../components/doctors/SpecialityGrid';
import FloatingAskApollo from '../components/doctors/FloatingAskApollo';
import GoToTopButton from '../components/doctors/GoToTopButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Custom Online Header
const OnlineHeader = memo(() => {
  const router = useRouter();
  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.topRow}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={headerStyles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={22} color={DoctorsTheme.colors.teal} />
        </TouchableOpacity>
        <Text style={headerStyles.title}>ONLINE CONSULT</Text>
        <View style={headerStyles.locationWrap}>
          <Text style={headerStyles.locationLabel}>Your Location</Text>
          <TouchableOpacity style={headerStyles.locationBtn} accessibilityRole="button">
            <Text style={headerStyles.locationText}>Delhi 110001</Text>
            <Ionicons name="chevron-down" size={12} color={DoctorsTheme.colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});
OnlineHeader.displayName = 'OnlineHeader';

const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: DoctorsTheme.colors.white,
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: DoctorsTheme.colors.border,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 4,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: DoctorsTheme.colors.teal,
    flex: 1,
  },
  locationWrap: {
    alignItems: 'flex-end',
  },
  locationLabel: {
    fontSize: 10,
    color: DoctorsTheme.colors.textTertiary,
  },
  locationBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  locationText: {
    fontSize: 13,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
  },
});

// Symptoms Grid for Online
const OnlineSymptomsGrid = memo(() => {
  const rows = [];
  for (let i = 0; i < ONLINE_SYMPTOMS.length; i += 4) {
    rows.push(ONLINE_SYMPTOMS.slice(i, i + 4));
  }

  return (
    <View style={symptomsStyles.container}>
      <View style={symptomsStyles.header}>
        <Text style={symptomsStyles.title}>Find Doctor by Symptoms</Text>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="View all symptoms">
          <Text style={symptomsStyles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={symptomsStyles.row}>
          {row.map((item) => (
            <TouchableOpacity key={item.id} style={symptomsStyles.item} accessibilityRole="button">
              <View style={[symptomsStyles.iconContainer, { backgroundColor: item.color }]}>
                <Text style={symptomsStyles.icon}>{item.icon}</Text>
              </View>
              <Text style={symptomsStyles.label} numberOfLines={2}>{item.name}</Text>
            </TouchableOpacity>
          ))}
          {row.length < 4 && Array.from({ length: 4 - row.length }).map((_, i) => (
            <View key={`empty-${i}`} style={symptomsStyles.item} />
          ))}
        </View>
      ))}
    </View>
  );
});
OnlineSymptomsGrid.displayName = 'OnlineSymptomsGrid';

const symptomsStyles = StyleSheet.create({
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
  title: {
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
    maxWidth: '25%',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
  },
});

// Ask Apollo Promo Card (large orange)
const AskApolloPromoCard = memo(() => (
  <View style={promoStyles.container}>
    <Text style={promoStyles.sectionTitle}>Ask Apollo</Text>
    <View style={promoStyles.card}>
      <View style={promoStyles.cardContent}>
        <Text style={promoStyles.cardTitle}>Ask anything about your{'\n'}health.</Text>
        <Text style={promoStyles.cardSubtitle}>Get trusted answers{'\n'}directly from Apollo</Text>
        <TouchableOpacity style={promoStyles.askButton} accessibilityRole="button">
          <Text style={promoStyles.askButtonText}>✦ Ask Apollo</Text>
          <View style={promoStyles.betaBadge}>
            <Text style={promoStyles.betaText}>beta</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={promoStyles.illustrationWrap}>
        <Text style={promoStyles.illustration}>👨‍⚕️</Text>
        <View style={promoStyles.callBadge}>
          <Text style={promoStyles.callBadgeText}>Call To{'\n'}Book</Text>
        </View>
      </View>
    </View>
  </View>
));
AskApolloPromoCard.displayName = 'AskApolloPromoCard';

const promoStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 12,
  },
  card: {
    backgroundColor: DoctorsTheme.colors.apolloOrange,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    overflow: 'hidden',
    minHeight: 180,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: DoctorsTheme.colors.white,
    lineHeight: 26,
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 18,
    marginBottom: 14,
  },
  askButton: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
  },
  askButtonText: {
    color: DoctorsTheme.colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  betaBadge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  betaText: {
    color: DoctorsTheme.colors.white,
    fontSize: 9,
    fontWeight: '600',
  },
  illustrationWrap: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    fontSize: 60,
  },
  callBadge: {
    backgroundColor: DoctorsTheme.colors.gold,
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -10,
    right: -10,
    borderWidth: 2,
    borderColor: '#C49120',
  },
  callBadgeText: {
    color: DoctorsTheme.colors.white,
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'center',
  },
});

// Main Online Consult Screen
export default function OnlineConsultation() {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [showGoToTop, setShowGoToTop] = useState(false);

  const handleScroll = useCallback((event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowGoToTop(offsetY > 400);
  }, []);

  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  const handleSpecialityPress = useCallback((speciality) => {
    const screenMap = {
      'cardio': '/doctors/specialty/cardiology',
      'derma': '/doctors/specialty/dermatology',
      'gp': '/doctors/specialty/generalpractitioner',
      'women': '/doctors/specialty/womenshealth',
      'psych': '/doctors/specialty/psychiatry',
      'ortho': '/doctors/specialty/orthopaedics',
      'ent': '/doctors/specialty/generalpractitioner',
      'uro': '/doctors/specialty/cardiology',
      'paed': '/doctors/specialty/generalpractitioner',
      'digest': '/doctors/specialty/generalpractitioner',
      'neuro': '/doctors/specialty/psychiatry',
      'diab': '/doctors/specialty/generalpractitioner',
      'thyroid': '/doctors/specialty/womenshealth',
    };
    const route = screenMap[speciality.id] || '/doctors/specialty/generalpractitioner';
    router.push(route);
  }, [router]);

  return (
    <View style={styles.container}>
      <OnlineHeader />

      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <SearchBarAnimated
          placeholder="Search Specialities"
          borderColor={DoctorsTheme.colors.teal}
        />

        <SpecialityGrid
          data={ONLINE_SPECIALITIES}
          title="Find Doctor for Online Consult by Speciality"
          showViewAll
          columns={4}
          onItemPress={handleSpecialityPress}
        />

        <OnlineSymptomsGrid />

        <AskApolloPromoCard />

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
