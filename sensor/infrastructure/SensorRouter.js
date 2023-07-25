"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sensorRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("./dependencies");
exports.sensorRouter = express_1.default.Router();
exports.sensorRouter.get("/getAllData", dependencies_1.getAllDataSensorController.run.bind(dependencies_1.getAllDataSensorController));
exports.sensorRouter.post("/register", dependencies_1.registerDataSensorController.run.bind(dependencies_1.registerDataSensorController));
//# sourceMappingURL=SensorRouter.js.map