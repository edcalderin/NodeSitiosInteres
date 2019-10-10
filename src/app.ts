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
        this.app.use(morgan('dev'))
    }
    routes() {
        this.app.use(routes)
    }
    start() {
        const port = this.app.get('port')
        this.app.listen(port, () => {
            console.log(`Server running ${port}`)
        })
    }
}