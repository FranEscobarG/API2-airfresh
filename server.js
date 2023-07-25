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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const WebsocketRouter_1 = require("./websocket/WebsocketRouter");
const UserRouter_1 = require("./user/infrastructure/UserRouter");
const SensorRouter_1 = require("./sensor/infrastructure/SensorRouter");
const MysqlSensorRepository_1 = require("./sensor/infrastructure/MysqlSensorRepository");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.server = http_1.default.createServer(this.app);
        this.io = null;
        this.configure();
    }
    configure() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use(express_1.default.json());
            this.app.use("/users", UserRouter_1.userRouter);
            this.app.use((0, cors_1.default)()); // Habilita CORS para responder a solicitudes desde cualquier origen
            this.app.use("/sensor", SensorRouter_1.sensorRouter);
            const sensorRepository = new MysqlSensorRepository_1.MysqlSensorRepository();
            const allSensorData = yield sensorRepository.getAll();
            // Envía todos los datos a los clientes conectados al iniciar la aplicación
            if (this.io && allSensorData) {
                (0, WebsocketRouter_1.sendUpdatedDataToClients)(allSensorData);
            }
        });
    }
    socketServer() {
        this.io = new socket_io_1.Server(this.server, {
            cors: { origin: "*" } // Permitir conexiones desde cualquier origen en el socket.io
        });
        // Utiliza la función handleWebSockets para manejar los eventos de los WebSockets.
        (0, WebsocketRouter_1.handleWebSockets)(this.io);
    }
    start() {
        this.server.listen(3000, () => {
            console.log(`Server online in port 3000`);
        });
    }
}
const app = new App();
app.socketServer();
app.start();
//# sourceMappingURL=server.js.map