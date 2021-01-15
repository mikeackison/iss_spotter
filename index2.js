// require and call the function

// const { fetchMyIP, fetchCoordsByIP,fetchISSFlyOverTimes } = require('./iss_promised')

const { nextISSTimesForMyLocation } = require('./iss_promised');

// // call .then on its return value, because it returns a promise call
// fetchMyIP()
// .then(fetchCoordsByIP) //provide fetchCoordsByIP as a callback using .then so as to make it the next thing to be run after fetchMyIP is run.
// .then(fetchISSFlyOverTimes)
// .then(body => console.log(body));



nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });

  const printPassTimes = function(passTimes) {
    for (const pass of passTimes) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(pass.risetime);
      const duration = pass.duration;
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  };
  

