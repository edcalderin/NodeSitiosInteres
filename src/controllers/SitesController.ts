import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
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
    private async getAllSitesWithPagination(limit: number, lastId: number) {
        try {
            const ref = firebase.firestore()
            const collection = await this.getQueryPagination(ref, lastId, limit).get()
            var sitesFull = {
                sites: this.fillSite(collection),
                lastId: collection.docs[collection.docs.length - 1].data().id
            }
            return sitesFull
        } catch (error) {
            return error
        }
    }
    private async getSitesByName(nombre: string) {
        try {
            const ref = firebase.firestore()
            const collection = await ref.collection(collection_name).where('nombre', '==', nombre).get()
            var sites = this.fillSite(collection)
            return sites
        } catch (error) {
            return error
        }
    }

    public async getSites(req: Request, res: Response):Promise<Response> {
        const { nombre, lastId, limit } = req.query
        try {
            if (nombre) { //Filtro por nombre
                var sitesName = await this.getSitesByName(nombre)
                return res.json(sitesName)
            }
            else {
                var sitesPage = await this.getAllSitesWithPagination(Number(limit), Number(lastId))
                return res.json(sitesPage)
            }
        } catch (error) {
            return res.status(404).json({ 'Error': error })
        }
    }
    public async getSiteById(req: Request, res: Response):Promise<Response> {
        const { id } = req.params
        var ref = firebase.firestore()
        try {
            const sites = await ref.collection(collection_name).where('id', '==', Number(id)).get()
            if (sites.empty)
                return res.status(404).send(Not_Found)
            return res.json(sites.docs[0].data())
        } catch (error) {
            return res.status(404).json({ 'Error': error })
        }
    }
    public async deleteSite(req: Request, res: Response):Promise<Response> {
        const { id } = req.params
        var ref = firebase.firestore()
        try {
            const sites = await ref.collection(collection_name).where('id', '==', Number(id)).get()
            if (sites.empty)
                return res.status(404).send(Not_Found)
            await sites.docs[0].ref.delete()
            return res.json(sites.docs[0].data())
        } catch (error) {
            return res.status(404).json({ 'Error': error })
        }
    }
    public async updateSite(req: Request, res: Response):Promise<Response> {
        var newSite: Site = this.parseSite(req.body)
        var ref = firebase.firestore()
        try {
            const sites = await ref.collection(collection_name).where('id', '==', newSite.id).get()
            if (sites.empty)
                return res.status(404).send(Not_Found)
            await sites.docs[0].ref.update(newSite)
            return res.json(newSite)
        } catch (error) {
            return res.status(404).json({ 'Error': error })
        }
    }

    public async createSite(req: Request, res: Response):Promise<Response> {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty())
                return res.status(404).json({ 'Errores': errors.array() })

            var newSite: Site = this.parseSite(req.body)
            const ref = firebase.firestore()
            const sites = await ref.collection(collection_name).where('id', '==', newSite.id).get()
            if (!sites.empty)
                return res.status(404).send(`El sitio con id ${newSite.id} ya existe`)
            await ref.collection(collection_name).add(newSite)
            return res.status(200).json(newSite)
        } catch (error) {
            return res.status(404).json({ 'Error': error })
        }
    }
    parseSite(body: any): Site {
        return <Site>{
            id: Number(body.id),
            nombre: body.nombre,
            descripcion: body.descripcion,
            url_imagen: body.url_imagen,
            ubicacion: body.ubicacion
        }
    }
    fillSite(collection: firestore.QuerySnapshot) {
        var _sites = Array<any>()
        collection.forEach(e => {
            _sites.push({
                id: e.data().id,
                nombre: e.data().nombre
            })
        })
        return _sites
    }
}