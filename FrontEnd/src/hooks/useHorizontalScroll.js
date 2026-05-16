import { useEffect, useState } from "react";

export function useHorizontalScroll(ref, step = 300) {
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const check = () => {
    const el = ref.current;
    if (!el) return;

    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  const scroll = (dir) => {
    ref.current?.scrollBy({
      left: dir === "right" ? step : -step,
      behavior: "smooth",
    });

    setTimeout(check, 300);
  };

  useEffect(() => {
    check();
  }, []);

  return {
    canLeft,
    canRight,
    scroll,
    check,
  };
}
