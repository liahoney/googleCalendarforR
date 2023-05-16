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

        <header className="flex items-center jutify-between px-2 w-full h-14 border-b border-gray-300"
        >
            <div className="flex items-center">
                <div
                    className="flex items-center p-2 rounded-full hover:bg-slate-100 cursor-pointer"
                    onClick={() => setIsLeftCalendar(!isLeftCalendar)}

                >
                    <img src="./menu.svg" alt="logo" width={30} height={30} />
                </div>
                <div className="flex items-center ml-3">
                    <img src="/calendar.svg" alt="logo" width={30} height={30} />
                    <h1 className="ml-2 text-lg text-gray-500 hidden md:block">캘린더</h1>
                </div>
                <div>
                    <div className="flex items-center">
                        <button
                            className="px-3 py-1 mx-3 border border-gray-200 rounded text-sm"
                            onClick={() => dispatch(setDay(new Date().toString()))}
                        >
                            오늘
                        </button>
                        <img src="./ChevronLeft.svg" alt="logo" width={30} height={30}
                            onClick={() => dispatch(lastWeek())}
                            className="cursor-pointer" />
                        <img src="./ChevronRight.svg" alt="logo" width={30} height={30}
                            className="cursor-pointer"
                            onClick={() => dispatch(nextWeek())} />
                        <span className="text-sm md:text-lg ml-3">{year}년{month}월</span>
                    </div>

                </div>
            </div>
            <span className="px-3 py-1 mx-3 border border-gray-200 rounded text-sm ml-auto">주</span>
        </header>


    )
}