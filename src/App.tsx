import { Navigation } from './interface-adapters/Navigation.tsx';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthContextProvider } from './context/AuthContext.tsx';
import { MyErrorBoundary } from './features/MyErrorBoundary/MyErrorBoundary.tsx';
function App() {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <MyErrorBoundary>
          <Navigation />
        </MyErrorBoundary>
      </AuthContextProvider>
    </Provider>
  );
}

export default App;
