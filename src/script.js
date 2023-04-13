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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(search);
}
function search(city) {
  let apiKey = "9ee876206630b2b4c6ea6b8bbd4b6fc6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}
function getWeather(response) {
  let temperature = document.querySelector("#temperature");
  let condition = document.querySelector(".weather-description");
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector(".wind-speed");
  let iconElement = document.querySelector("#icon");
  let enteredCity = document.querySelector("#city-input");
  let cityElement = document.querySelector("#city");

  celsiusTemp = response.data.main.temp;

  cityElement.innerHTML = enteredCity.value;
  temperature.innerHTML = Math.round(response.data.main.temp);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = response.data.wind.speed;
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
  search(city);
}
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}
function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let locationBtn = document.querySelector("#current-location");
locationBtn.addEventListener("click", getLocation);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let cityInput = document.querySelector("#search-form");
cityInput.addEventListener("submit", handleSubmit);
search("Houston");
