import { formatDate } from '@/utils/formatDate';
import { endOfDay, isBefore, isSameMonth, isToday } from 'date-fns';
import React, { useState } from 'react'
import EventModal from '../Event/EventModal';
import styles from "./CurrentDay.module.css"

type TCalendarDayProps = {
    day: Date;
    showWeekName: boolean;
    selectedMonth: Date;
}
const CurrentDay = ({day, showWeekName, selectedMonth} : TCalendarDayProps) => {
    const [modalOpen, setModalOpen] = useState(false);
  return (
        <div className={`${styles["day-styles"]} ${!isSameMonth(day, selectedMonth) && `${styles["non-month-day"]}`} ${isBefore(endOfDay(day), new Date()) && `{${styles["old-month-day"]}`}`}>
                <div className={styles["day-header"]}>
                    {showWeekName && (
                        <div className={styles["week-name"]}>{formatDate(day, { weekday: "short" })}</div>
                    )}
                <div className={`${styles["day-number"]} ${isToday(day) && styles["today-date"]}`}>{formatDate(day, {day: "numeric"})}</div>
                <button className={styles["add-event"]} onClick={() => setModalOpen(true)}>+</button>
                </div>
                <EventModal date={day} isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={() => null}/>
        </div>
  )
}

export default CurrentDay