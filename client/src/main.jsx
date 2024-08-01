import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from "./redux/store";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate";
import { BrowserRouter } from 'react-router-dom'
import customTheme from "./theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
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
