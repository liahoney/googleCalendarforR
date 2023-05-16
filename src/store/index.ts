import { configureStore } from "@reduxjs/toolkit"
import calendarReducer from './modules/calendar'
import scheduleReducer from './modules/shedule'
export const store = configureStore({
    reducer: {
        calendar: calendarReducer,
        schedule: scheduleReducer,
    },

})

export type RootState = ReturnType<typeof store.getState>