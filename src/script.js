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
  let lat = position.coord.lat;
  let lon = position.coord.lon;
  let apiKey = "9ee876206630b2b4c6ea6b8bbd4b6fc6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(search);
}
function search(city) {
  let apiKey = "9ee876206630b2b4c6ea6b8bbd4b6fc6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(getWeather);
}
function getWeather(response) {
  let temperature = document.querySelector("#temperature");
  let condition = document.querySelector(".weather-description");
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector(".wind-speed");
  let precipitation = document.querySelector(".precipitation");
  let iconElement = document.querySelector("#icon");
  let enteredCity = document.querySelector("#city-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = enteredCity.value;
  temperature.innerHTML = Math.round(response.data.main.temp);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
  precipitation.innerHTML = response.data.precipitation;
  condition.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let cityInput = document.querySelector("#search-form");
cityInput.addEventListener("submit", displayCity);
