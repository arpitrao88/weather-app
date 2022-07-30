const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url='http://api.weatherstack.com/current?access_key=a0f31487cb37f93bd09dc48d1178d404&query='+latitude+','+longitude+'&units=f'

    request({ url, json: true }, (error, { body }={}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                forecast:body.current.weather_descriptions[0],
                location:body.location.name
            })
        }
    })
}

module.exports = forecast