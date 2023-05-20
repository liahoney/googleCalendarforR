import { useSelector } from "react-redux";
import { currentCalendar, setDay, setMonth } from "../store/modules/calendar";
import { useDispatch } from "react-redux";
import { Dispatch, SetStateAction, useState } from "react";
import { schedules } from "../store/modules/shedule";
import { sl } from "date-fns/locale";
import { typeDays } from "../..";




export default function MonthCalendar(
    {
        daysOfMonth,
        setModalDate,
        setTimeIndex,
        setIsOpenModal,
        isDeleteOpen,
        setIsDeleteOpen }: {
            daysOfMonth: typeDays[]
            setModalDate: Dispatch<SetStateAction<string>>
            setTimeIndex: Dispatch<SetStateAction<number>>
            setIsOpenModal: Dispatch<SetStateAction<boolean>>
            isDeleteOpen: boolean
            setIsDeleteOpen: Dispatch<SetStateAction<boolean>>
        }
) {
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토']
    const { day, year, month, days } = useSelector(currentCalendar)
    const dispatch = useDispatch()
    // const selectedDay = new Date(day)
    const scheduleData = useSelector(schedules)
    const [IsModalOpen, setIsModalOpen] = useState<boolean>(false)

    return (

        <div className="lg:flex lg:h-full lg:flex-col col-span-5">
            <div className="shadow-lg mt-3 ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
                <div className="grid grid-cols-7 gap-px border-l border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
                    {dayOfWeek.map((day) => (
                        <div key={day} className="bg-white py-2">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="flex bg-white-200 text-xs leading-6 text-gray-700 lg:flex-auto lg:h-screen md:h-screen overflow-scroll">
                    <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px"
                    >
                        {daysOfMonth.map((day) => (
                            <div key={day.day} className="border border-solid border-gray-300 border-r-0 border-t-0 h-[110px]"
                                onClick={() => {
                                    dispatch(setDay((day.date).toString()))
                                    console.log(`!you clicked ${day.date}day`)
                                    setIsModalOpen(!IsModalOpen)
                                }}
                            >
                                {day.date}
                            </div>
                        ))}
                        {scheduleData[day]?.map((s, idx) => {
                            let top = '20px'
                            let height = '20px'
                            return (
                                <div key={idx} data-schedule={{ date: day, index: idx }} style={{ top: top, height: height, background: 'orange' }}
                                    onClick={() => console.log(`you clicked ${day}day`)}
                                >
                                    {s.title}
                                </div>
                            )
                        }
                        )
                        }


                    </div>
                </div>
            </div>
        </div>


    )
}