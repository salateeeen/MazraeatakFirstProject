function formatToShortDate(d) {
  const date = new Date(d);

  const formated = date.toLocaleDateString(`en-GB`, {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  return `${formated}`;
}


const getShortWeekday = (date) => {
  const d = new Date(date);

  const weekDay = d.toLocaleDateString(`en-GB`, {
    weekday: "short",
  });

  return weekDay;
}

const generateDateRange = (start, end) => {
  const days = [];
  let current = new Date(start);
  

  while (current < end) {
    days.push(formatToShortDate(current));
    current.setDate(current.getDate() + 1);
  }

  return days;
};


const getNextSevenDays = () => {
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

const isWeekendDay = (date) => {
  const weekEndDays = ["Thu", "Fri"]
  return weekEndDays.includes(getShortWeekday(date))
}


const isPast = (dateStr) => {
  const now = Date.now();
  const date = new Date(dateStr);

  const hoursDiff = Math.floor(
    (now - date.getTime()) / (1000 * 60 * 60)
  );

  return hoursDiff > 24;
}

module.exports = {
  formatToShortDate,
  getShortWeekday,
  generateDateRange,
  getNextSevenDays,
  isWeekendDay,
  isPast
}