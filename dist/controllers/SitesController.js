"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const initialize_1 = require("./firebase/initialize");
const collection_name = "SitiosInteres";
const Not_Found = "Sitio no encontrado";
class SitesController {
    getQueryPagination(ref, lastId, limit) {
        //Si no existe parametro de id, entonces retorna los 3 primeros
        if (!lastId)
            return ref.collection(collection_name)
                .orderBy('id')
                .limit(limit);
        //Sino, inicia por el elemento con id entrante de la proxima solicitud.
        return ref.collection(collection_name)
            .orderBy('id')
            .startAfter(Number(lastId))
            .limit(limit);
    }
    getAllSitesWithPagination(limit, lastId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ref = initialize_1.firebase.firestore();
                const collection = yield this.getQueryPagination(ref, lastId, limit).get();
                var sitesFull = {
                    sites: this.fillSite(collection),
                    lastId: collection.docs[collection.docs.length - 1].data().id
                };
                return sitesFull;
            }
            catch (error) {
                return error;
            }
        });
    }
    getSitesByName(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ref = initialize_1.firebase.firestore();
                const collection = yield ref.collection(collection_name).where('nombre', '==', nombre).get();
                var sites = this.fillSite(collection);
                return sites;
            }
            catch (error) {
                return error;
            }
        });
    }
    getSites(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, lastId, limit } = req.query;
            try {
                if (nombre) { //Filtro por nombre
                    var sitesName = yield this.getSitesByName(nombre);
                    res.json(sitesName);
                }
                else {
                    var sitesPage = yield this.getAllSitesWithPagination(Number(limit), Number(lastId));
                    res.json(sitesPage);
                }
            }
            catch (error) {
                res.status(404).json({ 'Error': error });
            }
        });
    }
    getSiteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            var ref = initialize_1.firebase.firestore();
            try {
                const sites = yield ref.collection(collection_name).where('id', '==', Number(id)).get();
                if (sites.empty)
                    return res.status(404).send(Not_Found);
                return res.json(sites.docs[0].data());
            }
            catch (error) {
                res.status(404).json({ 'Error': error });
            }
        });
    }
    deleteSite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            var ref = initialize_1.firebase.firestore();
            try {
                const sites = yield ref.collection(collection_name).where('id', '==', Number(id)).get();
                if (sites.empty)
                    return res.status(404).send(Not_Found);
                yield sites.docs[0].ref.delete();
                return res.json(sites.docs[0].data());
            }
            catch (error) {
                res.status(404).json({ 'Error': error });
            }
        });
    }
    updateSite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var newSite = this.parseSite(req.body);
            var ref = initialize_1.firebase.firestore();
            try {
                const sites = yield ref.collection(collection_name).where('id', '==', newSite.id).get();
                if (sites.empty)
                    return res.status(404).send(Not_Found);
                yield sites.docs[0].ref.update(newSite);
                return res.json(newSite);
            }
            catch (error) {
                res.status(404).json({ 'Error': error });
            }
        });
    }
    createSite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty())
                    return res.status(404).json({ 'Errores': errors.array() });
                var newSite = this.parseSite(req.body);
                const ref = initialize_1.firebase.firestore();
                const sites = yield ref.collection(collection_name).where('id', '==', newSite.id).get();
                if (!sites.empty)
                    return res.status(404).send(`El sitio con id ${newSite.id} ya existe`);
                yield ref.collection(collection_name).add(newSite);
                return res.json(newSite);
            }
            catch (error) {
                res.status(404).json({ 'Error': error });
            }
        });
    }
    parseSite(body) {
        return {
            id: Number(body.id),
            nombre: body.nombre,
            descripcion: body.descripcion,
            url_imagen: body.url_imagen,
            ubicacion: body.ubicacion
        };
    }
    fillSite(collection) {
        var _sites = Array();
        collection.forEach(e => {
            _sites.push({
                id: e.data().id,
                nombre: e.data().nombre
            });
        });
        return _sites;
    }
}
exports.default = SitesController;
