import React, { memo, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { DoctorsTheme, ONTIME_SPECIALITIES } from '../components/doctors/DoctorsTheme';
import StickyHeader from '../components/doctors/StickyHeader';
import SearchBarAnimated from '../components/doctors/SearchBarAnimated';
import SpecialityGrid from '../components/doctors/SpecialityGrid';
import FloatingAskApollo from '../components/doctors/FloatingAskApollo';
import GoToTopButton from '../components/doctors/GoToTopButton';

// On-Time Hero Banner
const OnTimeHero = memo(() => (
  <View style={heroStyles.container}>
    <View style={heroStyles.left}>
      <Text style={heroStyles.clock}>⏰</Text>
      <View style={heroStyles.refundBadge}>
        <Text style={heroStyles.refundPercent}>100%</Text>
        <Text style={heroStyles.refundLabel}>Refund</Text>
      </View>
    </View>
    <View style={heroStyles.right}>
      <View style={heroStyles.newBadge}>
        <Text style={heroStyles.newBadgeText}>NEWLY LAUNCHED</Text>
      </View>
      <Text style={heroStyles.title}>On Time Guarantee</Text>
      <Text style={heroStyles.subtitle}>
        Get a <Text style={heroStyles.bold}>refund</Text> if doctor does not connect{'\n'}within <Text style={heroStyles.bold}>10 mins</Text> for a Digital Consult
      </Text>
    </View>
  </View>
));
OnTimeHero.displayName = 'OnTimeHero';

const heroStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#F5F9FF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  left: {
    alignItems: 'center',
    width: 90,
  },
  clock: {
    fontSize: 50,
  },
  refundBadge: {
    backgroundColor: DoctorsTheme.colors.apolloOrange,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 4,
    alignItems: 'center',
  },
  refundPercent: {
    color: DoctorsTheme.colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
  refundLabel: {
    color: DoctorsTheme.colors.white,
    fontSize: 10,
    fontWeight: '600',
  },
  right: {
    flex: 1,
  },
  newBadge: {
    backgroundColor: '#DAA520',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  newBadgeText: {
    color: DoctorsTheme.colors.white,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12,
    color: DoctorsTheme.colors.textSecondary,
    lineHeight: 18,
  },
  bold: {
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
  },
});

// Call to Book Banner
const CallToBookBanner = memo(() => (
  <TouchableOpacity style={callStyles.container} accessibilityRole="button" accessibilityLabel="Call to book appointment">
    <Ionicons name="call" size={22} color={DoctorsTheme.colors.teal} />
    <Text style={callStyles.text}>Call to book appointment</Text>
    <Ionicons name="chevron-forward" size={20} color={DoctorsTheme.colors.textSecondary} />
  </TouchableOpacity>
));
CallToBookBanner.displayName = 'CallToBookBanner';

const callStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: '#E8F5F5',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    gap: 12,
  },
  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
  },
});

// Main On-Time Screen
export default function Ontime() {
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
      'gp': '/doctors/specialty/generalpractitioner',
      'obstetrics': '/doctors/specialty/womenshealth',
      'psych': '/doctors/specialty/psychiatry',
      'ent': '/doctors/specialty/generalpractitioner',
      'paed': '/doctors/specialty/generalpractitioner',
      'derma': '/doctors/specialty/dermatology',
      'uro': '/doctors/specialty/cardiology',
      'gastro': '/doctors/specialty/generalpractitioner',
      'diet': '/doctors/specialty/generalpractitioner',
    };
    const route = screenMap[speciality.id] || '/doctors/specialty/generalpractitioner';
    router.push(route);
  }, [router]);

  return (
    <View style={styles.container}>
      <StickyHeader backgroundColor={DoctorsTheme.colors.headerLightBlue} />

      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <SearchBarAnimated
          placeholder="Search Specialities"
          borderColor={DoctorsTheme.colors.border}
        />

        <OnTimeHero />

        <SpecialityGrid
          data={ONTIME_SPECIALITIES}
          title="Find Doctor for On-Time Guarantee"
          columns={4}
          size="large"
          onItemPress={handleSpecialityPress}
        />

        <CallToBookBanner />

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
