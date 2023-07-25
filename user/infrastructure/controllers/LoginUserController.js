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
exports.LoginUserController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginUserController {
    constructor(loginUserUseCase) {
        this.loginUserUseCase = loginUserUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const user = yield this.loginUserUseCase.run(data.email, data.password);
                if (user) {
                    // Generar el token JWT con la información del usuario
                    const token = jsonwebtoken_1.default.sign({
                        id: user.id,
                        email: user.email
                    }, "secreto", // Reemplaza esto por una clave secreta más segura
                    { expiresIn: "1h" } // expiración del token
                    );
                    // Enviar el token en el encabezado de la respuesta
                    res.header("Authorization", `Bearer ${token}`);
                    // Code HTTP: 200 -> Éxito
                    res.status(200).json({
                        status: "success",
                        data: {
                            id: user.id,
                            name: user.name,
                            lastname: user.lastname,
                            email: user.email,
                            phone: user.phone,
                            token: token
                        },
                    });
                }
                else {
                    // Code HTTP: 401 -> No autorizado
                    res.status(401).json({
                        status: "error",
                        data: "Credenciales inválidas",
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
exports.LoginUserController = LoginUserController;
//# sourceMappingURL=LoginUserController.js.map