import { Request, Response } from 'express'
import { Site } from '../models/site'
import { firebase } from './firebase/initialize'
import { firestore } from 'firebase'
const collection_name = "SitiosInteres"
const Not_Found = "Sitio no encontrado"

export default class SitesController {

    private getQueryPagination(ref: firestore.Firestore, lastId: Number, limit: number): firestore.Query {
        //Si no existe parametro de id, entonces retorna los 3 primeros
        if (!lastId)
            return ref.collection(collection_name)
                .orderBy('id')
                .limit(limit)
        //Sino, inicia por el elemento con id entrante de la proxima solicitud.
        return ref.collection(collection_name)
            .orderBy('id')
            .startAfter(Number(lastId))
            .limit(limit)
    }
    private async getAllSitesWithPagination(lastId: number, limit: number) {
        try {
            var sites = Array<any>()
            const ref = firebase.firestore()
            const collection = await this.getQueryPagination(ref, lastId, limit).get()
            collection.forEach(e => {
                sites.push({
                    sites: {
                        id: e.data().id,
                        nombre: e.data().nombre
                    },
                })
            })
            var sitesFull = {
                sites: sites,
                lastId: collection.docs[collection.docs.length - 1].data().id
            }
            return sitesFull
        } catch (error) {
            return []
        }
    }
    private async getSitesByName(nombre: string) {
        try {
            var sites = Array<any>()
            const ref = firebase.firestore()
            const collection = await ref.collection(collection_name).where('nombre', '==', nombre).get()
            collection.forEach(e => {
                sites.push({
                    sites: {
                        id: e.data().id,
                        nombre: e.data().nombre
                    },
                })
            })
            return sites
        } catch (error) {
            return []
        }
    }

    public async getSites(req: Request, res: Response) {
        const { nombre, lastId, limit } = req.query
        try {
            if (nombre) { //Filtro por nombre
                var sitesName = await this.getSitesByName(nombre)
                res.json(sitesName)
            }
            else {
                var sitesPage = await this.getAllSitesWithPagination(Number(lastId), Number(limit))
                res.json(sitesPage)
            }
        } catch (error) {
            res.status(404).json({ 'Error': error })
        }
    }
    public async getSiteById(req: Request, res: Response) {
        const { id } = req.params
        var ref = firebase.firestore()
        try {
            const sites = await ref.collection(collection_name).where('id', '==', Number(id)).get()
            if (sites.empty)
                return res.status(404).send(Not_Found)
            return res.json(sites.docs[0].data())
        } catch (error) {
            res.status(404).json({ 'Error': error })
        }
    }
    public async deleteSite(req: Request, res: Response) {
        const { id } = req.params
        var ref = firebase.firestore()
        try {
            const sites = await ref.collection(collection_name).where('id', '==', Number(id)).get()
            if (sites.empty)
                return res.status(404).send(Not_Found)
            await sites.docs[0].ref.delete()
            return res.json(sites.docs[0].data())
        } catch (error) {
            res.status(404).json({ 'Error': error })
        }
    }
    public async updateSite(req: Request, res: Response) {
        const { site } = req.body
        var newSite: Site = site
        var ref = firebase.firestore()
        try {
            const sites = await ref.collection(collection_name).where('id', '==', newSite.id).get()
            if (sites.empty)
                return res.status(404).send(Not_Found)
            await sites.docs[0].ref.update(newSite)
            return res.json(site)
        } catch (error) {
            res.status(404).json({ 'Error': error })
        }
    }
    public async createSite(req: Request, res: Response) {
        const { site } = req.body
        var newSite: Site = site
        const ref = firebase.firestore()
        try {
            const sites = await ref.collection(collection_name).where('id', '==', newSite.id).get()
            if (!sites.empty)
                return res.status(404).send(`El sitio con id ${newSite.id} ya existe`)
            await ref.collection(collection_name).add(newSite)
            return res.json(newSite)
        } catch (error) {
            res.status(404).json({ 'Error': error })
        }
    }
}