import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { RootState } from ".."
import { typeSchedule, typeScheduleDetail } from "../../.."




const initialState: typeSchedule = {
    '2023-01-01': [
        {
            start: { hour: 1, minute: 1 },
            end: { hour: 1, minute: 59 },
            color: 'red',
            title: '공부'
        }]
}
export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        addSchedule: (state, action: PayloadAction<{ date: string, data: typeScheduleDetail }>) => {
            if (!state[action.payload.date]) {
                state[action.payload.date] = []
            }
            else {
                state[action.payload.date] = [...state[action.payload.date], action.payload.data]
            }
        },
        removeSchedule: (state, action: PayloadAction<{ date: string, index: number }>) => {
            const { date, index } = action.payload;
            const scheduleArray = state[date]; // 해당 날짜의 스케줄 배열

            if (scheduleArray && scheduleArray.length > index) {
                scheduleArray.splice(index, 1); // 해당 인덱스의 스케줄 삭제
            }
        },
        setCurrentSchedule: (state, action: PayloadAction<{ date: string, data: typeScheduleDetail[] }>) => {
            state[action.payload.date] = action.payload.data
        },
    }

})

export const { addSchedule, removeSchedule, setCurrentSchedule } = scheduleSlice.actions
export const schedules = (state: RootState) => state.schedule
export default scheduleSlice.reducer