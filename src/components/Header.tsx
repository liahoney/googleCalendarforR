import { Dispatch, SetStateAction } from "react"
import { useDispatch } from "react-redux"
import { lastMonth, lastWeek, nextWeek, setDay } from "../store/modules/calendar"
import DatePicker from "./DatePicker"

export default function Header({
    year,
    month,
    isLeftCalendar,
    setIsLeftCalendar
}: {
    year: number
    month: number
    isLeftCalendar: boolean
    setIsLeftCalendar: Dispatch<SetStateAction<boolean>>
}) {
    const dispatch = useDispatch()
    return (
        <>
            this is Header
            <div>
                <div onClick={() => setIsLeftCalendar(!isLeftCalendar)}>
                    <img src="./menu.svg" alt="logo" width={30} height={30} />
                    <DatePicker isOpen={true} isModal={true} />
                </div>
                <img src="/calendar.svg" alt="logo" width={30} height={30} />
                <h1>캘린더</h1>
                <img src="./ChevronLeft.svg" alt="logo" width={30} height={30}
                    onClick={() => dispatch(lastWeek())} />
                <img src="./ChevronRight.svg" alt="logo" width={30} height={30}
                    onClick={() => dispatch(nextWeek())} />
                <button onClick={() => dispatch(setDay(new Date().toString()))}>오늘</button>
                <span>{year}년{month}월</span>
            </div>
        </>
    )
}