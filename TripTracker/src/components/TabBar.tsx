import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '../theme/colors';

function IcGauge({ c = colors.txt3 }: { c?: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.6" />
      <Path d="M12 12L16 8.5" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
      <Circle cx="12" cy="12" r="1.7" fill={c} />
    </Svg>
  );
}

function IcClock({ c = colors.txt3 }: { c?: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.6" />
      <Path
        d="M12 7.5V12l3.2 2"
        stroke={c}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export type TabKey = 'track' | 'hist' | 'badge';

const tabs: { k: TabKey; label: string }[] = [
  { k: 'track', label: 'Tracker' },
  { k: 'hist', label: 'History' },
  { k: 'badge', label: 'Badges' },
];

interface TabBarProps {
  active: TabKey;
  onNav: (k: TabKey) => void;
}

export function TabBar({ active, onNav }: TabBarProps) {
  return (
    <View style={styles.bar}>
      {tabs.map(t => {
        const on = active === t.k;
        const ic = on ? colors.accent : colors.txt3;
        return (
          <TouchableOpacity key={t.k} style={styles.btn} onPress={() => onNav(t.k)}>
            <View style={styles.glyph}>
              {t.k === 'track' && <IcGauge c={ic} />}
              {t.k === 'hist' && <IcClock c={ic} />}
              {t.k === 'badge' && (
                <Text style={[styles.sparkGlyph, { color: ic }]}>✦</Text>
              )}
            </View>
            <Text style={[styles.label, on && styles.labelOn]}>{t.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 26,
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
    backgroundColor: 'rgba(8,9,11,0.9)',
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
  },
  glyph: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkGlyph: {
    fontSize: 17,
    lineHeight: 22,
  },
  label: {
    fontFamily: 'sans-serif-medium',
    fontWeight: '700',
    fontSize: 10.5,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.txt3,
  },
  labelOn: {
    color: colors.txt,
  },
});
