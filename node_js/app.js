const config = require('./config')

const timeRecordByKind = {
    mongodb:  require('./modules/models/time-record-mongodb.js'),
    postgres: require('./modules/models/time-record-postgres.js'),
    redis:    require('./modules/models/time-record-redis.js')
}
const { hello } = timeRecordByKind[config.db.kind]
hello()

const date = Date.now()
console.log(date.prototype.to)