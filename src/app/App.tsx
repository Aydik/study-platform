import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from 'app/router/AppRouter.tsx';
import { useEffect } from 'react';
import { useAuthStore } from 'features/auth';
import { App as AntdApp } from 'antd';

function App() {
  const { checkAuth, doInit } = useAuthStore();

  useEffect(() => {
    checkAuth().then(() => doInit());
  }, [checkAuth, doInit]);

  return (
    <AntdApp>
      <BrowserRouter basename="/study-platform/">
        <AppRouter />
      </BrowserRouter>
    </AntdApp>
  );
}

export default App;
