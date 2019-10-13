import { Router } from 'express'
import SitesControllers from '../controllers/SitesController'

const router = Router()
const sitesControllers = new SitesControllers()

router.route('/')
    .get(sitesControllers.getSites.bind(sitesControllers))
    .post(sitesControllers.createSite)
    .put(sitesControllers.updateSite)

router.route('/:id')
    .get(sitesControllers.getSiteById)
    .delete(sitesControllers.deleteSite)

export default router