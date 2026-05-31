import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, {
  Path,
  Line,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import { colors } from '../theme/colors';

const START = -125;
const SWEEP = 250;
const R = 92;
const CX = 120;
const CY = 120;

function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

function arcPath(cx: number, cy: number, r: number, start: number, end: number): string {
  const [sx, sy] = polar(cx, cy, r, start);
  const [ex, ey] = polar(cx, cy, r, end);
  const large = Math.abs(end - start) > 180 ? 1 : 0;
  return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
}

interface GaugeProps {
  value?: number;
  max?: number;
  sub?: string;
  size?: number;
}

export function Gauge({ value = 0, max = 260, sub = 'km/h', size = 246 }: GaugeProps) {
  const frac = Math.max(0, Math.min(1, value / max));
  const needle = START + SWEEP * frac;
  const ticks = Array.from({ length: 14 }, (_, i) => START + (SWEEP / 13) * i);
  const [nx, ny] = polar(CX, CY, R - 22, needle);

  return (
    <View style={{ width: size, height: size, position: 'relative' }}>
      <Svg
        viewBox="0 0 240 240"
        width={size}
        height={size}
        style={{ position: 'absolute', top: 0, left: 0 }}>
        <Defs>
          <LinearGradient id="prog" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={colors.redBright} />
            <Stop offset="1" stopColor={colors.redDeep} />
          </LinearGradient>
        </Defs>

        {ticks.map((t, i) => {
          const major = i % 3 === 0;
          const [mx1, my1] = polar(CX, CY, R + 12, t);
          const [mx2, my2] = polar(CX, CY, R + (major ? 1 : 5), t);
          return (
            <Line
              key={i}
              x1={mx1}
              y1={my1}
              x2={mx2}
              y2={my2}
              stroke={i >= 11 ? colors.red : 'rgba(255,255,255,0.32)'}
              strokeWidth={major ? 2 : 1.2}
              strokeLinecap="round"
            />
          );
        })}

        {/* track */}
        <Path
          d={arcPath(CX, CY, R, START, START + SWEEP)}
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="9"
          strokeLinecap="round"
        />
        {/* redline zone */}
        <Path
          d={arcPath(CX, CY, R, START + SWEEP * 0.84, START + SWEEP)}
          fill="none"
          stroke={colors.redDeep}
          strokeWidth="9"
          strokeOpacity={0.55}
          strokeLinecap="round"
        />
        {/* progress arc */}
        <Path
          d={arcPath(CX, CY, R, START, Math.max(START + 0.5, needle))}
          fill="none"
          stroke="url(#prog)"
          strokeWidth="9"
          strokeLinecap="round"
        />
        {/* needle */}
        <Line
          x1={CX}
          y1={CY}
          x2={nx}
          y2={ny}
          stroke={colors.redBright}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <Circle cx={CX} cy={CY} r="7" fill="#16181d" stroke={colors.silver2} strokeWidth="1.5" />
        <Circle cx={CX} cy={CY} r="2.4" fill={colors.redBright} />
      </Svg>

      {/* center readout */}
      <View style={[StyleSheet.absoluteFill, styles.gaugeCenter]}>
        <Text style={styles.gaugeValue}>{Math.round(value)}</Text>
        <Text style={styles.gaugeSub}>{sub}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gaugeCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
  gaugeValue: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 78,
    fontWeight: '600',
    color: '#fff',
    includeFontPadding: false,
    lineHeight: 80,
  },
  gaugeSub: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: colors.txt3,
    marginTop: 2,
  },
});
