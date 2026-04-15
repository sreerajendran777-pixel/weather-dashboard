// js/script.js
import CONFIG from './config.js';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');

async function getWeather(city) {
    weatherInfo.innerHTML = `<p>Loading weather data...</p>`;

    try {
        const response = await fetch(
            `${CONFIG.BASE_URL}/weather?q=${city}&appid=${CONFIG.API_KEY}&units=${CONFIG.UNITS}`
        );

        if (!response.ok) {
            throw new Error("City not found! Please check the spelling.");
        }

        const data = await response.json();

        weatherInfo.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <h1 style="font-size: 4rem; margin: 20px 0;">${Math.round(data.main.temp)}°C</h1>
            <p style="font-size: 1.4rem; text-transform: capitalize;">${data.weather[0].description}</p>
            
            <div style="margin-top: 30px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; max-width: 400px; margin-left: auto; margin-right: auto;">
                <div>Feels like: <strong>${Math.round(data.main.feels_like)}°C</strong></div>
                <div>Humidity: <strong>${data.main.humidity}%</strong></div>
                <div>Wind Speed: <strong>${data.wind.speed} m/s</strong></div>
                <div>Pressure: <strong>${data.main.pressure} hPa</strong></div>
            </div>
        `;

    } catch (error) {
        weatherInfo.innerHTML = `
            <p style="color: #ff6b6b; font-size: 1.2rem;">
                ${error.message}
            </p>
            <p>Try another city name</p>
        `;
    }
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) getWeather(city);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) getWeather(city);
    }
});

// Load default weather (Chennai) when page loads
window.onload = () => {
    getWeather(CONFIG.DEFAULT_CITY);
};
