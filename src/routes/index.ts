import { Router } from 'express'
import SitesControllers from '../controllers/SitesController'
import { checkSiteBody } from '../validator'
const router = Router()
const sitesControllers = new SitesControllers()

router.route('/')
    .get(sitesControllers.getSites.bind(sitesControllers))
    .post(checkSiteBody(), sitesControllers.createSite.bind(sitesControllers))
    .put(checkSiteBody(), sitesControllers.updateSite.bind(sitesControllers))

router.route('/:id')
    .get(sitesControllers.getSiteById)
    .delete(sitesControllers.deleteSite)

export default router