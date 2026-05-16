import styles from "./Skeleton.module.css";

export default function Skeleton({
  type = "rect",
  shape = "rect",
  width,
  height,
  count = 1,
  className = "",
  style = {},
}) {
  const elements = Array.from({ length: count });

  const getAtomicStyle = (w, h, s) => ({
    width: w,
    height: h,
    borderRadius: s === "circle" ? "50%" : "var(--radius-sm)",
    ...style,
  });

  if (type === "rect" || type === "circle" || type === "text") {
    return (
      <>
        {elements.map((_, i) => (
          <div
            key={i}
            className={`${styles.skeleton} ${styles[type] || ""} ${className}`}
            style={getAtomicStyle(width, height, shape || type)}
          />
        ))}
      </>
    );
  }

  // Predefined layouts
  if (type === "booking-card" || type === "farm-card" || type === "horizontal-farm-card") {
    const isHorizontal = type === "horizontal-farm-card";
    return (
      <>
        {elements.map((_, i) => (
          <div key={i} className={`${styles.card} ${isHorizontal ? styles.horizontal : ""} ${className}`}>
            <div className={`${styles.skeleton} ${styles.image}`} />
            <div className={styles.info}>
              <div className={styles.header}>
                <div className={`${styles.skeleton}`} style={{ width: "40%", height: "20px" }} />
                <div className={`${styles.skeleton}`} style={{ width: "20%", height: "20px" }} />
              </div>
              <div className={`${styles.skeleton}`} style={{ width: "60%", height: "15px" }} />
              <div className={`${styles.skeleton}`} style={{ width: "80%", height: "15px" }} />
              {!isHorizontal && <div className={`${styles.skeleton}`} style={{ width: "30%", height: "25px", marginTop: "auto" }} />}
              {isHorizontal && (
                <div className={styles.footer}>
                   <div className={`${styles.skeleton}`} style={{ width: "30%", height: "20px" }} />
                   <div className={`${styles.skeleton}`} style={{ width: "40%", height: "30px" }} />
                </div>
              )}
            </div>
          </div>
        ))}
      </>
    );
  }

  if (type === "farm-card-grid") {
    return (
        <>
          {elements.map((_, i) => (
            <div key={i} className={`${className}`} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className={`${styles.skeleton}`} style={{ width: '100%', aspectRatio: '1/1', borderRadius: 'var(--radius-md)' }} />
                <div className={`${styles.skeleton}`} style={{ width: '60%', height: '18px' }} />
                <div className={`${styles.skeleton}`} style={{ width: '40%', height: '14px' }} />
            </div>
          ))}
        </>
    )
  }

  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={getAtomicStyle(width, height, shape)}
    />
  );
}
