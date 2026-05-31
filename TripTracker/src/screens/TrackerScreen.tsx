import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';
import { Gauge } from '../components/Gauge';
import { StatRow } from '../components/StatRow';
import { MapHF } from '../components/MapHF';
import { TabBar, TabKey } from '../components/TabBar';
import { colors } from '../theme/colors';

interface TrackerScreenProps {
  tracking: boolean;
  value: number;
  elapsed: string;
  onToggle: () => void;
  onNav: (k: TabKey) => void;
}

function LiveDot() {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.6, duration: 900, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 900, useNativeDriver: true }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [scale]);

  return (
    <View style={styles.dotWrap}>
      <Animated.View style={[styles.dotRing, { transform: [{ scale }] }]} />
      <View style={styles.dot} />
    </View>
  );
}

export function TrackerScreen({ tracking, value, elapsed, onToggle, onNav }: TrackerScreenProps) {
  const statItems = [
    { value: tracking ? 130 : '—', label: 'Top km/h' },
    { value: tracking ? 84 : '—', label: 'Avg km/h' },
    { value: tracking ? 220 : '—', label: 'Distance km' },
  ];

  return (
    <View style={styles.cockpit}>
      {/* header */}
      <View style={styles.header}>
        <View style={styles.statusRow}>
          {tracking && <LiveDot />}
          <Text style={[styles.eyebrow, { color: tracking ? colors.txt : colors.txt3 }]}>
            {tracking ? 'Recording' : 'Ready to drive'}
          </Text>
        </View>
        <Text style={[styles.elapsed, { color: tracking ? '#fff' : colors.txt3 }]}>
          {tracking ? elapsed : '00:00:00'}
        </Text>
      </View>

      {/* scrollable body */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Gauge value={tracking ? value : 0} sub="km/h current" />

        <View style={styles.surf}>
          <StatRow items={statItems} />
        </View>

        {tracking ? (
          <View style={styles.mapRow}>
            <MapHF height={64} radius={16} />
            <View style={styles.nearBy}>
              <Text style={[styles.eyebrow, { fontSize: 9 }]}>Now near</Text>
              <Text style={styles.nearName}>Stinson Beach</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.gpsInfo}>
            GPS LOCKED · 9 SATELLITES{'\n'}
            <Text style={{ color: colors.txt2 }}>Last trip · 222 km · 2h 38m</Text>
          </Text>
        )}
      </ScrollView>

      {/* CTA */}
      <View style={styles.ctaWrap}>
        <TouchableOpacity
          style={[styles.cta, tracking ? styles.ctaStop : styles.ctaStart]}
          onPress={onToggle}
          activeOpacity={0.85}>
          <Text style={styles.ctaText}>{tracking ? '■  Stop trip' : '▶  Start trip'}</Text>
        </TouchableOpacity>
      </View>

      <TabBar active="track" onNav={onNav} />
    </View>
  );
}

const styles = StyleSheet.create({
  cockpit: {
    flex: 1,
    backgroundColor: '#101319',
  },
  header: {
    paddingTop: 56,
    paddingHorizontal: 22,
    paddingBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  dotWrap: {
    width: 8,
    height: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotRing: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(228,18,31,0.35)',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  eyebrow: {
    fontFamily: 'sans-serif-medium',
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    color: colors.txt3,
  },
  elapsed: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 17,
    letterSpacing: 0.4,
    color: colors.txt3,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 6,
    gap: 22,
  },
  surf: {
    width: '100%',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  mapRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  nearBy: {
    minWidth: 96,
  },
  nearName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.txt,
    marginTop: 3,
  },
  gpsInfo: {
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: 'sans-serif-medium',
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: colors.txt3,
  },
  ctaWrap: {
    paddingHorizontal: 22,
    paddingTop: 4,
    paddingBottom: 14,
  },
  cta: {
    width: '100%',
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaStart: {
    backgroundColor: colors.red,
    shadowColor: colors.redGlow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 22,
    elevation: 8,
  },
  ctaStop: {
    backgroundColor: colors.red,
    shadowColor: colors.redGlow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 22,
    elevation: 8,
  },
  ctaText: {
    fontFamily: 'sans-serif-medium',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 1.5,
    color: '#fff',
    textTransform: 'uppercase',
  },
});
