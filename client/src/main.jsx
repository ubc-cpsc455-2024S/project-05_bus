import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { store, persistor } from './redux/store';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Auth0ProviderWithNavigate } from './auth0-provider-with-navigate';
import { BrowserRouter } from 'react-router-dom';
import customTheme from './theme';
import { PageLoader } from './components/Auth/PageLoader.jsx';

function Root() {
  const [isPurged, setIsPurged] = useState(false);

  useEffect(() => {
    const purgePersistedState = async () => {
      await persistor.purge();
      setIsPurged(true);
    };
    
    purgePersistedState();
  }, []);

  if (!isPurged) {
    return <PageLoader />;
  }

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Auth0ProviderWithNavigate>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <ChakraProvider theme={customTheme}>
                <App />
              </ChakraProvider>
            </PersistGate>
          </Provider>
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
