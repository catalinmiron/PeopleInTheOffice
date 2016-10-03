const turf = require('turf-inside')

module.exports = (longitude, latitude, office = 'bucharest') => {
  return turf({
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Point",
      "coordinates": [
        longitude,
        latitude
      ]
    }
  }, require(`./bucharest-office`))
}
