import { Router } from 'express'
import SitesControllers from '../controllers/SitesController'

const router = Router()
const sitesControllers = new SitesControllers()

router.route('/')
    .get(sitesControllers.getSites)
    .post(sitesControllers.createSite)
    .put(sitesControllers.updateSite)

router.route('/:id([0-9])') //Expresion regular para distinguir el parametro id, caracteres de 0 a 9
    .get(sitesControllers.getSiteById)
    .delete(sitesControllers.deleteSite)

router.get('/:name', sitesControllers.getSiteByName) //Si no hay expresion regular el parametro es el nombre.

export default router