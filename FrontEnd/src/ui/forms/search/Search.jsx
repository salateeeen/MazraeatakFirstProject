import { useRef, useState, useEffect } from "react";
import { LuSearch } from "react-icons/lu";

import styles from "./Search.module.css";
import Input from "../input/Input";
import Spinner from "@/ui/spinner/Spinner";
import { useCloseComponents } from "@/hooks/useCloseComponents";

export default function Search({
  onSubmit,
  onSelect,
  search,
  results = [],
  isPending,
  className = "",
  RenderItem,
  emptyMessage = "No results found.",
}) {

  const [activeIndex, setActiveIndex] = useState(-1);
  const resultsRef = useRef([]);
  const searchRef = useRef(null);
  const containerRef = useRef(null);
  const [open, setOpen] = useCloseComponents(containerRef);

  useEffect(() => {
    if (activeIndex >= 0 && resultsRef.current[activeIndex]) {
      resultsRef.current[activeIndex].focus();
    }
  }, [activeIndex]);

  function handleKeyDownContainer(e) {
    if (e.key === "ArrowDown" && results.length > 0) {
      e.preventDefault();
      setActiveIndex(0);
    }
  }

  function handleKeyDownItem(e, index, _id) {
    if (e.key === "Enter") {
      e.preventDefault();
      onSelect?.(_id);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
      if (index === 0) {
        searchRef.current?.focus();
      }
    }
  }

  function handleFocus() {
    setOpen(true);
  }

  return (
    <div className={styles.container} ref={containerRef} onFocus={handleFocus}>
      <Input
        type="text"
        name={"search"}
        ref={searchRef}
        label={null}
        className={`${styles.search} ${className}`}
        autoComplete="off"
        onKeyDown={handleKeyDownContainer}
      >
        <LuSearch size={20} onClick={onSubmit} />
      </Input>

      {open && search?.trim().length >= 2 && (
        <div className={styles.searchList}>
          {isPending && (
            <div className={styles.spinner}>
              <Spinner widthAndheight="40px" />
            </div>
          )}

          {!isPending && results.length > 0 &&
            results.map((item, i) => (
              <div
                key={item._id || item.id || i}
                className={`${styles.searchResultItem} ${activeIndex === i ? styles.active : ""}`}
                tabIndex={0}
                ref={(el) => (resultsRef.current[i] = el)}
                onClick={() => onSelect?.(item._id || item.id)}
                onKeyDown={(e) => handleKeyDownItem(e, i, item._id || item.id)}
              >
                {RenderItem && (
                  <RenderItem item={item} />
                )}
              </div>
            ))}

          {!isPending && results.length === 0 && (
            <div className={styles.empty}>
              {emptyMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
