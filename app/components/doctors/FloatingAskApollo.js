import React, { memo, useEffect, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { DoctorsTheme } from './DoctorsTheme';

const FloatingAskApollo = memo(() => {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -8,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [bounceAnim]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: bounceAnim }] }]}>
      <TouchableOpacity
        style={styles.button}
        accessibilityRole="button"
        accessibilityLabel="Ask Apollo AI assistant"
      >
        <Text style={styles.icon}>🤖</Text>
        <Text style={styles.label}>Ask{'\n'}Apollo</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

FloatingAskApollo.displayName = 'FloatingAskApollo';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 90,
    right: 16,
    zIndex: 100,
  },
  button: {
    backgroundColor: DoctorsTheme.colors.white,
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    ...DoctorsTheme.shadow.level2,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
  },
  icon: {
    fontSize: 20,
  },
  label: {
    fontSize: 7,
    fontWeight: '600',
    color: DoctorsTheme.colors.apolloOrange,
    textAlign: 'center',
    lineHeight: 9,
  },
});

export default FloatingAskApollo;
