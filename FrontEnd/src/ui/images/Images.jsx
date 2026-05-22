import { useSlider } from "../../hooks/useSlider";
import styles from "./Images.module.css";
import { ScrollArrow } from "../scrollArrow/ScrollArrow";

export default function Images({ className = "", images }) {
  const {
    extendedImages,
    current,
    isDragging,
    deltaX,
    sliderRef,
    realIndex,
    prevSlide,
    nextSlide,
    goToSlide,
    handleTransitionEnd,
    handleStart,
    handleMove,
    handleEnd,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    startAutoPlay,
    stopAutoPlay,
  } = useSlider(images);

  return (
    <div
      className={`${styles.photos} ${className}`}
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      
      <ScrollArrow
        show={true}
        direction={"left"}
        onClick={prevSlide}
        className={`${styles.arrow} ${styles.left}`}
      />

      <div
        ref={sliderRef}
        className={styles.photo}
        style={{
          transform: `translateX(calc(-${current * 100}% + ${deltaX}px))`,
          transition: isDragging ? "none" : "transform 0.3s ease",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onTransitionEnd={handleTransitionEnd}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {extendedImages.map((img, i) => (
          <img
            src={img}
            className={styles.img}
            key={i}
            draggable={false}
          />
        ))}
      </div>

      <ScrollArrow
        show={true}
        direction={"right"}
        onClick={nextSlide}
        className={`${styles.arrow} ${styles.right}`}
      />

      <div className={styles.dots}>
        {images.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${
              i === realIndex ? styles.active : ""
            }`}
            onClick={() => goToSlide(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}