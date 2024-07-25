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

export const login = async(req, res) => {
    try {
        const {email, password} = req.body
        const [userFound] = await pool.query('SELECT * FROM users WHERE email = ?',[email])
        if (userFound.length === 0) return res.status(404).json({ message: 'Correo no encontrado' })
        const user = userFound[0]
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(203).json({message: 'Unauthorized'})
        const token = await createAccessToken({id: user.id})
        res.cookie(token)
        res.json({
            message: "User created successfully"
        })

    } catch (error) {
        res.status(500).json({message: error.message})
        console.error(error)
    }
}