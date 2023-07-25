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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlSensorRepository = void 0;
const mysql_1 = require("../../database/mysql");
const Sensor_1 = require("../domain/Sensor");
const WebsocketRouter_1 = require("../../websocket/WebsocketRouter"); // Importa la función para enviar datos actualizados
class MysqlSensorRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM air_data";
            try {
                const [data] = yield (0, mysql_1.query)(sql, []);
                const dataSensor = Object.values(JSON.parse(JSON.stringify(data)));
                return dataSensor.map((datoCO) => new Sensor_1.Sensor(datoCO.id, datoCO.co_ppm, datoCO.reg_date));
            }
            catch (error) {
                return null;
            }
        });
    }
    register(co_ppm) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO air_data (co_ppm) VALUES (?)";
            const params = [co_ppm];
            try {
                const [result] = yield (0, mysql_1.query)(sql, params);
                const newSensorData = new Sensor_1.Sensor(result.insertId, co_ppm, getFormattedDate());
                // Envía los datos actualizados a los clientes conectados
                (0, WebsocketRouter_1.sendUpdatedDataToClients)(newSensorData);
                return newSensorData;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.MysqlSensorRepository = MysqlSensorRepository;
// Función para obtener la fecha actual en el formato 'YYYY-MM-DD HH:mm:ss'
function getFormattedDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const formattedDate = `${year}-${formatNumber(month)}-${formatNumber(day)} ${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
    return formattedDate;
}
function formatNumber(num) {
    return num < 10 ? `0${num}` : `${num}`;
}
//   async getById(userId: number): Promise<User | null> {
//     const sql = "SELECT * FROM users WHERE id=?";
//     const params: any[] = [userId];
//     try {
//       const [result]: any = await query(sql, params);
//       //El objeto Result es un objeto que contiene info generada de la bd
//       /*No es necesaria la validación de la cantidad de filas afectadas, ya que, al
//             estar dentro de un bloque try/catch si hay error se captura en el catch */
//       return new User(
//         result[0].id,
//         result[0].name,
//         result[0].lastname,
//         result[0].email,
//         result[0].phone,
//         result[0].password
//       );
//     } catch (error) {
//       return null;
//     }
//   }
// }
//# sourceMappingURL=MysqlSensorRepository.js.map