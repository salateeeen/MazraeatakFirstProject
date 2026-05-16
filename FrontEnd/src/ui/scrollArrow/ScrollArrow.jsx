import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import styles from "./ScrollArrow.module.css";
import { motion, AnimatePresence } from "framer-motion";

export function ScrollArrow({
  direction,
  onClick,
  show,
  className,
}) {
  if (!show) return null;
  return (
    <AnimatePresence>
      <motion.button
        className={`${styles.arrow} ${styles[direction]} ${className}`}
        initial={{ opacity: 0, scale: 0.8, y: "-50%" }}
        animate={{ opacity: 1, scale: 1, y: "-50%" }}
        exit={{ opacity: 0, scale: 0.8, y: "-50%" }}
        transition={{ duration: 0.25 }}
        onClick={onClick}
        aria-label={`scroll ${direction}`}
      >
        {direction === "left" ? (
          <LuChevronLeft size={25} />
        ) : (
          <LuChevronRight size={25} />
        )}
      </motion.button>
    </AnimatePresence>
  );
}
