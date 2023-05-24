import { useSelector } from "react-redux";
import { currentCalendar, setDay } from "../store/modules/calendar";
import { useDispatch } from "react-redux";
import { Dispatch, SetStateAction, useState } from "react";


import { schedules } from "../store/modules/shedule";
import { dayOfWeek } from "../util/dayOfWeek";
import { typeDays } from "../..";

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
    startDate,
    endDate,
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
    startDate: string;
    endDate: string;
}) {
    const { year, month } = useSelector(currentCalendar);
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
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const emptyCells = new Array(firstDayOfWeek).fill(null);
    const daysCells = daysOfMonth.map((dayItem) => {
        const date = new Date(year, month - 1, dayItem.date);
        const scheduleDataForCurrentDay = scheduleData[date.toISOString().split('T')[0]];
        return {
            date: date.getDate(),
            scheduleData: scheduleDataForCurrentDay || [],
        };
    });

    const [deleteBox, setDeleteBox] = useState<{ top: number; left: number }>({ top: 100, left: 100 });
    type typeScheduleDetail = {
        title: string;
        color: string;
    };

    return (
        <div>
            <div></div>
            <div className="grid grid-cols-7">
                {dayOfWeek.map((day) => (
                    <div key={day} className="bg-white py-2 border border-solid">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7">
                {emptyCells.map((_, index) => (
                    <div key={`empty-${index}`} className="border border-solid border-gray-300 border-r-0 border-t-0 h-[110px]" />
                ))}
                {daysOfMonth?.map((dayItem) => {
                    if (dayItem.date) {
                        const currentDay = new Date(year, month - 1, dayItem.date);
                        let style = {};
                        let title = '';
                        let titleStyle: Record<string, string> = {};
                        const scheduleDataForCurrentDay = scheduleData[currentDay.toISOString().split('T')[0]];
                        const startDateObj = new Date(startDate);
                        const endDateObj = new Date(endDate);

                        if (currentDay >= startDateObj && currentDay <= endDateObj) {
                            if (scheduleDataForCurrentDay) {
                                scheduleDataForCurrentDay.forEach((s: typeScheduleDetail) => {
                                    titleStyle = {
                                        ...titleStyle, // 기존 스타일 유지
                                        backgroundColor: s.color,
                                        height: '30px',
                                    };
                                    title = s.title;
                                });
                            }
                        }

                        return (
                            <div
                                key={dayItem.date}
                                className="border border-solid border-gray-300 border-r border-t-0 h-[110px]"
                                onClick={() => {
                                    const selectedDate = new Date(year, month - 1, dayItem.date);
                                    dispatch(setDay(selectedDate.toISOString()));
                                    setIsOpen(!isOpen);
                                    console.log('dayItem.date', dayItem.date)
                                }}
                            >
                                {dayItem.date !== 1 ? dayItem.date - 1 : null}
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
