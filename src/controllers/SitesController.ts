import { Request, Response } from 'express'
import { Site } from '../models/site'
import { firebase } from './firebase/initialize'

const collection_name = "SitiosInteres"
const Not_Found = "Sitio no encontrado"

export default class SitesController {

    async getSites(req: Request, res: Response) {
        var fs = firebase.firestore()
        fs.collection(collection_name).get().then(collection => {
            var sites: any = []
            collection.forEach(e => {
                sites.push({
                    id: e.data().id,
                    nombre: e.data().nombre
                })
            })
            res.json(sites)
        })
            .catch(error => res.status(404).json({ 'Error': error }))
    }

    async getSiteById(req: Request, res: Response) {
        const { id } = req.params
        var fs = firebase.firestore()
        try {
            const sites = await fs.collection(collection_name).where('id', '==', Number(id)).get()
            if (sites.empty)
                return res.status(404).send(Not_Found)
            else
                return res.json(sites.docs[0].data())
        } catch (error) {
            res.status(404).json({ 'Error': error })
        }
    }

    async getSiteByName(req: Request, res: Response) {
        const { name } = req.params
        console.log(name)
        var fs = firebase.firestore()
        try {
            const sites = await fs.collection(collection_name).where('nombre', '>=', name).get()
            if (sites.empty)
                return res.status(404).send('La busqueda no arrojó resultados')
            else {
                var sitesByName = Array<Site>()
                sites.forEach(site => {
                    sitesByName.push(<Site>site.data())
                })
                return res.json(sitesByName)
            }
        } catch (error) {
            res.status(404).json({ 'Error': error })
        }
    }

    async deleteSite(req: Request, res: Response) {
        const { id } = req.params
        var fs = firebase.firestore()
        try {
            const sites = await fs.collection(collection_name).where('id', '==', Number(id)).get()
            if (sites.empty)
                return res.status(404).send(Not_Found)
            else {
                await sites.docs[0].ref.delete()
                return res.json(sites.docs[0].data())
            }
        } catch (error) {
            res.status(404).json({ 'Error': error })
        }
    }
    async updateSite(req: Request, res: Response) {
        const { name } = req.params
        var fs = firebase.firestore()
        try {
            const sites = await fs.collection(collection_name).where('nombre', '==', name).get()
            if (sites.empty)
                return res.status(404).send('La busqueda no arrojó resultados')
            else {
                var sitesByName = Array<Site>()
                sites.forEach(site => {
                    sitesByName.push(<Site>site.data())
                })
                return res.json(sitesByName)
            }
        } catch (error) {
            res.status(404).json({ 'Error': error })
        }
    }
    async createSite(req: Request, res: Response) {
        const newSite: Site = req.body
        var fs = firebase.firestore()
        try {
            await fs.collection(collection_name).doc(newSite.id.toString()).set(newSite)
            return res.json(newSite)
        } catch (error) {
            res.status(404).json({ 'Error': error })
        }
    }
}