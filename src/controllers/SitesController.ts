import { Request, Response } from 'express'
import { Site } from '../models/site'
import { firebase, admin } from './firebase/initialize'
export default class SitesController {   

    getSites(req: Request, res: Response) {
        const { uid } = req.body
        console.log('uid', uid)
        admin.auth().getUser(uid).then(r=>{
            res.json(r)

        })
        .catch(e=>console.log('error'))
       /*  admin.database().ref('SitiosInteres/' + uid).once('value')
            .then(snapshot => {
                res.send(snapshot)
            })
            .catch(error => res.status(404).json({ 'Error': error })) */
    }
    getSite(req: Request, res: Response) {


    }
    deleteSite(req: Request, res: Response): void {

    }
    updateSite(req: Request, res: Response): void {

    }
    createSite(req: Request, res: Response): void {

    }
}