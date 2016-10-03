const turf = require('turf-inside')
const bucharest = require('./bucharest-office')

module.exports = (longitude, latitude) => {
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
  }, bucharest)
}
