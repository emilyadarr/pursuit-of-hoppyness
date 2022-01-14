var locationNameEl = document.querySelector("#location-name");
var hoursEl = document.querySelector("#location-hours");
var reviewsEl =document.querySelector("#location-reviews");

const YELP_API_KEY =
  "7H9uRe7QsFeCs8O7xXLydqmmSD_8kHYAVuRlBXZOe0f9apriuMOORwWuSJeSdUcZevUogNsu2pdURyy77-_k6xP5of2PDcutkWAagIBIF5RhffMu80Zu1DOfon_fYXYx";
// get business ID using Yelp API Search

// TODO: connect cityName and breweryName variables from previous page
var getBusinessID = function() {
  let cityName = "Indianapolis"; //document.getElementById("city-name").value;
  let breweryName = "Brewdog"; //queryString.split("=")[1];
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
  console.log(id);
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
  console.log(hours);

  day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  for (var i = 0; i < hours.length; i++) {
    
    function convert(input) {
      return moment(input, 'kkmm').format('h:mm A');
    }
  
    var hoursStart = convert(hours[i].start);
    var hoursEnd = convert(hours[i].end);

    console.log(convert(hoursStart));
    console.log(convert(hoursEnd));

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
    .then((json) => console.log(json))
    .catch((err) => {
      console.log("error: ", err);
    });
};

//TODO: Display reviews
var displayReviews = function(data) {
  var reviews = data.reviews


}

getBusinessID();