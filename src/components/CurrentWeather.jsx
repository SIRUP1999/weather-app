import { describeWeather } from "../utils/weatherCodes";
import { formTemp } from "../utils/Format";

function CurrentWeather({ place, current, unit }) {
  const { label, icon } = describeWeather(current.weatherCode);
  const placeName = [place.name, place.region, place.country]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="current">
      <h2 className="place">{placeName}</h2>
      <p className="icon" role="img" aria-label={label}>
        {icon}
      </p>
      <p className="temp">{formTemp(current.temperature, unit)}</p>
      <p className="condition">{label}</p>

      <dl className="details">
        <div>
          <dt>feels like</dt>
          <dd>{formTemp(current.feelsLike, unit)}</dd>
        </div>

        <div>
          <dt>Humidity</dt>
          <dd>{current.humidity} %</dd>
        </div>
        <div>
          <dt>Wind</dt>
          <dd>
            {Math.round(current.windSpeed)}
            {current.windUnit}
          </dd>
        </div>
      </dl>
    </div>
  );
}

export default CurrentWeather;
