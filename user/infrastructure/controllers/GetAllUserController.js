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
exports.GetAllUserController = void 0;
class GetAllUserController {
    constructor(getAllUserUseCase) {
        this.getAllUserUseCase = getAllUserUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.getAllUserUseCase.run();
                console.log(users);
                if (users)
                    //Code HTTP : 200 -> Consulta exitosa
                    res.status(200).send({
                        status: "success",
                        data: users.map((user) => {
                            return {
                                id: user === null || user === void 0 ? void 0 : user.id,
                                name: user === null || user === void 0 ? void 0 : user.name,
                                lastname: user === null || user === void 0 ? void 0 : user.name,
                                email: user === null || user === void 0 ? void 0 : user.email,
                                phone: user === null || user === void 0 ? void 0 : user.phone,
                                password: user === null || user === void 0 ? void 0 : user.password,
                            };
                        }),
                    });
                else
                    res.status(400).send({
                        status: "error",
                        msn: "Ocurrio algún problema",
                    });
            }
            catch (error) {
                //Code HTTP : 204 Sin contenido
                res.status(204).send({
                    status: "error",
                    data: "Ocurrio un error",
                    msn: error,
                });
            }
        });
    }
}
exports.GetAllUserController = GetAllUserController;
//# sourceMappingURL=GetAllUserController.js.map