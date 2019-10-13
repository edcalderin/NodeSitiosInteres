import express from 'express'
import morgan from 'morgan'
import routes from './routes/index'
import routesAuth from './routes/auth'
import auth from './controllers/firebase/middelwares'
export default class Application {
    app: express.Application
    authFirebase: auth
    constructor() {
        this.app = express()
        this.authFirebase = new auth()
        this.settings()
        this.middelwares()
        this.routes()
    }
    settings() {
        this.app.set('port', process.env.PORT || 3000) //Puerto estatico o asignado por sistema operativo
    }
    middelwares() {
        this.app.use(morgan('dev')) //Informacion de cada solicitud: Tiempo, tipo de respuesta...
        this.app.use(express.json()) //Para entender las respuestas JSON del cliente       
    }
    routes() {
        this.app.use('/api/auth/', routesAuth)
        this.app.use('/api/sites', this.authFirebase.decodeToken, this.authFirebase.isAuthorized, routes)
    }  
    start() {      
        const port = this.app.get('port')
        this.app.listen(port, () => {
            console.log(`Server running ${port}`)
        })
    }
}