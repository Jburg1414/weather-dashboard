// variables for the input elements and the API Key for the openweather API
var citySearchEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city");
var apiKey = "63158f01429307c345d37cf9e82e3c5a";

// function for submitting a city name 
var citySubmitHandler = function (event) {
    event.preventDefault();

    var city = cityInputEl.value.trim();

    if (city) {
        getCityInfo(city);
    } else {
        alert("Please enter a valid city name.")
    }
    console.log(city);
  };

// this function is using the openweather API to return information about the input city
  var getCityInfo = function (city) {
      var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

      fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                return response.json();
            };

            // this function is pulling the necessary data from the response and adding to our html
        }) .then(function (data) {
            console.log(data);
            $("#city-name").text(data.name);
            $("#current-date").text(new Date(data.dt*1000).toLocaleDateString());
            $("#temp").text(`Current Temperature: ${data.main.temp}℉`);
            $("#humidity").text(`Current Humidity: ${data.main.humidity}%`);
            $("#wind").text(`Current Wind Speed: ${data.wind.speed} MPH`);
            getCityLoc(data.coord.lon, data.coord.lat);
        }) .catch(function (error) {
            console.log(error);
        })
    };
    

    // this function is calling the onecall portion of openweather so that we can pull our 5 day forcast
    var getCityLoc = function (lon, lat) {
        
        var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=imperial`;
        
        fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                return response.json();
            };

            // here we are pulling the necessary data from our response and creating a for loop to populate 
            // the html with the information for the next 5 days
        })  .then(function (data) {
            // $("#uv").text(`Current UV Index: ${data.current.uvi}`);
            console.log(data);
            for (i=0; i < 5; i++) {
                var col = $("<div class='col'>");
                var card = $("<div class='card'>");
                var cardBody = $("<div class='card-body'>");
                var image = $(`<img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png" class="card-img-top" alt="...">`)
                var date = $("<h5>").text(new Date(data.daily[i].dt*1000).toLocaleDateString());
                cardBody.append(date);
                card.append(image,cardBody);
                col.append(card);
                $("#5-day-forecast").append(col);
            };
        }) .catch(function (error) {
            console.log(error);
        })
      };
    
citySearchEl.addEventListener("submit", citySubmitHandler)