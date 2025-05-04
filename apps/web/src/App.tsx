import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { ThemeProvider } from './theme/ThemeProvider';
import { AuthProvider } from './auth/AuthProvider';
import AppRoutes from './routes/AppRoutes';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={<CircularProgress />} persistor={persistor}>
                <ThemeProvider>
                    <AuthProvider>
                        <BrowserRouter>
                            <AppRoutes />
                            <ToastContainer position="top-right" autoClose={5000} />
                        </BrowserRouter>
                    </AuthProvider>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;
