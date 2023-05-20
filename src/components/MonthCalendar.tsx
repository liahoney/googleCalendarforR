import { useSelector } from "react-redux";
import { currentCalendar, setDay, setMonth } from "../store/modules/calendar";
import { useDispatch } from "react-redux";
import { Dispatch, SetStateAction, useState } from "react";
import { typeScheduleDetail } from "../.."
import { typeDays } from "../..";
import { schedules } from "../store/modules/shedule";

export default function MonthCalendar({
    daysOfMonth,
    setModalDate,
    setTimeIndex,
    setIsOpenModal,
    isDeleteOpen,
    setIsDeleteOpen,
    isOpen,
    isModal,
    setIsOpen
}: {
    daysOfMonth: typeDays[];
    setModalDate: Dispatch<SetStateAction<string>>;
    setTimeIndex: Dispatch<SetStateAction<number>>;
    setIsOpenModal: Dispatch<SetStateAction<boolean>>;
    isDeleteOpen: boolean;
    setIsDeleteOpen: Dispatch<SetStateAction<boolean>>;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    isModal: boolean;
    isOpen: boolean;
}) {
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const { day, year, month, days } = useSelector(currentCalendar);
    const dispatch = useDispatch();
    const scheduleData = useSelector(schedules);
    // const [isOpen, setIsOpen] = useState<boolean>(false);

    const [deleteSchedule, setDeleteSchedule] = useState<{ date: string; index: number }>({
        date: '',
        index: 0
    })
    const scheduleHandle = (
        cursor: { top: number; left: number },
        scheduleData: { date: string; index: number },
    ) => {
        setIsOpenModal(false)
        setIsDeleteOpen(true)
        setDeleteBox(cursor)
        setDeleteSchedule(scheduleData)
    }

    const [deleteBox, setDeleteBox] = useState<{ top: number; left: number }>({ top: 100, left: 100 })
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
                    <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
                        {daysOfMonth.map((dayItem) => {
                            const currentDay = new Date(year, month - 1, dayItem.date);
                            let style = {};
                            let title = '';
                            const scheduleDataForCurrentDay = scheduleData[currentDay.toISOString().split('T')[0]];
                            if (scheduleDataForCurrentDay) {
                                scheduleDataForCurrentDay.forEach((s: typeScheduleDetail) => {
                                    const start = new Date(currentDay.getFullYear(),
                                        currentDay.getMonth(), currentDay.getDate(), s.start.hour, s.start.minute);
                                    const end = new Date(currentDay.getFullYear(),
                                        currentDay.getMonth(), currentDay.getDate(), s.end.hour, s.end.minute);
                                    if (currentDay >= start && currentDay <= end) {
                                        style = {
                                            backgroundColor: s.color,
                                            height: '30px',
                                        };
                                        title = s.title;
                                    }
                                });
                            }
                            return (
                                <div
                                    key={dayItem.date}
                                    className="border border-solid border-gray-300 border-r-0 border-t-0 h-[110px]"
                                    style={style}
                                    onClick={() => {
                                        const selectedDate = new Date(year, month - 1, dayItem.date);
                                        dispatch(setDay(selectedDate.toISOString()));
                                        setIsOpen(!isOpen);
                                    }}
                                >
                                    {dayItem.date}
                                    {title}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
