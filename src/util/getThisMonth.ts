import { typeDays } from "../.."

export default function getThisMonth(days: typeDays[]): typeDays[] {
    const isThisMonth = (element: typeDays) => element.isThisMonth;
    console.log('days?', days)
    return days.filter(isThisMonth);
}