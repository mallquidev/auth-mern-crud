import {pool} from '../db.js'
import bcrypt from 'bcryptjs'
import {createAccessToken} from '../lib/jwt.js'

export const register = async(req, res) => {
    try {
        const {user, email, password} = req.body
        const passwordHash = await bcrypt.hash(password, 10)
        const [result] = await pool.query('INSERT INTO users (user, email, password) VALUES (?,?,?)', [user, email, passwordHash])
        
        const token = await createAccessToken({id: result.insertId})
        res.cookie('token', token)
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
        res.cookie('token',token)
        res.json(token)

    } catch (error) {
        res.status(500).json({message: error.message})
        console.error(error)
    }
}

export const logout = (req, res) =>{
    try {
        res.cookie('token', '', {
            expire: new Date(0)
        })
        res.sendStatus(200)
    } catch (error) {
        res.status(500).json({message: error.message})
        console.error(error)
    }
}

export const profile = async(req, res)=> {
    try {
        console.log(req.user)
        const [userFound] = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id])
        if(!userFound) return res.status(404).json({message: 'user not found'})
        res.json({
            id: userFound[0].id,
            email: userFound[0].email
        })
    } catch (error) {
        console.error(error)
    }
}