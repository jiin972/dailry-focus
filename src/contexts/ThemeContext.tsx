/*eslint-disable react-refresh/only-export-components*/ //useTheme eslint 규칙 무시

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
//컨텍스트 생성 및 기본값 설정(내부용, 숨김)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode; //children은 모든 react 요소(provider 내)
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const initialTheme = (localStorage.getItem('theme') as Theme) || 'light';
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  //theme이 바뀔 때 마다 실행(글로벌 스위치에 연결)
  useEffect(() => {
    const root = window.document.documentElement; //window는 Global Objcet
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
// 커스텀 훅 생성(theme상태관리)
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
