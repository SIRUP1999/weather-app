import { describeWeather } from "../utils/WeatherCodes";
import { formTemp, formatDay } from "../utils/Format";

function ForecastList({ days, unit }) {
  return (
    <section>
      <h3>5-day forecast</h3>
      <ul className="forecast">
        {days.map((day, index) => {
          const { label, icon } = describeWeather(day.weatherCode);
          return (
            <li key={day.date} className="day">
              <span>{index === 0 ? "Today" : formatDay(day.date)}</span>
              <span role="img" aria-label={label}>
                {icon}
              </span>
              <span className="day__temps">
                {formTemp(day.max, unit)} / {formTemp(day.min, unit)}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default ForecastList;
