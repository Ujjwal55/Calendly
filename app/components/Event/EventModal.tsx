import React, { MouseEventHandler } from 'react'
import Modal from '../Modal/Modal'
import { formatDate } from '@/utils/formatDate';
import styles from "./Event.module.css"

type TEventModalProps = {
    onSubmit: Function;
    onDelete?: Function;
    event?: Event
    date: Date
}
const EventModal = ({onSubmit, onDelete, event, date, ...eventProps}: TEventModalProps) => {
    const edit = !!event;
  return (
    <Modal {...eventProps}>
        <div className={styles["modal-title"]}>
            <div>{event ? "Edit" : "Add New Event"}</div>
            <small>{formatDate(date || event.date, {dateStyle: "long"})}</small>
            <button className={styles["close-btn"]} onClick={() => eventProps.onClose}>&times;</button>
          </div>
          <form>
            <div className={styles["event-div"]}>
              <div className={styles["event-boxes"]}>Name</div>
              <input type="text" name="name" id="name" />
            </div>
            <div className={`${styles["event-div"]} ${styles["modal-checkbox"]}`}>
              <input  className={styles["event-input"]} type="checkbox" name="all-day" id="all-day" />
              <div className={styles["event-boxes"]}>All Day?</div>
            </div>
            <div className={styles["event-row"]}>
              <div className={styles["event-div"]}>
                <div className={styles["event-boxes"]}>Start Time</div>
                <input className={styles["event-input"]}  type="time" name="start-time" id="start-time" />
              </div>
              <div className={styles["event-div"]}>
                <div className={styles["event-boxes"]}>End Time</div>
                <input  className={styles["event-input"]} type="time" name="end-time" id="end-time" />
              </div>
            </div>
            <div className={styles["event-div"]}>
              <div className={styles["event-boxes"]}>Color</div>
              <div className={styles["event-row"]}>
                <input
                  type="radio"
                  name="color"
                  value="blue"
                  id="blue"
                  checked
                  className="color-radio"
                />
                <label htmlFor="blue"><span className={styles["sr-only"]}>Blue</span></label>
              </div>
            </div>
            <div className={styles["event-row"]}>
              <button className="btn btn-success" type="submit">{
                    edit ? "Edit" : "Add"
              }</button>
              {onDelete !== null && 
            <button className="btn btn-delete" type="button" onClick={onDelete as MouseEventHandler<HTMLButtonElement>}>Delete</button>

              }
            </div>
          </form>
    </Modal>
  )
}

export default EventModal