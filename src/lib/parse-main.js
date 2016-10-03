const Parse = require('parse/react-native')
const Person = require('./person-model')

Parse.initialize('hackathon')
Parse.serverURL = 'http://192.168.1.137:8080/parse'

function updateLocation(uniqueId, isInOffice) {
  const install = new Person(uniqueId, isInOffice)
  return new Promise((resolve, reject) => {
    install.save(null, {
      success: resolve,
      error: reject
    })
  })
}

module.exports = {
  updateLocation,
}
