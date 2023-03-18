function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  return `${currentDay} ${hours}:${minutes}`;
}

let displayDate = document.querySelector("#dateAndTime");
let currentDate = new Date();
displayDate.innerHTML = formatDate(currentDate);

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "9ee876206630b2b4c6ea6b8bbd4b6fc6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(getWeather);
}

function getWeather(response) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);

  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector(".wind-speed");
  let precipitation = document.querySelector(".precipitation");
  humidity.innerHTML = response.data.humidity;
  wind.innerHTML = response.data.wind.speed;
  precipitation.innerHTML = response.data.precipitation;
}
function searchCity(city) {
  let apiKey = "9ee876206630b2b4c6ea6b8bbd4b6fc6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(getWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function displayCity(event) {
  event.preventDefault();
  let enteredCity = document.querySelector("#city-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = enteredCity.value;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let cityInput = document.querySelector("#search-form");
cityInput.addEventListener("submit", displayCity);
