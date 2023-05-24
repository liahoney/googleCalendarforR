import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { format } from "date-fns";

export interface typeScheduleDetail {
    start: { hour: number; minute: number };
    end: { hour: number; minute: number };
    color: string;
    title: string;
    startDate: string;
    endDate: string;
}

export interface typeSchedule {
    [date: string]: typeScheduleDetail[];
}


export const getDatesInRange = (startDate: string, endDate: string): string[] => {
    const dates: string[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
        dates.push(format(currentDate, 'yyyy-MM-dd'));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
};

const initialState: typeSchedule = {
    '2023-03-01': [
        {
            start: { hour: 1, minute: 1 },
            end: { hour: 1, minute: 59 },
            color: 'red',
            title: '공부',
            startDate: '2023-03-01',
            endDate: '2023-03-05',
        }
    ]
};

export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        addSchedule: (state, action: PayloadAction<typeScheduleDetail>) => {
            const { start, end, color, title, startDate, endDate } = action.payload;



            const schedule: typeScheduleDetail = {
                start,
                end,
                color,
                title,
                startDate,
                endDate,
            };

            const dateRange = getDatesInRange(startDate, endDate); // Helper function to get the range of dates

            dateRange.forEach((date) => {
                if (!state[date]) {
                    state[date] = [];
                }
                state[date].push(schedule);
            });
        },

        removeSchedule: (state, action: PayloadAction<{ date: string, index: number }>) => {
            const { date, index } = action.payload;
            const scheduleArray = state[date]; // 해당 날짜의 스케줄 배열

            if (scheduleArray && scheduleArray.length > index) {
                scheduleArray.splice(index, 1); // 해당 인덱스의 스케줄 삭제
            }
        },

        setCurrentSchedule: (state, action: PayloadAction<{
            startDate: string,
            endDate: string,
            data: typeScheduleDetail[]
        }>) => {
            const { startDate, endDate, data } = action.payload;

            const dateRange = getDatesInRange(startDate, endDate); // Helper function to get the range of dates

            dateRange.forEach((date) => {
                if (!state[date]) {
                    state[date] = [];
                }
                state[date] = data;
            });
        },
    }
});

export const { addSchedule, removeSchedule, setCurrentSchedule } = scheduleSlice.actions;
export const schedules = (state: RootState) => state.schedule;
export default scheduleSlice.reducer;
