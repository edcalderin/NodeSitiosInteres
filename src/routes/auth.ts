import firebase_client from '../controllers/firebase_client'
import { Router } from 'express'

const router = Router()
const Firebase_client = new firebase_client()

router.post('/', Firebase_client.signIn)

export default router