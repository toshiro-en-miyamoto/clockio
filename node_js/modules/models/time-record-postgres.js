const pg = require('../db/postgres')
const { CLOCK_TYPE } = require('./time-record')

function clockIn(employeeNumber, clockDate = new Date()) {
    insert(employeeNumber, clockDate, CLOCK_TYPE.CLOCK_IN)
}

function clockOut(employeeNumber, clockDate = new Date()) {
    insert(employeeNumber, clockDate, CLOCK_TYPE.CLOCK_OUT)
}

async function insert(employeeNumber, clockDate, clockType) {
    const sql = `INSERT INTO time_record.clock
                (employee_no, clock_date, clock_type) VALUES ($1, $2, $3)`
    console.log(sql)
    console.log(`  Employee Number: ${employeeNumber}`)
    console.log(`  Clock Date: ${clockDate}`)
    console.log(`  Clock Type: ${clockType}`)
    await pg.query(sql, [employeeNumber, clockDate, clockType])
}

module.exports = {
    hello: () => console.log('Hello, PostgreSQL'),
    clockIn: clockIn,
    clockOut: clockOut
}