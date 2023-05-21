import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 로컬 스토리지 사용 예시
import calendarReducer from './modules/calendar'
import scheduleReducer from './modules/shedule'

const persistConfig = {
    key: "root",
    storage,
    // 다른 설정 옵션 (옵셔널)
};

const rootReducer = combineReducers({
    calendar: calendarReducer,
    schedule: scheduleReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
