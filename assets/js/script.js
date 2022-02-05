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
      var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}";

      fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
            };
        });
    }
    
citySearchEl.addEventListener("submit", citySubmitHandler)