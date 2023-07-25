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
exports.EmailService = void 0;
// EmailService.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailService {
    sendEmail(to, subject, content) {
        return __awaiter(this, void 0, void 0, function* () {
            // Configurar el transporte del servicio de correo electrónico
            const transporter = nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                auth: {
                    user: "escobar.gutierrez.3@gmail.com",
                    pass: "qemfmuelffumjhcq", // Reemplaza esto con tu contraseña de correo electrónico
                },
            });
            // Definir el contenido del correo electrónico
            const mailOptions = {
                from: "air.fresh.esc@gmail.com",
                to: to,
                subject: subject,
                text: content,
            };
            try {
                // Envía el correo electrónico
                yield transporter.sendMail(mailOptions);
            }
            catch (error) {
                // Maneja los errores en caso de que falle el envío del correo electrónico
                console.error("Error al enviar el correo electrónico:", error);
                throw new Error("No se pudo enviar el correo electrónico");
            }
        });
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=EmailService.js.map