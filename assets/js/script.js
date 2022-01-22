// Age verification modal
$(document).ready(function() {

    var ofAge = localStorage.getItem("age-verified");
        
    // console.log(ofAge, typeof(ofAge));
        if (ofAge === "true") {
           $("#ageModal").hide();
           // console.log("is this working?")
        }
        else if (ofAge === "false") {
            $(location).attr('href', catUrl);
        }
        else {
        ageVerify();
        }
    function ageVerify() {
        $('#ageModal').show();
        $('html body').css('overflow','hidden');
    };
    
    $('.age-yes-btn').click(function() {
        $('#ageModal').hide();
        localStorage.setItem("age-verified", true);
    })

    var catUrl = "https://www.funnycatpix.com/"

    $('.age-no-btn').click(function() {
        $(location).attr('href', catUrl);
    })
    
});

var locationInputEl = document.querySelector("#location-input");
var beerFormEl = document.querySelector("#beer-form");
var breweryContainerEl = document.querySelector(".locations-list");
var likeBtnEl = document.querySelector(".favorite-btn");
var favoriteLocationsEl = document.querySelector("#favorite-locations");

// create brewery cards from returned data
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
    card.querySelector('.card-website-url').setAttribute("href", brewery.website_url);
    card.querySelector('.card-website-url').setAttribute("target", "blank");
    card.querySelector(".view-hours").setAttribute("href", "./location.html?brewery=" + brewery.name + "?location=" + brewery.city);
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

// Display favorite brewery cards
var displayFavorites = function () {
  var favorites = localStorage.getItem("Favorites");
  if (favorites) {
    favorites = JSON.parse(favorites);
    createBreweryCards(favorites, true);
  } 
  
};

// get breweries from OpenBrewery API by location
var getBreweries = function(city) {
  var apiUrl = "https://api.openbrewerydb.org/breweries?by_city=" + city + "&sort=name:desc";
  
  //make a request to the url
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
    response.json().then(function(cityQueryResults) {
      // console.log(cityQueryResults);
      var cityQueryKey = city.toLowerCase() + "-query"
      localStorage.setItem(cityQueryKey, JSON.stringify(cityQueryResults));
      displayBreweries(cityQueryResults);
    });
  }else {
    console.log("Error: City Not Found");
  }
  })
  .catch(function(error) {
    console.log("Unable to connect to Database");
  });
  }

  //Save favorite breweries to local storage
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

  // get location from form input
  var formSubmitHandler = function(event) {
    const citiesContainer = document.getElementById('cities-container');
    citiesContainer.innerHTML = "";
    event.preventDefault();
    var city = locationInputEl.value.trim();
  
    if (city) {
      getBreweries(city);
      var locationListName = document.getElementById("city-name");
      locationListName.textContent = city;
      locationInputEl.value = ""; 
    } else {
      console.log("Please enter a city");
    }
    // console.log(event);
  }

  var displayBreweries = function(city) {
    // check if api returned any breweries
    if (city.length === 0) {
      breweryContainerEl.textContent = 'No breweries found.';
      return;
    }  
    createBreweryCards(city, false);
  };

// When submit button is clicked, formSubmitHandler function
  beerFormEl.addEventListener("submit", formSubmitHandler);
  // Display favorite breweries when page loads
  displayFavorites();