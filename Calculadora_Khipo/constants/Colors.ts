import { useColorScheme } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

/**
 * Hook para obter automaticamente as cores do tema atual.
 * Exemplo de uso: const colors = useThemeColors();
 */
export const useThemeColors = () => {
  const theme = useColorScheme() || 'light'; // Define 'light' como padrão caso não seja detectado
  return Colors[theme];
};
