import { useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import ForecastList from "./components/ForecastList";
import { useWeather } from "./hooks/useWeather";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "./App.css";

const UNITS = ["C", "F"];

function App() {
  const [city, setCity] = useState("");
  const [unit, setUnit] = useLocalStorage("weather-unit", "C");
  const { data, status, search, retry } = useWeather();

  function handleSubmit(e) {
    e.preventDefault();
    search(city);
  }

  return (
    <main className="app">
      <h1 className="title">Weather</h1>

      <form className="search" role="search" onSubmit={handleSubmit}>
        <label htmlFor="city" className="visually-hidden">
          City name
        </label>
        <input
          id="city"
          type="search"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" disabled={!city.trim() || status === "loading"}>
          Search
        </button>
      </form>

      <div className="units" role="group" aria-label="Temperature unit">
        {UNITS.map((u) => (
          <button
            key={u}
            className={unit === u ? "active" : ""}
            aria-pressed={unit === u}
            onClick={() => setUnit(u)}
          >
            °{u}
          </button>
        ))}
      </div>

      <section className="panel" aria-live="polite">
        {status === "idle" && (
          <p className="message">Search for a city to see its weather.</p>
        )}

        {status === "loading" && <p className="message">Loading weather...</p>}

        {status === "notfound" && (
          <p className="message">
            We couldn't find that city. Check the spelling and try again.
          </p>
        )}

        {status === "error" && (
          <div className="message">
            <p>Something went wrong. Check your connection and try again.</p>
            <button onClick={retry}>Try again</button>
          </div>
        )}

        {status === "success" && data && (
          <>
            <CurrentWeather
              place={data.place}
              current={data.current}
              unit={unit}
            />
            <ForecastList days={data.daily} unit={unit} />
          </>
        )}
      </section>
    </main>
  );
}

export default App;
