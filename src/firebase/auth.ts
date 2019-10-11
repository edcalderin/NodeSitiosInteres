import { Request, Response } from 'express'
import admin from './initialize'
export default class Auth {
    constructor() {

    }
    async verifyToken(req: Request, res: Response) {
        try {
            const idToken: string = req.headers.authorization || ''
            /* const decodedToken = await admin.auth().verifyIdToken(idToken)
            if (decodedToken) {
                //authorized
            }
            else {
                res.status(404).send('No autorizado')
            } */
        } catch (error) {
            res.status(404).send('Error')
        }
    }
    async signIn(req: Request, res: Response) {
        const { email, password } = req.body
        try {
            const user = await admin.auth().signInWithEmailAndPassword(email, password)
            if (user) {
                res.json('Logueado')
            }
        } catch (error) {
            res.status(404).json({ 'title': 'Error al loguearse', 'detail': error })
        }


    }
}