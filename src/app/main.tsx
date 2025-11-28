import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/index.scss';
import { ThemeProvider } from 'shared/theme';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ConfigProvider locale={ruRU}>
        <App />
      </ConfigProvider>
    </ThemeProvider>
  </StrictMode>,
);
