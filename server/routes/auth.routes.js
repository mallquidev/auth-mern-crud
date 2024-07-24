import {Router} from 'express'
import {register} from '../controllers/auth.controllers.js'

const router = Router()

router.post('/register', register)

router.post('/login', (req, res) => res.send('LOGIN XD'))

export default router;