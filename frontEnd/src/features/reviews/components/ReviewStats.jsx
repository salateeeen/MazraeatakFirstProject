import styles from "./ReviewStats.module.css";

export default function ReviewStats({ ratings = [] }) {
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  const reviewsArray = Array.isArray(ratings) ? ratings : [];
  
  reviewsArray.forEach(rev => {
    if (rev.rating && counts[Math.floor(rev.rating)] !== undefined) {
      counts[Math.floor(rev.rating)]++;
    }
  });

  const total = reviewsArray.length || 1;

  const getColor = (star) => {
    if (star >= 4) return "var(--accent, #22c55e)"; 
    if (star === 3) return "#eab308"; 
    return "#ef4444"; 
  };

  return (
    <div className={styles.stats}>
      {[5, 4, 3, 2, 1].map((star) => {
        const count = counts[star] || 0;
        const percentage = (count / total) * 100;

        return (
          <div key={star} className={styles.row}>
            <span className={styles.starLabel}>{star} stars</span>
            <div className={styles.barContainer}>
              <div 
                className={styles.bar} 
                style={{ 
                  width: `${percentage}%`,
                  backgroundColor: getColor(star)
                }}
              ></div>
            </div>
            <span className={styles.count}>{count}</span>
          </div>
        );
      })}
    </div>
  );
}
