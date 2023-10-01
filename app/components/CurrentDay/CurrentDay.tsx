import { formatDate } from '@/utils/formatDate';
import { endOfDay, isBefore, isSameMonth, isToday, parse } from 'date-fns';
import React, { useContext, useMemo, useState } from 'react'
import EventModal from '../Event/EventModal';
import styles from "./CurrentDay.module.css"
import { TEvent } from '@/types/EventType';
import { EventContext } from '@/context/EventContext';

type TCalendarDayProps = {
    day: Date;
    showWeekName: boolean;
    selectedMonth: Date;
    events: TEvent[];
}
const CurrentDay = ({day, showWeekName, selectedMonth, events} : TCalendarDayProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const {updateEvent, addEvent, deleteEvent} = useContext(EventContext);
    const sortedEvents = useMemo(() => {
        const timeToNumber = (time: string) => parseFloat(time.replace(":", "."));
        return [...events].sort((a, b) => {
            if(a.allDay && b.allDay) return 0;
            if(a.allDay) return -1;
            if(b.allDay) return 1;
            return timeToNumber(a.startTime) - timeToNumber(b.startTime);
        })
    }, [events])
  return (
        <div className={`${styles["day-styles"]} ${!isSameMonth(day, selectedMonth) && `${styles["non-month-day"]}`} ${isBefore(endOfDay(day), new Date()) && `{${styles["old-month-day"]}`}`}>
                <div className={styles["day-header"]}>
                    {showWeekName && (
                        <div className={styles["week-name"]}>{formatDate(day, { weekday: "short" })}</div>
                    )}
                <div className={`${styles["day-number"]} ${isToday(day) && styles["today-date"]}`}>{formatDate(day, {day: "numeric"})}</div>
                <button className={styles["add-event"]} onClick={() => setModalOpen(true)}>+</button>
                </div>
                {sortedEvents.length > 0 && (
                <div className={styles["single-event"]}>
                    {sortedEvents.map((event) => {
                        return (
                            <>
                        <button onClick={() => setIsEditModalOpen(true)} key={event.id} type="button" className={event.allDay ? styles["all-day-event"] : styles["day-event"]}>
                            {
                                event.allDay ? (
                                <div className={`${styles["event-name"]} ${styles[`selected-${event.color}`]}`}>{event.name}</div>
                                ) : (
                                    <>
                                    <div className={`${styles["color-dot"]} ${styles[`selected-${event.color}`]}`}></div>
                                    <div className={styles["event-time"]}>
                                        {formatDate(parse(event.startTime, "HH:mm", event.date), {
                                            timeStyle: "short"
                                        })}
                                    </div>
                                    <div className={styles["event-name"]}>{event.name}</div>
                                    </>
                                )
                            }
                        </button>
                        <EventModal date={day} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSubmit={(e: TEvent) => updateEvent(event.id, e)} event={event} onDelete={() => deleteEvent(event.id)}/>
                        </>
                        )
                    })}
                </div>
                )}
                {modalOpen && (
                    <EventModal date={day} isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={addEvent}/>
                )}
        </div>
  )
}

export default CurrentDay