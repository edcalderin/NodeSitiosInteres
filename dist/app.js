"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var index_1 = __importDefault(require("./routes/index"));
var Application = /** @class */ (function () {
    function Application() {
        this.app = express_1.default();
        this.settings();
        this.middelwares();
        this.routes();
    }
    Application.prototype.settings = function () {
        this.app.set('port', process.env.PORT || 3000);
    };
    Application.prototype.middelwares = function () {
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json());
    };
    Application.prototype.routes = function () {
        this.app.use(index_1.default);
    };
    Application.prototype.start = function () {
        var port = this.app.get('port');
        this.app.listen(port, function () {
            console.log("Server running " + port);
        });
    };
    return Application;
}());
exports.default = Application;
