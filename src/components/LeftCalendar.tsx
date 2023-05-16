import DatePicker from "./DatePicker";

export default function LeftCalendar({ isOpen, isModal }: { isOpen: boolean; isModal: boolean }) {
    return (
        <>
            <DatePicker isOpen={true} isModal={false} />
        </>
    )
}