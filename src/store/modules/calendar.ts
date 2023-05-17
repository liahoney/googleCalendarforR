import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import plusWeek from "../../util/plusWeek";
import plusMonth from "../../util/plusMonth";
import { typeDays } from "../../..";
import getCalendar from "../../util/getCalendar";
import { RootState } from "..";

type CurrentType = { day: string; days: typeDays[]; year: number; month: number }
type CalendarType = {
    select: string
    current: CurrentType
}

const today = new Date()
const initCalendar = getCalendar({ select: today, current: today })
const initialState: CalendarType = {
    select: today.toString(),
    current: {
        day: new Date(today).toString(),
        days: initCalendar.days,
        year: initCalendar.year,
        month: initCalendar.month
    }
}

const generateNewDate = ({ selectDate, changeDate }: { selectDate: string, changeDate: string }) => {
    return getCalendar({
        select: new Date(selectDate),
        current: new Date(changeDate)
    })
}



export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        nextWeek: (state) => {
            const plusWeekDate = plusWeek(state.current.day, 1)
            const newDate = generateNewDate({ selectDate: state.select, changeDate: plusWeekDate })
            state.current = { day: plusWeekDate, ...newDate }
        },
        nextMonth: (state) => {
            const plusMonthDate = plusMonth(state.current.day, 1)
            const newDate = generateNewDate({ selectDate: state.select, changeDate: plusMonthDate })
            state.current = { day: plusMonthDate, ...newDate }
        },
        lastMonth: (state) => {
            const minusMonthDate = plusMonth(state.current.day, -1)
            const newDate = generateNewDate({ selectDate: state.select, changeDate: minusMonthDate })
            state.current = { day: minusMonthDate, ...newDate }
        },
        lastWeek: (state) => {
            const minusWeekDate = plusWeek(state.current.day, -1)
            const newDate = generateNewDate({ selectDate: state.select, changeDate: minusWeekDate })
            state.current = { day: minusWeekDate, ...newDate }
        },
        setDay: (state, action: PayloadAction<string>) => {
            state.select = action.payload
            const selectDate = new Date(action.payload).toString()
            const newDate = generateNewDate({ selectDate: selectDate, changeDate: selectDate })
            state.current = { day: selectDate, ...newDate }
        },
        setMonth: (state, action: PayloadAction<string>) => {
            const selectDate = new Date(state.select);
            selectDate.setMonth(Number(action.payload));
            const selectDateString = selectDate.toString();
            const newDate = generateNewDate({ selectDate: selectDateString, changeDate: selectDateString });
            state.select = selectDateString;
            state.current = { day: selectDateString, ...newDate };
        },


    }

})

export const { nextWeek, nextMonth, lastWeek, lastMonth, setDay, setMonth } = calendarSlice.actions
export const currentCalendar = (state: RootState) => state.calendar.current
export default calendarSlice.reducer