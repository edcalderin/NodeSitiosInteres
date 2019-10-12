import { firebase } from './firebase/initialize'
import { Request, Response } from 'express'

export default class firebase_client {

    async signIn(req: Request, res: Response) {
        const { email, password } = req.body
        try {
            const result = await firebase.auth().signInWithEmailAndPassword(email, password)
            if (result) {                
                if (result.user != null) {
                    result.user.getIdToken()
                        .then(token => res.json(token))
                        .catch(error => res.json({ 'Error': error }))
                }
            }
        } catch (error) {
            res.status(404).json({ 'Error al loguearse': error })
        }
    }
   
    async signOut(req: Request, res: Response) {
        try {
            //Cerrar sesion
            await firebase.auth().signOut()
        } catch (error) {
            res.send('Error al cerrar sesion')
        }
    }
}