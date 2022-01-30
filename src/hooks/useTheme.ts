import { useCallback, useState } from 'react';
import { Theme } from '../themes/theme';
import defaultTheme from '../themes/default';
import modernTheme from '../themes/modern';
import classicTheme from '../themes/classic';

function useTheme(initialTheme = defaultTheme.name) {
  const loadTheme = useCallback((name: string | undefined): Theme => {
    if (!name) {
      return defaultTheme;
    }

    if (name === modernTheme.name) {
      return modernTheme;
    }

    if (name === classicTheme.name) {
      return classicTheme;
    }

    return defaultTheme;
  }, [defaultTheme, modernTheme, classicTheme]);

  const [theme, updateTheme] = useState<Theme>(loadTheme(initialTheme));
  const setTheme = useCallback((name: string) => {
    updateTheme(loadTheme(name));
  }, [updateTheme, loadTheme]);

  return [theme, setTheme] as const;
}

export default useTheme;
