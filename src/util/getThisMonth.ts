import { typeDays } from "../.."

export default function getThisMonth(days: typeDays[]): typeDays[] {
    const isThisMonth = (element: typeDays) => element.isThisMonth;
    return days.filter(isThisMonth);
}