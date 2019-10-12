import { Location } from './Location'
export interface Site {
    id: number,
    nombre: string,
    descripcion: string,
    url_imagen: string,
    ubicacion: Location
}