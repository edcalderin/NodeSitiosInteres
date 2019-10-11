import authFirebase from '../firebase/auth'
import { Router } from 'express'

const router = Router()
const auth = new authFirebase()
router.post('/', auth.signIn)
export default router