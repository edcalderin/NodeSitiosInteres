"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const index_1 = __importDefault(require("./routes/index"));
const auth_1 = __importDefault(require("./routes/auth"));
const middelwares_1 = __importDefault(require("./controllers/firebase/middelwares"));
class Application {
    constructor() {
        this.app = express_1.default();
        this.authFirebase = new middelwares_1.default();
        this.settings();
        this.middelwares();
        this.routes();
    }
    settings() {
        this.app.set('port', process.env.PORT || 3000); //Puerto estatico o asignado por sistema operativo
    }
    middelwares() {
        this.app.use(morgan_1.default('dev')); //Informacion de cada solicitud: Tiempo, tipo de respuesta...
        this.app.use(express_1.default.json()); //Para entender las respuestas JSON del cliente    
    }
    routes() {
        this.app.use('/api/auth/', auth_1.default);
        this.app.use('/api/sites', this.authFirebase.decodeToken, this.authFirebase.isAuthorized, index_1.default);
    }
    start() {
        const port = this.app.get('port');
        this.app.listen(port, () => {
            console.log(`Server running ${port}`);
        });
    }
}
exports.default = Application;
