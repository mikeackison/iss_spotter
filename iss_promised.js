const request = require('request-promise-native');


// requests user's ip from https:www.ipify.org/
// no input
// it returns: Promise of request for ip data, returnded as a JSON string
// funtion will fet fecth the IP address form ipify's API using request, and return the promise from the request


const fetchMyIP = function () {
  return request(`https://api.ipify.org?format=json`)
};


// request to freegeoip.app using the provided IP address (latitude/longitude)
// Input: JSON string containing the IP address
// Returns: Promise of request for lat/lon

const fetchCoordsByIP = function(body) { //body will now be the response body (JSON string) returned from our second API call
  const ip = JSON.parse(body).ip // parse the JSON string and extract the ip from it
  return request(`https://freegeoip.app/json/${ip}`) // make a request to freegeoip and return the promise from request
};




const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};



const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };

// module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };

