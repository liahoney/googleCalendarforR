import { useSelector } from "react-redux";
import Header from "../components/Header";
import { useState } from "react";
import { currentCalendar } from "../store/modules/calendar";


export default function Calendar() {
    const { year, month } = useSelector(currentCalendar)
    const [isLeftCalendar, setIsLeftCalendar] = useState<boolean>(true)

    return (

        <>
            <Header year={year} month={month} isLeftCalendar={isLeftCalendar} setIsLeftCalendar={setIsLeftCalendar} />

        </>
    )
}