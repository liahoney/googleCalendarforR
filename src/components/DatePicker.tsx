import { format } from "date-fns";
import { ClassNames, DateFormatter, DayPicker, ModifiersClassNames, MonthChangeEventHandler, SelectSingleEventHandler } from "react-day-picker"
import styles from 'react-day-picker/dist/style.css';
import { useDispatch, useSelector } from "react-redux"
import { currentCalendar, nextMonth, setDay, setMonth, setYear } from "../store/modules/calendar";
import { schedules, setCurrentSchedule } from "../store/modules/shedule"
import { ko } from "date-fns/locale";
const modifiersClassNames: ModifiersClassNames = {
    today: 'today',
    selected: 'selected',
    outside: 'outside'
}
const classNames: ClassNames = {
    ...styles,
    caption: 'caption',
    nav: 'nav',
    head: 'head',
    table: 'table',
    row: 'row',
    cell: 'cell',
}



const formatCaption: DateFormatter = (month, options) => (format(month, 'yyyy년 M월', { locale: options?.locale }));

export default function DatePicker({
    isOpen,
    isModal,
}: {
    isOpen: boolean
    isModal: boolean

}) {
    const dispatch = useDispatch()
    const { day, days, year, month } = useSelector(currentCalendar)
    const { date, scheduleData } = useSelector(schedules)
    const selectedDay = new Date(day)

    const handleMonthChange: MonthChangeEventHandler = (date: Date) => {
        const monthIndex = date.getMonth();
        const yearValue = date.getFullYear();

        dispatch(setYear(yearValue)); // 년도 변경
        dispatch(setMonth(monthIndex.toString())); // 월 변경
    };
    return (
        <div>
            <DayPicker
                showOutsideDays
                fixedWeeks
                locale={ko}
                classNames={classNames}
                modifiersClassNames={modifiersClassNames}
                mode="single"
                formatters={{ formatCaption }}
                month={new Date(`${year}-${month}`)}
                onMonthChange={handleMonthChange}
                onSelect={(e: unknown) => {
                    dispatch(setDay((e as SelectSingleEventHandler).toString()));
                    dispatch(setCurrentSchedule({ startDate: selectedDay.toString(), endDate: selectedDay.toString(), data: scheduleData }));

                }}
                selected={selectedDay}
            />
        </div>
    )
}