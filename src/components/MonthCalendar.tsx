import { useSelector } from "react-redux";
import { currentCalendar, lastMonth, setDay, setMonth, setYear } from "../store/modules/calendar";
import { useDispatch } from "react-redux";
import { Dispatch, SetStateAction, useState } from "react";
import { typeScheduleDetail } from "../..";
import { typeDays } from "../..";
import { schedules } from "../store/modules/shedule";
import { dayOfWeek } from "../util/dayOfWeek";
import { constants } from "buffer";

export default function MonthCalendar({
    daysOfMonth,
    setModalDate,
    setTimeIndex,
    setIsOpenModal,
    isDeleteOpen,
    setIsDeleteOpen,
    isOpen,
    isModal,
    setIsOpen,
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
    const { day, year, month, days } = useSelector(currentCalendar);
    const dispatch = useDispatch();
    const scheduleData = useSelector(schedules);

    const [deleteSchedule, setDeleteSchedule] = useState<{ date: string; index: number }>({
        date: '',
        index: 0
    });
    const scheduleHandle = (
        cursor: { top: number; left: number },
        scheduleData: { date: string; index: number },
    ) => {
        setIsOpenModal(false);
        setIsDeleteOpen(true);
        setDeleteBox(cursor);
        setDeleteSchedule(scheduleData);
    };
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const firstDayOfWeek = firstDayOfMonth.getDay(); // 첫 번째 날의 요일 (0부터 일요일, 6까지 토요일)
    const emptyCells = new Array(firstDayOfWeek).fill(null); // 첫 번째 날 이전의 빈 칸
    const daysCells = daysOfMonth.map((dayItem) => {
        const date = new Date(year, month - 1, dayItem.date);
        const scheduleDataForCurrentDay = scheduleData[date.toISOString().split('T')[0]];
        return {
            date: date.getDate(),
            scheduleData: scheduleDataForCurrentDay || [],
            // 기타 필요한 속성들...
        };
    });

    const [deleteBox, setDeleteBox] = useState<{ top: number; left: number }>({ top: 100, left: 100 });


    const handlePreviousMonth = () => {
        let newMonth = month - 1;
        let newYear = year;
        let adjustedMonth = newMonth;

        if (newMonth === 0) {
            newYear = year;
            adjustedMonth = -1;
        }

        dispatch(setYear(newYear));
        dispatch(setMonth((newMonth - 1).toString()));

    };

    const handleNextMonth = () => {
        const newMonth = month;
        let newYear = year;
        let adjustedMonth = newMonth;

        if (newMonth > 12) {
            newYear = year;
            adjustedMonth = 1;
        }

        dispatch(setYear(newYear));
        dispatch(setMonth(adjustedMonth.toString()));


    };
    return (
        <div>
            <div>


            </div>
            <div className="grid grid-cols-7  ">
                {dayOfWeek.map((day) => (
                    <div key={day} className="bg-white py-2 border border-solid">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 ">
                {emptyCells.map((_, index) => (
                    <div key={`empty-${index}`} className="border border-solid border-gray-300 border-r-0 border-t-0 h-[110px]" />
                ))}
                {daysOfMonth?.map((dayItem) => {
                    if (dayItem.date) {
                        const currentDay = new Date(year, month - 1, dayItem.date);
                        let style = {};
                        let title = '';
                        let titleStyle: any = {};
                        const scheduleDataForCurrentDay = scheduleData[currentDay.toISOString().split('T')[0]];
                        if (scheduleDataForCurrentDay) {
                            scheduleDataForCurrentDay?.forEach((s: typeScheduleDetail) => {
                                const start = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate());
                                const end = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate());
                                if (currentDay >= start && currentDay <= end) {
                                    titleStyle = {
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
                                className="border border-solid border-gray-300 border-r border-t-0 h-[110px]"
                                onClick={() => {
                                    const selectedDate = new Date(year, month - 1, dayItem.date);
                                    dispatch(setDay(selectedDate.toISOString()));
                                    setIsOpen(!isOpen);
                                }}
                            >
                                {dayItem.date}
                                <div style={titleStyle}>{title}</div>
                            </div>
                        );
                    }

                    return null;
                })}
            </div>
        </div>
    );
}
