import { Router } from 'express'
import SitesControllers from '../controllers/index'

const router = Router()

const sitesControllers = new SitesControllers()

router.route('/')
    .get(sitesControllers.getSites)
    .get(sitesControllers.getSites)
    .post(sitesControllers.createSite)
    .put(sitesControllers.updateSite)
    .delete(sitesControllers.deleteSite)
router.get('/:id', sitesControllers.getSite)

export default router