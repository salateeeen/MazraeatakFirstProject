import { useState, useRef, useEffect } from "react";

export function useSlider(images) {
  const extendedImages = [images[images.length - 1], ...images, images[0]];

  const [current, setCurrent] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const sliderRef = useRef(null);
  const autoPlayRef = useRef(null);

  const prevSlide = () => setCurrent((prev) => prev - 1);
  const nextSlide = () => setCurrent((prev) => prev + 1);
  const goToSlide = (index) => setCurrent(index + 1);

  const handleTransitionEnd = () => {
    if (current === 0) {
      if (sliderRef.current) sliderRef.current.style.transition = "none";
      setCurrent(images.length);
    }
    if (current === extendedImages.length - 1) {
      if (sliderRef.current) sliderRef.current.style.transition = "none";
      setCurrent(1);
    }
  };

  useEffect(() => {
    const id = setTimeout(() => {
      if (sliderRef.current) {
        sliderRef.current.style.transition = "transform 0.3s ease";
      }
    }, 50);
    return () => clearTimeout(id);
  }, [current]);


  const handleStart = (x) => {
    setIsDragging(true);
    setStartX(x);
    setStartTime(Date.now());
    stopAutoPlay();
  };

  const handleMove = (x) => {
    if (!isDragging) return;
    setDeltaX(x - startX);
  };

  const handleEnd = () => {
    setIsDragging(false);

    const time = Date.now() - startTime;
    const velocity = Math.abs(deltaX) / (time || 1);

    const distanceThreshold = 80;
    const velocityThreshold = 0.5;

    if (deltaX > distanceThreshold || velocity > velocityThreshold) {
      prevSlide();
    } else if (deltaX < -distanceThreshold || velocity > velocityThreshold) {
      nextSlide();
    }

    setDeltaX(0);
    startAutoPlay();
  };

  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length !== 1) return;
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length > 0) return;
    handleEnd();
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 3000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, []);

  
  const realIndex =
    current === 0
      ? images.length - 1
      : current === extendedImages.length - 1
      ? 0
      : current - 1;

  return {
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
  };
}
