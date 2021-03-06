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
const initialize_1 = require("./firebase/initialize");
class firebase_client {
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const result = yield initialize_1.firebase.auth().signInWithEmailAndPassword(email, password);
                if (result) {
                    if (result.user != null) {
                        result.user.getIdToken()
                            .then(token => res.json(token))
                            .catch(error => res.json({ 'Error': error }));
                    }
                }
            }
            catch (error) {
                res.status(404).json({ 'Error al loguearse': error });
            }
        });
    }
    signOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Cerrar sesion
                yield initialize_1.firebase.auth().signOut();
            }
            catch (error) {
                res.send('Error al cerrar sesion');
            }
        });
    }
}
exports.default = firebase_client;
