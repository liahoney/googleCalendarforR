import { typeDays } from "../.."

export default function getThisMonth(days: typeDays[]): typeDays[] {
    const isThisMonth = (element: typeDays) => element.isThisMonth
    const thisMonthIndex = days.findIndex(isThisMonth)
    return (
        days.slice(thisMonthIndex, thisMonthIndex + 7))
}