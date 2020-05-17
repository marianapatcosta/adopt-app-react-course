import React, { useEffect, useRef, FunctionComponent } from "react";
import { createPortal } from "react-dom";

const Modal: FunctionComponent = ({ children }) => {
  //useRef helps to destroy modal after it makes its purpose, to avoid memory leaks
  const elRef = useRef(document.createElement("div"));
  const modalRoot = document.getElementById("modal");

  useEffect(() => {
    if (!modalRoot) {
      return;
    }
    //1st the modal is created
    modalRoot.appendChild(elRef.current);

    //3rd the callback runs to remove the modal
    // this function will run when modalRoot is closed
    return () => {
      modalRoot.removeChild(elRef.current)
    };
  }, []); //empty array to useEffect only runs once, otherwise every time children change, it would run

  //2nd the portal with the modal is created
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
