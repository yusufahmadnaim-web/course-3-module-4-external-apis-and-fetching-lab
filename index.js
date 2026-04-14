const weatherApi = "https://api.weather.gov/alerts/active?area=";

function displayAlerts(data) {
  const alertDisplay = document.getElementById('alerts-display');
  const errorMessage = document.getElementById('error-message');

  if (!alertDisplay || !errorMessage) return;

  errorMessage.classList.add('hidden');
  errorMessage.textContent = "";

  alertDisplay.innerHTML = "";

  data.features.forEach(feature => {
    const title = document.createElement('h3');
    title.textContent = feature.properties.event;

    const alerts = document.createElement("p");
    alerts.textContent = feature.properties.headline;

    alertDisplay.appendChild(title);
    alertDisplay.appendChild(alerts);
  });
}

async function fetchWeatherAlerts() {
  const stateFetch = document.getElementById('state-input');
  const errorMessage = document.getElementById('error-message');

  if (!stateFetch || !errorMessage) return;

  const abbr = stateFetch.value;

  try {
    const response = await fetch(`${weatherApi}${abbr}`);

    if (!response.ok) {
      throw new Error(`Error fetching data, ${response.status}`);
    }

    const data = await response.json();

    stateFetch.value = "";

    displayAlerts(data);

  } catch (error) {
    errorMessage.classList.remove('hidden');
    errorMessage.textContent = error.message;
    console.error('Error fetching data', error);
  }
}

// ✅ Safe DOM attachment
const button = document.getElementById('fetch-alerts');
if (button) {
  button.addEventListener("click", fetchWeatherAlerts);
}

// ✅ Export for tests
module.exports = { fetchWeatherAlerts, displayAlerts };

