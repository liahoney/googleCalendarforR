import { Dispatch, SetStateAction } from "react"

export default function AddScheduleButton({
    isLeftCalendar,
    isOpen,
    setIsOpen }: {
        isLeftCalendar: boolean
        isOpen: boolean
        setIsOpen: Dispatch<SetStateAction<boolean>>
    }) {
    return (
        <div
            className={`fixed z-50 top-[60px] left-0 bg-white h-[70px] flex items-center
             ${isLeftCalendar ? 'w-[320px] justify-start pl-5' : 'w-[70px] justify-center'}`}
        >
            {/* <button
                className={`border shadow-md bd-white w-14 h-14 rounded-full hover:shadow-xl
                ${isLeftCalendar && 'hidden'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg
                    className="m-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    height="36px"
                    viewBox="0 0 24 24"
                    width="36px"
                    fill="#222222"
                >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
            </button> */}
            <button
                className={`border shadow-md bd-white flex items-center w-28 h-14 rounded-full hover:shadow-xl
                ${isLeftCalendar}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg
                    className="m-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    height="36px"
                    viewBox="0 0 24 24"
                    width="36px"
                    fill="#222222"
                >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
                <span className="ml-3">만들기</span>
            </button>
        </div>
    )

}