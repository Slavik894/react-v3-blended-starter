import { useEffect, type MouseEvent } from "react";
import css from "./Modal.module.css";
import { createPortal } from "react-dom";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(()=>{
    const handleKeyDown = (e: KeyboardEvent) =>{
      if (e.key === "Escape"){
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return()=> document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);
  
useEffect(()=>{
  document.body.style.overflow = "hidden";
  return ()=>{
    document.body.style.overflow="";
  }
}, []);

const handleBackDropClick = (e: MouseEvent<HTMLDivElement>) =>{
  if(e.target === e.currentTarget){
    onClose();
  }
}

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackDropClick}>
      <div className={css.modal}>{children}</div>
    </div>, 
    document.body
  );
}
