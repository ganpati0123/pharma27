import { useInsuranceStore, THEME } from '../store';

/**
 * Custom hook for dark mode support in the Insurance module.
 * Returns the current theme colors based on isDarkMode state.
 */
const useTheme = () => {
  const isDarkMode = useInsuranceStore((state) => state.isDarkMode);
  const toggleDarkMode = useInsuranceStore((state) => state.toggleDarkMode);
  const colors = isDarkMode ? THEME.dark : THEME.light;

  return {
    isDarkMode,
    toggleDarkMode,
    colors,
  };
};

export default useTheme;
