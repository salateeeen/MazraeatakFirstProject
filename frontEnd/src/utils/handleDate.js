export function formatToRelativeTime(d) {
  const now = Date.now();
  const date = new Date(d);
  const diff = now - date.getTime();

  const mins = Math.floor(diff / (60 * 1000));
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  
  const days = Math.floor(hrs / 24);
  
  if (days === 1) return "Yesterday";

  if (days < 7) return `${days} days ago`;

  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}


export function formatToDateTime(d) {
  const date = new Date(d);

  const formatedDate = date.toLocaleDateString(`en-GB`, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formatedTime = date.toLocaleTimeString(`en-GB`, {
    minute: "2-digit",
    hour: "2-digit"
  });

  return `${formatedDate} • ${formatedTime}`;
}


export function formatToShortDate(d) {
  const date = new Date(d);

  const formated = date.toLocaleDateString(`en-GB`, {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  return `${formated}`;
}

export function getShortWeekday(date) {
  const d = new Date(date);

  const weekDay = d.toLocaleDateString(`en-GB`, {
    weekday: "short",
  });

  return `${weekDay}`;
}


export function getNextSevenDays() {
  const days = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);

  for (let i = 0; i < 7; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    days.push(formatToShortDate(d));
  }

  return days;
}

export function formatSecondsToMinutes(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}



export function areValidTimeValues(from, to) {
  return typeof from === "number" && typeof to === "number";
}

export function convertMinutesToClockTime(minutes, format = "24") {
  minutes = minutes % 1440;

  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;

  if (format === "12") {
    const period = h24 >= 12 ? "PM" : "AM";
    let h12 = h24 % 12;
    if (h12 === 0) h12 = 12;

    return `${h12.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")} ${period}`;
  }

  return `${h24.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")}`;
}


export function convertClockTimeToMinutes(time) {
  const value = time.trim().toUpperCase();

  if (value.includes("AM") || value.includes("PM")) {
    const [clock, period] = value.split(" ");
    let [hours, minutes] = clock.split(":").map(Number);

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  }

  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

export function isWeekendDay(date) {
  const weekEndDays = ["Thu", "Fri"]
  return weekEndDays.includes(getShortWeekday(date))
}

export function checkIfSameDay(d1, d2) {
  return new Date(d1).toDateString() === new Date(d2).toDateString();
}


export function isPast(dateStr) {
  const now = Date.now();
  const date = new Date(dateStr);

  const hoursDiff = Math.floor(
    (now - date.getTime()) / (1000 * 60 * 60)
  );

  return hoursDiff > 24;
}
