import { Router } from 'express'
import SitesControllers from '../controllers/SitesController'
import { checkSiteBody } from '../validator'
import {oneOf} from 'express-validator'
const router = Router()
const sitesControllers = new SitesControllers()

router.route('/')
    .get(sitesControllers.getSites.bind(sitesControllers))
    .post(oneOf(checkSiteBody()), sitesControllers.createSite.bind(sitesControllers))
    .put(oneOf(checkSiteBody()), sitesControllers.updateSite.bind(sitesControllers))

router.route('/:id')
    .get(sitesControllers.getSiteById)
    .delete(sitesControllers.deleteSite)

export default router