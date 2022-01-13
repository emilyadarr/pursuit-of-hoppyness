var locationNameEl = document.querySelector("#location-name");
var hoursEl = document.querySelector("#location-hours");
var reviewsEl =document.querySelector("#location-reviews");

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

getLocationHours();