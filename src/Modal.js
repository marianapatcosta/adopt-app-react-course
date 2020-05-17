import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  //useRef helps to destroy modal after it makes its purpose, to avoid memory leaks
  const elRef = useRef(null);
  if (!elRef.current) {
    //creates a div every time we want to show a modal
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    //1st the modal is created
    modalRoot.appendChild(elRef.current);

    //3rd the callback runs to remove the modal
    // this function will run when modalRoot is closed
    return () => modalRoot.removeChild(elRef.current);
  }, []); //empty array to useEffect only runs once, otherwise every time children change, it would run

  //2nd the portal with the modal is created
  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
