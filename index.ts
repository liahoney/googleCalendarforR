



export type typeDays = {
    date: number
    dayOfWeek: number
    isToday: boolean
    isSelected: boolean
    isThisWeek: boolean
    isThisMonth: boolean
    day: string
    index: number
}

export type typeHours = {
    text: string
    hour: number
}

export type typeMinutes = {
    text: string
    hour: number
    minute: number
}

export interface timeProps {
    text?: string;
    hour?: number;
    minute?: number;
}

export interface calendarType {
    date: string;
    days: string[];
    month: string;
    weekDates: string[];
    startTime: timeProps;
    endTime: timeProps;
}


export type typeTime = { hour: number, minute: number }
export type typeColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue'
export type typeScheduleDetail = { start: typeTime; end: typeTime; color: typeColor; title: string }

export type typeSchedule = { [key: string]: Array<typeScheduleDetail> }

