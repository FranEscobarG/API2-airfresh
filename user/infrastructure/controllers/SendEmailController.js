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
exports.SendEmailController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class SendEmailController {
    constructor(sendEmailToUserUseCase) {
        this.sendEmailToUserUseCase = sendEmailToUserUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                // Obtiene los datos para el correo electrónico, asunto y contenido 
                const { subject, content } = data;
                const token = req.header('authorization'); // Corrige la clave para acceder al token
                if (!token || !token.startsWith("Bearer "))
                    return res.status(401).json('Access Denied');
                const tokenWithoutBearer = token.slice(7); // Eliminar la parte "Bearer " del token
                // Verificar y decodificar el token JWT
                const decodedToken = jsonwebtoken_1.default.verify(tokenWithoutBearer, "secreto");
                // Obtener el correo electrónico de destino del token decodificado
                const destEmail = decodedToken.email;
                const success = yield this.sendEmailToUserUseCase.run(destEmail, subject, content);
                if (success) {
                    // Code HTTP: 200 -> Éxito
                    res.status(200).json({
                        status: "success",
                        data: "Correo electrónico enviado correctamente",
                    });
                }
                else {
                    // Code HTTP: 500 -> Error del servidor
                    res.status(500).json({
                        status: "error",
                        data: "Ocurrió un error al enviar el correo electrónico",
                    });
                }
            }
            catch (error) {
                // Code HTTP: 500 -> Error interno del servidor
                res.status(500).json({
                    status: "error",
                    data: "Ocurrió un error en el servidor",
                    msn: error,
                });
            }
        });
    }
}
exports.SendEmailController = SendEmailController;
//# sourceMappingURL=SendEmailController.js.map