import { check } from 'express-validator'

export function checkSiteBody(): Array<any> {
    return [
        check('id')
            .exists({ checkFalsy: true, checkNull: true }).withMessage('La propiedad id es requerida')
            .isInt({ min: 0 }).withMessage('No se permite valores negativos ni flotantes'),

        check('url_imagen')
            .exists({ checkFalsy: true, checkNull: true }).withMessage('La propiedad url_imagen es requerida')
            .isURL().withMessage('URL incorrecta'),

        check('ubicacion._lat')
            .exists({ checkFalsy: true, checkNull: true }).withMessage('La propiedad ubicacion._lat es requerida')
            .isNumeric().withMessage('Ingrese un valor numerico'),

        check('ubicacion._lon')
            .exists({ checkFalsy: true, checkNull: true }).withMessage('La propiedad ubicacion._lon es requerida')
            .isNumeric().withMessage('Ingrese un valor numerico')

    ]
}


