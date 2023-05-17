import AddScheduleButton from "./AddScheduleButton";
import DatePicker from "./DatePicker";
import { useState } from "react";

export default function LeftCalendar({ isOpen, isModal }: { isOpen: boolean; isModal: boolean }) {
    const [isLeftCalendarOpen, setIsLeftCalendarOpen] = useState(false);

    return (
        <>
            {/* <AddScheduleButton
                isLeftCalendar={false}
                isOpen={isLeftCalendarOpen}
                setIsOpen={setIsLeftCalendarOpen}
            /> */}
            <DatePicker isOpen={isOpen} isModal={isModal} />
        </>
    );
}