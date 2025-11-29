import { Switch } from 'antd';
import { useTheme } from 'shared/theme';

export const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();

  const toggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return <Switch onChange={toggle} />;
};
