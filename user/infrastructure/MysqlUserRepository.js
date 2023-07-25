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
exports.MysqlUserRepository = void 0;
const mysql_1 = require("../../database/mysql");
const User_1 = require("../domain/User");
const EmailService_1 = require("./EmailService");
const WebsocketRouter_1 = require("../../websocket/WebsocketRouter");
class MysqlUserRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM users";
            try {
                const [data] = yield (0, mysql_1.query)(sql, []);
                const dataUsers = Object.values(JSON.parse(JSON.stringify(data)));
                return dataUsers.map((user) => new User_1.User(user.id, user.name, user.lastname, user.email, user.phone, user.password));
            }
            catch (error) {
                return null;
            }
        });
    }
    createUser(name, lastname, email, phone, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO users (name, lastname, email, phone, password) VALUES (?, ?, ?, ?, ?)";
            const params = [name, lastname, email, phone, password];
            try {
                const [result] = yield (0, mysql_1.query)(sql, params);
                //El objeto Result es un objeto que contiene info generada de la bd
                /*No es necesaria la validación de la cantidad de filas afectadas, ya que, al
                      estar dentro de un bloque try/catch si hay error se captura en el catch */
                return new User_1.User(result.insertId, name, lastname, email, phone, password);
            }
            catch (error) {
                return null;
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
            const params = [email, password];
            try {
                const [data] = yield (0, mysql_1.query)(sql, params);
                const userData = JSON.parse(JSON.stringify(data));
                if (userData.length === 1) {
                    const user = userData[0];
                    (0, WebsocketRouter_1.emitLoginEvent)(true, user); // Emitir evento de inicio de sesión válido
                    return new User_1.User(user.id, user.name, user.lastname, user.email, user.phone, user.password);
                }
                else {
                    (0, WebsocketRouter_1.emitLoginEvent)(false); // Emitir evento de inicio de sesión inválido
                    return null;
                }
            }
            catch (error) {
                (0, WebsocketRouter_1.emitLoginEvent)(false); // Emitir evento de inicio de sesión inválido
                return null;
            }
        });
    }
    sendEmailToUser(email, subject, content) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Lógica para enviar el correo electrónico utilizando el servicio de correo electrónico
                const emailService = new EmailService_1.EmailService();
                yield emailService.sendEmail(email, subject, content);
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
}
exports.MysqlUserRepository = MysqlUserRepository;
//# sourceMappingURL=MysqlUserRepository.js.map