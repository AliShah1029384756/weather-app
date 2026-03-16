// ⚠️ Replace the empty string below with your free API key from https://openweathermap.org/api
const API_KEY = '';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const weatherIcons = {
  '01': '☀️', '02': '🌤️', '03': '☁️', '04': '☁️',
  '09': '🌧️', '10': '🌦️', '11': '⛈️', '13': '❄️', '50': '🌫️'
};

let currentTempC = null;
let useCelsius = true;

const cityInput     = document.getElementById('cityInput');
const searchBtn     = document.getElementById('searchBtn');
const errorMsg      = document.getElementById('errorMsg');
const weatherCard   = document.getElementById('weatherCard');
const apiNotice     = document.getElementById('apiNotice');

const cityNameEl   = document.getElementById('cityName');
const countryEl    = document.getElementById('countryCode');
const iconEl       = document.getElementById('weatherIcon');
const tempEl       = document.getElementById('temperature');
const descEl       = document.getElementById('description');
const feelsLikeEl  = document.getElementById('feelsLike');
const humidityEl   = document.getElementById('humidity');
const windSpeedEl  = document.getElementById('windSpeed');
const visibilityEl = document.getElementById('visibility');

const celsiusBtn    = document.getElementById('celsiusBtn');
const fahrenheitBtn = document.getElementById('fahrenheitBtn');

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.remove('hidden');
  weatherCard.classList.add('hidden');
}

function hideError() {
  errorMsg.classList.add('hidden');
}

function toF(c) { return Math.round(c * 9 / 5 + 32); }

function updateTempDisplay() {
  if (currentTempC === null) return;
  tempEl.textContent = useCelsius
    ? `${Math.round(currentTempC)}°C`
    : `${toF(currentTempC)}°F`;
}

async function fetchWeather(city) {
  if (!API_KEY) {
    showError('No API key set. Please add your OpenWeatherMap API key in app.js line 2.');
    return;
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) showError(`City "${city}" not found. Try another name.`);
      else if (res.status === 401) showError('Invalid API key. Check your key in app.js.');
      else showError('Something went wrong. Please try again.');
      return;
    }

    const data = await res.json();
    hideError();
    renderWeather(data);
  } catch (err) {
    showError('Network error. Check your connection and try again.');
  }
}

function renderWeather(data) {
  const iconCode = data.weather[0].icon.slice(0, 2);
  currentTempC = data.main.temp;

  cityNameEl.textContent = data.name;
  countryEl.textContent = data.sys.country;
  iconEl.textContent = weatherIcons[iconCode] || '🌡️';
  descEl.textContent = data.weather[0].description;
  feelsLikeEl.textContent = `${Math.round(data.main.feels_like)}°C`;
  humidityEl.textContent = `${data.main.humidity}%`;
  windSpeedEl.textContent = `${data.wind.speed} m/s`;
  visibilityEl.textContent = data.visibility
    ? `${(data.visibility / 1000).toFixed(1)} km`
    : 'N/A';

  updateTempDisplay();
  weatherCard.classList.remove('hidden');
}

function search() {
  const city = cityInput.value.trim();
  if (!city) return;
  fetchWeather(city);
}

searchBtn.addEventListener('click', search);
cityInput.addEventListener('keydown', e => { if (e.key === 'Enter') search(); });

celsiusBtn.addEventListener('click', () => {
  useCelsius = true;
  celsiusBtn.classList.add('active');
  fahrenheitBtn.classList.remove('active');
  updateTempDisplay();
});

fahrenheitBtn.addEventListener('click', () => {
  useCelsius = false;
  fahrenheitBtn.classList.add('active');
  celsiusBtn.classList.remove('active');
  updateTempDisplay();
});
