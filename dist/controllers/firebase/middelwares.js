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
const initialize_1 = require("./initialize");
class Auth {
    decodeToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idToken = req.headers['token'];
                if (!idToken)
                    return res.status(404).send('Es necesario el token de autenticacion');
                const decodedToken = yield initialize_1.admin.auth().verifyIdToken(idToken.toString());
                req.body.decodedToken = decodedToken;
                next();
            }
            catch (error) {
                res.status(404).send('No autorizado');
            }
        });
    }
    isAuthorized(req, res, next) {
        const { decodedToken } = req.body;
        if (decodedToken)
            next();
        else
            res.status(404).send('No autorizado');
    }
}
exports.default = Auth;
