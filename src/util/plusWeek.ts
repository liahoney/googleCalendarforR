

export default function plusWeek(date: string, week: number): string {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + week * 7)
    return newDate.toString()

}