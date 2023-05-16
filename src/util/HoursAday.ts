




export type typeHours = {
    text: string
    hour: number
}

function create24HoursArray() {

    const hours: Array<typeHours> = []
    for (let i = 0; i < 12; i++) {
        const hour = i
        const item = { text: `오전 ${i === 0 ? 12 : i}`, hour }
        hours.push(item)
    }
    for (let i = 0; i < 12; i++) {
        const hour = i === 0 ? 12 : i + 12
        const item = { text: `오후 ${i === 0 ? 12 : i}`, hour }
        hours.push(item)
    }
    return hours
}

export const hours24 = create24HoursArray()