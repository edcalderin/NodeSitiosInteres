import { Router } from 'express'
import SitesControllers from '../controllers/index'

const router = Router()

const sitesControllers = new SitesControllers()

router.route('/')
    .get(sitesControllers.getSites)
    .post(sitesControllers.createSite)
    .put(sitesControllers.updateSite)
    .delete(sitesControllers.deleteSite)

export default router