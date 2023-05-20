import { useSelector } from "react-redux";
import AddScheduleButton from "../components/AddScheduleButton";
import AddScheduleModal from "../components/AddScheduleModal";
import Header from "../components/Header";
import LeftCalendar from "../components/LeftCalendar";
import MonthCalendar from "../components/MonthCalendar";
import ScheduleCalendar from "../components/ScheduleCalendar";
import getThisMonth from "../util/getThisMonth";
import { useState } from "react";
import { currentCalendar } from "../store/modules/calendar";
import { format } from "date-fns";
import getThisWeek from "../util/getThisWeek";

export default function CalendarMonth() {

    const { year, month, days, day } = useSelector(currentCalendar)
    const [isLeftCalendar, setIsLeftCalendar] = useState<boolean>(true)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
    const [modalDate, setModalDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'))
    const [timeIndex, setTimeIndex] = useState<number>(0)
    const [weekView, setWeekView] = useState(true);


    return (
        <>
            <Header setWeekView={setWeekView} weekView={false} year={year} month={month} isLeftCalendar={isLeftCalendar} setIsLeftCalendar={setIsLeftCalendar} />
            <main className="flex h-[calc(100%_-_3.5rem)] flex-1">
                <AddScheduleButton isLeftCalendar={true} isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className={`p-5 flex flex-col mt-[65px] ${isLeftCalendar ? 'block' : 'hidden'}`}>

                    <LeftCalendar isOpen={true} isModal={false} />
                </div>

                <div className="flex flex-col h-full overflow-x-scroll flex-1 pr-2">
                    <MonthCalendar
                        daysOfMonth={getThisMonth(days)}
                        setModalDate={setModalDate}
                        setTimeIndex={setTimeIndex}
                        setIsOpenModal={setIsOpen}
                        isDeleteOpen={isDeleteOpen}
                        setIsDeleteOpen={setIsDeleteOpen}
                        isOpen={false}
                        isModal={true}
                        setIsOpen={setIsOpen}
                    />
                </div>

                <AddScheduleModal
                    defaultDate={modalDate}
                    timeIndex={timeIndex}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />

            </main>
        </>
    )
}