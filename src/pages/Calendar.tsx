import { useSelector } from "react-redux";
import Header from "../components/Header";
import { useState } from "react";
import { currentCalendar } from "../store/modules/calendar";
import LeftCalendar from "../components/LeftCalendar";
import ScheduleCalendar from "../components/ScheduleCalendar";
import { format } from "date-fns";
import getThisWeek from "../util/getThisWeek";


export default function Calendar() {
    const { year, month, days } = useSelector(currentCalendar)
    const [isLeftCalendar, setIsLeftCalendar] = useState<boolean>(true)
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
    const [modalDate, setModalDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'))
    const [timeIndex, setTimeIndex] = useState<number>(0)
    return (

        <>
            <Header year={year} month={month} isLeftCalendar={isLeftCalendar} setIsLeftCalendar={setIsLeftCalendar} />
            <main className="flex h-[calc(100%_-_3.5rem)] flex-1">
                {/* <AddScheduleButton /> */}
                <div className={`p-5 flex flex-col mt-[65px] ${isLeftCalendar ? 'block' : 'hidden'}`}>
                    {/* <LeftCalendarTitle/> */}
                    <LeftCalendar isOpen={true} isModal={false} />
                </div>
                <div className="flex flex-col h-full overflow-x-scroll flex-1 pr-2">
                    <ScheduleCalendar
                        days={getThisWeek(days)}
                        setModalDate={setModalDate}
                        setTimeIndex={setTimeIndex}
                        setIsOpenModal={setIsOpenModal}
                        isDeleteOpen={isDeleteOpen}
                        setIsDeleteOpen={setIsDeleteOpen} />

                </div>
                {/* <AddScheduleModal/> */}

            </main>
        </>
    )
}