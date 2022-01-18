
$(document).ready(function() {

//     function createCookie(name, value, days) {
//         var expires = "";
//         if (days) {
//              var date = new Date();
//              date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
//              console.log(date);
//              expires = "; expires=" + date.toUTCString();
//         }
//         document.cookie = name + "=" + value + expires + "; path=/"; // affects all site pages
//    }
   
//     function readCookie(name) {
//         var nameEQ = name + "=";
//         var ca = document.cookie.split(';');
//         for (var i = 0; i < ca.length; i++) {
//              var c = ca[i];
//              while (c.charAt(0) == ' ') c = c.substring(1, c.length);
//              if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
//              }
//         return null;
//    }

//     if (readCookie('pursuit_age_check') === 'true') {
//     } else {
//         $('#ageModal').show();
//     }
//     $('.close-age-popup').click(function() {
//         createCookie('pursuit_age_check', 'true', 1);
//         $('.pursuit-age-bg').hide();
//     });
    
    function ageVerify() {
        $('#ageModal').show();
        $('html body').css('overflow','hidden');
    };

    ageVerify();

    function oldEnough() {
        $('.age-yes-btn').click(function() {
            $('#ageModal').hide();
        })
    };

    oldEnough();

    var catUrl = "https://www.funnycatpix.com/"

    function tooYoung() {
        $('.age-no-btn').click(function() {
            $(location).attr('href', catUrl);
        })
    };

    tooYoung();


    
});

var locationInputEl = document.querySelector("#location-input");
//var beerContainerEl = document.querySelector(".locations-list");
var beerFormEl = document.querySelector("#beer-form");
var breweryContainerEl = document.querySelector(".locations-list")

var getBreweries = function(city) {
  var apiUrl = "https://api.openbrewerydb.org/breweries?by_city=" + city + "&sort=name:desc";
  
  //make a request to the url
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
    response.json().then(function(city) {
      displayBreweries(city);
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
    createCityCards(city);
  };

  function createCityCards(cities) { 
    const citiesContainer = document.getElementById('cities-container');
    // Select the card-template in the DOM
    const cardTemplate = document.getElementById('card-template');
    cities.forEach((city) => {
      // Create a cardTemplate element in javascript to start populating data
      const card = document.importNode(cardTemplate.content, true);
      card.querySelector('.card-name').textContent = city.name;
      card.querySelector('.card-breweryType').textContent = city.brewery_type;
      card.querySelector('.address-street').textContent = city.street;
      card.querySelector('.address-city').textContent = city.city;
      card.querySelector('.address-state').textContent = city.state;
      card.querySelector('.address-postal').textContent = city.postal;
      card.querySelector('.card-phone').textContent = city.phone;
      card.querySelector('.card-website-url').textContent = city.website_url;
      card.querySelector('.card-website-url').setAttribute("href", city.website_url);
      card.querySelector(".card").setAttribute("href", "./location.html?brewery=" + city.name + "?location=" + city.city);
      citiesContainer.appendChild(card);
    });
  };

  beerFormEl.addEventListener("submit", formSubmitHandler);
  
