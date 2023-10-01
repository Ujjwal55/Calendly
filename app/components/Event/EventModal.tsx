import React, { FormEvent, MouseEventHandler, useId, useRef, useState } from 'react'
import Modal from '../Modal/Modal'
import { formatDate } from '@/utils/formatDate';
import styles from "./Event.module.css"
import { TEvent } from '@/types/EventType';


type TEventModalProps = {
    onSubmit: Function;
    onDelete?: Function;
    event?: TEvent;
    date: Date
    isOpen: boolean;
    onClose: () => void;
}
const EventModal = ({onSubmit, onDelete, event, date, ...eventProps}: TEventModalProps) => {
    type Event = {
      date: Date;
      // other properties
    }
    console.log("event", event);
    const edit = event !== undefined;
    const formId = useId();
    const [selectedColor, setSelectedColor] = React.useState(event?.color || "blue");
    const [allDayChecked, setAllDayChecked] = React.useState(event?.allDay || false);
    const [startTime, setStartTime] = useState(event?.startTime || "");
    const endTimeRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    function handleSubmit(e: FormEvent) {
      e.preventDefault();
      const name = nameRef.current?.value;
      const endTime = endTimeRef.current?.value;
      if(name === null || name === "") return;
      if(allDayChecked){
        onSubmit({name, date, color: selectedColor, allDay: true})
      } else {
        if(endTime === null || endTime === "") return;
        onSubmit({name, date, color: selectedColor, allDay: false, startTime, endTime})
      }
      eventProps.onClose();
    }
  return (
    <Modal {...eventProps}>
        <div className={styles["modal-title"]}>
            <div>{event ? "Edit" : "Add New Event"}</div>
            <small>{formatDate(date || event?.date, {dateStyle: "long"})}</small>
            <button className={styles["close-btn"]} onClick={(e) => {eventProps.onClose() ; console.log("cross clicekd")}}>&times;</button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles["event-div"]}>
              <label htmlFor={`${formId}-name`} className={styles["event-boxes"]}>Name</label>
              <input required defaultValue={event?.name} ref={nameRef} type="text" id={`${formId}-name`} />
            </div>
            <div className={`${styles["event-div"]} ${styles["modal-checkbox"]}`}>
              <input  className={styles["event-input"]} type="checkbox" checked={allDayChecked} onChange={() => setAllDayChecked(!allDayChecked)} name="all-day" id={`${formId}-all-day`} />
              <label className={styles["event-boxes"]} id={`${formId}-all-day`}>All Day?</label>
            </div>
            <div className={styles["event-row"]}>
              <div className={styles["event-div"]}>
                <label className={styles["event-boxes"]} htmlFor={`${formId}-start-time`}>Start Time</label>
                <input className={styles["event-input"]} value={startTime} onChange={(e) => setStartTime(e.target.value)} required={!allDayChecked} disabled={allDayChecked}  type="time" id={`${formId}-start-time`} />
              </div>
              <div className={styles["event-div"]}>
                <label className={styles["event-boxes"]} htmlFor={`${formId}-end-time`}>End Time</label>
                <input ref={endTimeRef} defaultValue={event?.endTime} min={startTime} className={styles["event-input"]} required={!allDayChecked} disabled={allDayChecked} type="time" id={`${formId}-end-time`} />
              </div>
            </div>
            <div className={styles["event-div-color"]}>
              <div className={styles["event-boxes"]}>Color</div>
              <div className={`${styles["event-row"]} ${styles["modal-colors"]}`}>
                <input
                  type="radio"
                  name="color"
                  value="blue"
                  id={`${formId}-blue`}
                  checked={selectedColor === "blue"}
                  onChange={() => setSelectedColor("blue")}
                  className={styles["color-radio"]}
                />
                <label htmlFor={`${formId}-blue`}> <span className={styles["hide-color"]}>Blue</span></label>
              </div>
              <div className={styles["event-row"]}>
                <input
                  type="radio"
                  name="color"
                  value="green"
                  id={`${formId}-green`}
                  checked={selectedColor === "green"}
                  onChange={() => setSelectedColor("green")}
                  className={styles["color-radio"]}
                />
                <label htmlFor={`${formId}-green`}> <span className={styles["hide-color"]}>Green</span> </label>
              </div>
              <div className={styles["event-row"]}>
                <input
                  type="radio"
                  name="color"
                  value="red"
                  id={`${formId}-red`}
                  checked={selectedColor === "red"}
                  onChange={() => setSelectedColor("red")}
                  className={styles["color-radio"]}
                />
                <label htmlFor={`${formId}-red`}> <span className={styles["hide-color"]}>Red</span> </label>
              </div>
            </div>
            <div className={styles["event-row"]}>
              <button className="btn btn-success" type="submit">{
                    edit ? "Edit" : "Add"
              }</button>
              {onDelete !== null && (
            <button className="btn btn-delete" type="button" onClick={onDelete as () => void}>Delete</button>
              )}
            </div>
          </form>
    </Modal>
  )
}

export default EventModal