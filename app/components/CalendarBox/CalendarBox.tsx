"use client"
import React, { useContext, useMemo, useState } from 'react'
import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, isSameDay, startOfMonth, startOfWeek, subMonths } from "date-fns";
import CurrentDay from '../CurrentDay/CurrentDay';
import { formatDate } from '@/utils/formatDate';
import { EventContext } from '@/context/EventContext';
import styles from "./CalendarBox.module.css"
import { TEvent } from '@/types/EventType';

const CalendarBox = () => {
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const days = useMemo(() => {
        const firstWeekStart = startOfWeek(startOfMonth(selectedMonth));
        const lastWeekEnd = endOfWeek(endOfMonth(selectedMonth));
        return eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd })
    }, [selectedMonth]) 

    const {events} = useContext(EventContext);
    console.log("events", events)
  return (
    <div>
         <div className={styles["calendar-styles"]}>
        <div className={styles["header-styles"]}>
          <button className={styles["today-btn"]} onClick={() => {setSelectedMonth(new Date())}}>Today</button>
          <div>
            <button className={styles["month-change-btn"]} onClick={() => setSelectedMonth((prev) => subMonths(prev, 1))}>&lt;</button>
            <button className={styles["month-change-btn"]} onClick={() => setSelectedMonth((prev) => addMonths(prev, 1))}>&gt;</button>
          </div>
          <span className={styles["month-title"]}>{formatDate(selectedMonth, {month: "long", year: "numeric"})}</span>
        </div>
        <div className={styles["days-container"]}>
            {days.map((currentDay, index) => (
                <CurrentDay key={currentDay.getTime()} day={currentDay} showWeekName={index < 7} events={events.filter((event: TEvent) => isSameDay(currentDay, event.date))} selectedMonth={selectedMonth}/>
            ))}
            </div>
      </div>
    </div>
  )
}

export default CalendarBox