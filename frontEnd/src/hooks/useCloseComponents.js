import { useEffect, useState } from "react";

export function useCloseComponents(ref, initialState = false) {
  const [open, setOpen] = useState(initialState);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    function handleEscape(e) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, ref]);

  return [open, setOpen];
}