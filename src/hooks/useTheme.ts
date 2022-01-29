import { useCallback, useState } from 'react';
import { Theme } from '../themes/theme';
import defaultTheme from '../themes/default';
import amandaTheme from '../themes/amanda-burcroff';
import dexterTheme from '../themes/dexter-chua';

function useTheme(initialTheme = defaultTheme.name) {
  const loadTheme = useCallback((name: string | undefined): Theme => {
    if (!name) {
      return defaultTheme;
    }

    if (name === amandaTheme.name) {
      return amandaTheme;
    }

    if (name === dexterTheme.name) {
      return dexterTheme;
    }

    return defaultTheme;
  }, [defaultTheme, amandaTheme, dexterTheme]);

  const [theme, updateTheme] = useState<Theme>(loadTheme(initialTheme));
  const setTheme = useCallback((name: string) => {
    updateTheme(loadTheme(name));
  }, [updateTheme, loadTheme]);

  return [theme, setTheme] as const;
}

export default useTheme;
