let apiKey = "1e3e8f230b6064d27976e41163a82b77";
let searchinput = document.querySelector(`.searchinput`);

async function search(city, state, country) {
  let url = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city},${state},${country}&appid=${apiKey}`);

  if (url.ok) {
    let data = await url.json();
    console.log(data);

    // Hide error and message, show weather details
    let box = document.querySelector(".return");
    box.style.display = "block";
    document.querySelector(".message").style.display = "none";
    document.querySelector(".error-message").style.display = "none";

    // Update the weather details
    document.querySelector(".city-name").innerHTML = data.name;
    document.querySelector(".weather-temp").innerHTML = Math.floor(data.main.temp) + '°';
    document.querySelector(".wind").innerHTML = Math.floor(data.wind.speed) + " m/s";
    document.querySelector(".pressure").innerHTML = Math.floor(data.main.pressure) + " hPa";
    document.querySelector('.humidity').innerHTML = Math.floor(data.main.humidity) + "%";
    document.querySelector(".sunrise").innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
    document.querySelector(".sunset").innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});

    // Weather icon logic
    let weatherImg = document.querySelector(".weather-img");
    if (data.weather[0].main === "Rain") {
      weatherImg.src = "img/rain.png";
      generateRain();
      showOceanAdvice("Rain", "The rain carries pollutants to the ocean. Let's reduce waste and prevent water contamination!");
    } else if (data.weather[0].main === "Clear") {
      weatherImg.src = "img/sun.png";
      showOceanAdvice("Clear", "Protect the oceans! Reducing plastic use and pollution is crucial for marine life.");
    } else if (data.weather[0].main === "Snow") {
      weatherImg.src = "img/snow.png";
      generateSnow();
      showOceanAdvice("Snow", "Snowmelt carries chemicals into rivers and oceans. Be mindful of our water sources.");
    } else if (data.weather[0].main === "Clouds") {
      weatherImg.src = "img/cloud.png";
      generateCloud();
      showOceanAdvice("Cloudy", "Even on cloudy days, the ocean needs our protection. Let's work together for cleaner waters.");
    } else if (data.weather[0].main === "Mist" || data.weather[0].main === "Fog") {
      weatherImg.src = "img/mist.png";
      generateCloud();
      showOceanAdvice("Mist", "The mist can carry pollutants into the ocean. We must safeguard marine ecosystems.");
    } else if (data.weather[0].main === "Haze") {
      weatherImg.src = "img/haze.png";
      generateCloud();
      showOceanAdvice("Haze", "Haze and air pollution can affect ocean life. Let’s focus on reducing emissions.");
    }

  } else {
    // Handle error
    let box = document.querySelector(".return");
    box.style.display = "none";
    let message = document.querySelector(".message");
    message.style.display = "none";
    let errormessage = document.querySelector(".error-message");
    errormessage.style.display = "block";
  }
}

// Function to show the advice popup
function showOceanAdvice(weatherCondition, adviceText) {
  const popup = document.querySelector('.popup-advice');
  const adviceTextElement = document.querySelector('.advice-text');

  // Set the message based on the weather condition
  adviceTextElement.textContent = `Advice for Ocean Protection (Weather: ${weatherCondition}): ${adviceText}`;

  // Show the popup after weather details are loaded
  popup.style.display = 'block';

  // Close the popup when the close button is clicked
  document.querySelector('.close-popup').addEventListener('click', function () {
    popup.style.display = 'none';
  });
}


searchinput.addEventListener('keydown', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
        search(searchinput.value);
        console.log("worked")
      }
  });
  
// Add this in your existing JavaScript (main.js)
function generateRain() {
  const rainContainer = document.querySelector('.rain');
  const numDrops = 100; // Adjust number of raindrops here

  for (let i = 0; i < numDrops; i++) {
    const drop = document.createElement('div');
    drop.classList.add('drop');
    drop.style.left = `${Math.random() * 100}%`; // Random horizontal position
    drop.style.animationDelay = `${Math.random() * 2}s`; // Random delay for each drop
    drop.style.animationDuration = `${Math.random() * 1.5 + 0.5}s`; // Random speed for each drop
    rainContainer.appendChild(drop);

    setTimeout(() => {
      drop.remove();
    }, parseFloat(drop.style.animationDuration) * 10000);
  }
}

function generateCloud() {
  const cloudContainer = document.querySelector('.cloud');
  
  // Clear any existing clouds (optional, for fresh generation each time)
  cloudContainer.innerHTML = '';

  // Define the number of clouds you want to generate
  const numClouds = 5;

  // Loop through and create cloud images
  for (let i = 1; i <= numClouds; i++) {
      const cloudImage = document.createElement('img');
      cloudImage.src = `./img/cloud${i}.png`;
      cloudImage.alt = `Cloud ${i}`;
      cloudImage.style.setProperty('--i', i); // Set the custom property for animation speed
      cloudContainer.appendChild(cloudImage);

      
  setTimeout(() => {
    cloudImage.remove();
  }, 10000);
  }
}

function generateSnow() {
  const snowContainer = document.querySelector('.snowflakes');

  // Set the number of snowflakes you want to generate
  const numberOfSnowflakes = 100;

  // Loop to generate each snowflake
  for (let i = 0; i < numberOfSnowflakes; i++) {
    // Create a new div element for each snowflake
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    // Optionally, you can randomize the snowflake content (❅, ❆, or ❄)
    const snowflakeSymbols = ['❅', '❆', '❄'];
    snowflake.textContent = snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];

    // Set random size for snowflake to add variety
    const size = Math.random() * 1.5 + 0.5; // Size between 0.5em and 2em
    snowflake.style.fontSize = `${size}em`;

    // Set random starting position for snowflake (horizontal spread)
    const leftPosition = Math.random() * 100; // Random position between 0% and 100%
    snowflake.style.left = `${leftPosition}%`;

    // Set random animation delay for each snowflake
    const delay = Math.random() * 5; // Random delay between 0s and 5s
    snowflake.style.animationDelay = `${delay}s`;

    // Set random animation duration for different falling speeds
    const duration = Math.random() * 10 + 5; // Random duration between 5s and 15s
    snowflake.style.animationDuration = `${duration}s`;

    // Append the snowflake to the container
    snowContainer.appendChild(snowflake);

    setTimeout(() => {
      snowflake.remove();
    }, 10000); // 10 seconds (same as the longest duration for falling snowflakes)
  }
}

function generateSun() {
  const sunContainer = document.querySelector('.sun-rays');

  // Clear any existing sun rays (optional, for fresh generation each time)
  sunContainer.innerHTML = '';

  // Define the number of sun rays you want to generate
  const numRays = 10; // You can adjust this number for more or fewer rays

  // Loop through and create sun rays
  for (let i = 0; i < numRays; i++) {
    const ray = document.createElement('div');
    ray.classList.add('sun-ray');

    // Optionally, you can randomize the rotation or size of the sun rays for variation
    const rotation = Math.random() * 360; // Random rotation angle between 0° and 360°
    const size = Math.random() * 1.5 + 0.5; // Random size between 0.5 and 2 times the base size
    ray.style.transform = `rotate(${rotation}deg)`; // Rotate each ray
    ray.style.width = `${size}em`; // Randomize the width of each ray

    // Append the ray to the sun container
    sunContainer.appendChild(ray);

    // Remove the ray after a certain time (to match the animation duration, e.g., 10 seconds)
    setTimeout(() => {
      ray.remove();
    }, 10000); // 10 seconds
  }
}

