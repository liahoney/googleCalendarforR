import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { typeDays } from "../..";
import { useDispatch, useSelector } from "react-redux";
import { removeSchedule, schedules } from "../store/modules/shedule";
import { hours24 } from "../util/HoursAday";

export default function ScheduleCalendar({
    days,
    setModalDate,
    setTimeIndex,
    setIsOpenModal,
    isDeleteOpen,
    setIsDeleteOpen }: {
        days: typeDays[]
        setModalDate: Dispatch<SetStateAction<string>>
        setTimeIndex: Dispatch<SetStateAction<number>>
        setIsOpenModal: Dispatch<SetStateAction<boolean>>
        isDeleteOpen: boolean
        setIsDeleteOpen: Dispatch<SetStateAction<boolean>>
    }) {
    const dispatch = useDispatch()
    const scheduleData = useSelector(schedules)
    const [deleteBox, setDeleteBox] = useState<{ top: number; left: number }>({ top: 100, left: 100 })
    const [deleteSchedule, setDeleteSchedule] = useState<{ date: string; index: number }>({
        date: '',
        index: 0
    })

    const modalHandle = (date: string, hour: number) => {
        setModalDate(date)
        setTimeIndex(hour)
        setIsOpenModal(true)
        setIsDeleteOpen(false)
    }

    const scheduleHandle = (
        cursor: { top: number; left: number },
        scheduleData: { date: string; index: number },
    ) => {
        setIsOpenModal(false)
        setIsDeleteOpen(true)
        setDeleteBox(cursor)
        setDeleteSchedule(scheduleData)
    }

    const deleteHandle = () => {
        setIsDeleteOpen(false)
        dispatch(removeSchedule({ date: deleteSchedule.date, index: deleteSchedule.index }))
    }
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토']

    useEffect(() => {
        if (isDeleteOpen) {
            document.getElementById('schedule')!.style.overflow = 'hidden'
        } else {
            document.getElementById('schedule')!.style.overflow = 'auto'
        }
    }, [isDeleteOpen])

    return (
        <>
            <div className="overflow-auto w-full flex flex-col mb-2" id="schedule">
                <div className="flex flex-col flex-1">
                    <div className="sticky top-0 flex bg-pink z-20">
                        <div className="min-w-[70px] w-[70px] bg-yellow" />
                        {days.map((day, index) => (
                            <div className="flex-1 min-w-[81px] flex flex-col  bg-white z-20 pt-4" key={index}>
                                <div className="text-center font-light text-sm">{dayOfWeek[index]}</div>
                                <div className="text-center font-light text-2xl p-1">
                                    <div className={`w-10 h-10 rounded-full m-auto flex justify-center items-center
                                ${day.isToday && 'bg-blue-500 text-skyblue'}`}>
                                        {day.date}
                                    </div>
                                </div>

                            </div>))}
                    </div>
                </div>
            </div>
            <div className="flex flex-1">
                <div className="bg-white sticky left-0 top-0 w-20 min-w-[70px] w-[70px] bg-white z-10">
                    {hours24.map(hour => (
                        <div className="font-light text-[12px] h-[60px] text-right pr-2" key={hour.text}>
                            {hour.text}시
                        </div>
                    ))}

                </div>

            </div>

        </>
    )
}