export function toFahrenheit(celcius) {
  return (celcius * 9) / 5 + 32;
}

export function formTemp(celcius, unit) {
  const value = unit === "F" ? toFahrenheit(celcius) : celcius;
  return `${Math.round(value)}°${unit}`;
}

export function formatDay(dateString) {
  // Adding the time makes javascript read the date as Local time.
  // without it, "2026-11-06" is read as UTC and can throw the wrong day

  return new Date(`${dateString}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "short",
  });
}
