import React, { useState, useEffect, useRef } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { TrackerScreen } from './src/screens/TrackerScreen';
import { colors } from './src/theme/colors';
import type { TabKey } from './src/components/TabBar';

const DEMO_SPEED = 94;

function fmt(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return [h, m, s].map(n => String(n).padStart(2, '0')).join(':');
}

export default function App() {
  const [tab, setTab] = useState<TabKey>('track');
  const [tracking, setTracking] = useState(false);
  const [secs, setSecs] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (tracking) {
      timer.current = setInterval(() => setSecs(s => s + 1), 1000);
    } else {
      if (timer.current) clearInterval(timer.current);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [tracking]);

  const handleToggle = () => {
    if (tracking) {
      setTracking(false);
    } else {
      setSecs(0);
      setTracking(true);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg1} />
      <TrackerScreen
        tracking={tracking}
        value={DEMO_SPEED}
        elapsed={fmt(secs)}
        onToggle={handleToggle}
        onNav={setTab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg0,
  },
});
