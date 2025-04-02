document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "7f487a492a91475da12012f7b6dd53cb"; // Replace with your actual API key

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return; // Don't proceed if the input is empty

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      console.log("Weather Data Object:", data); 
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw new Error("Error fetching weather data");
    }
  }

  function displayWeatherData(weatherData) {
    cityNameDisplay.textContent = weatherData.name;
    temperatureDisplay.textContent = `Temperature: ${weatherData.main.temp}°C`;
    descriptionDisplay.textContent = `Condition: ${weatherData.weather[0].description}`;

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
