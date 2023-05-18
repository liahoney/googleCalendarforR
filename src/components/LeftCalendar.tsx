import { MonthChangeEventHandler } from "react-day-picker";
import AddScheduleButton from "./AddScheduleButton";
import DatePicker from "./DatePicker";
import { useState } from "react";

export default function LeftCalendar({ isOpen, isModal }: { isOpen: boolean; isModal: boolean }) {
    const [isLeftCalendarOpen, setIsLeftCalendarOpen] = useState(false);

    return (
        <>
            <DatePicker isOpen={isOpen} isModal={isModal} />
        </>
    );
}