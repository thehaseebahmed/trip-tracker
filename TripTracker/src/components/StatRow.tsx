import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface StatItem {
  value: string | number;
  unit?: string;
  label: string;
}

export function StatRow({ items }: { items: StatItem[] }) {
  return (
    <View style={styles.row}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <View style={styles.divider} />}
          <View style={styles.cell}>
            <Text style={styles.value}>
              {it.value}
              {it.unit ? <Text style={styles.unit}> {it.unit}</Text> : null}
            </Text>
            <Text style={styles.label}>{it.label}</Text>
          </View>
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    alignSelf: 'stretch',
    marginVertical: 4,
    backgroundColor: colors.silver2,
    opacity: 0.4,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  value: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 30,
    fontWeight: '600',
    color: '#fff',
    includeFontPadding: false,
  },
  unit: {
    fontSize: 13,
    color: colors.txt3,
  },
  label: {
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: colors.txt3,
    marginTop: 5,
  },
});
