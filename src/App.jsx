import "./App.css";
import { useEffect } from "react";
import { fetchWeather } from "./services/WeatherApi";

// TEMPORARY TEST: delete after checking

function App() {
  const status = "success";
  useEffect(() => {
    fetchWeather({ city: "Accra" }).then(console.log).catch(console.error);
  }, []);
  return (
    <main className="app">
      <h1 className="title">Weather</h1>

      <form className="search" role="search">
        <label htmlFor="city" className="visually-hidden">
          City name
        </label>
        <input id="city" type="search" placeholder="Search for a city..." />
        <button type="submit">Search</button>
      </form>

      <section className="panel" aria-label="polite">
        {status === "idle" && (
          <p className="message">Search for a city to see its weather.</p>
        )}

        {status === "loading" && <p className="message">Loading weather...</p>}

        {status === "notfound" && (
          <p className="message">
            We couldn't find the city.Check the spelling and try again.
          </p>
        )}

        {status === "error" && (
          <div className="message">
            <p className="message">
              Something went wrong.Check your spelling and try again.
            </p>
            <button>Try again</button>
          </div>
        )}

        {status === "success" && (
          <>
            <div className="current">
              <h2 className="place"> Accra, Greater Accra, Ghana</h2>
              <p className="icon" role="img" aria-label="Partly cloudy">
                ⛅
              </p>
              <p className="temp">29°C</p>
              <p className="condition">Partly cloudy</p>

              <dl className="details">
                <div>
                  <dt>Feels like</dt>
                  <dd>32°C</dd>
                </div>
                <div>
                  <dt>Humidity</dt>
                  <dd>74%</dd>
                </div>
                <div>
                  <dt>Wind</dt>
                  <dd>14 km/h</dd>
                </div>
              </dl>
            </div>

            <h3>5-day forecast</h3>
            <ul className="forecast">
              <li className="day">
                <span>Today</span>
                <span role="img" aria-label="Partly cloudy">
                  ⛅
                </span>
                <span className="day__temps">31° / 24°</span>
              </li>
              <li className="day">
                <span>Sat</span>
                <span role="img" aria-label="Rain">
                  🌧️
                </span>
                <span className="day__temps">30° / 23°</span>
              </li>
            </ul>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
