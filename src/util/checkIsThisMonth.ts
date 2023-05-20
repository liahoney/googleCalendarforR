export default function checkIsThisMonth(day: Date, current: Date): boolean {
    const currentYear = current.getFullYear();
    const currentMonth = current.getMonth();
    const currentDay = current.getDate();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getTime();
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getTime();

    return firstDayOfMonth <= day.getTime() && day.getTime() <= lastDayOfMonth;
}