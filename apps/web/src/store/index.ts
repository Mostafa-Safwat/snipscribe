import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Import reducers
import themeReducer from './slices/themeSlice';
import authReducer from './slices/authSlice';
import redirectPathReducer from './slices/redirectPathSlice';

// Configure Redux Persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['theme', 'auth', 'redirectPath'],
};

const rootReducer = combineReducers({
    theme: themeReducer,
    auth: authReducer,
    redirectPath: redirectPathReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Create persistor
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
