import { format } from 'date-fns';
import { typeDays } from '../../index'
import checkIsThisWeek from './checkIsThisWeek';


export default function getCalendar({ select, current }: { select: Date; current: Date }): {
    days: typeDays[]
    month: number
    week: number
    year: number
} {
    const todayDate = new Date().getDate()
    const todayMonth = new Date().getMonth()
    const selectDate = select.getDate()
    const selectMonth = select.getMonth()
    const currentYear = current.getFullYear()
    const currentMonth = current.getMonth()
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const days: typeDays[] = []
    let dayOfWeek = firstDay.getDay()
    let dayNumber = 1

    if (dayOfWeek !== 0) {
        const lastDayOfLastMonth = new Date(currentYear, currentMonth, 0)
        for (let i = dayOfWeek - 1; i >= 0; i--) {
            const y = lastDayOfLastMonth.getFullYear()
            const d = lastDayOfLastMonth.getDate() - i
            const m = lastDayOfLastMonth.getMonth()
            const day = new Date(y, m, d)
            days.push({
                date: d,
                dayOfWeek: lastDayOfLastMonth.getDay() - i,
                isToday: d === todayDate && m === todayMonth,
                isSelected: d === selectDate && m === selectMonth,
                isThisWeek: checkIsThisWeek(day, current),
                isThisMonth: false,
                day: format(day as Date, 'yyyy-MM-dd'),
            })
        }
    }

    while (dayNumber <= lastDay.getDate()) {
        const day = new Date(currentYear, currentMonth, dayNumber)
        days.push({
            date: dayNumber,
            dayOfWeek,
            isToday: dayNumber === todayDate && currentMonth === todayMonth,
            isSelected: dayNumber === selectDate && currentMonth === selectMonth,
            isThisWeek: checkIsThisWeek(day, current),
            isThisMonth: true,
            day: format(day as Date, 'yyyy-MM-dd'),
        })
        dayNumber++
        dayOfWeek = (dayOfWeek + 1) % 7
    }

    if (dayOfWeek !== 0) {
        const nextDayOfNextMonth = new Date(currentYear, currentMonth + 1, 1)
        for (let i = 0; i < 7 - dayOfWeek; i++) {
            const y = nextDayOfNextMonth.getFullYear()
            const d = nextDayOfNextMonth.getDate()
            const m = nextDayOfNextMonth.getMonth()
            const day = new Date(y, m, d)
            days.push({
                date: d + i,
                dayOfWeek: dayOfWeek + i,
                isToday: d === todayDate && m === todayMonth,
                isSelected: d === selectDate && m === selectMonth,
                isThisWeek: checkIsThisWeek(day, current),
                isThisMonth: false,
                day: format(day as Date, 'yyyy-MM-dd'),
            })
        }
    }

    return { days, month: currentMonth + 1, year: currentYear, week: dayOfWeek }
}
