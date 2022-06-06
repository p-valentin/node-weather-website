const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=306b4b9c6936c369e996ca4ff25b4541&query=' + latitude + ',' + longitude;

    request({url, json: true}, (error, {body})=> {
        if(error) {
            callback('Unable to connect to the forecast services', undefined);
        }else if(undefined, body.error) {
            callback('Unable to find location', undefined)
        }else {
            callback(undefined, "The current temperature is " + body.current.temperature + " degrees, it feels like " + body.current.feelslike + " degrees and it is " + body.current.weather_descriptions[0] + ".")
        }
    })
}
module.exports = forecast;