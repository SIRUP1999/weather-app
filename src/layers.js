//layer 1: The Api  (We cant control this shape)

const apiResponse = {
  results: [{ name: "Kumasi", admin1: "Ashanti Region", country: "Ghana" }],
  daily: {
    time: ["2026-11-12", "2026-11-12"],
    temperature_2m_max: [29.9, 30.4],
    temperature_2m_min: [22.3, 22.1],
  },
};

// layer 2: the service (translate the messy shape into a clean one)

function getWeather() {
  const place = apiResponse.results[0];

  return {
    place: { name: place.name, region: place.admin1, country: place.country },
    daily: apiResponse.daily.time.map((date, index) => ({
      date,
      max: apiResponse.daily.temperature_2m_max[index],
      min: apiResponse.daily.temperature_2m_min[index],
    })),
  };
}

// layer 3: the ui onl knows the shape

function showWeather(data) {
  console.log(
    `${data.place.name}, ${data.place.region}, ${data.place.country}`,
    data.daily.forEach((day) => {
      console.log(`${day.date}: ${day.max}° / ${day.min}°`);
    }),
  );
}

showWeather(getWeather());
