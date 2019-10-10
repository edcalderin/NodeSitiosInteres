import { Request, Response } from 'express'
import { Site } from '../models/site'
export default class SitesController {
    getSites(req: Request, res: Response) {
        res.json("Sites")
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