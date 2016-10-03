const turf = require('turf-inside')

function get(longitude, latitude, office = 'bucharest') {
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
  }, require(`./${office}-office`))
}
