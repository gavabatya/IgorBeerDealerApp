import { BrowserRouter } from 'react-router-dom';
import { WelcomeNavigationRouter } from './interface-adapters/navigation/WelcomeNavigationRouter';

function App() {
  return (
    <BrowserRouter>
      <WelcomeNavigationRouter />
    </BrowserRouter>
  );
}

export default App;
