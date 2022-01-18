var locationInputEl = document.querySelector("#location-input");
//var beerContainerEl = document.querySelector(".locations-list");
var beerFormEl = document.querySelector("#beer-form");
var breweryContainerEl = document.querySelector(".locations-list");
var likeBtnEl = document.querySelector(".favorite-btn");
var favoriteLocationsEl = document.querySelector("#favorite-locations");

function createBreweryCards(city, isFavorites) { 
  const citiesContainer = document.getElementById('cities-container');
  // Select the card-template in the DOM
  const cardTemplate = document.getElementById('card-template');
  city.forEach((brewery,index) => {
    // Create a cardTemplate element in javascript to start populating data
    const card = document.importNode(cardTemplate.content, true);
    card.querySelector('.card-brewery-name').textContent = brewery.name;
    card.querySelector('.card-breweryType').textContent = brewery.brewery_type;
    card.querySelector('.address-street').textContent = brewery.street;
    card.querySelector('.address-city').textContent = brewery.city;
    card.querySelector('.address-state').textContent = brewery.state;
    card.querySelector('.address-postal').textContent = brewery.postal;
    card.querySelector('.card-phone').textContent = brewery.phone;
    //card.querySelector('.card-website-url').textContent = "View Website";
    card.querySelector('.card-website-url').setAttribute("href", brewery.website_url);
    card.querySelector(".view-hours").setAttribute("href", "./location.html?brewery=" + brewery.name + "?location=" + brewery.city);
    //card.querySelector(".card").classList = "card";
    if (isFavorites) {
      card.querySelector('.favorite-btn').classList.add("hide");
      favoriteLocationsEl.appendChild(card);
    }else {
      card.querySelector('.favorite-btn').dataset.city = brewery.city;
      card.querySelector('.favorite-btn').dataset.index = index;
      card.querySelector('.favorite-btn').addEventListener("click", saveFavoriteBreweries);
      citiesContainer.appendChild(card);
    }
  });
};

var displayFavorites = function () {
  var favorites = localStorage.getItem("Favorites");
  if (favorites) {
    favorites = JSON.parse(favorites);
    createBreweryCards(favorites, true);
  } 
  
}

var getBreweries = function(city) {
  var apiUrl = "https://api.openbrewerydb.org/breweries?by_city=" + city + "&sort=name:desc";
  
  //make a request to the url
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
    response.json().then(function(cityQueryResults) {
      console.log(cityQueryResults);
      var cityQueryKey = city.toLowerCase() + "-query"
      localStorage.setItem(cityQueryKey, JSON.stringify(cityQueryResults));
      displayBreweries(cityQueryResults);
    });
  }else {
    window.alert("Error: City Not Found");
  }
  })
  .catch(function(error) {
    alert("Unable to connect to Database");
  });
  }

  var saveFavoriteBreweries = function(){
    var city = this.dataset.city;
    city = city.toLowerCase();
    var cityQueryResults = localStorage.getItem(city+"-query");
    var favorites = localStorage.getItem("Favorites");
    var breweryObjectArray = [];
    var clickedBrewery = JSON.parse(cityQueryResults)[this.dataset.index]
    if (favorites) {
      favorites = JSON.parse(favorites);
    } else {
      favorites = [];
    };
    if(favorites.some(favoriteBrewery => favoriteBrewery.name === clickedBrewery.name)) {
      console.log("already favorited");
    } else {
      breweryObjectArray.push(clickedBrewery);
      favorites.push(clickedBrewery);
      localStorage.setItem("Favorites",JSON.stringify(favorites));
      createBreweryCards(breweryObjectArray, true);
    }
  };

  var formSubmitHandler = function(event) {
    const citiesContainer = document.getElementById('cities-container');
    citiesContainer.innerHTML = "";
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

  var displayBreweries = function(city) {
    // check if api returned any breweries
    if (city.length === 0) {
      breweryContainerEl.textContent = 'No breweries found.';
      return;
    }  
    createBreweryCards(city, false);
  };

 

  // function createCityCards(cities) { 
  //   const citiesContainer = document.getElementById('cities-container');
  //   cities.forEach((city) => {
  //     // Create a card element in javascript to start populating data
  //     var card = document.createElement("div");
  //     var cardName = document.createElement("h3");
  //     var breweryType = document.createElement("p");
  //     var breweryAddress = document.createElement("p");
  //     var breweryPhone = document.createElement("p");
  //     var websiteBtn = document.createElement("a");
  //     var likeBtn = document.createElement("a")
  //     var hoursBtn = document.createElement("a");

  //     hoursBtn.setAttribute("href", "./location.html?brewery=" + city.name + "?location=" + city.city);
  //     cardName.textContent = city.name;
  //     breweryType.textContent = "Type: " + city.brewery_type;
  //     breweryAddress.textContent = city.street + " " + city.city + ", " + city.state;
  //     breweryPhone.textContent = city.phone;
  //     websiteBtn.textContent = "Brewery Website";
  //     websiteBtn.setAttribute("href", city.website_url);
  //     likeBtn.textContent = "Favorite";
  //     hoursBtn.textContent = "View Hours";

  //     card.classList = "card";
  //     cardName.classList = "card-brewery-name";
  //     websiteBtn.classList = "card-btn";
  //     likeBtn.classList = "card-btn", "favorite-btn";
  //     hoursBtn.classList = "card-btn";

  //     card.append(cardName, breweryType, breweryAddress, breweryPhone, websiteBtn, likeBtn, hoursBtn);
  //     citiesContainer.appendChild(card);
  //   });
  // };

  beerFormEl.addEventListener("submit", formSubmitHandler);
  displayFavorites();
  
  
 