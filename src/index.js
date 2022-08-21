let dateElement = document.querySelector("h2");
let currentTime = new Date();
console.log(new Date());
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[currentTime.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[currentTime.getMonth()];
dateElement.innerHTML = `${day} ,${month} ${currentTime.getDate()}, ${hours}:${minutes}`;

//function showCurrentTemp(response) {
// console.log(response.data);
//let temperature = Math.round(response.data.main.temp);

//function showForF(event) {
//  event.preventDefault();
//let temperatureElement = document.querySelector("h3");
//temperatureElement.innerHTML = "75°F ";
//}

// let fahrenheitLink = document.querySelector(".fDegree");
//fahrenheitLink.addEventListener("click", showForF);
function search(event) {
  event.preventDefault();
  let search = document.querySelector("#search-city");
  searchEngine(search.value);
}
function searchEngine(event) {
  event.preventDefault();
  let apiKey = `549a7e6d37d9c4c2ea5c8cc42d94c1c7`;
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}
let searchButton = document.querySelector("#search-city");
searchButton.addEventListener("submit", searchEngine);

//bouns point

function current(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayPosition);
}
function displayPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "549a7e6d37d9c4c2ea5c8cc42d94c1c7";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  celsiusLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let currentButton = document.querySelector("#current-input");
currentButton.addEventListener("click", current);

function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);

  console.log(temperature);
  let temperatureElement = document.querySelector("h1");
  temperatureElement.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  let temp = document.querySelector("#temp");
  temp.innerHTML = Math.round(response.data.main.temp);

  document.querySelector(
    "#wind"
  ).innerHTML = `Wind: ${response.data.wind.speed} km/h`;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweather.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

let fahrenheitLink = documnet.querySelector("fahrenheitLink");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = documnet.querySelector("celsiusLink");
fahrenheitLink.addEventListener("click", displayCelsiusTemperature);

search("Lisbon");
