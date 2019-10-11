import { Router } from 'express'
import SitesControllers from '../controllers/SitesController'
import AuthFirebase from '../controllers/firebase/middelwares'

const router = Router()

const sitesControllers = new SitesControllers()
const authFirebase = new AuthFirebase()

router.route('/')
    .get(sitesControllers.getSites)
    .get(sitesControllers.getSites)
    .post(sitesControllers.createSite)
    .put(sitesControllers.updateSite)
    .delete(sitesControllers.deleteSite)
router.get('/:id', sitesControllers.getSite)

export default router