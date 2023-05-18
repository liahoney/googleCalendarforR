import { typeDays } from "../..";

export default function getThisWeek(days: typeDays[]): typeDays[] {
    const isThisWeekAndSunday = (element: typeDays) => element.isThisWeek && element.dayOfWeek === 0
    const thisWeekAndSundayIndex = days.findIndex(isThisWeekAndSunday)
    return (
        days.slice(thisWeekAndSundayIndex, thisWeekAndSundayIndex + 7))
}
