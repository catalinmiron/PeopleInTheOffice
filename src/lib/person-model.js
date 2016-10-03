import Parse from 'parse/react-native'

class Person extends Parse.Object {
  constructor(uniqueId, isInOffice) {
    super('Person')

    this.uniqueId = uniqueId
    this.isInOffice = isInOffice
  }
}

Parse.Object.registerSubclass('Person', Person)

export default Person
