import { ThemeOptions } from './types';

export const THEME_PRESETS: Record<string, ThemeOptions> = {
    light: {
        mode: 'light',
        primaryColor: '#7E57C2', // logo purple
        secondaryColor: '#4DB6AC', // logo mint‑green
        errorColor: '#E57373',
        warningColor: '#FFB300',
        infoColor: '#29B6F6',
        successColor: '#66BB6A',
        fontFamily: '"Poppins", "Helvetica", "Arial", sans‑serif',
        borderRadius: 12,
        textPrimary: 'rgba(0, 0, 0, 0.87)',
        textSecondary: 'rgba(0, 0, 0, 0.6)',
        backgroundDefault: '#F3E5F5', // very light purple wash
        backgroundPaper: '#FFFFFF',
        backgroundElevated: '#FAFAFF',
    },
    dark: {
        mode: 'dark',
        primaryColor: '#B39DDB', // light lavender
        secondaryColor: '#80CBC4', // light mint
        errorColor: '#EF9A9A',
        warningColor: '#FFCA28',
        infoColor: '#81D4FA',
        successColor: '#A5D6A7',
        fontFamily: '"Poppins", "Helvetica", "Arial", sans‑serif',
        borderRadius: 12,
        textPrimary: '#FFFFFF',
        textSecondary: 'rgba(255, 255, 255, 0.7)',
        backgroundDefault: '#1A1A2E', // deep purple night
        backgroundPaper: '#2E2E3E',
        backgroundElevated: '#3A3A4A',
    },
} as const;
