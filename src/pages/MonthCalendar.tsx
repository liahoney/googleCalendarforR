import { typeDays } from "../..";

export default function MonthCalendar(

) {
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토']
    return (
        <>
            <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
                {dayOfWeek.map((day) => (
                    <div key={day} className="bg-white py-2">
                        {day}
                    </div>
                ))}
            </div>
        </>

    )
}