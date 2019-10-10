import admin from 'firebase-admin'
import { Request, Response } from 'express'

export default class firebaseSettings {

    initFirebase: Object

    constructor() {
        this.initFirebase = {
            apiKey: "AIzaSyCr67wg6lFCNMoUkyaS2GvvKcO9QAhCYqE",
            authDomain: "nodechallenge-424c1.firebaseapp.com",
            databaseURL: "https://nodechallenge-424c1.firebaseio.com",
            projectId: "nodechallenge-424c1",
            storageBucket: "nodechallenge-424c1.appspot.com",
            messagingSenderId: "198380806724",
            appId: "1:198380806724:web:40d57506473d3f31f39211"
        }
        admin.initializeApp(this.initFirebase)
    }

    async verifyToken(req: Request, res: Response) {
        try {
            const idToken: string | undefined = req.headers.authorization
            const decodedToken = await admin.auth().verifyIdToken('idToken')
            if (decodedToken) {
                //authorized
            }
            else {
                res.status(404).send('No autorizado')
            }
        } catch (error) {
            res.status(404).send('Error')
        }
    }
}
