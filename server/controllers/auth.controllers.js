import {pool} from '../db.js'
import bcrypt from 'bcryptjs'
import {createAccessToken} from '../lib/jwt.js'

export const register = async(req, res) => {
    try {
        const {user, email, password} = req.body
        const passwordHash = await bcrypt.hash(password, 10)
        const [result] = await pool.query('INSERT INTO users (user, email, password) VALUES (?,?,?)', [user, email, passwordHash])
        
        const token = await createAccessToken({id: result.insertId})
        res.cookie(token)
        res.json({
            message: "User created successfully"
        })

    } catch (error) {
        res.status(500).json({message: error.message})
        console.error(error)
    }
}
