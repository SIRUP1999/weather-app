import { useState, useEffect, useCallback } from "react";
import { fetchWeather, CityNotFoundError } from "../services/WeatherApi";

export function useWeather() {
  const [request, setRequest] = useState(null);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (request === null) return;
    const controller = new AbortController();

    async function load() {
      try {
        const result = await fetchWeather(request, controller.signal);
        setData(result);
        setStatus("success");
      } catch (err) {
        if (err.name === "AbortError") return;
        setStatus(err instanceof CityNotFoundError ? "notfound" : "error");
      }
    }

    load();

    return () => controller.abort();
  }, [request]);

  const search = useCallback((city) => {
    const trimmed = city.trim();

    if (!trimmed) return;

    setStatus("loading");
    setRequest({ city: trimmed });
  }, []);

  const retry = useCallback(() => {
    setStatus("loading");
    setRequest((prev) => (prev ? { ...prev } : prev));
  }, []);

  return { data, status, search, retry };
}
