"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
function checkSiteBody() {
    return [
        express_validator_1.check('id')
            .exists({ checkFalsy: true, checkNull: true }).withMessage('La propiedad id es requerida')
            .isInt({ min: 0 }).withMessage('No se permite valores negativos ni flotantes'),
        express_validator_1.check('nombre')
            .exists().withMessage('La propiedad nombre es requerida')
            .isString().withMessage('Esta propiedad solo permite cadena de caracteres'),
        express_validator_1.check('descripcion')
            .exists().withMessage('La propiedad descripcion es requerida')
            .isString().withMessage('Esta propiedad solo permite cadena de caracteres'),
        express_validator_1.check('url_imagen')
            .exists({ checkFalsy: true, checkNull: true }).withMessage('La propiedad url_imagen es requerida')
            .isURL().withMessage('URL incorrecta'),
        express_validator_1.check('ubicacion._lat')
            .exists({ checkFalsy: true, checkNull: true }).withMessage('La propiedad ubicacion._lat es requerida')
            .isNumeric().withMessage('Ingrese un valor numerico'),
        express_validator_1.check('ubicacion._lon')
            .exists({ checkFalsy: true, checkNull: true }).withMessage('La propiedad ubicacion._lon es requerida')
            .isNumeric().withMessage('Ingrese un valor numerico')
    ];
}
exports.checkSiteBody = checkSiteBody;
