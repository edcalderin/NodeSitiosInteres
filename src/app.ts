import express from 'express'
import morgan from 'morgan'
import routes from './routes/index'
export default class Application {
    app: express.Application
    constructor() {
        this.app = express()
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
    }
    routes() {
        this.app.use('/api/sites',routes)
    }
    start() {
        const port = this.app.get('port')
        this.app.listen(port, () => {
            console.log(`Server running ${port}`)
        })
    }
}