import React, { useEffect } from 'react'
import { createPortal } from 'react-dom';
import styles from "./Modal.module.css"

type TModalProps = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}
const Modal = ({children, isOpen, onClose}: TModalProps) => {
    console.log("clicked")
    useEffect(() => {
        console.log("now clicked")
        function handler(e: KeyboardEvent){
            if(e.key === "Escape") onClose()
        }
        document.addEventListener("keydown", handler)
        return () => {
            document.removeEventListener("keydown", handler);
        }
    }, [onClose])
    if(!isOpen) return null;
  return (
    createPortal(
    <div className={styles["modal-styles"]}>
        <div className={styles["modal-overlay"]}>
            {children}
        </div>
    </div>, document.body
    ) 
  )
}

export default Modal