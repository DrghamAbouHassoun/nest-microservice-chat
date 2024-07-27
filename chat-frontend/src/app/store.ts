import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth.slice';
import chatReducer from './features/chat.slice';
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"]
}

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store);