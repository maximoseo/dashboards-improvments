import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  darkMode: ['class'],
  theme: { extend: { colors: { ink: '#08070d', panel: '#11101a', violet: '#8b5cf6', aurora: '#bdfcff' }, boxShadow: { glow: '0 0 40px rgba(139,92,246,.28)' } } },
  plugins: [],
};
export default config;
