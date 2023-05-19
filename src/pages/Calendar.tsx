import { useSelector } from "react-redux";
import Header from "../components/Header";
import { useState } from "react";
import { currentCalendar } from "../store/modules/calendar";
import LeftCalendar from "../components/LeftCalendar";
import ScheduleCalendar from "../components/ScheduleCalendar";
import { format } from "date-fns";
import getThisWeek from "../util/getThisWeek";
import AddScheduleButton from "../components/AddScheduleButton";
import AddScheduleModal from "../components/AddScheduleModal";
import MonthCalendar from "./MonthCalendar";



export default function Calendar() {
    const { year, month, days } = useSelector(currentCalendar)
    const [isLeftCalendar, setIsLeftCalendar] = useState<boolean>(true)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
    const [modalDate, setModalDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'))
    const [timeIndex, setTimeIndex] = useState<number>(0)
    const [weekView, setWeekView] = useState(true);


    return (

        <>
            <Header setWeekView={setWeekView} weekView={weekView} year={year} month={month} isLeftCalendar={isLeftCalendar} setIsLeftCalendar={setIsLeftCalendar} />
            <main className="flex h-[calc(100%_-_3.5rem)] flex-1">
                <AddScheduleButton isLeftCalendar={true} isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className={`p-5 flex flex-col mt-[65px] ${isLeftCalendar ? 'block' : 'hidden'}`}>

                    <LeftCalendar isOpen={true} isModal={false} />
                </div>




                {weekView ? <div className="flex flex-col h-full overflow-x-scroll flex-1 pr-2">
                    <ScheduleCalendar
                        days={getThisWeek(days)}
                        setModalDate={setModalDate}
                        setTimeIndex={setTimeIndex}
                        setIsOpenModal={setIsOpen}
                        isDeleteOpen={isDeleteOpen}
                        setIsDeleteOpen={setIsDeleteOpen} />

                </div> :
                    <div className="flex flex-col h-full overflow-x-scroll flex-1 pr-2">
                        <MonthCalendar
                            setIsOpen={setIsOpen}
                        // isOpen={isOpen} setIsOpen={setIsOpen}
                        /></div>}

                <AddScheduleModal
                    defaultDate={modalDate}
                    timeIndex={timeIndex}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen} />

            </main>
        </>
    )
}