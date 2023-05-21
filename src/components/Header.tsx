import { Dispatch, Fragment, SetStateAction, useState } from "react"
import { useDispatch } from "react-redux"
import { lastMonth, lastWeek, nextMonth, nextWeek, setDay, setMonth, setYear } from "../store/modules/calendar"
import DatePicker from "./DatePicker"
import { Menu, Transition } from "@headlessui/react"
import { FiChevronDown } from 'react-icons/fi'
import classNames from "../util/classNames"
import { MonthChangeEventHandler } from "react-day-picker"

export default function Header({
    year,
    month,
    isLeftCalendar,
    setIsLeftCalendar,
    weekView,
    setWeekView,
}: {
    year: number
    month: number
    isLeftCalendar: boolean
    setIsLeftCalendar: Dispatch<SetStateAction<boolean>>
    weekView: boolean
    setWeekView: Dispatch<SetStateAction<boolean>>;
}) {
    const dispatch = useDispatch()
    const [date, setDate] = useState(new Date())

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
            newYear = year + 1;
            adjustedMonth = 1;
        }

        dispatch(setYear(newYear));
        dispatch(setMonth(adjustedMonth.toString()));
    };



    return (

        <header className="flex items-center jutify-between px-2 w-full h-14 border-b border-gray-300"
        >
            <div className="flex items-center">
                <div
                    className="flex items-center p-2 rounded-full hover:bg-slate-100 cursor-pointer"
                    onClick={() => setIsLeftCalendar(!isLeftCalendar)}

                >
                    <img src="./menu.svg" alt="logo" width={30} height={30} />
                </div>
                <div className="flex items-center ml-3">
                    <img src="/calendar.svg" alt="logo" width={30} height={30} />
                    <h1 className="ml-2 text-lg text-gray-500 hidden md:block">캘린더</h1>
                </div>
                <div>
                    <div className="flex items-center">
                        <button
                            className="px-3 py-1 mx-3 border border-gray-200 rounded text-sm"
                            onClick={() => dispatch(setDay(new Date().toString()))}
                        >
                            오늘
                        </button>
                        {weekView ?
                            <>
                                <img src="./ChevronLeft.svg" alt="logo" width={30} height={30}
                                    onClick={() => dispatch(lastWeek())}
                                    className="cursor-pointer" />
                                <img src="./ChevronRight.svg" alt="logo" width={30} height={30}
                                    className="cursor-pointer"
                                    onClick={() => dispatch(nextWeek())} />
                            </>
                            :
                            <>
                                <img
                                    src="./ChevronLeft.svg"
                                    alt="logo"
                                    width={30}
                                    height={30}
                                    onClick={handlePreviousMonth}
                                    className="cursor-pointer"
                                />
                                <img
                                    src="./ChevronRight.svg"
                                    alt="logo"
                                    width={30}
                                    height={30}
                                    className="cursor-pointer"
                                    onClick={handleNextMonth}
                                />
                            </>
                        }
                        <span className="text-sm md:text-lg ml-3">{year}년{month}월</span>
                        <div className="hidden md:ml-4 md:flex md:items-center">
                            <Menu as="div" className="relative">
                                <Menu.Button
                                    type="button"
                                    className="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    {weekView ? "주" : "월"}
                                    <FiChevronDown
                                        className="ml-2 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </Menu.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="/"
                                                        onClick={() => setWeekView(true)}
                                                        className={classNames(
                                                            active
                                                                ? "bg-gray-100 text-gray-900"
                                                                : "text-gray-700",
                                                            "block px-4 py-2 text-sm"
                                                        )}
                                                    >
                                                        주
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="/month"
                                                        onClick={() => setWeekView(false)}
                                                        className={classNames(
                                                            active
                                                                ? "bg-gray-100 text-gray-900"
                                                                : "text-gray-700",
                                                            "block px-4 py-2 text-sm"
                                                        )}
                                                    >
                                                        월
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                        </div>
                    </div>

                </div>
            </div>
            {/* <span className="px-3 py-1 mx-3 border border-gray-200 rounded text-sm ml-auto">주</span> */}
        </header>


    )
}