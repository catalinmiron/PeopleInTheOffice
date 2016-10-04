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

function createSubscription(office = 'Bucharest') {
  let query = new Parse.Query(`${office}Office`)
  return query.subscribe()
}

function getOfficeDetails(callback, office = 'Bucharest') {
  new Parse.Query(`${office}Office`).first({
    'success': (res) => {
      return callback(res)
    },
    'error': (error) => {console.error(error)}
  })
}

function onOnlineChange(subscription, callback) {
  subscription.on('update', callback)
}

function unsubscribe(subscription) {
  subscription.unsubscribe()
  Parse.LiveQuery.close()
}

module.exports = {
  updateLocation,
  createSubscription,
  onOnlineChange,
  unsubscribe,
  getOfficeDetails
}
