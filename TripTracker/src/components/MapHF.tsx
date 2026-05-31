import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { colors } from '../theme/colors';

interface MapHFProps {
  height?: number;
  radius?: number;
  markers?: boolean;
}

export function MapHF({ height = 150, radius = 18, markers = true }: MapHFProps) {
  return (
    <View style={[styles.container, { height, borderRadius: radius }]}>
      {/* street grid overlay via nested views */}
      <View style={StyleSheet.absoluteFill}>
        {/* park block */}
        <View style={styles.park} />
        {/* water block */}
        <View style={styles.water} />
      </View>

      <Svg
        viewBox="0 0 320 150"
        preserveAspectRatio="none"
        style={StyleSheet.absoluteFill}
        width="100%"
        height="100%">
        <Path
          d="M40 120 C 96 96, 120 100, 158 78 S 250 44, 286 26"
          fill="none"
          stroke={colors.accent}
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        {markers && (
          <>
            <Circle cx="40" cy="120" r="6.5" fill="#0a0c10" stroke="#fff" strokeWidth="2.6" />
            <Circle cx="286" cy="26" r="7" fill={colors.accent} stroke="#fff" strokeWidth="2.2" />
          </>
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0a0c10',
  },
  park: {
    position: 'absolute',
    left: '8%',
    top: '14%',
    width: 54,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(79,192,126,0.10)',
  },
  water: {
    position: 'absolute',
    right: '6%',
    bottom: '10%',
    width: 70,
    height: 46,
    borderRadius: 8,
    backgroundColor: 'rgba(80,140,220,0.12)',
  },
});
