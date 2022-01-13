var locationInputEl = document.querySelector("#location-input");

var beerFormEl = document.querySelector("#beer-form");


var getBreweries = function(city) {
  var apiUrl = "https://api.openbrewerydb.org/breweries?by_city=" + city + "&sort=name:desc";
  
  //make a request to the url
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
    response.json().then(function(city) {
      console.log(city);
    });
  }else {
    window.alert("Error: City Not Found");
  }
  })
  .catch(function(error) {
    alert("Unable to connect to Database");
  });
  }

  var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = locationInputEl.value.trim();
  
    if (city) {
      getBreweries(city);
      locationInputEl.value = "";
    } else {
      alert("Please enter a city");
    }
    console.log(event);
  }

  beerFormEl.addEventListener("submit", formSubmitHandler);
  