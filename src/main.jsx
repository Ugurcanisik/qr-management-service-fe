import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { PersistGate } from 'redux-persist/integration/react';
import PanelTheme from './theme/qr-management';
import { store, persistor } from './redux/store';
import { injectStore } from './helpers/ServerAxios';
import { ModalsProvider } from '@mantine/modals';
import App from './App';

injectStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={new PanelTheme()}>
          <Notifications position='top-center' />
            <ModalsProvider>
                <App />
            </ModalsProvider>
        </MantineProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
