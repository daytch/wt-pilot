import React from "react";
import PropTypes from 'prop-types';
import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline"
import DatePicker from "react-datepicker"

const Datepicker = (props)=>{
    const {
        tipe,
        dateFormat,
        placeholder,
        onChange,
        compRef,
        timeFormat,
        timeIntervals,
        timeCaption,
        selected} = props

switch (tipe) {
    case "date":
        return (
            <div className="relative">
              <DatePicker
                wrapperClassName="wrapperdatePicker"
                className="dateandtimepicker-hp py-1 px-2 block w-full border-gray-300 rounded border-2 text-[10px] focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                dateFormat={dateFormat?dateFormat:"dd-MM-yyyy"}
                placeholderText={placeholder ? placeholder : "Please select"}
                selected={
                    selected ? selected : new Date()
                }
                ref={compRef}
                onChange={onChange}
              />
              <div className="flex absolute inset-y-0 right-0 items-center pointer-events-none pr-3">
                <CalendarDaysIcon className="h-5 w-5" />
              </div>
            </div>)
    case "time":
        return (
            <div className="relative">
              <DatePicker
                ref={compRef}
                onChange={onChange}
                selected={
                  selected ? selected : new Date()
                }
                showTimeSelect
                showTimeSelectOnly
                timeFormat={timeFormat?timeFormat:"HH:mm"}
                timeIntervals={timeIntervals?timeIntervals:15}
                timeCaption={timeCaption ?timeCaption:"Pilih Jam"}
                dateFormat={dateFormat?dateFormat:"HH:mm"}
                wrapperClassName="wrapperdatePicker"
                placeholderText={placeholder?placeholder:"Jam Rencana"}
                className="datepicker py-1 px-2 block w-full border-gray-300 rounded border-2 text-[10px] focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              />
              <div className="flex absolute inset-y-0 right-0 items-center pointer-events-none pr-3">
                <ClockIcon className="h-5 w-5" />
              </div>
            </div>)

    default:
        break;
}
}

Datepicker.PropTypes= {
    tipe: PropTypes.string,
    dateFormat: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    compRef: PropTypes.any,
    timeFormat: PropTypes.string,
    timeIntervals: PropTypes.number,
    timeCaption: PropTypes.string,
    selected: PropTypes.any
}

export default Datepicker