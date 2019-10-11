import { Request, Response } from 'express'
import { Site } from '../models/site'
import { firebase } from './firebase/initialize'

export default class SitesController {

    async getSites(req: Request, res: Response) {
        var fs = firebase.firestore()
        fs.collection('SitiosInteres').get().then(collection => {
            var sites = Array<Site>()
            collection.forEach(e => {
                sites.push(e.data() as Site)
            })
            res.json(sites)
        })
            .catch(e => res.status(404).send({ 'error': e }))
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