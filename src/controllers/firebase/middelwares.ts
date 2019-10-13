import { Request, Response, NextFunction } from 'express'
import { admin } from './initialize'

export default class Auth {
    async decodeToken(req: Request, res: Response, next: NextFunction) {
        try {
            const idToken = req.headers['token']
            if (!idToken) return res.status(404).send('Es necesario el token de autenticacion')

            const decodedToken = await admin.auth().verifyIdToken(idToken.toString())
            req.body.decodedToken = decodedToken
            next()
        } catch (error) {
            res.status(404).send('No autorizado')
        }
    }

    isAuthorized(req: Request, res: Response, next: NextFunction) {
        const { decodedToken } = req.body
        if (decodedToken)
            next()
        else
            res.status(404).send('No autorizado')
    }
}