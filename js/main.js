let apiKey = "1e3e8f230b6064d27976e41163a82b77";

navigator.geolocation.getCurrentPosition(async function (position) {
   
    try {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        //longitude and  latitude are used to get city name
        var map = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${apiKey}`)
        var userdata = await map.json();
        let loc = userdata[0].name;
        //By using City name  we can get the weather details of that particular city from OpenWeatherMap API
        let url = `https://api.openweathermap.org/data/2.5/forecast?&units=metric&`;
        let respond = await fetch(url + `q=${loc}&` + `appid=${apiKey}`);
        let data = await respond.json();

        console.log(data);
        
        // display current weather info
        let cityMain = document.getElementById("city-name");
        let cityTemp = document.getElementById("metric");
        let weatherMain = document.querySelectorAll("#weather-main");
        let mainHumidity = document.getElementById("humidity");
        let mainFeel = document.getElementById("feels-like");
        let weatherImg = document.querySelector(".weather-icon");
        let weatherImgs = document.querySelector(".weather-icons");
        let tempMinWeather = document.getElementById("temp-min-today");
        let tempMaxWeather = document.getElementById("temp-max-today");

        cityMain.innerHTML = data.city.name;
        cityTemp.innerHTML = Math.floor(data.list[0].main.temp) + "°";
        weatherMain[0].innerHTML = data.list[0].weather[0].description;
        weatherMain[1].innerHTML = data.list[0].weather[0].description;
        mainHumidity.innerHTML = Math.floor(data.list[0].main.humidity);
        mainFeel.innerHTML = Math.floor(data.list[0].main.feels_like);
        tempMinWeather.innerHTML = Math.floor(data.list[0].main.temp_min) + "°";
        tempMaxWeather.innerHTML = Math.floor(data.list[0].main.temp_max) + "°";

        let weatherCondition = data.list[0].weather[0].main.toLowerCase();

        if (weatherCondition === "rain") {
            weatherImg.src = "img/rain.png";
            weatherImgs.src = "img/rain.png";
            generateRain();
        } else if (weatherCondition === "clear" || weatherCondition === "clear sky") {
            weatherImg.src = "img/sun.png";
            weatherImgs.src = "img/sun.png";
        } else if (weatherCondition === "snow") {
            weatherImg.src = "img/snow.png";
            weatherImgs.src = "img/snow.png";
            generateSnow();
        } else if (weatherCondition === "clouds" || weatherCondition === "smoke") {
            weatherImg.src = "img/cloud.png";
            weatherImgs.src = "img/cloud.png";
            generateCloud();
        } else if (weatherCondition === "mist" || weatherCondition === "Fog") {
            weatherImg.src = "img/mist.png";
            weatherImgs.src = "img/mist.png";
            generateCloud();
        } else if (weatherCondition === "haze") {
            weatherImg.src = "img/haze.png"  ;
            weatherImgs.src = "img/haze.png";
            generateCloud();
        }

        // Fetch and display 5-day forecast data
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${data.city.name}&appid=${apiKey}&units=metric`;

        fetch(forecastUrl)
            .then(response => response.json())
            .then(data => {
                console.log("5-Day Forecast for", data.city.name);
                displayForecast(data);
            })
            .catch(error => {
                console.error("Error fetching forecast:", error);
            });

        function displayForecast(data) {
            const dailyForecasts = {};
            let forecast = document.getElementById('forecast-box');
            let forecastbox = "";

            data.list.forEach(item => {
                const date = item.dt_txt.split(' ')[0];
                let dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                let day = new Date(date).getDay();

                if (!dailyForecasts[date]) {
                    dailyForecasts[date] = {
                        day_today: dayName[day],
                        temperature: Math.floor(item.main.temp) + "°",
                        description: item.weather[0].description,
                        weatherImg: item.weather[0].main.toLowerCase()
                    };
                }
            });

            for (const date in dailyForecasts) {
                let imgSrc = "";

                switch (dailyForecasts[date].weatherImg) {
                    case "rain":
                        imgSrc = "img/rain.png";
                        break;
                    case "clear":
                    case "clear sky":
                        imgSrc = "img/sun.png";
                        break;
                    case "snow":
                        imgSrc = "img/snow.png";
                        break;
                    case "clouds":
                    case "smoke":
                        imgSrc = "img/cloud.png";
                        break;
                    case "mist":
                        imgSrc = "img/mist.png";
                        break;
                    case "haze":
                        imgSrc = "img/haze.png";
                        break;
                    default:
                        imgSrc = "img/sun.png";
                }

                forecastbox += `
                <div class="weather-forecast-box">
                <div class="day-weather">
                <span>${dailyForecasts[date].day_today}</span>
                 </div>
                    <div class="weather-icon-forecast">
                        <img src="${imgSrc}" />
                    </div>
                    <div class="temp-weather">
                        <span>${dailyForecasts[date].temperature}</span>
                    </div>
                    <div class="weather-main-forecast">${dailyForecasts[date].description}</div>
                </div>`;
            }

            forecast.innerHTML = forecastbox;

            console.log(data);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
},
() => {
    // Handle location retrieval error
    alert("Please turn on your location and refresh the page");
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
        }
      }
      
      