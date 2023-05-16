



export type typeDays = {
    date: number
    dayOfWeek: number
    isToday: boolean
    isSelected: boolean
    isThisWeek: boolean
    isThisMonth: boolean
    day: string
}

export type typeHours = {
    text: string
    hour: number
}


export type typeTime = { hour: number, minute: number }
export type typeColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue'
export type typeScheduleDetail = { start: typeTime; end: typeTime; color: typeColor; title: string }

export type typeSchedule = { [key: string]: Array<typeScheduleDetail> }

