const request = require('request');

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/89df8d9c29460ee59f732f16036c2a3c/${latitude},${longitude}?lang=hu&units=si`;
    const celsius = '&#8451';

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (response.body.error) {
            callback('Unable to find location!', undefined);
        } else {
            data = response.body.daily.data[0].summary +
                ` Jelenleg ${response.body.currently.temperature}\u2103  fok van kint. ${response.body.currently.precipProbability}% az esély esőre.`;
            callback(undefined, data);
        }
    });
}

module.exports = forecast;
