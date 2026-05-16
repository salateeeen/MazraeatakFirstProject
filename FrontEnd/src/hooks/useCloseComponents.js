import { useEffect, useState } from "react";

export const useCloseComponents = (ref, initialState = false) => {
  const [open, setOpen] = useState(initialState);

  useEffect(() => {
    
    function handleClose(e) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    window.addEventListener("mousedown", handleClose);
    window.addEventListener("keydown", handleClose);

    return () => {
      window.removeEventListener("mousedown", handleClose);
      window.removeEventListener("keydown", handleClose);
    };
  }, [open, ref]);

  return [open, setOpen];
};
