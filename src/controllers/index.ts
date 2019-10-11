import { Request, Response } from 'express'
import { Site } from '../models/site'
import initFirebase from '../firebase/initialize'
export default class SitesController {

    getSites(req: Request, res: Response) {
        var ref = initFirebase.app().database().ref('SitiosInteres')
        ref.once('value')
            .then(snapshot => {
                console.log(snapshot)
            })
            .catch(error => console.log(error))
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