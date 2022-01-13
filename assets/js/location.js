var locationNameEl = document.querySelector("#location-name");
var hoursEl = document.querySelector("#location-hours");
var reviewsEl =document.querySelector("#location-reviews");

const YELP_API_KEY =
  "7H9uRe7QsFeCs8O7xXLydqmmSD_8kHYAVuRlBXZOe0f9apriuMOORwWuSJeSdUcZevUogNsu2pdURyy77-_k6xP5of2PDcutkWAagIBIF5RhffMu80Zu1DOfon_fYXYx";
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

var getLocationHours = function(data) {
  let id = data.businesses[0].id;
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

var displayHours = function(data) {
  console.log(data);
  var businessName = data.name;
  var nameHeader = document.createElement("h2");
  nameHeader.textContent = businessName;
  locationNameEl.appendChild(nameHeader);

  //moment().format("kk:mm");
  var hours = data.hours[0].open;
  var hoursMonday = hours[0].start;
  console.log(hoursMonday);
  
  console.log(hours);


  // for (var i = 0; i < hours.length; i++) {
  //   var dayHours = document.createElement("p");
  // }
}

// $(currentLoc).click(function () {
//   // get the API result via jQuery.ajax
//   $.ajax({
//     url: "http://api.ipstack.com/check?access_key=" + access_key,
//     dataType: "jsonp",
//     success: function (json) {
//       // output the "capital" object inside "location"
//       console.log(json.city);
//     },
//   });
// });

//var location = "Sun King Brewery"

// var apiURL = "https://api.yelp.com/v3/businesses/E8RJkjfdcwgtyoPMjQ_Olg";

// var apiKey = "7H9uRe7QsFeCs8O7xXLydqmmSD_8kHYAVuRlBXZOe0f9apriuMOORwWuSJeSdUcZevUogNsu2pdURyy77-_k6xP5of2PDcutkWAagIBIF5RhffMu80Zu1DOfon_fYXYx";

// var req = new Request(apiURL, {
//   method: 'GET',
//   headers: new Headers({
//     'Authorization': Bearer apiKey, 
//     'Content-Type': 'application/json'
//   })
// });

// var getLocationHours = function() {
//   fetch(req).then(function(response) {
//     // request was successful
//     if (response.ok) {
//       response.json().then(function(data) {
//         //pass response data to dom function
//         console.log(data);
//       })
//     }
//   });
// }
//

// TODO: Cors anywhere proxy
//add api key as parameters
// ask Mark for help if needed
// add bearer key as header in fetch
// using a bearer token with fetch
// try postman

// var getLocationHours = function() {
//   var apiURL = "https://api.yelp.com/v3/businesses/E8RJkjfdcwgtyoPMjQ_Olg";

//   fetch(apiURL).then(function(response) {
//     Headers {'Authorization' = Bearer "7H9uRe7QsFeCs8O7xXLydqmmSD_8kHYAVuRlBXZOe0f9apriuMOORwWuSJeSdUcZevUogNsu2pdURyy77-_k6xP5of2PDcutkWAagIBIF5RhffMu80Zu1DOfon_fYXYx"}
//     // request was successful
//     if (response.ok) {
//       response.json().then(function(data) {
//         //pass response data to dom function
//         console.log(data);
//       })
//     }
//   });
  
 // https://api.yelp.com/v3/businesses/ + locationId
 //https://api.yelp.com/v3/businesses/search
// };

getBusinessID();