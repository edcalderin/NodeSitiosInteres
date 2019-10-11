import express from 'express'
import morgan from 'morgan'
import routes from './routes/index'
import routesAuth from './routes/auth'
import auth from './firebase/auth'
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
        this.app.set('port', process.env.PORT || 3000)
    }
    middelwares() {
        this.app.use(morgan('dev')) //Informacion de cada solicitud: Tiempo, tipo de respuesta...
        this.app.use(express.json()) //Para entender las respuestas JSON del cliente
        //this.app(this.authFirebase.verifyToken())
    }
    routes() {
        this.app.use('/api/auth/', routesAuth)
        this.app.use('/api/sites', routes)
    }
    start() {
        const port = this.app.get('port')
        this.app.listen(port, () => {
            console.log(`Server running ${port}`)
        })
    }
}