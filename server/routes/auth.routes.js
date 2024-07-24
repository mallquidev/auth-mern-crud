import {Router} from 'express'

const router = Router()

router.post('/register', (req, res) => res.send('registrando xd'))

router.post('/login', (req, res) => res.send('LOGIN XD'))

export default router;