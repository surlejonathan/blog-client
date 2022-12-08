import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState({
    title: "",
    content: "",
    actionLabel: "",
    action: "",
  });

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, toggle, modal, setModal, setIsOpen }}
    >
      {children}
    </ModalContext.Provider>
  );
};
