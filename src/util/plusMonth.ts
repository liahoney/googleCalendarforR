

export default function plusMonth(date: string, month: number): string {
    const newDate = new Date(date)
    newDate.setDate(1)
    newDate.setDate(newDate.getMonth() + month)
    return newDate.toString()

}