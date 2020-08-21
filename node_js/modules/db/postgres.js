const config = require('../../config')
const { Pool } = require('pg')

const { 
    connectionString, 
    connectionTimeoutMillis,
    idleTimeoutMillis,
    max
} = config.postgres

console.log(`Connection String: ${connectionString}`)
console.log(`Connection Timeout (ms): ${connectionTimeoutMillis}`)
console.log(`Idle Timeout (ms): ${idleTimeoutMillis}`)
console.log(`Max connections: ${max}`)

const pool = new Pool({
    connectionString: connectionString,
    // connectionTimeoutMillis: connectionTimeoutMillis,
    // idleTimeoutMillis: idleTimeoutMillis,
    // max: max
})

async function query(text, params) {
    console.log(`query text: ${text}`)
    console.log(`query params: ${params}`)
    await pool.query(text, params)
    // let result
    // const client = await pool.connect()
    // try {
    //     result = await client.query(text, params)
    // } finally {
    //     client.release()
    // }
    // return result
}

async function commit(callback) {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        callback(client)
        await client.query('COMMIT')
    } catch (err) {
        await client.query('ROLLBACK')
        console.log(err)
        throw err
    } finally {
        await client.release()
    }
}

module.exports = {
    query: query,
    commit: commit,
}