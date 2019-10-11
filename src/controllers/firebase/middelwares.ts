import { Request, Response, NextFunction } from 'express'
import { admin, firebase } from './initialize'

export default class Auth {
    async decodeToken(req: Request, res: Response, next: NextFunction) {
        try {
            const idToken = req.headers['token']
            if (!idToken) return res.status(404).send('Es necesario el Token de autenticacion')

            const decodedToken = await admin.auth().verifyIdToken(idToken.toString())
            req.body.decodedToken = decodedToken
            next()
        } catch (error) {
            res.status(404).send('No autorizado')
        }
    }

    isAuthorized(req: Request, res: Response, next: NextFunction) {
        const { decodedToken } = req.body
        if (decodedToken) {
            console.log('middelware 2', decodedToken.uid)
            req.body.uid = decodedToken.uid
            next()
        }
        else
            res.status(404).send('No autorizado')
    }

}