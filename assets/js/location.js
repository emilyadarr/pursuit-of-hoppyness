var locationNameEl = document.querySelector("#location-name");
var hoursEl = document.querySelector("#location-hours");
var reviewsEl =document.querySelector("#location-reviews");
var reviewsContainerEl = document.querySelector('#reviews-container');

const YELP_API_KEY =
  "7H9uRe7QsFeCs8O7xXLydqmmSD_8kHYAVuRlBXZOe0f9apriuMOORwWuSJeSdUcZevUogNsu2pdURyy77-_k6xP5of2PDcutkWAagIBIF5RhffMu80Zu1DOfon_fYXYx";
// get business ID using Yelp API Search

// connect cityName and breweryName variables from previous page
var getBreweryName = function() {
  //grab city name from url query string
  var queryString = document.location.search;
  var city = queryString.split("=")[2];
  var brewery = queryString.split("=")[1].split("?")[0].split("%20").join(" ");

  if (brewery) {
    getBusinessID(city, brewery);
  }

  else {
    document.location.replace("./index.html");
  }
};

// get Business ID from Yelp API by searching city and brewery name
var getBusinessID = function(cityName, breweryName) {
  //console.log(cityName);
  //console.log(breweryName);
  const yelpUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=breweries&term=${breweryName}&location=${cityName}`;
 
  const apiOptions = {
    headers: {
      Authorization: `Bearer ${YELP_API_KEY}`,
      mode: "cors",
    },
  };
  return fetch(yelpUrl, apiOptions)
    .then((res) => res.json())
    .then((json) => getLocationHours(json))
    .catch((err) => {
      console.log("error: ", err);
    });
};

// get Location hours using business ID in Yelp API
var getLocationHours = function(data) {
  let id = data.businesses[0].id;
  getReviews(id);
  //console.log(id);
  const yelpUrlID = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`;

  const apiOptions = {
    headers: {
      Authorization: `Bearer ${YELP_API_KEY}`,
      mode: "cors",
    },
  };

  return fetch(yelpUrlID, apiOptions)
    .then((res) => res.json())
    .then((json) => displayHours(json))
    .catch((err) => {
      console.log("error: ", err);
    });
  
};

// Display name and hours
var displayHours = function(data) {
  //console.log(data);
  var businessName = data.name;
  var nameHeader = document.createElement("h2");
  nameHeader.textContent = businessName;
  locationNameEl.appendChild(nameHeader);

  var hours = data.hours[0].open;
  //console.log(hours);

  day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  for (var i = 0; i < hours.length; i++) {
    
    function convert(input) {
      return moment(input, 'kkmm').format('h:mm A');
    }
  
    var hoursStart = convert(hours[i].start);
    var hoursEnd = convert(hours[i].end);

    //console.log(convert(hoursStart));
    //console.log(convert(hoursEnd));

    var dayHours = document.createElement("p");
    dayHours.textContent = day[i] +": " + hoursStart + " - " + hoursEnd;
    hoursEl.appendChild(dayHours);

  }
}

// Get reviews from Yelp API Reviews using business ID
var getReviews = function(id) {
  //let id = data.businesses[0].id;
  const yelpUrlID = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}/reviews`;

  const apiOptions = {
    headers: {
      Authorization: `Bearer ${YELP_API_KEY}`,
      mode: "cors",
    },
  };

  return fetch(yelpUrlID, apiOptions)
    .then((res) => res.json())
    .then((dataReviews) => {displayReviews(dataReviews.reviews)}) 
    .catch((err) => {
      console.log("error: ", err);
    });
};

// Display reviews
var displayReviews = function(listReviews) {
  if(listReviews.length > 0) {
    for(let i = 0; i < listReviews.length; i++) {

      var ratings = listReviews[i].rating;
      var text = listReviews[i].text;
      var link = listReviews[i].url;
      
      var reviewCard = document.createElement("div");
      reviewCard.classList = "card";

      var ratingsEl = document.createElement("h4");
      ratingsEl.classList = "card-brewery-name";
      ratingsEl.textContent = ratings + "/5";

      var textEl = document.createElement("p");
      textEl.textContent = '"' + text + '"';

      var linkEl = document.createElement("a");
      linkEl.setAttribute("href", link);
      linkEl.classList = "card-btn";
      linkEl.textContent = "Read More";

      reviewCard.append(ratingsEl, textEl, linkEl);
      reviewsContainerEl.appendChild(reviewCard);
    }
  }
}

getBreweryName();