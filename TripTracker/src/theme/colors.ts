export const colors = {
  bg0: '#08090b',
  bg1: '#101319',
  bgGlow: '#161b24',

  surface: 'rgba(255,255,255,0.045)',
  surfaceSolid: '#14171d',
  surfaceHi: 'rgba(255,255,255,0.07)',
  hairline: 'rgba(255,255,255,0.085)',
  hairline2: 'rgba(255,255,255,0.14)',

  silver1: '#eef0f2',
  silver2: '#c2c6cc',
  silver3: '#878d96',

  red: '#E4121F',
  redBright: '#FF2436',
  redDeep: '#9c0d16',
  redGlow: 'rgba(228,18,31,0.45)',

  txt: '#F3F4F6',
  txt2: '#9aa1a9',
  txt3: '#5f646d',

  bCrawl: '#F0993A',
  bTown: '#EBCB4A',
  bCruise: '#4FC07E',
  bFast: '#E84049',
  bSpark: '#C0AEFF',

  accent: '#E4121F',
  accentGlow: 'rgba(228,18,31,0.45)',
};

export const speedBands = [
  { max: 30, color: colors.bCrawl, label: '0–30' },
  { max: 80, color: colors.bTown, label: '30–80' },
  { max: 180, color: colors.bCruise, label: '80–180' },
  { max: 250, color: colors.bFast, label: '180–250' },
  { max: Infinity, color: colors.bSpark, label: '250+' },
];

export function luxBand(v: number) {
  return speedBands.find(b => v < b.max) || speedBands[4];
}
