import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from 'app/router/AppRouter.tsx';

function App() {
  return (
    <BrowserRouter basename="/study-platform/">
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
