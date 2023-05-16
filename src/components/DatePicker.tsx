import { format } from "date-fns";
import { ClassNames, DateFormatter, DayPicker, ModifiersClassNames, SelectSingleEventHandler } from "react-day-picker"
import styles from 'react-day-picker/dist/style.css';
import { useDispatch, useSelector } from "react-redux"
import { currentCalendar, setDay, setMonth } from "../store/modules/calendar";
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
    isModal }: {
        isOpen: boolean
        isModal: boolean
    }) {
    const dispatch = useDispatch()
    const { day, days, year, month } = useSelector(currentCalendar)
    const selectedDay = new Date(day)
    return (
        <div>
            <DayPicker
                showOutsideDays
                fixedWeeks
                // locale={ko}
                classNames={classNames}
                modifiersClassNames={modifiersClassNames}
                mode="single"
                formatters={{ formatCaption }}
                month={new Date(`${year}-${month}`)}
                onMonthChange={(e: unknown) => dispatch(setMonth((e as Date).toString()))}
                onSelect={(e: unknown) => {
                    dispatch(setDay((e as SelectSingleEventHandler).toString()));
                    // dispatch(setCurrentSchedule({
                    //     ...currentSchedule,
                    //     date: format((e as Date), 'yyyy-MM-dd')
                    // }))
                }}
                selected={selectedDay}
            />
        </div>
    )
}