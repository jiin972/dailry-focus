import AppRouter from './router/Router';
import { ThemeProvider } from './contexts/ThemeContext';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider>
      <RecoilRoot>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </RecoilRoot>
    </ThemeProvider>
  );
}
export default App;
