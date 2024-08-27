import {createPool} from 'mysql2/promise'
import {HOST, PORTDB, USER, PASSWORD, DATABASE} from './config.js'

const pool = createPool({
    host: 'localhost',
    port: 3306,
    database: 'test',
    user: 'root',
    password: 'codersql'
})

async function checkConnect(){
    try {
        const conn = await pool.getConnection()
        await conn.query('SELECT 1')
        conn.release()
        console.log('DATABASE IS RUNNING')
    } catch (error) {
        console.error('Error en la BD!!!!!', error.message);
        console.error(error)
    }
}

export {pool, checkConnect}